/**
 * 메인 애플리케이션 클래스
 */
class CoinRankingApp {
    constructor() {
        this.isLoading = false;
        this.lastUpdateTime = null;
        this.autoRefreshInterval = null;
        this.previousRanks = {}; // 이전 순위 저장
        this.previousVolumes = {}; // 이전 거래량 데이터 저장
        this.currentCoins = []; // 현재 코인 데이터
        this.sortKey = 'rank'; // 현재 정렬 키
        this.sortOrder = 'asc'; // 현재 정렬 순서
        this.currentTheme = 'light'; // 현재 테마
        this.currentMenu = 'all'; // 현재 선택된 메뉴
        this.allCoins = []; // 모든 코인 데이터 저장
        this.init();
    }

    /**
     * 애플리케이션 초기화
     */
    init() {
        this.loadTheme();
        this.bindEvents();
        this.loadCoinData();
        this.startAutoRefresh();
        this.updateNextUpdateTime();
        
        // 언어 설정 초기화
        this.initLanguage();
    }

    /**
     * 이벤트 바인딩
     */
    bindEvents() {
        // 메뉴 버튼 이벤트 바인딩
        this.bindMenuEvents();

        // 마우스 드래그 스크롤 기능 추가
        this.initDragScroll();
        
        // 언어 전환 버튼 이벤트 바인딩
        this.bindLanguageEvents();
    }

    /**
     * 메뉴 이벤트 바인딩
     */
    bindMenuEvents() {
        const menuButtons = document.querySelectorAll('.menu-btn');
        menuButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const menuType = btn.getAttribute('data-menu');
                this.handleMenuClick(menuType);
            });
        });
    }

    /**
     * 메뉴 클릭 처리
     */
    handleMenuClick(menuType) {
        // 메뉴 버튼 활성화 상태 변경
        document.querySelectorAll('.menu-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-menu="${menuType}"]`).classList.add('active');

        switch (menuType) {
            case 'all':
                this.currentMenu = 'all';
                this.displayFilteredCoins();
                break;
            case 'rising':
                this.currentMenu = 'rising';
                this.displayFilteredCoins();
                break;
            case 'volume':
                this.currentMenu = 'volume';
                this.displayFilteredCoins();
                break;
            case 'longshort':
                this.currentMenu = 'longshort';
                this.displayFilteredCoins();
                break;
            case 'ai':
                this.currentMenu = 'ai';
                this.displayFilteredCoins();
                break;
            case 'theme':
                this.toggleTheme();
                break;

        }
    }

    /**
     * 마우스 드래그 스크롤 초기화
     */
    initDragScroll() {
        const coinList = document.querySelector('.coin-list');
        if (!coinList) return;

        let isDragging = false;
        let startX = 0;
        let scrollLeft = 0;

        coinList.addEventListener('mousedown', (e) => {
            isDragging = true;
            startX = e.pageX - coinList.offsetLeft;
            scrollLeft = coinList.scrollLeft;
            coinList.style.cursor = 'grabbing';
        });

        coinList.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            e.preventDefault();
            const x = e.pageX - coinList.offsetLeft;
            const walk = (x - startX) * 2; // 스크롤 속도 조절
            coinList.scrollLeft = scrollLeft - walk;
        });

        coinList.addEventListener('mouseup', () => {
            isDragging = false;
            coinList.style.cursor = 'grab';
        });

        coinList.addEventListener('mouseleave', () => {
            isDragging = false;
            coinList.style.cursor = 'grab';
        });
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
                    <p>코인 데이터를 불러오는 중...</p>
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
                console.warn('해외거래소 롱숏 비율 데이터 가져오기 실패, 기본 데이터로 계속 진행:', error);
                // 실패 시 빈 배열로 계속 진행
            }
            
            // 바이비트 원본 데이터 그대로 사용 (환율 변환 제거)
            let coinsWithKRW = coins;
            
            // CoinGecko에서 정확한 시가총액 데이터 가져오기 (실패해도 계속 진행)
            let accurateMarketCapData = [];
            try {
                accurateMarketCapData = await coinGeckoAPI.getAccurateMarketCap(coins);
            } catch (error) {
                console.warn('CoinGecko 시가총액 데이터 가져오기 실패, 해외거래소 기본 데이터 사용:', error);
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
            
            // 거래량 데이터 업데이트
            this.updateVolumes(coinsWithAllData);
            
                    // 데이터 표시
        this.allCoins = coinsWithAllData; // 모든 코인 데이터 저장
        this.displayFilteredCoins(); // 필터링된 코인 표시
        
        // 다국어 텍스트 업데이트
        if (window.languageManager) {
            this.updateTextsForLanguage();
        }
            
            // 1위 코인 정보 표시
            if (coinsWithAllData.length > 0) {
                const topCoin = coinsWithAllData[0];
                this.displayTopCoinInfo(topCoin.symbol, topCoin);
            }
            
            // 시장 심리 지표 가져오기 및 표시
            this.loadMarketSentiment();
            
            // 마지막 업데이트 시간 기록
            this.lastUpdateTime = new Date();
            this.updateLastUpdateTime();
            
        } catch (error) {
            console.error('코인 데이터 로드 실패:', error);
            this.showError(`데이터 로드 실패: ${error.message}`);
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
    }

    /**
     * 코인 목록 표시
     */
    displayCoins(coins) {
        const contentDiv = document.getElementById('content');
        
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        
        // 다국어 지원을 위한 헤더 텍스트
        const rankText = window.languageManager ? window.languageManager.t('rank') : '순위';
        const coinText = window.languageManager ? window.languageManager.t('coin') : '코인명';
        const longshortText = window.languageManager ? window.languageManager.t('longshort') : '롱/숏';
        const volumeText = window.languageManager ? window.languageManager.t('volume') : '거래량';
        const changeText = window.languageManager ? window.languageManager.t('change') : '변동률';
        const chartText = window.languageManager ? window.languageManager.t('chart') : '차트';
        const interestText = window.languageManager ? window.languageManager.t('interest') : '관심도';
        
        contentDiv.innerHTML = `
            <div class="coin-list">
                <div class="list-header">
                    <div class="col-rank sortable" data-sort-key="rank">${rankText} ${this.getSortArrow('rank')}</div>
                    <div class="col-coin sortable" data-sort-key="symbol">${coinText} ${this.getSortArrow('symbol')}</div>
                    <div class="col-longshort sortable" data-sort-key="longAccount">${longshortText} ${this.getSortArrow('longAccount')}</div>
                    <div class="col-volume sortable" data-sort-key="volume">${volumeText} ${this.getSortArrow('volume')}</div>
                    <div class="col-change sortable" data-sort-key="priceChangePercent">${changeText} ${this.getSortArrow('priceChangePercent')}</div>
                    <div class="col-sparkline">${chartText}</div>
                    <div class="col-interest">${interestText}</div>
                </div>
                ${coins.map(coin => this.createCoinItem(coin)).join('')}
            </div>
        `;
        
        // 코인 클릭 이벤트 바인딩
        document.querySelectorAll('.coin-item').forEach(item => {
            item.addEventListener('click', (e) => {
                const symbol = item.getAttribute('data-symbol');
                showCoinModal(symbol);
            });
        });

        // 정렬 헤더 클릭 이벤트 바인딩
        document.querySelectorAll('.list-header .sortable').forEach(header => {
            header.addEventListener('click', (e) => {
                const sortKey = header.getAttribute('data-sort-key');
                this.sortCoins(sortKey);
            });
        });

        // 스파크라인 차트 그리기
        coins.forEach(coin => {
            setTimeout(() => {
                drawSparkline(coin.symbol, `sparkline-${coin.symbol}`);
            }, 100);
        });

        // 드래그 스크롤 다시 초기화
        this.initDragScroll();
    }

    /**
     * 정렬 화살표 가져오기
     */
    getSortArrow(key) {
        if (this.sortKey === key) {
            return this.sortOrder === 'asc' ? '▲' : '▼';
        }
        return '';
    }

    /**
     * 코인 정렬
     */
    sortCoins(key) {
        if (this.sortKey === key) {
            this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
        } else {
            this.sortKey = key;
            this.sortOrder = 'asc';
        }

        // 현재 필터링된 코인 목록을 가져와서 정렬
        let sortedCoins = [...this.allCoins];

        // 현재 메뉴에 따라 필터링된 코인에만 정렬 적용
        switch (this.currentMenu) {
            case 'rising':
                sortedCoins = sortedCoins.filter(coin => coin.priceChangePercent > 0);
                break;
            case 'volume':
                sortedCoins = sortedCoins;
                break;
            case 'longshort':
                sortedCoins = sortedCoins.filter(coin => coin.longAccount && coin.longAccount > 0.65);
                break;
            case 'ai':
                sortedCoins = sortedCoins.filter(coin => coin.aiScore >= 4);
                break;
            default: // 'all'
                // 메인코인 우선 표시 (displayFilteredCoins와 동일한 로직)
                const mainCoins = ['BTC', 'ETH', 'BNB', 'SOL', 'ADA', 'AVAX', 'DOT', 'MATIC', 'LINK', 'UNI', 'XRP', 'DOGE', 'SHIB', 'LTC', 'BCH', 'ATOM', 'NEAR', 'FTM', 'ALGO', 'VET'];
                const mainCoinList = sortedCoins.filter(coin => mainCoins.includes(coin.symbol));
                const otherCoins = sortedCoins.filter(coin => !mainCoins.includes(coin.symbol));
                sortedCoins = [...mainCoinList, ...otherCoins].slice(0, 30);
                break;
        }

        sortedCoins.sort((a, b) => {
            let valA = a[key];
            let valB = b[key];

            // 문자열인 경우 소문자로 변환하여 비교
            if (typeof valA === 'string') valA = valA.toLowerCase();
            if (typeof valB === 'string') valB = valB.toLowerCase();

            if (valA < valB) return this.sortOrder === 'asc' ? -1 : 1;
            if (valA > valB) return this.sortOrder === 'asc' ? 1 : -1;
            return 0;
        });

        // 정렬 후 순위 재설정
        sortedCoins.forEach((coin, index) => {
            coin.displayRank = index + 1;
        });

        this.displayCoins(sortedCoins);
    }

    /**
     * 1위 코인 정보 표시
     */
    async displayTopCoinInfo(symbol, topCoinData) {
        try {
            const topCoinInfo = document.getElementById('top-coin-info');
            const topCoinDetailsSpan = document.getElementById('top-coin-details');
            
            if (!topCoinInfo || !topCoinDetailsSpan) return;

            // 현재 1위 코인 데이터로 1위 이유 분석
            const reasons = this.analyzeCurrentTopCoinReasons(topCoinData);
            
            // 1위 코인 상세 정보 추가
            let additionalInfo = '';
            try {
                additionalInfo = this.getTopCoinAdditionalInfo(topCoinData);
            } catch (error) {
                console.warn('추가 정보 가져오기 실패:', error);
            }
            
            // 정보 표시
            if (additionalInfo) {
                topCoinDetailsSpan.innerHTML = reasons + '<br><span class="additional-info">' + additionalInfo + '</span>';
            } else {
                topCoinDetailsSpan.innerHTML = reasons;
            }
            topCoinInfo.style.display = 'block';
            
        } catch (error) {
            console.error('1위 코인 정보 표시 오류:', error);
        }
    }

    /**
     * 현재 1위 코인 이유 분석 (거래량 기준)
     */
    analyzeCurrentTopCoinReasons(coin) {
        const reasons = [];
        
        // 코인 심볼에 색상 적용
        const symbolColor = this.getCoinSymbolColor(coin.symbol);
        reasons.push(`<span class="coin-symbol-colored" style="color: ${symbolColor};">${coin.symbol}</span>`);
        
        // 거래량 정보
        if (coin.volume) {
            const volumeFormatted = this.formatNumber(coin.volume);
            reasons.push(`거래량 ${volumeFormatted} USD`);
        }
        
        // 가격 변동률
        if (coin.priceChangePercent !== undefined) {
            const change = coin.priceChangePercent;
            const changeText = change >= 0 ? `+${change.toFixed(2)}%` : `${change.toFixed(2)}%`;
            const changeClass = change >= 0 ? 'positive' : 'negative';
            reasons.push(`변동률 <span class="${changeClass}">${changeText}</span>`);
        }
        
        // 현재 가격
        if (coin.price) {
            const priceFormatted = this.formatUSDPrice(coin.price);
            reasons.push(`현재가 ${priceFormatted}`);
        }
        
        return reasons.join(' • ');
    }

    /**
     * 코인 심볼별 색상 반환
     */
    getCoinSymbolColor(symbol) {
        const colors = {
            'BTC': '#f7931a', // 비트코인 오렌지
            'ETH': '#627eea', // 이더리움 파랑
            'BNB': '#f3ba2f', // 바이낸스 노랑
            'SOL': '#9945ff', // 솔라나 보라
            'ADA': '#0033ad', // 카르다노 파랑
            'AVAX': '#e84142', // 아발란체 빨강
            'DOT': '#e6007a', // 폴카닷 핑크
            'MATIC': '#8247e5', // 폴리곤 보라
            'LINK': '#2a5ada', // 체인링크 파랑
            'UNI': '#ff007a', // 유니스왑 핑크
            'XRP': '#23292f', // 리플 검정
            'DOGE': '#c2a633', // 도지코인 노랑
            'SHIB': '#ff6b35', // 시바이누 오렌지
            'LTC': '#a6a9aa', // 라이트코인 회색
            'BCH': '#4cc947', // 비트코인캐시 초록
            'ATOM': '#2e3148', // 코스모스 다크
            'NEAR': '#000000', // 니어 검정
            'FTM': '#1db954', // 팬텀 초록
            'ALGO': '#000000', // 알고랜드 검정
            'VET': '#15bdff'  // 비체인 하늘색
        };
        
        return colors[symbol] || '#3b82f6'; // 기본 파랑색
    }

    /**
     * 시간 경과 표시
     */
    getTimeAgo(timestamp) {
        const now = Math.floor(Date.now() / 1000);
        const diff = now - timestamp;
        
        if (diff < 60) return '방금 전';
        if (diff < 3600) return `${Math.floor(diff / 60)}분 전`;
        if (diff < 86400) return `${Math.floor(diff / 3600)}시간 전`;
        if (diff < 2592000) return `${Math.floor(diff / 86400)}일 전`;
        return `${Math.floor(diff / 2592000)}개월 전`;
    }

    /**
     * 1위 코인 추가 정보 생성
     */
    getTopCoinAdditionalInfo(coin) {
        const info = [];
        
        // 거래량 급증 여부
        if (coin.volume > 1e9) { // 10억 달러 이상
            info.push('🔥 거래량 폭등');
        } else if (coin.volume > 1e8) { // 1억 달러 이상
            info.push('📈 거래량 급증');
        }
        
        // 가격 변동률에 따른 상태
        if (coin.priceChangePercent > 20) {
            info.push('🚀 급등 중');
        } else if (coin.priceChangePercent > 10) {
            info.push('📈 상승 중');
        } else if (coin.priceChangePercent < -10) {
            info.push('📉 하락 중');
        }
        
        // 롱숏 비율 분석
        if (coin.longShortRatio) {
            if (coin.longShortRatio > 1.5) {
                info.push('🐂 강세 (롱 우세)');
            } else if (coin.longShortRatio < 0.7) {
                info.push('🐻 약세 (숏 우세)');
            } else {
                info.push('⚖️ 균형');
            }
        }
        
        // 현재 시간 기준 상태
        const now = new Date();
        const hour = now.getHours();
        if (hour >= 9 && hour <= 17) {
            info.push('🌞 거래 활발');
        } else {
            info.push('🌙 야간 거래');
        }
        
        return info.join(' • ');
    }



    /**
     * 1위 코인 이유 분석 (CoinGecko API 사용)
     */
    analyzeTopCoinReasons(details) {
        const reasons = [];
        
        // 시가총액 정보
        if (details.market_cap) {
            const marketCapFormatted = this.formatNumber(details.market_cap);
            reasons.push(`시가총액 ${marketCapFormatted} USD`);
        }
        
        // 24시간 거래량
        if (details.volume_24h) {
            const volumeFormatted = this.formatNumber(details.volume_24h);
            reasons.push(`24시간 거래량 ${volumeFormatted} USD`);
        }
        
        // 가격 변동률
        if (details.price_change_24h !== undefined) {
            const change = details.price_change_24h;
            const changeText = change >= 0 ? `+${change.toFixed(2)}%` : `${change.toFixed(2)}%`;
            const changeClass = change >= 0 ? 'positive' : 'negative';
            reasons.push(`24시간 변동률 <span class="${changeClass}">${changeText}</span>`);
        }
        
        // 커뮤니티 점수
        if (details.community_score) {
            reasons.push(`커뮤니티 점수 ${details.community_score}/100`);
        }
        
        // 개발자 점수
        if (details.developer_score) {
            reasons.push(`개발자 점수 ${details.developer_score}/100`);
        }
        
        // 유동성 점수
        if (details.liquidity_score) {
            reasons.push(`유동성 점수 ${details.liquidity_score}/100`);
        }
        
        // 카테고리 정보
        if (details.categories && details.categories.length > 0) {
            const mainCategory = details.categories[0];
            reasons.push(`카테고리: ${mainCategory}`);
        }
        
        return reasons.join(' • ');
    }

    /**
     * 순위 변동 화살표 생성
     */
    getRankChangeArrow(symbol, currentRank) {
        const previousRank = this.previousRanks[symbol];
        if (!previousRank) {
            return '<span class="rank-new">NEW</span>'; // 새로운 코인
        }
        
        if (currentRank < previousRank) {
            return '<span class="rank-up">▲</span>'; // 순위 상승
        } else if (currentRank > previousRank) {
            return '<span class="rank-down">▼</span>'; // 순위 하락
        } else {
            return '<span class="rank-same">-</span>'; // 순위 동일
        }
    }

    /**
     * 거래량 급등 뱃지 생성
     */
    getVolumeSurgeBadge(coin) {
        // 급등 코인 메뉴에서는 상승률 배지 표시
        if (this.currentMenu === 'rising') {
            if (coin.priceChangePercent >= 20) {
                return '<span class="volume-surge-badge">🚀 급등</span>';
            } else if (coin.priceChangePercent >= 10) {
                return '<span class="volume-surge-badge">📈 상승</span>';
            } else if (coin.priceChangePercent >= 5) {
                return '<span class="volume-surge-badge">💹 양호</span>';
            }
            return '';
        }
        
        // 거래량 급증 메뉴에서는 거래량 배지 표시
        if (this.currentMenu === 'volume') {
            if (coin.volume >= 1e8) {
                return '<span class="volume-surge-badge volume-high">🔥 폭등중</span>';
            } else if (coin.volume >= 1e7) {
                return '<span class="volume-surge-badge volume-medium">📈 급증</span>';
            } else if (coin.volume >= 1e6) {
                return '<span class="volume-surge-badge volume-low">💹 증가</span>';
            }
            return '';
        }
        
        // 롱/숏 비율 메뉴에서는 롱 비중 배지 표시
        if (this.currentMenu === 'longshort') {
            if (coin.longAccount && coin.longAccount >= 0.8) {
                return '<span class="volume-surge-badge">🔥 강세</span>';
            } else if (coin.longAccount && coin.longAccount >= 0.7) {
                return '<span class="volume-surge-badge">📈 롱세</span>';
            }
            return '';
        }
        
        // AI 추천 메뉴에서는 AI 점수 배지 표시
        if (this.currentMenu === 'ai') {
            if (coin.aiScore >= 6) {
                return '<span class="volume-surge-badge">🤖 최고</span>';
            } else if (coin.aiScore >= 4) {
                return '<span class="volume-surge-badge">🔮 추천</span>';
            }
            return '';
        }
        
        // 기본: 거래량 + 변동성 급등 로직
        const volumeScore = coin.volume >= 1e8 ? 3 : coin.volume >= 1e7 ? 2 : coin.volume >= 1e6 ? 1 : 0;
        const volatilityScore = Math.abs(coin.priceChangePercent) >= 20 ? 3 : Math.abs(coin.priceChangePercent) >= 10 ? 2 : Math.abs(coin.priceChangePercent) >= 5 ? 1 : 0;
        const totalScore = volumeScore + volatilityScore;
        
        if (totalScore >= 5) {
            return '<span class="volume-surge-badge">🔥 폭등중</span>';
        } else if (totalScore >= 3) {
            return '<span class="volume-surge-badge">📈 급등</span>';
        } else if (totalScore >= 2) {
            return '<span class="volume-surge-badge">💹 상승</span>';
        }
        
        // 이전 거래량 데이터가 있으면 변화율도 고려
        if (this.previousVolumes && this.previousVolumes[coin.symbol]) {
            const previousVolume = this.previousVolumes[coin.symbol];
            const currentVolume = coin.volume;
            
            if (previousVolume > 0) {
                const volumeChangePercent = ((currentVolume - previousVolume) / previousVolume) * 100;
                
                // 거래량이 50% 이상 증가하면 급등 뱃지 표시
                if (volumeChangePercent >= 50) {
                    return '<span class="volume-surge-badge">📈 거래량 급등</span>';
                }
            }
        }
        
        return '';
    }

    /**
     * 개별 코인 아이템 생성
     */
    createCoinItem(coin) {
        // 데이터 검증
        if (!coin || !coin.symbol || !coin.price) {
            console.warn('잘못된 코인 데이터:', coin);
            return '';
        }
        
        const changeClass = coin.priceChangePercent >= 0 ? 'positive' : 'negative';
        const changeSymbol = coin.priceChangePercent >= 0 ? '+' : '';
        const changeArrow = coin.priceChangePercent >= 0 ? '↗' : '↘';
        
        // 순위 변동 화살표 (표시 순위 사용)
        const displayRank = coin.displayRank || coin.rank;
        const rankArrow = this.getRankChangeArrow(coin.symbol, displayRank);
        
        // 롱숏 비율 표시 (데이터가 없어도 안전하게 처리)
        let longShortDisplay = '';
        if (coin.longShortRatio && coin.longAccount !== null && coin.shortAccount !== null && 
            coin.longAccount > 0 && coin.shortAccount > 0) {
            // 바이비트 API는 0~1 사이 값, CoinGecko는 이미 백분율
            const longPercent = coin.longAccount <= 1 ? (coin.longAccount * 100).toFixed(1) : coin.longAccount.toFixed(1);
            const shortPercent = coin.shortAccount <= 1 ? (coin.shortAccount * 100).toFixed(1) : coin.shortAccount.toFixed(1);
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
        
        // AI 추천 코인 스타일 적용
        const isAIRecommendation = this.currentMenu === 'ai' && coin.aiScore >= 4;
        const aiClass = isAIRecommendation ? 'ai-recommendation' : '';
        const aiBadge = isAIRecommendation ? '<div class="ai-badge">AI PICK</div>' : '';
        const aiScore = isAIRecommendation ? `<div class="ai-score">${coin.aiScore}점</div>` : '';
        
        return `
            <div class="coin-item ${aiClass}" data-symbol="${coin.fullSymbol}" onclick="showCoinModal('${coin.symbol}')" style="cursor: pointer;">
                ${aiBadge}
                ${aiScore}
                <div class="col-rank rank">
                    ${displayRank}
                    <div class="rank-arrow">${rankArrow}</div>
                </div>
                <div class="col-coin coin-info">
                    <div>
                        <div class="coin-symbol">${coin.symbol}</div>
                        <div class="coin-name">${coin.symbol}</div>
                    </div>
                </div>
                <div class="col-longshort longshort-column">
                    ${longShortDisplay}
                </div>
                <div class="col-volume volume">$${this.formatNumber(coin.volume)}</div>
                <div class="col-change change ${changeClass}">${changeArrow} ${changeSymbol}${coin.priceChangePercent.toFixed(2)}%</div>
                <div class="col-sparkline sparkline">
                    <div id="sparkline-${coin.symbol}" class="sparkline-chart"></div>
                </div>
                <div class="col-interest volume-surge">
                    ${this.getVolumeSurgeBadge(coin)}
                </div>
            </div>
        `;
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
        
        // 바이비트에서 받은 그대로 표시, 천단위만 쉼표 구분
        return `$${price.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 8})}`;
    }

    /**
     * KRW 가격 포맷팅 (보기 편하게)
     */
    formatKRWPrice(price) {
        // 모바일에서 안전한 숫자 처리
        if (!price || isNaN(price) || price <= 0) {
            return '0';
        }
        // 10원 이상일 때는 소수점 없이, 10원 미만일 때만 소수점 표시
        if (price >= 10) {
            return Math.floor(price).toLocaleString('ko-KR');
        } else {
            return price.toLocaleString('ko-KR', {minimumFractionDigits: 2, maximumFractionDigits: 8});
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
            newRanks[coin.symbol] = coin.displayRank || coin.rank;
        });
        this.previousRanks = newRanks;
    }

    /**
     * 거래량 데이터 업데이트
     */
    updateVolumes(coins) {
        const newVolumes = {};
        coins.forEach(coin => {
            newVolumes[coin.symbol] = coin.volume;
        });
        this.previousVolumes = newVolumes;
    }

    /**
     * AI 스코어 계산
     */
    calculateAIScore(coin) {
        let score = 0;
        let reasons = [];
        
        // 가격 상승률 점수
        if (coin.priceChangePercent >= 10) {
            score += 2;
            reasons.push(`상승률 +${coin.priceChangePercent.toFixed(1)}%`);
        } else if (coin.priceChangePercent >= 5) {
            score += 1;
            reasons.push(`상승률 +${coin.priceChangePercent.toFixed(1)}%`);
        }
        
        // 거래량 증가율 점수 (이전 거래량과 비교)
        if (this.previousVolumes[coin.symbol]) {
            const previousVolume = this.previousVolumes[coin.symbol];
            const volumeChangePercent = ((coin.volume - previousVolume) / previousVolume) * 100;
            
            if (volumeChangePercent >= 60) {
                score += 2;
                reasons.push(`거래량 +${volumeChangePercent.toFixed(1)}%`);
            } else if (volumeChangePercent >= 30) {
                score += 1;
                reasons.push(`거래량 +${volumeChangePercent.toFixed(1)}%`);
            }
        }
        
        // 롱/숏 비율 점수
        if (coin.longAccount && coin.longAccount >= 0.8) {
            score += 2;
            reasons.push(`롱비중 ${(coin.longAccount * 100).toFixed(1)}%`);
        } else if (coin.longAccount && coin.longAccount >= 0.7) {
            score += 1;
            reasons.push(`롱비중 ${(coin.longAccount * 100).toFixed(1)}%`);
        }
        
        return { score, reasons };
    }

    /**
     * AI 추천 사유 생성
     */
    generateAIRecommendationReason(coin, reasons) {
        const score = coin.aiScore;
        const topReasons = reasons.slice(0, 2).join(' | ');
        
        if (score >= 5) return `🚀 ${topReasons}`;
        if (score >= 4) return `📈 ${topReasons}`;
        return `💡 ${topReasons}`;
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
     * 마지막 업데이트 시간 표시
     */
    updateLastUpdateTime() {
        const lastUpdateSpan = document.getElementById('last-update');
        if (lastUpdateSpan && this.lastUpdateTime) {
            const now = new Date();
            const timeDiff = Math.floor((now - this.lastUpdateTime) / 1000);
            
            if (timeDiff < 60) {
                const realtimeText = window.languageManager ? window.languageManager.t('realtime_updating') : '실시간 반영중';
                lastUpdateSpan.textContent = realtimeText;
            } else if (timeDiff < 3600) {
                const minutes = Math.floor(timeDiff / 60);
                const minutesText = window.languageManager && window.languageManager.currentLang === 'en' ? 'min ago' : '분 전 업데이트';
                lastUpdateSpan.textContent = `${minutes}${minutesText}`;
            } else {
                const hours = Math.floor(timeDiff / 3600);
                const hoursText = window.languageManager && window.languageManager.currentLang === 'en' ? 'hours ago' : '시간 전 업데이트';
                lastUpdateSpan.textContent = `${hours}${hoursText}`;
            }
        }
    }


    /**
     * 테마 로드
     */
    loadTheme() {
        const savedTheme = localStorage.getItem('theme') || 'dark';
        this.setTheme(savedTheme);
    }

    /**
     * 테마 설정
     */
    setTheme(theme) {
        this.currentTheme = theme;
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        
        const themeIcon = document.getElementById('theme-icon');
        
        // null 체크 추가
        if (themeIcon) {
            if (theme === 'dark') {
                themeIcon.textContent = '☀️';
            } else {
                themeIcon.textContent = '🌙';
            }
        }
    }

    /**
     * 테마 토글
     */
    toggleTheme() {
        const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.setTheme(newTheme);
    }

    /**
     * 애플리케이션 정리
     */
    destroy() {
        this.stopAutoRefresh();
        // 이벤트 리스너 제거 등 정리 작업
    }

    /**
     * 필터링된 코인 표시
     */
    displayFilteredCoins() {
        if (!this.allCoins.length) return;

        let filteredCoins = [...this.allCoins];

        // AI 스코어 계산 (모든 코인에 대해)
        filteredCoins.forEach(coin => {
            const aiResult = this.calculateAIScore(coin);
            coin.aiScore = aiResult.score;
            coin.aiReasons = aiResult.reasons;
        });

        // 메뉴별 필터링 및 순위 재정렬
        switch (this.currentMenu) {
            case 'rising':
                filteredCoins = filteredCoins
                    .filter(coin => coin.priceChangePercent > 0)
                    .slice(0, 10); // 상위 10개만 표시
                break;
            case 'volume':
                filteredCoins = filteredCoins
                    .slice(0, 10);
                break;
            case 'longshort':
                filteredCoins = filteredCoins
                    .filter(coin => coin.longAccount && coin.longAccount > 0.65)
                    .slice(0, 10); // 상위 10개만 표시
                break;
            case 'ai':
                filteredCoins = filteredCoins
                    .filter(coin => coin.aiScore >= 4)
                    .slice(0, 10); // 상위 10개만 표시
                break;
            default: // 'all'
                // 메인코인 우선 표시 (상위 20개 메인코인 + 10개 밈코인)
                const mainCoins = ['BTC', 'ETH', 'BNB', 'SOL', 'ADA', 'AVAX', 'DOT', 'MATIC', 'LINK', 'UNI', 'XRP', 'DOGE', 'SHIB', 'LTC', 'BCH', 'ATOM', 'NEAR', 'FTM', 'ALGO', 'VET'];
                
                const mainCoinList = filteredCoins.filter(coin => mainCoins.includes(coin.symbol));
                const otherCoins = filteredCoins.filter(coin => !mainCoins.includes(coin.symbol));
                
                console.log('전체 코인 개수:', filteredCoins.length);
                console.log('메인코인 개수:', mainCoinList.length);
                console.log('메인코인 목록:', mainCoinList.map(coin => coin.symbol));
                console.log('기타 코인 개수:', otherCoins.length);
                
                // 메인코인을 먼저, 그 다음 다른 코인들
                filteredCoins = [...mainCoinList, ...otherCoins].slice(0, 30);
                console.log('최종 표시할 코인 개수:', filteredCoins.length);
                console.log('최종 코인 목록:', filteredCoins.map(coin => coin.symbol));
                break;
        }

        // 필터링된 코인에 대해 AI 스코어 및 순위 재설정
        filteredCoins.forEach((coin, index) => {
            const aiResult = this.calculateAIScore(coin);
            coin.aiScore = aiResult.score;
            coin.aiReasons = aiResult.reasons;
            coin.displayRank = index + 1; // 임시 순위
        });

        // 현재 정렬 기준에 따라 코인 정렬 (무한 루프 방지)
        if (this.sortKey && this.sortKey !== 'rank') {
            filteredCoins.sort((a, b) => {
                let valA = a[this.sortKey];
                let valB = b[this.sortKey];

                // 문자열인 경우 소문자로 변환하여 비교
                if (typeof valA === 'string') valA = valA.toLowerCase();
                if (typeof valB === 'string') valB = valB.toLowerCase();

                if (valA < valB) return this.sortOrder === 'asc' ? -1 : 1;
                if (valA > valB) return this.sortOrder === 'asc' ? 1 : -1;
                return 0;
            });

            // 정렬 후 순위 재설정
            filteredCoins.forEach((coin, index) => {
                coin.displayRank = index + 1;
            });
        }

        // 코인 목록 표시
        this.displayCoins(filteredCoins);
    }

    /**
     * 시장 심리 지표 로드 및 표시
     */
    async loadMarketSentiment() {
        try {
            const sentimentData = await bybitAPI.getMarketSentiment();
            this.displayMarketSentiment(sentimentData);
        } catch (error) {
            console.warn('시장 심리 지표 로드 실패:', error);
            // 실패 시 시장 심리 지표 영역을 숨김
            const sentimentElement = document.getElementById('market-sentiment');
            if (sentimentElement) {
                sentimentElement.style.display = 'none';
            }
        }
    }

    /**
     * 시장 심리 지표 표시
     */
    displayMarketSentiment(data) {
        const sentimentElement = document.getElementById('market-sentiment');
        if (!sentimentElement) return;

        // 시장 심리 지표 영역 표시
        sentimentElement.style.display = 'block';

        // 이모지, 상태, 비율 업데이트
        const emojiElement = document.getElementById('sentiment-emoji');
        const statusElement = document.getElementById('sentiment-status');
        const ratioElement = document.getElementById('sentiment-ratio');
        const longRatioElement = document.getElementById('long-ratio');
        const shortRatioElement = document.getElementById('short-ratio');

        if (emojiElement) emojiElement.textContent = data.sentimentEmoji;
        if (statusElement) statusElement.textContent = data.sentimentStatus;
        
        // 다국어 지원을 위한 비율 텍스트
        const ratioText = window.languageManager && window.languageManager.currentLang === 'en' ? 'Ratio' : '비율';
        if (ratioElement) ratioElement.textContent = data.marketSentiment ? `${ratioText}: ${data.marketSentiment}` : '-';
        
        const longText = window.languageManager ? window.languageManager.t('long_label') : '롱:';
        const shortText = window.languageManager ? window.languageManager.t('short_label') : '숏:';
        
        if (longRatioElement) longRatioElement.textContent = data.totalLongRatio ? `${longText} ${data.totalLongRatio}%` : `${longText} -`;
        if (shortRatioElement) shortRatioElement.textContent = data.totalShortRatio ? `${shortText} ${data.totalShortRatio}%` : `${shortText} -`;
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

// 스파크라인 차트 그리기 함수
async function drawSparkline(symbol, canvasId) {
    try {
        console.log('스파크라인 차트 시작:', symbol, canvasId);
        
        // Canvas 요소 확인
        const canvas = document.getElementById(canvasId);
        if (!canvas) {
            console.error('Canvas 요소를 찾을 수 없습니다:', canvasId);
            return;
        }
        
        // Canvas가 모달 내부에 있는지 확인
        const isInModal = canvas.closest('.modal');
        console.log('Canvas가 모달 내부에 있음:', isInModal);
        console.log('Canvas 크기:', canvas.offsetWidth, 'x', canvas.offsetHeight);
        
        // 모달 내부에서만 크기 강제 설정 (메인 리스트는 원래대로)
        if (isInModal && canvas.offsetWidth < 200) {
            canvas.style.width = '400px';
            canvas.style.height = '60px';
            canvas.style.minWidth = '400px';
            canvas.style.minHeight = '60px';
            console.log('모달 내부에서 크기 강제 설정');
        }
        
        // 먼저 선물 거래로 시도 (24시간 데이터를 15분 간격으로)
        let url = `https://api.bybit.com/v5/market/kline?category=linear&symbol=${symbol}USDT&interval=15&limit=96`;
        console.log('선물 API URL:', url);
        
        let res = await fetch(url);
        let json = await res.json();
        
        // 선물 거래가 지원되지 않는 경우 스팟 거래로 시도
        if (json.retCode !== 0 || !json.result || !json.result.list || json.result.list.length === 0) {
            console.log(`${symbol} 선물 거래 지원 안됨, 스팟 거래로 시도...`);
            url = `https://api.bybit.com/v5/market/kline?category=spot&symbol=${symbol}USDT&interval=15&limit=96`;
            console.log('스팟 API URL:', url);
            
            res = await fetch(url);
            json = await res.json();
        }
        
        // 두 API 모두 실패한 경우 대체 데이터 생성
        if (json.retCode !== 0 || !json.result || !json.result.list || json.result.list.length === 0) {
            console.log(`${symbol} API 실패, 대체 데이터 생성`);
            const mockPrices = Array.from({length: 24}, (_, i) => {
                const basePrice = 100 + Math.random() * 50;
                return basePrice + Math.sin(i * 0.2) * 10;
            });
            drawSVGSparkline(canvas, mockPrices, '#10b981', 'positive');
            
            // 로딩 메시지 제거
            const loadingNote = canvas.parentElement?.querySelector('.sparkline-note');
            if (loadingNote) {
                loadingNote.style.display = 'none';
            }
            return;
        }
        
        console.log('API 응답:', json);

        if (json.retCode === 0 && json.result && json.result.list && json.result.list.length > 0) {
            // 바이비트 V5 API 응답 구조: [timestamp, open, high, low, close, volume, turnover]
            const closePrices = json.result.list.map(item => parseFloat(item[4])); // 종가 (인덱스 4)
            console.log('종가 데이터:', closePrices);
            
            if (closePrices.length > 0) {
                const changeClass = closePrices[closePrices.length - 1] >= closePrices[0] ? 'positive' : 'negative';
                const lineColor = changeClass === 'positive' ? '#10b981' : '#ef4444';
                
                console.log('Canvas 크기:', canvas.offsetWidth, 'x', canvas.offsetHeight);
                
                // 내장 SVG 차트 사용
                drawSVGSparkline(canvas, closePrices, lineColor, changeClass);
                
                // 로딩 메시지 제거
                const loadingNote = canvas.parentElement.querySelector('.sparkline-note');
                if (loadingNote) {
                    loadingNote.style.display = 'none';
                }
                
                console.log('차트 그리기 완료');
            } else {
                throw new Error('Canvas 요소를 찾을 수 없거나 데이터가 없습니다.');
            }
        } else {
            console.error('바이비트 API 응답 오류:', json);
            if (json.retCode !== 0) {
                throw new Error(`바이비트 API 오류: ${json.retMsg || '알 수 없는 오류'} (코드: ${json.retCode})`);
            } else if (!json.result || !json.result.list) {
                throw new Error('API 응답에 데이터가 없습니다.');
            } else {
                throw new Error('API 데이터를 가져올 수 없습니다.');
            }
        }
    } catch (error) {
        console.error('스파크라인 차트 오류:', error);
        const canvas = document.getElementById(canvasId);
        if (canvas) {
            canvas.innerHTML = '<div style="text-align: center; color: var(--text-secondary); padding: 20px;">차트 데이터를 불러올 수 없습니다.</div>';
            
            // 로딩 메시지 제거
            const loadingNote = canvas.parentElement?.querySelector('.sparkline-note');
            if (loadingNote) {
                loadingNote.style.display = 'none';
            }
        }
    }
}

// SVG로 직접 스파크라인 차트 그리기
function drawSVGSparkline(canvas, prices, lineColor, changeClass) {
    // Canvas 크기가 0인 경우 기본값 사용
    let width = canvas.offsetWidth;
    if (width === 0) {
        width = 300; // 기본 너비
        console.log('Canvas 너비가 0이므로 기본값 사용:', width);
    }
    
    // 모달 내부에서 더 큰 크기 사용
    if (canvas.closest('.modal')) {
        width = Math.max(width, 400);
        console.log('모달 내부에서 더 큰 크기 사용:', width);
    }
    
    // 여전히 크기가 0인 경우 강제로 설정
    if (width === 0) {
        width = canvas.closest('.modal') ? 400 : 300;
        console.log('강제로 크기 설정:', width);
    }
    
    // 모달 내부에서 더 안정적인 크기 처리
    if (canvas.closest('.modal') && width < 200) {
        width = 400;
        console.log('모달 내부에서 안정적인 크기로 설정:', width);
    }
    
    // 모달 내부에서만 크기 강제 확대 (메인 리스트는 원래대로)
    if (canvas.closest('.modal') && width < 200) {
        width = 400;
        console.log('모달 내부에서 크기 강제 확대:', width);
    }
    
    const height = 60;
    const padding = 10;
    
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    const priceRange = maxPrice - minPrice;
    
    const points = prices.map((price, index) => {
        const x = padding + (index / (prices.length - 1)) * (width - 2 * padding);
        const y = height - padding - ((price - minPrice) / priceRange) * (height - 2 * padding);
        return `${x},${y}`;
    }).join(' ');
    
    const fillPoints = points + ` ${width - padding},${height - padding} ${padding},${height - padding}`;
    
    const svg = `
        <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
            <defs>
                <linearGradient id="sparklineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" style="stop-color:${lineColor};stop-opacity:0.3"/>
                    <stop offset="100%" style="stop-color:${lineColor};stop-opacity:0.1"/>
                </linearGradient>
            </defs>
            <polyline points="${points}" stroke="${lineColor}" stroke-width="2" fill="none"/>
            <polygon points="${fillPoints}" fill="url(#sparklineGradient)"/>
        </svg>
    `;
    
    canvas.innerHTML = svg;
    
    // 모달 내부에서만 디버깅 출력
    if (canvas.closest('.modal')) {
        console.log('모달 SVG 생성 완료:', svg.substring(0, 100) + '...');
        console.log('모달 Canvas 내용:', canvas.innerHTML.substring(0, 100) + '...');
    }
    
    // 로딩 메시지 제거
    const loadingNote = canvas.parentElement?.querySelector('.sparkline-note');
    if (loadingNote) {
        loadingNote.style.display = 'none';
    }
}

// 모달 표시 함수 (전역)
function showCoinModal(symbol) {
    const modal = document.getElementById('coinModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalContent = document.getElementById('modalContent');
    
    // 현재 코인 데이터에서 해당 코인 찾기 (여러 방법으로 매칭)
    let coin = null;
    if (window.coinApp?.currentCoins) {
        // 1. 정확한 심볼 매칭
        coin = window.coinApp.currentCoins.find(c => c.symbol === symbol);
        
        // 2. USDT 제거 후 매칭
        if (!coin && symbol.endsWith('USDT')) {
            const symbolWithoutUSDT = symbol.replace('USDT', '');
            coin = window.coinApp.currentCoins.find(c => c.symbol === symbolWithoutUSDT);
        }
        
        // 3. 대소문자 구분 없이 매칭
        if (!coin) {
            coin = window.coinApp.currentCoins.find(c => 
                c.symbol.toLowerCase() === symbol.toLowerCase() ||
                c.symbol.toLowerCase() === symbol.replace('USDT', '').toLowerCase()
            );
        }
        
        // 4. 전체 심볼에서 매칭
        if (!coin) {
            coin = window.coinApp.currentCoins.find(c => 
                c.fullSymbol === symbol ||
                c.fullSymbol === symbol.replace('USDT', '')
            );
        }
    }
    
    if (coin) {
        modalTitle.textContent = `${coin.symbol} 상세 정보`;
        
        const changeClass = coin.priceChangePercent >= 0 ? 'positive' : 'negative';
        const changeSymbol = coin.priceChangePercent >= 0 ? '+' : '';
        
        modalContent.innerHTML = `
            <div class="coin-detail">
                <div class="coin-header">
                    <div class="coin-title">
                        <h3>${coin.symbol}</h3>
                        <span class="coin-rank">#${coin.rank}</span>
                    </div>
                </div>
                
                <div class="coin-price-section">
                    <div class="current-price">
                        <div class="price-main">${window.coinApp.formatUSDPrice(coin.price)}</div>
                        <div class="price-krw">₩${coin.price && coin.price > 0 ? (coin.price * 1350).toLocaleString('ko-KR') : '-'}</div>
                        <div class="price-change ${changeClass}">
                            ${changeSymbol}${coin.priceChangePercent.toFixed(2)}%
                        </div>
                    </div>
                </div>
                
                <div class="coin-stats-grid">
                    <div class="stat-card">
                        <div class="stat-label">시가총액</div>
                        <div class="stat-value">$${window.coinApp.formatNumber(coin.accurateMarketCap || coin.marketCap)}</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-label">24시간 거래량</div>
                        <div class="stat-value">$${window.coinApp.formatNumber(coin.volume)}</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-label">순위</div>
                        <div class="stat-value">#${coin.rank}</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-label">변동률</div>
                        <div class="stat-value ${changeClass}">${changeSymbol}${coin.priceChangePercent.toFixed(2)}%</div>
                    </div>
                </div>
                
                <div class="sparkline-section">
                    <h4>24시간 가격 변동</h4>
                    <div class="sparkline-container">
                        <div class="sparkline-placeholder">
                            <div id="modal-sparkline-${coin.symbol}" class="sparkline-chart"></div>
                            <div class="sparkline-note">실시간 차트 데이터 로딩 중...</div>
                        </div>
                    </div>
                </div>
                
                <div class="coin-info-section">
                    <h4>코인 정보</h4>
                    <div class="info-grid">
                        <div class="info-item">
                            <span class="info-label">심볼:</span>
                            <span class="info-value">${coin.symbol}</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">전체 심볼:</span>
                            <span class="info-value">${coin.fullSymbol || coin.symbol}</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">현재가:</span>
                            <span class="info-value">${window.coinApp.formatUSDPrice(coin.price)}</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">원화 가격:</span>
                            <span class="info-value">₩${coin.price && coin.price > 0 ? (coin.price * 1350).toLocaleString('ko-KR') : '-'}</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // 모달이 표시된 후 스파크라인 차트 그리기
        setTimeout(() => {
            console.log('모달 스파크차트 첫 번째 시도');
            const canvas = document.getElementById(`modal-sparkline-${coin.symbol}`);
            if (canvas) {
                // 강제로 크기 설정
                canvas.style.width = '400px';
                canvas.style.height = '60px';
                canvas.style.minWidth = '400px';
                canvas.style.minHeight = '60px';
                drawSparkline(coin.symbol, `modal-sparkline-${coin.symbol}`);
            }
        }, 300);
        
        // 모달이 완전히 표시된 후 다시 시도
        setTimeout(() => {
            console.log('모달 스파크차트 두 번째 시도');
            const canvas = document.getElementById(`modal-sparkline-${coin.symbol}`);
            if (canvas) {
                console.log('Canvas 크기 확인:', canvas.offsetWidth, 'x', canvas.offsetHeight);
                if (canvas.offsetWidth < 200) {
                    console.log('Canvas 크기가 작아서 다시 시도');
                    canvas.style.width = '400px';
                    canvas.style.height = '60px';
                    drawSparkline(coin.symbol, `modal-sparkline-${coin.symbol}`);
                }
            }
        }, 800);
        
        // 최종 시도
        setTimeout(() => {
            console.log('모달 스파크차트 최종 시도');
            const canvas = document.getElementById(`modal-sparkline-${coin.symbol}`);
            if (canvas) {
                console.log('최종 시도 - 강제로 차트 그리기');
                // 강제로 크기 설정 후 차트 그리기
                canvas.style.width = '400px';
                canvas.style.height = '60px';
                canvas.style.minWidth = '400px';
                canvas.style.minHeight = '60px';
                drawSparkline(coin.symbol, `modal-sparkline-${coin.symbol}`);
            }
        }, 1500);
        
    } else {
        modalTitle.textContent = symbol + ' 정보';
        modalContent.innerHTML = `
            <div class="coin-detail">
                <p>이 코인에 대한 정보를 찾을 수 없습니다.</p>
                <p style="font-size: 0.9rem; color: var(--text-secondary); margin-top: 10px;">
                    찾은 심볼: ${symbol}<br>
                    사용 가능한 코인: ${window.coinApp?.currentCoins?.map(c => c.symbol).slice(0, 10).join(', ')}...
                </p>
            </div>
        `;
        
        // 디버깅용 콘솔 출력
        console.log('찾으려는 심볼:', symbol);
        console.log('사용 가능한 코인들:', window.coinApp?.currentCoins?.map(c => c.symbol));
    }
    
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

// 언어 관련 함수들
CoinRankingApp.prototype.initLanguage = function() {
    // 언어 관리자가 있으면 초기 텍스트 업데이트
    if (window.languageManager) {
        window.languageManager.updateLanguageButtons();
        window.languageManager.updateAllTexts();
        
        // IP 기반 언어 감지 완료 후 추가 업데이트
        setTimeout(() => {
            if (window.languageManager) {
                window.languageManager.updateAllTexts();
                this.updateTextsForLanguage();
            }
        }, 1000);
    }
};

CoinRankingApp.prototype.bindLanguageEvents = function() {
    const langButtons = document.querySelectorAll('.lang-btn');
    langButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.getAttribute('data-lang');
            if (window.languageManager) {
                window.languageManager.changeLanguage(lang);
            }
        });
    });
};

// 다국어 지원을 위한 텍스트 업데이트 함수들
CoinRankingApp.prototype.updateTextsForLanguage = function() {
    if (!window.languageManager) return;
    
    const lang = window.languageManager.currentLang;
    
    // 시장 심리 지표 텍스트 업데이트
    const sentimentElements = document.querySelectorAll('.sentiment-status');
    sentimentElements.forEach(element => {
        const text = element.textContent;
        if (text === '중립' || text === 'Neutral') {
            element.textContent = window.languageManager.t('sentiment_neutral');
        } else if (text === '강세' || text === 'Bullish') {
            element.textContent = window.languageManager.t('sentiment_bullish');
        } else if (text === '약세' || text === 'Bearish') {
            element.textContent = window.languageManager.t('sentiment_bearish');
        }
    });
    
    // 롱/숏 라벨 업데이트
    const longLabels = document.querySelectorAll('#long-ratio');
    const shortLabels = document.querySelectorAll('#short-ratio');
    
    longLabels.forEach(element => {
        if (element.textContent.startsWith('롱:') || element.textContent.startsWith('Long:')) {
            const ratio = element.textContent.split(':')[1] || '';
            element.textContent = `${window.languageManager.t('long_label')} ${ratio}`;
        }
    });
    
    shortLabels.forEach(element => {
        if (element.textContent.startsWith('숏:') || element.textContent.startsWith('Short:')) {
            const ratio = element.textContent.split(':')[1] || '';
            element.textContent = `${window.languageManager.t('short_label')} ${ratio}`;
        }
    });
    
    // AI 배지 텍스트 업데이트
    const aiBadges = document.querySelectorAll('.ai-badge');
    aiBadges.forEach(badge => {
        if (badge.textContent === 'AI PICK') {
            badge.textContent = window.languageManager.t('ai_pick');
        }
    });
    
    // 거래량 급증 배지 텍스트 업데이트
    const volumeBadges = document.querySelectorAll('.volume-surge-badge');
    volumeBadges.forEach(badge => {
        if (badge.textContent === '거래량 급증' || badge.textContent === 'Volume Surge') {
            badge.textContent = window.languageManager.t('volume_surge');
        } else if (badge.textContent === '거래량 높음' || badge.textContent === 'High Volume') {
            badge.textContent = window.languageManager.t('volume_high');
        }
    });
    
    // NEW 배지 텍스트 업데이트
    const newBadges = document.querySelectorAll('.rank-new');
    newBadges.forEach(badge => {
        if (badge.textContent === 'NEW') {
            badge.textContent = window.languageManager.t('rank_new');
        }
    });
    
    // 데이터 없음 텍스트 업데이트
    const noDataElements = document.querySelectorAll('.no-data');
    noDataElements.forEach(element => {
        if (element.textContent === '데이터 없음' || element.textContent === 'No data') {
            element.textContent = window.languageManager.t('no_data');
        }
    });
}; 