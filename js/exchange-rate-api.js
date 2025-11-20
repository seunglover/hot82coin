/**
 * 실시간 환율 API 관련 기능
 */
class ExchangeRateAPI {
    constructor() {
        this.BASE_URL = 'https://api.exchangerate-api.com/v4/latest/USD';
        this.rateLimit = {
            requests: 0,
            maxRequests: 100, // 1분당 최대 요청 수
            resetTime: Date.now() + 60000 // 1분 후 리셋
        };
        this.cache = {
            rate: null,
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
            throw new Error('환율 API 요청 제한에 도달했습니다. 잠시 후 다시 시도해주세요.');
        }
        
        this.rateLimit.requests++;
    }

    /**
     * API 요청 실행
     */
    async makeRequest(url) {
        try {
            this.checkRateLimit();
            
            const controller = new AbortController();
            // 모바일에서는 더 짧은 타임아웃 사용
            const timeout = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ? 6000 : 8000;
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
                throw new Error(`환율 API 요청 실패: ${response.status} ${response.statusText}`);
            }

            return await response.json();
        } catch (error) {
            console.error('환율 API 요청 오류:', error);
            throw error;
        }
    }

    /**
     * 실시간 USD/KRW 환율 가져오기
     */
    async getUSDToKRWRate() {
        try {
            // 캐시된 환율이 있고 5분 이내라면 캐시 사용
            const now = Date.now();
            if (this.cache.rate && (now - this.cache.timestamp) < this.cache.cacheTime) {
                console.log('캐시된 환율 사용:', this.cache.rate);
                return this.cache.rate;
            }

            console.log('실시간 환율 가져오는 중...');
            const data = await this.makeRequest(this.BASE_URL);
            
            if (data.rates && data.rates.KRW) {
                const rate = data.rates.KRW;
                this.cache.rate = rate;
                this.cache.timestamp = now;
                console.log('실시간 환율:', rate);
                return rate;
            } else {
                throw new Error('KRW 환율 정보를 찾을 수 없습니다.');
            }
        } catch (error) {
            console.error('환율 가져오기 오류:', error);
            // 오류 시 기본 환율 사용 (약 1300원)
            return 1300;
        }
    }

    /**
     * USD 가격을 KRW로 변환
     */
    async convertUSDToKRW(usdPrice) {
        const rate = await this.getUSDToKRWRate();
        return usdPrice * rate;
    }

    /**
     * 여러 USD 가격을 KRW로 변환
     */
    async convertMultipleUSDToKRW(coins) {
        const rate = await this.getUSDToKRWRate();
        return coins.map(coin => ({
            ...coin,
            krwPrice: coin.price * rate
        }));
    }
}

// 전역 API 인스턴스 생성
const exchangeRateAPI = new ExchangeRateAPI();

// 모듈 내보내기 (Node.js 환경에서 사용할 경우)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ExchangeRateAPI;
} 