/**
 * 바이비트 V5 API 관련 기능
 * https://bybit-exchange.github.io/docs/v5/intro
 */
class BybitAPI {
    constructor() {
        this.BYBIT_URL = 'https://api.bybit.com/v5';
        this.rateLimit = {
            requests: 0,
            maxRequests: 1200, // V5 API: 1분당 최대 요청 수
            resetTime: Date.now() + 60000 // 1분 후 리셋
        };
        
        // V5 API 카테고리
        this.categories = {
            spot: 'spot',           // 현물 거래
            linear: 'linear',        // USDT 선물
            inverse: 'inverse',      // 역방향 선물
            option: 'option'         // 옵션
        };
    }

    /**
     * API 요청 제한 확인
     */
    checkRateLimit() {
        const now = Date.now();
        if (now > this.rateLimit.resetTime) {
            this.rateLimit.requests = 0;
            this.rateLimit.resetTime = now + 60000;
        }
        
        if (this.rateLimit.requests >= this.rateLimit.maxRequests) {
            throw new Error('API 요청 제한에 도달했습니다. 잠시 후 다시 시도해주세요.');
        }
        
        this.rateLimit.requests++;
    }

    /**
     * 바이비트 V5 API 요청 실행
     */
    async makeRequest(endpoint, params = {}, retryCount = 0) {
        const maxRetries = 2;
        
        try {
            this.checkRateLimit();
            
            const url = new URL(`${this.BYBIT_URL}${endpoint}`);
            Object.keys(params).forEach(key => {
                url.searchParams.append(key, params[key]);
            });

            const controller = new AbortController();
            const timeout = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ? 15000 : 10000;
            const timeoutId = setTimeout(() => controller.abort(), timeout);
            
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_5 like Mac OS X) AppleWebKit/605.1.15'
                },
                mode: 'cors',
                signal: controller.signal,
                credentials: 'omit'
            });
            
            clearTimeout(timeoutId);

            if (!response.ok) {
                throw new Error(`바이비트 V5 API 요청 실패: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            
            // V5 API 응답 검증
            if (data.retCode !== 0) {
                throw new Error(`바이비트 V5 API 오류: ${data.retMsg} (코드: ${data.retCode})`);
            }

            return data;
        } catch (error) {
            console.error(`바이비트 V5 API 요청 오류 (시도 ${retryCount + 1}/${maxRetries + 1}):`, error);
            
            // 재시도 가능한 오류인 경우 재시도
            if (retryCount < maxRetries && (
                error.name === 'AbortError' || 
                error.message.includes('timeout') ||
                error.message.includes('NetworkError') ||
                error.message.includes('Load failed')
            )) {
                console.log(`${retryCount + 1}초 후 재시도...`);
                await new Promise(resolve => setTimeout(resolve, (retryCount + 1) * 1000));
                return this.makeRequest(endpoint, params, retryCount + 1);
            }
            
            throw error;
        }
    }

    /**
     * 카카오톡 인앱 브라우저용 대체 데이터 (CoinGecko API 사용)
     */
    async getFallbackData() {
        try {
            console.log('CoinGecko API로 대체 데이터 가져오는 중...');
            const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=volume_desc&per_page=50&page=1&sparkline=false&locale=en', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_5 like Mac OS X) AppleWebKit/605.1.15'
                },
                mode: 'cors'
            });
            
            if (!response.ok) {
                throw new Error(`CoinGecko API 요청 실패: ${response.status}`);
            }
            
            const data = await response.json();
            
            // 바이비트 API 형식에 맞게 변환
            return data.map((coin, index) => ({
                symbol: coin.symbol.toUpperCase() + 'USDT',
                lastPrice: coin.current_price.toString(),
                quoteVolume: coin.total_volume.toString(),
                priceChange: (coin.current_price - coin.price_change_24h).toString(),
                priceChangePercent: coin.price_change_percentage_24h.toString(),
                highPrice: coin.high_24h.toString(),
                lowPrice: coin.low_24h.toString(),
                volume: coin.total_volume.toString()
            }));
        } catch (error) {
            console.error('대체 데이터 가져오기 실패:', error);
            throw error;
        }
    }

    /**
     * 바이비트 V5 24시간 티커 정보 가져오기
     */
    async get24hrTicker() {
        return await this.makeRequest('/market/tickers', { category: this.categories.spot });
    }

    /**
     * 바이비트 V5 API에서 15분 기준 K-line 데이터 가져오기 (실시간 거래량)
     */
    async get15MinKline(symbol) {
        try {
            console.log(`${symbol} 15분 K-line 데이터 요청 중...`);
            const response = await this.makeRequest('/market/kline', { 
                category: this.categories.spot,
                symbol: symbol,
                interval: '15',  // 15분 간격
                limit: 4         // 최근 4개 (1시간 데이터)
            });
            
            if (!response.result || !response.result.list) {
                throw new Error(`${symbol} K-line 데이터 없음`);
            }
            
            // 가장 최근 15분 데이터 반환
            const latestKline = response.result.list[0];
            return {
                symbol: symbol,
                timestamp: parseInt(latestKline[0]), // 시작 시간
                volume15min: parseFloat(latestKline[5]), // 15분 거래량
                turnover15min: parseFloat(latestKline[6]), // 15분 거래대금
                price: parseFloat(latestKline[4]), // 종가
                high: parseFloat(latestKline[2]), // 고가
                low: parseFloat(latestKline[3]), // 저가
                open: parseFloat(latestKline[1]) // 시가
            };
        } catch (error) {
            console.warn(`${symbol} 15분 K-line 데이터 실패:`, error.message);
            return null;
        }
    }

    /**
     * 여러 코인의 15분 거래량 데이터를 병렬로 가져오기
     */
    async get15MinVolumeData(symbols) {
        try {
            console.log('15분 기준 거래량 데이터 수집 시작:', symbols.slice(0, 10));
            
            // 병렬 처리로 성능 향상 (최대 10개씩)
            const batchSize = 10;
            const results = [];
            
            for (let i = 0; i < symbols.length; i += batchSize) {
                const batch = symbols.slice(i, i + batchSize);
                const batchPromises = batch.map(symbol => this.get15MinKline(symbol));
                const batchResults = await Promise.all(batchPromises);
                results.push(...batchResults.filter(data => data !== null));
                
                // API 제한을 위한 짧은 대기
                if (i + batchSize < symbols.length) {
                    await new Promise(resolve => setTimeout(resolve, 100));
                }
            }
            
            console.log(`15분 거래량 데이터 수집 완료: ${results.length}개 성공`);
            return results;
        } catch (error) {
            console.error('15분 거래량 데이터 수집 실패:', error);
            return [];
        }
    }

    /**
     * 바이비트 V5 선물 롱숏 비율 API에서 데이터 가져오기
     * https://api.bybit.com/v5/market/account-ratio
     */
    async getLongShortRatio(symbol = 'BTCUSDT') {
        try {
            // 스팟 심볼을 선물 심볼로 변환 (바이비트 V5 API 지원 형식)
            const futuresSymbol = this.convertToFuturesSymbol(symbol);
            
            // 바이비트 V5 공식 API 사용
            const response = await this.makeRequest('/market/account-ratio', { 
                category: this.categories.linear,
                symbol: futuresSymbol,
                period: '1h',  // 1시간 단위로 변경
                limit: 1
            });
            
            if (!response.result || !response.result.list || response.result.list.length === 0) {
                throw new Error('롱숏 비율 데이터 없음');
            }
            
            const latest = response.result.list[0];
            const buyRatio = parseFloat(latest.buyRatio);    // 예: 0.49
            const sellRatio = parseFloat(latest.sellRatio);  // 예: 0.51
            const longShortRatio = buyRatio / sellRatio;
            
            // buyRatio와 sellRatio는 이미 0~1 사이의 값이므로 그대로 사용
            return {
                symbol,
                longShortRatio,
                longAccount: buyRatio,    // 0.49 (49%)
                shortAccount: sellRatio,  // 0.51 (51%)
                timestamp: latest.timestamp
            };
        } catch (error) {
            console.warn(`바이비트 V5 롱숏 비율 API 실패 (${symbol}):`, error.message);
            
            // 심볼 지원 오류인 경우 더 자세한 정보 제공
            if (error.message.includes('symbol not support')) {
                console.warn(`바이비트 V5에서 지원하지 않는 선물 심볼: ${symbol}`);
            }
            
            // 바이비트 V5 API 실패 시 CoinGecko에서 대체 데이터 가져오기
            try {
                return await this.getLongShortRatioFromCoinGecko(symbol);
            } catch (fallbackError) {
                console.warn(`CoinGecko 롱숏 비율도 실패 (${symbol}):`, fallbackError.message);
                // 최종적으로 null 반환
                return {
                    symbol,
                    longShortRatio: null,
                    longAccount: null,
                    shortAccount: null,
                    timestamp: null
                };
            }
        }
    }

    /**
     * CoinGecko에서 롱숏 비율 대체 데이터 가져오기
     */
    async getLongShortRatioFromCoinGecko(symbol) {
        try {
            const coinId = this.getCoinGeckoId(symbol);
            if (!coinId) {
                throw new Error('CoinGecko ID 없음');
            }
            
            const response = await fetch(`https://api.coingecko.com/api/v3/coins/${coinId}?localization=false&tickers=false&market_data=true&community_data=true&developer_data=false&sparkline=false`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_5 like Mac OS X) AppleWebKit/605.1.15'
                },
                mode: 'cors'
            });
            
            if (!response.ok) {
                throw new Error(`CoinGecko API 요청 실패: ${response.status}`);
            }
            
            const data = await response.json();
            
            // CoinGecko에서는 직접적인 롱숏 비율이 없으므로 시장 데이터 기반 추정
            const marketCap = data.market_data?.market_cap?.usd || 0;
            const volume = data.market_data?.total_volume?.usd || 0;
            const priceChange = data.market_data?.price_change_percentage_24h || 0;
            
            // 간단한 추정 로직 (실제 롱숏 비율이 아님)
            const estimatedRatio = priceChange > 0 ? 1.2 : 0.8;
            const totalAccounts = 100;
            const longAccount = totalAccounts * (estimatedRatio / (1 + estimatedRatio));
            const shortAccount = totalAccounts - longAccount;
            
            return {
                symbol,
                longShortRatio: estimatedRatio,
                longAccount: longAccount,
                shortAccount: shortAccount,
                timestamp: Date.now(),
                note: 'CoinGecko 추정 데이터'
            };
        } catch (error) {
            throw error;
        }
    }

    /**
     * 스팟 심볼을 바이비트 V5 선물 심볼로 변환
     */
    convertToFuturesSymbol(spotSymbol) {
        // 바이비트 V5 선물 API에서 지원하는 심볼들 (더 많은 심볼 추가)
        const supportedFuturesSymbols = [
            'BTCUSDT', 'ETHUSDT', 'BNBUSDT', 'SOLUSDT', 'ADAUSDT', 
            'AVAXUSDT', 'DOTUSDT', 'MATICUSDT', 'LINKUSDT', 'UNIUSDT',
            'DOGEUSDT', 'SHIBUSDT', 'XRPUSDT', 'LTCUSDT', 'BCHUSDT',
            'ATOMUSDT', 'NEARUSDT', 'FTMUSDT', 'ALGOUSDT', 'VETUSDT',
            'ICPUSDT', 'FILUSDT', 'TRXUSDT', 'ETCUSDT', 'XLMUSDT',
            'APTUSDT', 'OPUSDT', 'ARBUSDT', 'SUIUSDT', 'SEIUSDT',
            'INJUSDT', 'TIAUSDT', 'JUPUSDT', 'PYTHUSDT', 'WIFUSDT',
            'BONKUSDT', 'PEPEUSDT', 'FLOKIUSDT', 'MEMEUSDT', 'WIFUSDT',
            'BOMEUSDT', 'BOOKUSDT', 'SLERFUSDT', 'POPCATUSDT', 'TURBOUSDT',
            'MYROUSDT', 'SMOGUSDT', 'WENUSDT', 'JTOUSDT', 'SLERFUSDT'
        ];
        
        // 이미 선물 심볼인 경우 그대로 반환
        if (supportedFuturesSymbols.includes(spotSymbol)) {
            return spotSymbol;
        }
        
        // 스팟 심볼을 선물 심볼로 변환 시도
        const cleanSymbol = spotSymbol.replace('USDT', '');
        const futuresSymbol = cleanSymbol + 'USDT';
        
        // 지원되는 선물 심볼인지 확인
        if (supportedFuturesSymbols.includes(futuresSymbol)) {
            return futuresSymbol;
        }
        
        // 지원되지 않는 심볼인 경우 기본값 반환
        console.warn(`지원되지 않는 선물 심볼: ${spotSymbol}, BTCUSDT로 대체`);
        return 'BTCUSDT';
    }

    /**
     * 심볼을 CoinGecko ID로 변환
     */
    getCoinGeckoId(symbol) {
        const symbolMap = {
            'BTC': 'bitcoin',
            'ETH': 'ethereum',
            'BNB': 'binancecoin',
            'SOL': 'solana',
            'ADA': 'cardano',
            'AVAX': 'avalanche-2',
            'DOT': 'polkadot',
            'MATIC': 'matic-network',
            'LINK': 'chainlink',
            'UNI': 'uniswap',
            'DOGE': 'dogecoin',
            'SHIB': 'shiba-inu',
            'XRP': 'ripple',
            'LTC': 'litecoin',
            'BCH': 'bitcoin-cash'
        };
        
        const cleanSymbol = symbol.replace('USDT', '');
        return symbolMap[cleanSymbol] || null;
    }

    /**
     * 상위 코인들의 롱숏 비율 데이터 가져오기
     */
    async getTopCoinsLongShortRatio(coins) {
        try {
            const longShortData = [];
            
            // 바이비트에서 선물 거래를 지원하는 메인 코인들만 처리 (DOGE 추가)
            const supportedMainCoins = ['BTC', 'ETH', 'BNB', 'SOL', 'ADA', 'AVAX', 'DOT', 'MATIC', 'LINK', 'UNI', 'DOGE', 'SHIB', 'XRP', 'LTC', 'BCH'];
            const supportedMainCoinSymbols = supportedMainCoins.map(coin => coin + 'USDT');
            
            // 지원되는 메인 코인들만 처리
            for (const symbol of supportedMainCoinSymbols) {
                try {
                    const ratioData = await this.getLongShortRatio(symbol);
                    if (ratioData.longShortRatio) {
                        longShortData.push({
                            symbol: symbol.replace('USDT', ''),
                            fullSymbol: symbol,
                            longShortRatio: ratioData.longShortRatio,
                            longAccount: ratioData.longAccount,
                            shortAccount: ratioData.shortAccount,
                            timestamp: ratioData.timestamp
                        });
                        console.log(`메인코인 롱숏 데이터 성공: ${symbol}`, ratioData);
                    }
                } catch (error) {
                    console.warn(`${symbol} 롱숏 비율 데이터 가져오기 실패:`, error);
                }
            }
            
            // 상위 거래량 코인들 중에서 선물 거래가 지원되는 것들만 처리 (더 많은 코인 시도)
            const topVolumeCoins = coins
                .filter(coin => !supportedMainCoins.includes(coin.symbol))
                .slice(0, 10); // 10개로 증가
            
            for (const coin of topVolumeCoins) {
                try {
                    const ratioData = await this.getLongShortRatio(coin.fullSymbol);
                    if (ratioData.longShortRatio) {
                        longShortData.push({
                            symbol: coin.symbol,
                            fullSymbol: coin.fullSymbol,
                            longShortRatio: ratioData.longShortRatio,
                            longAccount: ratioData.longAccount,
                            shortAccount: ratioData.shortAccount,
                            timestamp: ratioData.timestamp
                        });
                        console.log(`거래량 코인 롱숏 데이터 성공: ${coin.symbol}`, ratioData);
                    }
                } catch (error) {
                    console.warn(`${coin.symbol} 롱숏 비율 데이터 가져오기 실패:`, error);
                }
            }
            
            console.log('롱숏 비율 데이터 수집 완료:', longShortData.length, '개');
            console.log('수집된 롱숏 데이터:', longShortData.map(item => ({
                symbol: item.symbol,
                fullSymbol: item.fullSymbol,
                longAccount: item.longAccount,
                shortAccount: item.shortAccount
            })));
            return longShortData;
        } catch (error) {
            console.error('상위 코인 롱숏 비율 데이터 가져오기 오류:', error);
            return []; // 오류 시 빈 배열 반환
        }
    }

    /**
     * 거래량 기준 상위 코인 가져오기 (기본값: 50개)
     */
    async getTopCoinsByVolume(limit = 20) {
        try {
            console.log('바이비트 V5 API에서 거래량 기준 상위 코인 가져오는 중...');
            return await this.getTopCoinsFromBybit(limit);
        } catch (error) {
            console.error('바이비트 V5 API 실패, CoinGecko API로 대체:', error);
            return await this.getTopCoinsFromCoinGecko(limit);
        }
    }

    /**
     * 바이비트 V5 API에서 15분 기준 실시간 거래량 상위 코인 가져오기
     */
    async getTopCoinsFromBybit15Min(limit = 50) {
        try {
            console.log('=== 15분 기준 실시간 거래량 분석 시작 ===');
            
            // 1단계: 24시간 기준 상위 코인 목록 가져오기
            const response = await this.get24hrTicker();
            const usdtPairs = response.result.list.filter(item => item.symbol.endsWith('USDT'));
            
            // 상위 100개 정도의 USDT 페어 선택
            const top100Pairs = usdtPairs
                .sort((a, b) => {
                    const aVolume = parseFloat(a.volume24h || a.volume || a.quoteVolume || 0);
                    const bVolume = parseFloat(b.volume24h || b.volume || b.quoteVolume || 0);
                    return bVolume - aVolume;
                })
                .slice(0, 100);
                
            console.log('24시간 거래량 상위 100개 코인 선택 완료');
            
            // 2단계: 15분 K-line 데이터로 실시간 거래량 수집
            const symbols = top100Pairs.map(pair => pair.symbol);
            const volume15MinData = await this.get15MinVolumeData(symbols);
            
            if (volume15MinData.length === 0) {
                console.warn('15분 데이터 수집 실패, 24시간 데이터로 대체');
                return await this.getTopCoinsFromBybit(limit);
            }
            
            // 3단계: 24시간 데이터와 15분 데이터 결합
            const combinedData = top100Pairs.map(pair => {
                const volume15Min = volume15MinData.find(data => data.symbol === pair.symbol);
                return {
                    ...pair,
                    volume15min: volume15Min?.volume15min || 0,
                    turnover15min: volume15Min?.turnover15min || 0,
                    realTimeActivity: volume15Min ? (volume15Min.volume15min * 96) : 0 // 15분 → 24시간 환산
                };
            });
            
            // 4단계: 메인코인과 밈코인 분리
            const mainCoins = ['BTC', 'ETH', 'BNB', 'SOL', 'ADA', 'AVAX', 'DOT', 'MATIC', 'LINK', 'UNI', 'XRP', 'DOGE', 'SHIB', 'LTC', 'BCH'];
            const mainCoinPairs = combinedData.filter(item => {
                const symbol = item.symbol.replace('USDT', '');
                return mainCoins.includes(symbol);
            });
            const memeCoinPairs = combinedData.filter(item => {
                const symbol = item.symbol.replace('USDT', '');
                return !mainCoins.includes(symbol);
            });
            
            // 5단계: 15분 기준 거래량으로 정렬
            const sortedMainCoins = mainCoinPairs.sort((a, b) => {
                const aVolume = parseFloat(a.volume15min || 0);
                const bVolume = parseFloat(b.volume15min || 0);
                return bVolume - aVolume; // 15분 거래량 높은 순
            });
            
            const sortedMemeCoins = memeCoinPairs.sort((a, b) => {
                const aVolume = parseFloat(a.volume15min || 0);
                const bVolume = parseFloat(b.volume15min || 0);
                return bVolume - aVolume; // 15분 거래량 높은 순
            });
            
            console.log('=== 15분 거래량 기준 정렬 결과 ===');
            console.log('메인코인 15분 거래량 순위:', sortedMainCoins.slice(0, 10).map(coin => ({
                symbol: coin.symbol,
                volume15min: `${(coin.volume15min / 1e6).toFixed(2)}M`,
                volume24h: `${(parseFloat(coin.volume24h || coin.volume || coin.quoteVolume) / 1e9).toFixed(2)}B`
            })));
            console.log('밈코인 15분 거래량 순위:', sortedMemeCoins.slice(0, 10).map(coin => ({
                symbol: coin.symbol,
                volume15min: `${(coin.volume15min / 1e6).toFixed(2)}M`
            })));
            
            // 6단계: 메인코인 먼저, 밈코인 나중에 결합
            const mainCoinsToShow = sortedMainCoins.slice(0, Math.max(20, limit * 0.6));
            const memeCoinsToShow = sortedMemeCoins.slice(0, limit - mainCoinsToShow.length);
            const finalCoins = [...mainCoinsToShow, ...memeCoinsToShow];
            
            return finalCoins.map((coin, index) => {
                const volume24h = parseFloat(coin.volume24h || coin.volume || coin.quoteVolume || 0);
                const volume15min = parseFloat(coin.volume15min || 0);
                
                return {
                    rank: index + 1,
                    symbol: coin.symbol.replace('USDT', ''),
                    fullSymbol: coin.symbol,
                    price: parseFloat(coin.lastPrice),
                    volume: volume15min > 0 ? volume15min * 96 : volume24h, // 15분 데이터 있으면 24시간 환산값 사용
                    volume15min: volume15min,
                    volume24h: volume24h,
                    priceChange: parseFloat(coin.price24hPcnt) * parseFloat(coin.lastPrice),
                    priceChangePercent: parseFloat(coin.price24hPcnt) * 100,
                    highPrice: parseFloat(coin.highPrice24h),
                    lowPrice: parseFloat(coin.lowPrice24h),
                    marketCap: parseFloat(coin.lastPrice) * volume24h * 0.1,
                    isRealTime: volume15min > 0 // 실시간 데이터 여부 표시
                };
            });
        } catch (error) {
            console.error('15분 기준 거래량 분석 실패, 기존 방식으로 대체:', error);
            return await this.getTopCoinsFromBybit(limit);
        }
    }

    /**
     * 바이비트 V5 API에서 거래량 기준 상위 코인 가져오기 (기존 방식)
     */
    async getTopCoinsFromBybit(limit = 20) {
        try {
            console.log('바이비트 V5 API에서 거래량 기준 상위 코인 가져오는 중...');
            const response = await this.get24hrTicker();
            
            // 디버깅: API 응답 확인
            console.log('바이비트 API 응답 샘플:', response.result.list.slice(0, 3));
            console.log('바이비트 API 응답 필드 확인:', Object.keys(response.result.list[0] || {}));
            console.log('전체 USDT 페어 개수:', response.result.list.filter(item => item.symbol.endsWith('USDT')).length);
            console.log('상위 20개 USDT 페어:', response.result.list.filter(item => item.symbol.endsWith('USDT')).slice(0, 20).map(item => item.symbol));
            
            // 전체 USDT 페어 거래량 순으로 정렬해서 확인
            const allUsdtPairs = response.result.list.filter(item => item.symbol.endsWith('USDT'));
            const sortedByVolume = allUsdtPairs.sort((a, b) => {
                const aVolume = parseFloat(a.volume24h || a.volume || a.quoteVolume || 0);
                const bVolume = parseFloat(b.volume24h || b.volume || b.quoteVolume || 0);
                return bVolume - aVolume;
            });
            
            console.log('거래량 순 상위 10개:', sortedByVolume.slice(0, 10).map(item => ({
                symbol: item.symbol,
                volume: item.volume24h || item.volume || item.quoteVolume,
                price: item.lastPrice
            })));
            
            if (!response.result || !response.result.list) {
                throw new Error('바이비트 API 응답 형식 오류');
            }
            
            // 메인코인 우선 필터링 (더 많은 메인코인 추가)
            const mainCoins = ['BTC', 'ETH', 'BNB', 'SOL', 'ADA', 'AVAX', 'DOT', 'MATIC', 'LINK', 'UNI', 'XRP', 'DOGE', 'SHIB', 'LTC', 'BCH', 'ATOM', 'NEAR', 'FTM', 'ALGO', 'VET'];
            
            // USDT 페어만 필터링
            const usdtPairs = response.result.list.filter(item => item.symbol.endsWith('USDT'));
            
            // 메인코인과 밈코인 분리
            const mainCoinPairs = usdtPairs.filter(item => {
                const symbol = item.symbol.replace('USDT', '');
                return mainCoins.includes(symbol);
            });
            
            const memeCoinPairs = usdtPairs.filter(item => {
                const symbol = item.symbol.replace('USDT', '');
                return !mainCoins.includes(symbol);
            });
            
            console.log('메인코인 목록 확인:', mainCoins);
            console.log('실제 메인코인 페어들:', mainCoinPairs.map(item => item.symbol));
            
            console.log('메인코인 개수:', mainCoinPairs.length);
            console.log('밈코인 개수:', memeCoinPairs.length);
            console.log('메인코인 목록:', mainCoinPairs.map(item => item.symbol));
            console.log('메인코인 거래량:', mainCoinPairs.map(item => ({
                symbol: item.symbol,
                volume: item.volume24h || item.volume || item.quoteVolume
            })));
            
            // 메인코인은 거래량 기준으로 정렬
            const sortedMainCoins = mainCoinPairs.sort((a, b) => {
                const aVolume = parseFloat(a.volume24h || a.volume || a.quoteVolume || 0);
                const bVolume = parseFloat(b.volume24h || b.volume || b.quoteVolume || 0);
                return bVolume - aVolume;
            });
            
            // 밈코인도 거래량 기준으로 정렬
            const sortedMemeCoins = memeCoinPairs.sort((a, b) => {
                const aVolume = parseFloat(a.volume24h || a.volume || a.quoteVolume || 0);
                const bVolume = parseFloat(b.volume24h || b.volume || b.quoteVolume || 0);
                return bVolume - aVolume;
            });
            
            let combinedCoins;
            
            // 메인코인을 거래량과 변동률 기준으로 정렬 (복합 점수)
            const sortedMainCoinsByVolumeAndChange = mainCoinPairs.sort((a, b) => {
                const aVolume = parseFloat(a.volume24h || a.volume || a.quoteVolume || 0);
                const bVolume = parseFloat(b.volume24h || b.volume || b.quoteVolume || 0);
                const aChange = Math.abs(parseFloat(a.price24hPcnt || 0));
                const bChange = Math.abs(parseFloat(b.price24hPcnt || 0));
                
                // 거래량과 변동률의 복합 점수 계산 (거래량 70%, 변동률 30%)
                const aScore = (aVolume * 0.7) + (aChange * 1000000 * 0.3);
                const bScore = (bVolume * 0.7) + (bChange * 1000000 * 0.3);
                
                return bScore - aScore;
            });
            
            // 밈코인은 거래량 순으로 정렬
            const sortedMemeCoinsByVolume = memeCoinPairs.sort((a, b) => {
                const aVolume = parseFloat(a.volume24h || a.volume || a.quoteVolume || 0);
                const bVolume = parseFloat(b.volume24h || b.volume || b.quoteVolume || 0);
                return bVolume - aVolume;
            });
            
            // 메인코인을 먼저, 그 다음 밈코인 순서로 결합 (메인코인 최소 20개 보장)
            const mainCoinsToShow = sortedMainCoinsByVolumeAndChange.slice(0, Math.max(20, limit * 0.6));
            const memeCoinsToShow = sortedMemeCoinsByVolume.slice(0, limit - mainCoinsToShow.length);
            combinedCoins = [...mainCoinsToShow, ...memeCoinsToShow];
            
            console.log('메인코인 거래량+변동률 정렬 결과:', sortedMainCoinsByVolumeAndChange.map(item => item.symbol));
            console.log('최종 결과 상위 10개:', combinedCoins.slice(0, 10).map(item => ({
                symbol: item.symbol,
                volume: item.volume24h || item.volume || item.quoteVolume,
                price: item.lastPrice
            })));
            console.log('11위 이후 (밈코인 포함):', combinedCoins.slice(10, 20).map(item => ({
                symbol: item.symbol,
                volume: item.volume24h || item.volume || item.quoteVolume,
                price: item.lastPrice
            })));

            return combinedCoins.map((coin, index) => {
                // 거래량 필드 확인 (바이비트 API 응답에 따라 다를 수 있음)
                const volume = parseFloat(coin.volume24h || coin.volume || coin.quoteVolume || 0);
                
                // 디버깅: 상위 5개 코인의 거래량 확인
                if (index < 5) {
                    console.log(`${coin.symbol} 거래량 데이터:`, {
                        volume24h: coin.volume24h,
                        volume: coin.volume,
                        quoteVolume: coin.quoteVolume,
                        parsedVolume: volume
                    });
                }
                
                return {
                    rank: index + 1,
                    symbol: coin.symbol.replace('USDT', ''),
                    fullSymbol: coin.symbol,
                    price: parseFloat(coin.lastPrice),
                    volume: volume,
                    priceChange: parseFloat(coin.price24hPcnt) * parseFloat(coin.lastPrice),
                    priceChangePercent: parseFloat(coin.price24hPcnt) * 100,
                    highPrice: parseFloat(coin.highPrice24h),
                    lowPrice: parseFloat(coin.lowPrice24h),
                    volume24h: volume,
                    marketCap: parseFloat(coin.lastPrice) * volume * 0.1 // 추정치
                };
            });
        } catch (error) {
            console.error('바이비트 V5 API 오류, CoinGecko API로 대체:', error);
            return await this.getTopCoinsFromCoinGecko(limit);
        }
    }

    /**
     * CoinGecko API에서 거래량 기준 상위 코인 가져오기
     */
    async getTopCoinsFromCoinGecko(limit = 20) {
        try {
            console.log('CoinGecko API에서 거래량 기준 상위 코인 가져오는 중...');
            const response = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=volume_desc&per_page=${limit}&page=1&sparkline=false&locale=en`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_5 like Mac OS X) AppleWebKit/605.1.15'
                },
                mode: 'cors'
            });
            
            if (!response.ok) {
                throw new Error(`CoinGecko API 요청 실패: ${response.status}`);
            }
            
            const data = await response.json();
            
            return data.map((coin, index) => ({
                rank: index + 1,
                symbol: coin.symbol.toUpperCase(),
                fullSymbol: coin.symbol.toUpperCase() + 'USDT',
                price: coin.current_price,
                volume: coin.total_volume,
                priceChange: coin.price_change_24h,
                priceChangePercent: coin.price_change_percentage_24h,
                highPrice: coin.high_24h,
                lowPrice: coin.low_24h,
                volume24h: coin.total_volume,
                marketCap: coin.market_cap,
                marketCapRank: coin.market_cap_rank,
                totalSupply: coin.total_supply,
                circulatingSupply: coin.circulating_supply
            }));
        } catch (error) {
            console.error('CoinGecko API 오류:', error);
            throw error;
        }
    }

    /**
     * 특정 코인 정보 가져오기
     */
    async getCoinInfo(symbol) {
        try {
            const tickerData = await this.makeRequest('/ticker/24hr', { symbol: symbol });
            return tickerData;
        } catch (error) {
            console.error('코인 정보 가져오기 오류:', error);
            throw error;
        }
    }

    /**
     * 시장 통계 정보 가져오기 (상위 50개 기준)
     */
    async getMarketStats() {
        try {
            console.log('바이비트 V5 API에서 시장 통계 가져오는 중...');
            return await this.getMarketStatsFromBybit();
        } catch (error) {
            console.error('바이비트 V5 API 실패, CoinGecko API로 대체:', error);
            return await this.getMarketStatsFromCoinGecko();
        }
    }

    /**
     * 바이비트 V5 API에서 시장 통계 가져오기
     */
    async getMarketStatsFromBybit() {
        try {
            console.log('바이비트 V5 API에서 시장 통계 가져오는 중...');
            const response = await this.get24hrTicker();
            
            if (!response.result || !response.result.list) {
                throw new Error('바이비트 API 응답 형식 오류');
            }
            
            const usdtPairs = response.result.list.filter(item => item.symbol.endsWith('USDT'));
            const top50Pairs = usdtPairs
                .sort((a, b) => {
                    const aVolume = parseFloat(a.volume24h || a.volume || a.quoteVolume || 0);
                    const bVolume = parseFloat(b.volume24h || b.volume || b.quoteVolume || 0);
                    return bVolume - aVolume;
                })
                .slice(0, 50);
            
            const totalVolume = top50Pairs.reduce((sum, coin) => {
                const volume = parseFloat(coin.volume24h || coin.volume || coin.quoteVolume || 0);
                return sum + volume;
            }, 0);
            const totalMarketCap = top50Pairs.reduce((sum, coin) => {
                const price = parseFloat(coin.lastPrice);
                const volume = parseFloat(coin.volume24h || coin.volume || coin.quoteVolume || 0);
                return sum + (price * volume * 0.1); // 추정치
            }, 0);
            
            const gainers = usdtPairs
                .filter(coin => parseFloat(coin.price24hPcnt) > 0)
                .sort((a, b) => parseFloat(b.price24hPcnt) - parseFloat(a.price24hPcnt))
                .slice(0, 5);
                
            const losers = usdtPairs
                .filter(coin => parseFloat(coin.price24hPcnt) < 0)
                .sort((a, b) => parseFloat(a.price24hPcnt) - parseFloat(b.price24hPcnt))
                .slice(0, 5);

            return {
                totalCoins: top50Pairs.length,
                totalVolume: totalVolume,
                totalMarketCap: totalMarketCap,
                topGainers: gainers,
                topLosers: losers
            };
        } catch (error) {
            console.error('바이비트 V5 시장 통계 오류, CoinGecko API로 대체:', error);
            return await this.getMarketStatsFromCoinGecko();
        }
    }

    /**
     * CoinGecko API에서 시장 통계 가져오기 (대체용)
     */
    async getMarketStatsFromCoinGecko() {
        try {
            console.log('CoinGecko API에서 시장 통계 가져오는 중...');
            const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=volume_desc&per_page=50&page=1&sparkline=false&locale=en', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_5 like Mac OS X) AppleWebKit/605.1.15'
                },
                mode: 'cors'
            });
            
            if (!response.ok) {
                throw new Error(`CoinGecko API 요청 실패: ${response.status}`);
            }
            
            const data = await response.json();
            
            const totalVolume = data.reduce((sum, coin) => sum + coin.total_volume, 0);
            const totalMarketCap = data.reduce((sum, coin) => sum + coin.market_cap, 0);
            
            const gainers = data
                .filter(coin => coin.price_change_percentage_24h > 0)
                .sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h)
                .slice(0, 5);
                
            const losers = data
                .filter(coin => coin.price_change_percentage_24h < 0)
                .sort((a, b) => a.price_change_percentage_24h - b.price_change_percentage_24h)
                .slice(0, 5);

            return {
                totalCoins: data.length,
                totalVolume: totalVolume,
                totalMarketCap: totalMarketCap,
                topGainers: gainers,
                topLosers: losers
            };
        } catch (error) {
            console.error('CoinGecko 시장 통계 오류:', error);
            throw error;
        }
    }

    /**
     * 전체 시장 심리 지표 가져오기
     */
    async getMarketSentiment() {
        try {
            // 주요 코인들의 롱/숏 비율을 가져와서 시장 심리 분석
            const topCoins = ['BTCUSDT', 'ETHUSDT', 'SOLUSDT', 'BNBUSDT', 'ADAUSDT'];
            const sentimentData = [];
            
            for (const symbol of topCoins) {
                try {
                    const ratio = await this.getLongShortRatio(symbol);
                    if (ratio.longShortRatio !== null) {
                        sentimentData.push({
                            symbol: symbol.replace('USDT', ''),
                            longShortRatio: ratio.longShortRatio,
                            longAccount: ratio.longAccount,
                            shortAccount: ratio.shortAccount
                        });
                    }
                } catch (error) {
                    console.warn(`${symbol} 롱/숏 비율 가져오기 실패:`, error.message);
                }
            }
            
            if (sentimentData.length === 0) {
                throw new Error('시장 심리 데이터를 가져올 수 없습니다.');
            }
            
            // 전체 시장 심리 계산
            const totalLongRatio = sentimentData.reduce((sum, coin) => sum + coin.longAccount, 0) / sentimentData.length;
            const totalShortRatio = sentimentData.reduce((sum, coin) => sum + coin.shortAccount, 0) / sentimentData.length;
            const marketSentiment = totalLongRatio / totalShortRatio;
            
            // 심리 상태 판단
            let sentimentStatus = '중립';
            let sentimentEmoji = '😐';
            
            if (marketSentiment > 1.1) {
                sentimentStatus = '매우 낙관적';
                sentimentEmoji = '🚀';
            } else if (marketSentiment > 1.05) {
                sentimentStatus = '낙관적';
                sentimentEmoji = '📈';
            } else if (marketSentiment < 0.9) {
                sentimentStatus = '매우 비관적';
                sentimentEmoji = '📉';
            } else if (marketSentiment < 0.95) {
                sentimentStatus = '비관적';
                sentimentEmoji = '😰';
            }
            
            return {
                marketSentiment: marketSentiment.toFixed(2),
                sentimentStatus,
                sentimentEmoji,
                totalLongRatio: (totalLongRatio * 100).toFixed(1),
                totalShortRatio: (totalShortRatio * 100).toFixed(1),
                coinData: sentimentData,
                timestamp: Date.now()
            };
        } catch (error) {
            console.error('시장 심리 지표 가져오기 실패:', error);
            return {
                marketSentiment: null,
                sentimentStatus: '데이터 없음',
                sentimentEmoji: '❓',
                totalLongRatio: null,
                totalShortRatio: null,
                coinData: [],
                timestamp: null
            };
        }
    }
}

// 전역 API 인스턴스 생성
const bybitAPI = new BybitAPI();

// 모듈 내보내기 (Node.js 환경에서 사용할 경우)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = BybitAPI;
} 