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
        // 바이비트 V5 선물 API에서 지원하는 심볼들
        const supportedFuturesSymbols = [
            'BTCUSDT', 'ETHUSDT', 'BNBUSDT', 'SOLUSDT', 'ADAUSDT', 
            'AVAXUSDT', 'DOTUSDT', 'MATICUSDT', 'LINKUSDT', 'UNIUSDT',
            'DOGEUSDT', 'SHIBUSDT', 'XRPUSDT', 'LTCUSDT', 'BCHUSDT',
            'ATOMUSDT', 'NEARUSDT', 'FTMUSDT', 'ALGOUSDT', 'VETUSDT',
            'ICPUSDT', 'FILUSDT', 'TRXUSDT', 'ETCUSDT', 'XLMUSDT',
            'APTUSDT', 'OPUSDT', 'ARBUSDT', 'SUIUSDT', 'SEIUSDT',
            'INJUSDT', 'TIAUSDT', 'JUPUSDT', 'PYTHUSDT', 'WIFUSDT',
            'BONKUSDT', 'PEPEUSDT', 'FLOKIUSDT', 'MEMEUSDT', 'WIFUSDT'
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
            
            // 바이비트에서 선물 거래를 지원하는 메인 코인들만 처리
            const supportedMainCoins = ['BTC', 'ETH', 'BNB', 'SOL', 'ADA', 'AVAX', 'DOT', 'MATIC', 'LINK', 'UNI'];
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
                    }
                } catch (error) {
                    console.warn(`${symbol} 롱숏 비율 데이터 가져오기 실패:`, error);
                }
            }
            
            // 상위 거래량 코인들 중에서 선물 거래가 지원되는 것들만 처리
            const topVolumeCoins = coins
                .filter(coin => !supportedMainCoins.includes(coin.symbol))
                .slice(0, 3); // 추가 3개만 (오류 줄이기)
            
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
                    }
                } catch (error) {
                    console.warn(`${coin.symbol} 롱숏 비율 데이터 가져오기 실패:`, error);
                }
            }
            
            console.log('롱숏 비율 데이터 수집 완료:', longShortData.length, '개');
            return longShortData;
        } catch (error) {
            console.error('상위 코인 롱숏 비율 데이터 가져오기 오류:', error);
            return []; // 오류 시 빈 배열 반환
        }
    }

    /**
     * 거래량 기준 상위 코인 가져오기 (기본값: 50개)
     */
    async getTopCoinsByVolume(limit = 50) {
        try {
            console.log('바이비트 V5 API에서 거래량 기준 상위 코인 가져오는 중...');
            return await this.getTopCoinsFromBybit(limit);
        } catch (error) {
            console.error('바이비트 V5 API 실패, CoinGecko API로 대체:', error);
            return await this.getTopCoinsFromCoinGecko(limit);
        }
    }

    /**
     * 바이비트 V5 API에서 거래량 기준 상위 코인 가져오기
     */
    async getTopCoinsFromBybit(limit = 50) {
        try {
            console.log('바이비트 V5 API에서 거래량 기준 상위 코인 가져오는 중...');
            const response = await this.get24hrTicker();
            
            // 디버깅: API 응답 확인
            console.log('바이비트 API 응답 샘플:', response.result.list.slice(0, 3));
            console.log('바이비트 API 응답 필드 확인:', Object.keys(response.result.list[0] || {}));
            
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
            
            // 메인코인 우선 필터링
            const mainCoins = ['BTC', 'ETH', 'BNB', 'SOL', 'ADA', 'AVAX', 'DOT', 'MATIC', 'LINK', 'UNI', 'XRP', 'DOGE', 'SHIB', 'LTC', 'BCH'];
            
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
            
            // 메인코인을 먼저, 그 다음 밈코인 순서로 결합
            const combinedCoins = [...sortedMainCoins, ...sortedMemeCoins].slice(0, limit);
            
            console.log('최종 결과 상위 10개:', combinedCoins.slice(0, 10).map(item => ({
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
    async getTopCoinsFromCoinGecko(limit = 50) {
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
}

// 전역 API 인스턴스 생성
const bybitAPI = new BybitAPI();

// 모듈 내보내기 (Node.js 환경에서 사용할 경우)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = BybitAPI;
} 