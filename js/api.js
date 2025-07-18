/**
 * 바이비트 API 관련 기능
 */
class BybitAPI {
    constructor() {
        this.BYBIT_URL = 'https://api.bybit.com/v5/market';
        this.rateLimit = {
            requests: 0,
            maxRequests: 1200, // 1분당 최대 요청 수
            resetTime: Date.now() + 60000 // 1분 후 리셋
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
     * 바이비트 API 요청 실행
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
                throw new Error(`바이비트 API 요청 실패: ${response.status} ${response.statusText}`);
            }

            return await response.json();
        } catch (error) {
            console.error(`바이비트 API 요청 오류 (시도 ${retryCount + 1}/${maxRetries + 1}):`, error);
            
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
     * 바이비트 24시간 티커 정보 가져오기
     */
    async get24hrTicker() {
        return await this.makeRequest('/tickers', { category: 'spot' });
    }

    /**
     * 바이비트 선물 롱숏 비율 API에서 데이터 가져오기
     * https://api.bybit.com/v5/market/account-ratio
     */
    async getLongShortRatio(symbol = 'BTCUSDT') {
        try {
            const response = await this.makeRequest('/account-ratio', { 
                category: 'linear',
                symbol: symbol,
                interval: '5m',
                limit: 1
            });
            
            if (!response.result || !response.result.list || response.result.list.length === 0) {
                throw new Error('롱숏 비율 데이터 없음');
            }
            
            const latest = response.result.list[0];
            const longAccount = parseFloat(latest.longAccount);
            const shortAccount = parseFloat(latest.shortAccount);
            const longShortRatio = longAccount / shortAccount;
            
            return {
                symbol,
                longShortRatio,
                longAccount,
                shortAccount,
                timestamp: latest.timestamp
            };
        } catch (error) {
            if (error.message === '롱숏 비율 데이터 없음') {
                console.warn(`${symbol} 롱숏 비율 데이터 없음`);
            } else {
                console.error('롱숏 비율 데이터 가져오기 오류:', error);
            }
            // 실패 시 null 반환
            return {
                symbol,
                longShortRatio: null,
                longAccount: null,
                shortAccount: null,
                timestamp: null
            };
        }
    }

    /**
     * 상위 코인들의 롱숏 비율 데이터 가져오기
     */
    async getTopCoinsLongShortRatio(coins) {
        try {
            const longShortData = [];
            
            for (const coin of coins.slice(0, 10)) { // 상위 10개만
                try {
                    const ratioData = await this.getLongShortRatio(coin.fullSymbol);
                    longShortData.push({
                        symbol: coin.symbol,
                        fullSymbol: coin.fullSymbol,
                        longShortRatio: ratioData.longShortRatio,
                        longAccount: ratioData.longAccount,
                        shortAccount: ratioData.shortAccount,
                        timestamp: ratioData.timestamp
                    });
                } catch (error) {
                    console.warn(`${coin.symbol} 롱숏 비율 데이터 가져오기 실패:`, error);
                }
            }
            
            return longShortData;
        } catch (error) {
            console.error('상위 코인 롱숏 비율 데이터 가져오기 오류:', error);
            throw error;
        }
    }

    /**
     * 거래량 기준 상위 코인 가져오기 (기본값: 50개)
     */
    async getTopCoinsByVolume(limit = 50) {
        try {
            console.log('바이비트 API에서 거래량 기준 상위 코인 가져오는 중...');
            return await this.getTopCoinsFromBybit(limit);
        } catch (error) {
            console.error('바이비트 API 실패, CoinGecko API로 대체:', error);
            return await this.getTopCoinsFromCoinGecko(limit);
        }
    }

    /**
     * 바이비트 API에서 거래량 기준 상위 코인 가져오기
     */
    async getTopCoinsFromBybit(limit = 50) {
        try {
            console.log('바이비트 API에서 거래량 기준 상위 코인 가져오는 중...');
            const response = await this.get24hrTicker();
            
            if (!response.result || !response.result.list) {
                throw new Error('바이비트 API 응답 형식 오류');
            }
            
            // USDT 페어만 필터링하고 거래량 기준으로 정렬
            const usdtPairs = response.result.list
                .filter(item => item.symbol.endsWith('USDT'))
                .sort((a, b) => parseFloat(b.volume24h) - parseFloat(a.volume24h))
                .slice(0, limit);

            return usdtPairs.map((coin, index) => ({
                rank: index + 1,
                symbol: coin.symbol.replace('USDT', ''),
                fullSymbol: coin.symbol,
                price: parseFloat(coin.lastPrice),
                volume: parseFloat(coin.volume24h),
                priceChange: parseFloat(coin.price24hPcnt) * parseFloat(coin.lastPrice),
                priceChangePercent: parseFloat(coin.price24hPcnt) * 100,
                highPrice: parseFloat(coin.highPrice24h),
                lowPrice: parseFloat(coin.lowPrice24h),
                volume24h: parseFloat(coin.volume24h),
                marketCap: parseFloat(coin.lastPrice) * parseFloat(coin.volume24h) * 0.1 // 추정치
            }));
        } catch (error) {
            console.error('바이비트 API 오류, CoinGecko API로 대체:', error);
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
            console.log('바이비트 API에서 시장 통계 가져오는 중...');
            return await this.getMarketStatsFromBybit();
        } catch (error) {
            console.error('바이비트 API 실패, CoinGecko API로 대체:', error);
            return await this.getMarketStatsFromCoinGecko();
        }
    }

    /**
     * 바이비트 API에서 시장 통계 가져오기
     */
    async getMarketStatsFromBybit() {
        try {
            console.log('바이비트 API에서 시장 통계 가져오는 중...');
            const response = await this.get24hrTicker();
            
            if (!response.result || !response.result.list) {
                throw new Error('바이비트 API 응답 형식 오류');
            }
            
            const usdtPairs = response.result.list.filter(item => item.symbol.endsWith('USDT'));
            const top50Pairs = usdtPairs
                .sort((a, b) => parseFloat(b.volume24h) - parseFloat(a.volume24h))
                .slice(0, 50);
            
            const totalVolume = top50Pairs.reduce((sum, coin) => sum + parseFloat(coin.volume24h), 0);
            const totalMarketCap = top50Pairs.reduce((sum, coin) => {
                const price = parseFloat(coin.lastPrice);
                const volume = parseFloat(coin.volume24h);
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
            console.error('바이비트 시장 통계 오류, CoinGecko API로 대체:', error);
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