/**
 * 메인 애플리케이션 클래스
 */
class CoinRankingApp {
    constructor() {
        this.isLoading = false;
        this.lastUpdateTime = null;
        this.autoRefreshInterval = null;
        this.previousRanks = {}; // 이전 순위 저장
        this.currentCoins = []; // 현재 코인 데이터
        this.filteredCoins = []; // 필터링된 코인 데이터
        this.currentSort = 'volume'; // 현재 정렬 기준
        this.searchTerm = ''; // 현재 검색어
        this.init();
    }

    /**
     * 애플리케이션 초기화
     */
    init() {
        this.bindEvents();
        this.loadCoinData();
        this.startAutoRefresh();
        this.updateNextUpdateTime();
    }

    /**
     * 이벤트 바인딩
     */
    bindEvents() {
        const refreshBtn = document.querySelector('.refresh-btn');
        if (refreshBtn) {
            refreshBtn.addEventListener('click', () => this.loadCoinData());
        }

        // 키보드 단축키
        document.addEventListener('keydown', (e) => {
            if (e.key === 'r' || e.key === 'R') {
                e.preventDefault();
                this.loadCoinData();
            }
        });
        
        // 검색 입력 필드 이벤트
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.addEventListener('input', () => this.filterCoins());
        }
        

    }

    /**
     * 코인 데이터 로드
     */
    async loadCoinData() {
        if (this.isLoading) return;

        this.setLoading(true);
        const contentDiv = document.getElementById('content');
        const lastUpdateSpan = document.getElementById('last-update');
        
        // 모바일에서 더 자세한 로딩 메시지 표시
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        if (isMobile) {
            contentDiv.innerHTML = `
                <div class="loading">
                    <div class="spinner"></div>
                    <p>모바일 네트워크에서 데이터를 불러오는 중...</p>
                    <p style="font-size: 0.9rem; color: #64748b; margin-top: 10px;">잠시만 기다려주세요</p>
                </div>
            `;
        }
        
        try {
            
            // 거래량 기준 상위 50개 코인 데이터 가져오기
            const coins = await bybitAPI.getTopCoinsByVolume(50);
            
            // 시장 통계 가져오기
            const marketStats = await bybitAPI.getMarketStats();
            
            // 상위 10개 코인의 롱숏 비율 데이터 가져오기 (실패해도 계속 진행)
            let longShortData = [];
            try {
                longShortData = await bybitAPI.getTopCoinsLongShortRatio(coins);
            } catch (error) {
                console.warn('롱숏 비율 데이터 가져오기 실패, 기본 데이터로 계속 진행:', error);
                // 실패 시 빈 배열로 계속 진행
            }
            
            // 실시간 환율로 USD 가격을 KRW로 변환 (실패해도 계속 진행)
            let coinsWithKRW = coins;
            try {
                coinsWithKRW = await exchangeRateAPI.convertMultipleUSDToKRW(coins);
            } catch (error) {
                console.warn('환율 변환 실패, USD 가격만 표시:', error);
                // 실패 시 원본 데이터 사용
            }
            
            // CoinGecko에서 정확한 시가총액 데이터 가져오기 (실패해도 계속 진행)
            let accurateMarketCapData = [];
            try {
                accurateMarketCapData = await coinGeckoAPI.getAccurateMarketCap(coins);
            } catch (error) {
                console.warn('CoinGecko 시가총액 데이터 가져오기 실패, 기본 데이터 사용:', error);
                // 실패 시 빈 배열로 계속 진행
            }
            
            // 모든 데이터를 코인 데이터와 병합
            const coinsWithAllData = this.mergeAllData(coinsWithKRW, longShortData, accurateMarketCapData);
            
            // 모바일에서 데이터 검증
            if (isMobile && (!coinsWithAllData || coinsWithAllData.length === 0)) {
                throw new Error('모바일에서 데이터를 가져올 수 없습니다. 네트워크 연결을 확인해주세요.');
            }
            
            // 현재 코인 데이터 저장
            this.currentCoins = coinsWithAllData;
            
            // 순위 업데이트
            this.updateRanks(coinsWithAllData);
            
            // 필터링 적용
            this.applyFilters();
            
            // 시장 통계 표시
            this.displayStats(marketStats);
            

            
            // 마지막 업데이트 시간 기록
            this.lastUpdateTime = new Date();
            if (lastUpdateSpan) {
                const updateText = isMobile ? 
                    `마지막 업데이트: ${this.lastUpdateTime.toLocaleString('ko-KR')} (모바일)` :
                    `마지막 업데이트: ${this.lastUpdateTime.toLocaleString('ko-KR')}`;
                lastUpdateSpan.textContent = updateText;
            }
            
            // 다음 업데이트 시간 업데이트
            this.updateNextUpdateTime();
            
        } catch (error) {
            console.error('데이터 로딩 오류:', error);
            
            // 모바일 환경에서 발생할 수 있는 다양한 오류 처리
            if (error.message.includes('CORS') || error.message.includes('fetch') || 
                error.message.includes('NetworkError') || error.message.includes('timeout')) {
                this.showError('모바일 네트워크 연결 문제가 발생했습니다. Wi-Fi 연결을 확인하고 잠시 후 다시 시도해주세요.');
            } else if (error.message.includes('AbortError')) {
                this.showError('요청 시간이 초과되었습니다. 네트워크 상태를 확인하고 다시 시도해주세요.');
            } else {
                this.showError(error.message);
            }
        } finally {
            this.setLoading(false);
        }
    }

    /**
     * 모든 데이터를 코인 데이터와 병합
     */
    mergeAllData(coins, longShortData, accurateMarketCapData) {
        return coins.map(coin => {
            const longShortInfo = longShortData.find(ls => ls.symbol === coin.symbol);
            const marketCapInfo = accurateMarketCapData.find(mc => mc.symbol === coin.symbol);
            
            return {
                ...coin,
                longShortRatio: longShortInfo ? longShortInfo.longShortRatio : null,
                longAccount: longShortInfo ? longShortInfo.longAccount : null,
                shortAccount: longShortInfo ? longShortInfo.shortAccount : null,
                accurateMarketCap: marketCapInfo ? marketCapInfo.accurateMarketCap : coin.marketCap,
                marketCapRank: marketCapInfo ? marketCapInfo.marketCapRank : null,
                totalSupply: marketCapInfo ? marketCapInfo.totalSupply : null,
                circulatingSupply: marketCapInfo ? marketCapInfo.circulatingSupply : null
            };
        });
    }

    /**
     * 로딩 상태 설정
     */
    setLoading(loading) {
        this.isLoading = loading;
        const refreshBtn = document.querySelector('.refresh-btn');
        if (refreshBtn) {
            refreshBtn.disabled = loading;
            const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
            refreshBtn.textContent = loading ? 
                (isMobile ? '🔄 모바일 로딩 중...' : '🔄 로딩 중...') : 
                '🔄 새로고침';
        }
    }

    /**
     * 코인 목록 표시
     */
    displayCoins(coins) {
        const contentDiv = document.getElementById('content');
        
        if (!coins || coins.length === 0) {
            contentDiv.innerHTML = `
                <div class="no-data">
                    <div class="no-data-icon">🔍</div>
                    <h3>검색 결과가 없습니다</h3>
                    <p>다른 검색어를 입력해보세요</p>
                </div>
            `;
            return;
        }
        
        const html = `
            <div class="coin-list">
                <div class="list-header">
                    <div>순위</div>
                    <div>코인</div>
                    <div>롱숏 비율</div>
                    <div>USD 가격</div>
                    <div>KRW 가격</div>
                    <div>거래량</div>
                    <div>변동률</div>
                    <div>시가총액</div>
                </div>
                ${coins.map(coin => this.createCoinItem(coin)).join('')}
            </div>
            <div class="coin-count">
                총 ${coins.length}개 코인 표시 중
                ${this.searchTerm ? `(검색어: "${this.searchTerm}")` : ''}
            </div>
        `;
        
        contentDiv.innerHTML = html;
        
        // 코인 클릭 이벤트 바인딩
        document.querySelectorAll('.coin-item').forEach(item => {
            item.addEventListener('click', (e) => {
                const symbol = item.getAttribute('data-symbol');
                showCoinModal(symbol);
            });
        });
    }

    /**
     * 순위 변동 화살표 생성
     */
    getRankChangeArrow(symbol, currentRank) {
        const previousRank = this.previousRanks[symbol];
        if (!previousRank) {
            return '<span class="rank-new">🆕</span>'; // 새로운 코인
        }
        
        if (currentRank < previousRank) {
            return '<span class="rank-up">⬆️</span>'; // 순위 상승
        } else if (currentRank > previousRank) {
            return '<span class="rank-down">⬇️</span>'; // 순위 하락
        } else {
            return '<span class="rank-same">➖</span>'; // 순위 동일
        }
    }

    /**
     * 개별 코인 아이템 생성
     */
    createCoinItem(coin) {
        // 모바일에서 데이터 검증
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        
        // 필수 데이터 검증
        if (!coin || !coin.symbol || !coin.price) {
            console.warn('잘못된 코인 데이터:', coin);
            return '';
        }
        
        const changeClass = coin.priceChangePercent >= 0 ? 'positive' : 'negative';
        const changeSymbol = coin.priceChangePercent >= 0 ? '+' : '';
        
        // 순위 변동 화살표 (표시 순위 사용)
        const displayRank = coin.displayRank || coin.rank;
        const rankArrow = this.getRankChangeArrow(coin.symbol, displayRank);
        
        // 롱숏 비율 표시 (데이터가 없어도 안전하게 처리)
        let longShortDisplay = '';
        if (coin.longShortRatio && coin.longAccount !== null && coin.shortAccount !== null && 
            coin.longAccount > 0 && coin.shortAccount > 0) {
            const longPercent = (coin.longAccount * 100).toFixed(1);
            const shortPercent = (coin.shortAccount * 100).toFixed(1);
            const ratioText = coin.note ? `(추정)` : '';
            longShortDisplay = `
                <div class="longshort-mini">
                    <div class="mini-ratio-bar">
                        <div class="mini-long-bar" style="width: ${longPercent}%"></div>
                        <div class="mini-short-bar" style="width: ${shortPercent}%"></div>
                    </div>
                    <div class="mini-ratio-text">롱 ${longPercent}% / 숏 ${shortPercent}% ${ratioText}</div>
                </div>
            `;
        } else {
            longShortDisplay = '<div class="no-data">데이터 없음</div>';
        }
        
        return `
            <div class="coin-item" data-symbol="${coin.fullSymbol}">
                <div class="rank">
                    ${displayRank}
                    <div class="rank-arrow">${rankArrow}</div>
                </div>
                <div class="coin-info">
                    <div>
                        <div class="coin-symbol">${coin.symbol}</div>
                        <div class="coin-name">${coin.symbol}</div>
                    </div>
                </div>
                <div class="longshort-column">
                    ${longShortDisplay}
                </div>
                <div class="price">${this.formatUSDPrice(coin.price)}</div>
                <div class="krw-price">₩${coin.krwPrice && coin.krwPrice > 0 ? this.formatKRWPrice(coin.krwPrice) : '-'}</div>
                <div class="volume">$${this.formatNumber(coin.volume)}</div>
                <div class="change ${changeClass}">${changeSymbol}${coin.priceChangePercent.toFixed(2)}%</div>
                <div class="market-cap">$${this.formatNumber(coin.accurateMarketCap || coin.marketCap)}</div>
            </div>
        `;
    }

    /**
     * 통계 정보 표시
     */
    displayStats(stats) {
        const statsContainer = document.querySelector('.stats');
        if (!statsContainer) return;

        const html = `
            <div class="stat-item" onclick="window.location.href='about.html'">
                <div class="stat-icon">🔥</div>
                <div class="stat-label">사이트 소개</div>
            </div>
            <div class="stat-item">
                <div class="stat-icon">💎</div>
                <div class="stat-label">임시 메뉴2</div>
            </div>
            <div class="stat-item">
                <div class="stat-icon">⭐</div>
                <div class="stat-label">임시 메뉴3</div>
            </div>
        `;
        
        statsContainer.innerHTML = html;
    }

    /**
     * 에러 메시지 표시
     */
    showError(message) {
        const contentDiv = document.getElementById('content');
        contentDiv.innerHTML = `
            <div class="error">
                <div class="error-icon">⚠️</div>
                <h3>데이터 로딩 실패</h3>
                <p>${message}</p>
                <button onclick="window.coinApp.loadCoinData()" class="retry-btn">
                    🔄 다시 시도
                </button>
                <p class="error-note">네트워크 연결을 확인하고 잠시 후 다시 시도해주세요.</p>
            </div>
        `;
    }

    /**
     * USD 가격 포맷팅 (바이낸스 실시간 가격)
     */
    formatUSDPrice(price) {
        // 모바일에서 안전한 숫자 처리
        if (!price || isNaN(price) || price <= 0) {
            return '$0.00';
        }
        
        // 바이낸스 실시간 가격 그대로 표시
        if (price >= 10) {
            // 10달러 이상: 소수점 제거
            return `$${Math.floor(price).toLocaleString('en-US')}`;
        } else if (price >= 1) {
            // 1~9달러: 소수점 2자리 표시
            return `$${price.toFixed(2)}`;
        } else if (price >= 0.01) {
            return `$${price.toFixed(4)}`;
        } else {
            return `$${price.toFixed(6)}`;
        }
    }

    /**
     * KRW 가격 포맷팅 (보기 편하게)
     */
    formatKRWPrice(price) {
        // 모바일에서 안전한 숫자 처리
        if (!price || isNaN(price) || price <= 0) {
            return '0';
        }
        
        // 1원 이하일 때만 소수점 사용
        if (price >= 1) {
            return Math.floor(price).toLocaleString('ko-KR');
        } else {
            return price.toFixed(4);
        }
    }

    /**
     * 숫자 포맷팅 (한국식 억/만/천 단위)
     */
    formatNumber(num) {
        // 모바일에서 안전한 숫자 처리
        if (!num || isNaN(num) || num <= 0) {
            return '0';
        }
        
        if (num >= 1e8) {
            // 1억 이상: 억 단위, 소수점 1자리
            return (num / 1e8).toFixed(1) + '억';
        } else if (num >= 1e4) {
            // 1만 이상: 만 단위, 정수
            return Math.floor(num / 1e4) + '만';
        } else if (num >= 1e3) {
            // 1천 이상: 천 단위, 정수
            return Math.floor(num / 1e3) + '천';
        }
        return num.toLocaleString('ko-KR');
    }

    /**
     * 자동 새로고침 시작
     */
    startAutoRefresh() {
        // 5분마다 자동 새로고침
        this.autoRefreshInterval = setInterval(() => {
            this.loadCoinData();
        }, 5 * 60 * 1000);
    }

    /**
     * 순위 업데이트
     */
    updateRanks(coins) {
        const newRanks = {};
        coins.forEach(coin => {
            newRanks[coin.symbol] = coin.rank;
        });
        this.previousRanks = newRanks;
    }

    /**
     * 자동 새로고침 중지
     */
    stopAutoRefresh() {
        if (this.autoRefreshInterval) {
            clearInterval(this.autoRefreshInterval);
            this.autoRefreshInterval = null;
        }
    }



    /**
     * 다음 업데이트 시간 계산
     */
    updateNextUpdateTime() {
        const nextUpdateSpan = document.getElementById('next-update');
        if (nextUpdateSpan) {
            const now = new Date();
            const nextUpdate = new Date(now.getTime() + 5 * 60 * 1000); // 5분 후
            nextUpdateSpan.textContent = `다음 업데이트: ${nextUpdate.toLocaleTimeString('ko-KR')}`;
        }
    }

    /**
     * 코인 검색 필터링
     */
    filterCoins() {
        const searchInput = document.getElementById('searchInput');
        if (!searchInput) return;
        
        this.searchTerm = searchInput.value.toLowerCase().trim();
        this.applyFilters();
    }



    /**
     * 필터링 적용
     */
    applyFilters() {
        // 검색 필터링
        this.filteredCoins = this.currentCoins.filter(coin => {
            if (!this.searchTerm) return true;
            return coin.symbol.toLowerCase().includes(this.searchTerm) ||
                   coin.fullSymbol.toLowerCase().includes(this.searchTerm);
        });

        // 순위 재계산
        this.filteredCoins.forEach((coin, index) => {
            coin.displayRank = index + 1;
        });

        // UI 업데이트
        this.displayCoins(this.filteredCoins);
    }

    /**
     * 애플리케이션 정리
     */
    destroy() {
        this.stopAutoRefresh();
        // 이벤트 리스너 제거 등 정리 작업
    }
}

// 유틸리티 함수들
const Utils = {
    /**
     * 디바운스 함수
     */
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    /**
     * 로컬 스토리지에 데이터 저장
     */
    saveToLocalStorage(key, data) {
        try {
            localStorage.setItem(key, JSON.stringify(data));
        } catch (error) {
            console.error('로컬 스토리지 저장 오류:', error);
        }
    },

    /**
     * 로컬 스토리지에서 데이터 불러오기
     */
    loadFromLocalStorage(key) {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : null;
        } catch (error) {
            console.error('로컬 스토리지 불러오기 오류:', error);
            return null;
        }
    },

    /**
     * 날짜 포맷팅
     */
    formatDate(date) {
        return new Intl.DateTimeFormat('ko-KR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        }).format(date);
    }
};

// 페이지 로드 시 애플리케이션 시작
document.addEventListener('DOMContentLoaded', () => {
    window.coinApp = new CoinRankingApp();
});

// 페이지 언로드 시 정리
window.addEventListener('beforeunload', () => {
    if (window.coinApp) {
        window.coinApp.destroy();
    }
}); 

// 모달 표시 함수 (전역)
function showCoinModal(symbol) {
    const modal = document.getElementById('coinModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalContent = document.getElementById('modalContent');
    
    modalTitle.textContent = symbol + ' 정보';
    modalContent.innerHTML = '<div class="coin-detail"><p>이 코인에 대한 정보가 준비 중입니다.</p></div>';
    modal.style.display = 'block';
}

// 모달 닫기 기능 (전역)
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('coinModal');
    const closeBtn = document.querySelector('.modal .close');
    if (closeBtn) {
        closeBtn.onclick = function() {
            modal.style.display = 'none';
        };
    }
    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    };
}); 