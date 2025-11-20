/**
 * CoinGecko API 관련 기능
 */
class CoinGeckoAPI {
    constructor() {
        this.BASE_URL = 'https://api.coingecko.com/api/v3';
        this.rateLimit = {
            requests: 0,
            maxRequests: 50, // 1분당 최대 요청 수 (CoinGecko 제한)
            resetTime: Date.now() + 60000 // 1분 후 리셋
        };
        this.cache = {
            marketData: null,
            timestamp: 0,
            cacheTime: 5 * 60 * 1000 // 5분 캐시
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
            throw new Error('CoinGecko API 요청 제한에 도달했습니다. 잠시 후 다시 시도해주세요.');
        }
        
        this.rateLimit.requests++;
    }

    /**
     * API 요청 실행
     */
    async makeRequest(endpoint, params = {}) {
        try {
            this.checkRateLimit();
            
            const url = new URL(`${this.BASE_URL}${endpoint}`);
            Object.keys(params).forEach(key => {
                url.searchParams.append(key, params[key]);
            });

            const controller = new AbortController();
            // 모바일에서는 더 짧은 타임아웃 사용
            const timeout = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ? 8000 : 10000;
            const timeoutId = setTimeout(() => controller.abort(), timeout);
            
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'User-Agent': 'CoinRankingApp/1.0'
                },
                mode: 'cors',
                signal: controller.signal
            });
            
            clearTimeout(timeoutId);

            if (!response.ok) {
                throw new Error(`CoinGecko API 요청 실패: ${response.status} ${response.statusText}`);
            }

            return await response.json();
        } catch (error) {
            console.error('CoinGecko API 요청 오류:', error);
            throw error;
        }
    }

    /**
     * 시가총액 순위 상위 코인 데이터 가져오기
     */
    async getTopMarketCapCoins(limit = 100) {
        try {
            // 캐시된 데이터가 있고 5분 이내라면 캐시 사용
            const now = Date.now();
            if (this.cache.marketData && (now - this.cache.timestamp) < this.cache.cacheTime) {
                console.log('캐시된 CoinGecko 데이터 사용');
                return this.cache.marketData;
            }

            console.log('CoinGecko 시가총액 데이터 가져오는 중...');
            const data = await this.makeRequest('/coins/markets', {
                vs_currency: 'usd',
                order: 'market_cap_desc',
                per_page: limit,
                page: 1,
                sparkline: false,
                locale: 'en'
            });
            
            this.cache.marketData = data;
            this.cache.timestamp = now;
            console.log('CoinGecko 데이터 업데이트 완료');
            return data;
        } catch (error) {
            console.error('CoinGecko 시가총액 데이터 가져오기 오류:', error);
            throw error;
        }
    }

    /**
     * 특정 코인의 상세 정보 가져오기
     */
    async getCoinDetail(coinId) {
        try {
            const data = await this.makeRequest(`/coins/${coinId}`);
            return data;
        } catch (error) {
            console.error(`${coinId} 상세 정보 가져오기 오류:`, error);
            return null;
        }
    }

    /**
     * 1위 코인의 상세 정보 가져오기
     */
    async getTopCoinDetails(symbol) {
        try {
            // 심볼을 CoinGecko ID로 변환
            const coinId = this.getCoinGeckoMapping()[symbol];
            if (!coinId) {
                console.warn(`${symbol}에 대한 CoinGecko ID를 찾을 수 없습니다.`);
                return null;
            }

            const data = await this.getCoinDetail(coinId);
            if (!data) return null;

            // 1위 이유를 분석하는 정보 추출
            const details = {
                symbol: symbol,
                name: data.name,
                market_cap: data.market_data?.market_cap?.usd,
                volume_24h: data.market_data?.total_volume?.usd,
                price_change_24h: data.market_data?.price_change_percentage_24h,
                price_change_7d: data.market_data?.price_change_percentage_7d,
                price_change_30d: data.market_data?.price_change_percentage_30d,
                market_cap_rank: data.market_cap_rank,
                community_score: data.community_score,
                developer_score: data.developer_score,
                liquidity_score: data.liquidity_score,
                public_interest_score: data.public_interest_score,
                description: data.description?.en,
                categories: data.categories,
                last_updated: data.last_updated
            };

            return details;
        } catch (error) {
            console.error('1위 코인 상세 정보 가져오기 오류:', error);
            return null;
        }
    }

    /**
     * 바이낸스 심볼과 CoinGecko ID 매핑
     */
    getCoinGeckoMapping() {
        return {
            'BTC': 'bitcoin',
            'ETH': 'ethereum',
            'BNB': 'binancecoin',
            'XRP': 'ripple',
            'ADA': 'cardano',
            'SOL': 'solana',
            'DOT': 'polkadot',
            'DOGE': 'dogecoin',
            'AVAX': 'avalanche-2',
            'MATIC': 'matic-network',
            'LINK': 'chainlink',
            'UNI': 'uniswap',
            'LTC': 'litecoin',
            'BCH': 'bitcoin-cash',
            'ATOM': 'cosmos',
            'ETC': 'ethereum-classic',
            'XLM': 'stellar',
            'NEAR': 'near',
            'ALGO': 'algorand',
            'VET': 'vechain',
            'ICP': 'internet-computer',
            'FIL': 'filecoin',
            'TRX': 'tron',
            'FTT': 'ftx-token',
            'XMR': 'monero',
            'EOS': 'eos',
            'AAVE': 'aave',
            'MKR': 'maker',
            'COMP': 'compound-governance-token',
            'SNX': 'havven',
            'SUSHI': 'sushi',
            'YFI': 'yearn-finance',
            'CRV': 'curve-dao-token',
            '1INCH': '1inch',
            'ZRX': '0x',
            'BAL': 'balancer',
            'REN': 'republic-protocol',
            'BAND': 'band-protocol',
            'KNC': 'kyber-network-crystal',
            'ZEN': 'zencash',
            'DASH': 'dash',
            'ZEC': 'zcash',
            'XRP': 'ripple',
            'ADA': 'cardano',
            'DOT': 'polkadot',
            'LINK': 'chainlink',
            'LTC': 'litecoin',
            'BCH': 'bitcoin-cash',
            'EOS': 'eos',
            'TRX': 'tron',
            'XLM': 'stellar',
            'VET': 'vechain',
            'ICX': 'icon',
            'QTUM': 'qtum',
            'NEO': 'neo',
            'ONT': 'ontology',
            'ZIL': 'zilliqa',
            'BAT': 'basic-attention-token',
            'ZRX': '0x',
            'REP': 'augur',
            'KNC': 'kyber-network-crystal',
            'MANA': 'decentraland',
            'ENJ': 'enjincoin',
            'SAND': 'the-sandbox',
            'CHZ': 'chiliz',
            'HOT': 'holochain',
            'ANKR': 'ankr',
            'COTI': 'coti',
            'ALPHA': 'alpha-finance-lab',
            'AUDIO': 'audius',
            'RLC': 'iexec-rlc',
            'STORJ': 'storj',
            'SKL': 'skale',
            'GRT': 'the-graph',
            'LPT': 'livepeer',
            'BICO': 'biconomy',
            'ENS': 'ethereum-name-service',
            'IMX': 'immutable-x',
            'OP': 'optimism',
            'ARB': 'arbitrum',
            'SUI': 'sui',
            'APT': 'aptos',
            'SEI': 'sei-network',
            'TIA': 'celestia',
            'INJ': 'injective-protocol',
            'OSMO': 'osmosis',
            'JUP': 'jupiter',
            'PYTH': 'pyth-network',
            'WIF': 'dogwifhat',
            'BONK': 'bonk',
            'PEPE': 'pepe',
            'SHIB': 'shiba-inu',
            'FLOKI': 'floki',
            'BABYDOGE': 'babydoge-coin',
            'DOGE': 'dogecoin',
            'WIF': 'dogwifhat',
            'BONK': 'bonk',
            'PEPE': 'pepe',
            'SHIB': 'shiba-inu',
            'FLOKI': 'floki',
            'BABYDOGE': 'babydoge-coin'
        };
    }

    /**
     * 바이낸스 코인들의 정확한 시가총액 데이터 가져오기
     */
    async getAccurateMarketCap(coins) {
        try {
            const marketData = await this.getTopMarketCapCoins(200);
            const mapping = this.getCoinGeckoMapping();
            const accurateData = [];

            for (const coin of coins) {
                const symbol = coin.symbol;
                const coinGeckoId = mapping[symbol];
                
                if (coinGeckoId) {
                    const coinData = marketData.find(item => item.id === coinGeckoId);
                    if (coinData) {
                        accurateData.push({
                            symbol: symbol,
                            fullSymbol: coin.fullSymbol,
                            accurateMarketCap: coinData.market_cap,
                            totalSupply: coinData.total_supply,
                            circulatingSupply: coinData.circulating_supply,
                            marketCapRank: coinData.market_cap_rank
                        });
                    }
                }
            }

            console.log('정확한 시가총액 데이터:', accurateData.length, '개 코인');
            return accurateData;
        } catch (error) {
            console.error('정확한 시가총액 데이터 가져오기 오류:', error);
            throw error;
        }
    }
}

// 전역 API 인스턴스 생성
const coinGeckoAPI = new CoinGeckoAPI();

// 모듈 내보내기 (Node.js 환경에서 사용할 경우)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CoinGeckoAPI;
} 