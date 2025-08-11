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
        
        // 성능 최적화를 위한 캐시 추가
        this.cache = {
            coins: null,
            lastCacheTime: 0,
            cacheDuration: 14 * 60 * 1000 // 14분 캐시 (15분 업데이트에 맞춤)
        };
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
        
        // iOS 상태바 색상 초기화
        this.setStatusBarColor();
        
        // 언어 설정 초기화
        this.initLanguage();
        // 꿀팁/투자경고 최초 렌더링
        this.renderTipsContent();
        this.renderInvestmentWarning();
        const warningDiv = document.getElementById('investment-warning');
        if (warningDiv) warningDiv.style.display = 'block';
    }

    /**
     * 이벤트 바인딩
     */
    bindEvents() {
        // 메뉴 버튼 이벤트 바인딩
        this.bindMenuEvents();

        // 로고 클릭 이벤트 바인딩
        this.bindLogoEvents();

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
     * 로고 클릭 이벤트 바인딩
     */
    bindLogoEvents() {
        const logo = document.getElementById('home-logo');
        if (logo) {
            logo.addEventListener('click', () => {
                this.goHome();
            });
        }
    }

    /**
     * 홈으로 이동
     */
    goHome() {
        // 메뉴 버튼 활성화 상태 변경
        document.querySelectorAll('.menu-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector('[data-menu="all"]').classList.add('active');

        // 현재 메뉴를 'all'로 설정
        this.currentMenu = 'all';

        // 모든 컨텐츠 영역 숨기기
        const contentDiv = document.getElementById('content');
        const topCoinInfo = document.getElementById('top-coin-info');
        const marketSentiment = document.getElementById('market-sentiment');
        const tipsContent = document.getElementById('tips-content');
        const myInvestContent = document.getElementById('myinvest-content');
        
        if (contentDiv) contentDiv.style.display = 'block';
        if (topCoinInfo) topCoinInfo.style.display = 'none';
        if (marketSentiment) marketSentiment.style.display = 'none';
        if (tipsContent) tipsContent.style.display = 'none';
        if (myInvestContent) myInvestContent.style.display = 'none';

        // 코인 데이터 표시
        this.displayFilteredCoins();
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
            case 'tips':
                this.currentMenu = 'tips';
                this.displayTipsContent();
                break;
            case 'dictionary':
                this.currentMenu = 'dictionary';
                this.displayDictionaryContent();
                break;
            case 'theme':
                this.toggleTheme();
                break;
            case 'myinvest':
                this.currentMenu = 'myinvest';
                this.displayMyInvestContent();
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

        // 캐시된 데이터가 유효한지 확인
        const now = Date.now();
        if (this.cache.coins && (now - this.cache.lastCacheTime) < this.cache.cacheDuration) {
            console.log('캐시된 데이터 사용');
            this.currentCoins = this.cache.coins;
            this.allCoins = this.cache.coins;
            // 원본 데이터 보존 (캐시에서도)
            this.originalCoins = [...this.cache.coins];
            this.displayFilteredCoins();
            this.updateLastUpdateTime();
            return;
        }

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
            console.log('코인 데이터 로딩 시작...');
            
            // 15분 기준 실시간 거래량 데이터로 변경
            console.log('15분 기준 실시간 거래량 데이터 로딩 중...');
            const [coins, marketStats] = await Promise.all([
                bybitAPI.getTopCoinsFromBybit15Min(50), // 15분 기준 상위 50개 코인
                bybitAPI.getMarketStats()
            ]);
            
            console.log('기본 데이터 로딩 완료, 추가 데이터 로딩 중...');
            
            // 상위 10개 코인의 롱숏 비율 데이터 가져오기 (실패해도 계속 진행)
            let longShortData = [];
            let accurateMarketCapData = [];
            
            // 롱숏 데이터와 시가총액 데이터를 병렬로 가져오기
            try {
                [longShortData, accurateMarketCapData] = await Promise.allSettled([
                    bybitAPI.getTopCoinsLongShortRatio(coins),
                    coinGeckoAPI.getAccurateMarketCap(coins)
                ]).then(results => [
                    results[0].status === 'fulfilled' ? results[0].value : [],
                    results[1].status === 'fulfilled' ? results[1].value : []
                ]);
            } catch (error) {
                console.warn('추가 데이터 로딩 실패, 기본 데이터로 계속 진행:', error);
            }
            
            // 바이비트 원본 데이터 그대로 사용 (환율 변환 제거)
            let coinsWithKRW = coins;
            
            // 모든 데이터를 코인 데이터와 병합
            const coinsWithAllData = this.mergeAllData(coinsWithKRW, longShortData, accurateMarketCapData);
            
            // 모바일에서 데이터 검증
            if (isMobile && (!coinsWithAllData || coinsWithAllData.length === 0)) {
                throw new Error('모바일에서 데이터를 가져올 수 없습니다. 네트워크 연결을 확인해주세요.');
            }
            
            // 원본 데이터 보존 (다른 메뉴에서 필터링해도 원본 유지)
            this.originalCoins = [...coinsWithAllData];
            
            // 현재 코인 데이터 저장
            this.currentCoins = coinsWithAllData;
            
            // 캐시 업데이트
            this.cache.coins = coinsWithAllData;
            this.cache.lastCacheTime = Date.now();
            
            // 순위 업데이트
            this.updateRanks(coinsWithAllData);
            
            // 거래량 데이터 업데이트
            this.updateVolumes(coinsWithAllData);
            
            // 데이터 표시
            this.allCoins = coinsWithAllData; // 모든 코인 데이터 저장
        
        // 디버깅: 롱숏 데이터가 제대로 저장되었는지 확인
        console.log('=== 스텝 1: allCoins에 저장된 롱숏 데이터 ===');
        const longShortCoins = this.allCoins.filter(coin => coin.longAccount);
        console.log('롱숏 데이터가 있는 코인 개수:', longShortCoins.length);
        console.log('롱숏 데이터 상세:', longShortCoins.map(coin => ({
            symbol: coin.symbol,
            longAccount: coin.longAccount,
            shortAccount: coin.shortAccount,
            volume: coin.volume
        })));
        
        this.displayFilteredCoins(); // 필터링된 코인 표시
        
        // 다국어 텍스트 업데이트
        if (window.languageManager) {
            this.updateTextsForLanguage();
        }
            
            // 1위 코인 정보는 displayFilteredCoins에서 업데이트됨
            
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
            // 롱숏 데이터 매칭 - symbol과 fullSymbol 모두 시도
            const longShortInfo = longShortData.find(ls => 
                ls.symbol === coin.symbol || 
                ls.fullSymbol === coin.fullSymbol ||
                ls.symbol === coin.fullSymbol?.replace('USDT', '') ||
                ls.fullSymbol === coin.symbol + 'USDT'
            );
            const marketCapInfo = accurateMarketCapData.find(mc => mc.symbol === coin.symbol);
            
            // 디버깅: 롱숏 데이터 매칭 결과 로그
            if (longShortInfo) {
                console.log(`롱숏 데이터 매칭 성공: ${coin.symbol}`, longShortInfo);
            } else {
                console.log(`롱숏 데이터 매칭 실패: ${coin.symbol}`, {
                    availableSymbols: longShortData.map(ls => ({ symbol: ls.symbol, fullSymbol: ls.fullSymbol })),
                    coinSymbol: coin.symbol,
                    coinFullSymbol: coin.fullSymbol
                });
            }
            
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
        if (!contentDiv) return;

        // 다른 영역들 숨기기
        const topCoinInfo = document.getElementById('top-coin-info');
        const marketSentiment = document.getElementById('market-sentiment');
        const tipsContent = document.getElementById('tips-content');
        const myInvestContent = document.getElementById('myinvest-content');
        const dictionaryContent = document.getElementById('dictionary-content');
        if (topCoinInfo) topCoinInfo.style.display = 'none';
        if (marketSentiment) marketSentiment.style.display = 'none';
        if (tipsContent) tipsContent.style.display = 'none';
        if (myInvestContent) myInvestContent.style.display = 'none';
        if (dictionaryContent) dictionaryContent.style.display = 'none';
        
        // 기존 컨텐츠 표시
        if (contentDiv) {
            contentDiv.style.display = 'block';
        }
        
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

        // 스파크라인 차트 그리기 (최적화된 로딩)
        const sparklinePromises = coins.map((coin, index) => {
            return new Promise(resolve => {
                setTimeout(() => {
                    drawSparkline(coin.symbol, `sparkline-${coin.symbol}`);
                    resolve();
                }, index * 50); // 50ms 간격으로 순차 로딩
            });
        });
        
        // 스파크차트 로딩을 백그라운드에서 처리
        Promise.all(sparklinePromises).then(() => {
            console.log('모든 스파크차트 로딩 완료');
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
        try {
            // 입력값 검증
            if (!key || typeof key !== 'string') {
                console.error('sortCoins: 유효하지 않은 정렬 키:', key);
                return;
            }

            // 정렬 순서 업데이트
            if (this.sortKey === key) {
                this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
            } else {
                this.sortKey = key;
                this.sortOrder = 'asc';
            }

            console.log(`정렬 시작 - 키: ${key}, 순서: ${this.sortOrder}, 메뉴: ${this.currentMenu}`);

            // 데이터 검증
            if (!this.allCoins || !Array.isArray(this.allCoins) || this.allCoins.length === 0) {
                console.warn('sortCoins: 정렬할 코인 데이터가 없습니다.');
                return;
            }

            // 현재 필터링된 코인 목록을 가져와서 정렬
            let sortedCoins = [...this.allCoins];

        // 현재 메뉴에 따라 필터링된 코인에만 정렬 적용
        switch (this.currentMenu) {
            case 'rising':
                // 급등 코인: 상승 중인 코인만 (밈코인 우선 가능)
                sortedCoins = sortedCoins.filter(coin => coin.priceChangePercent > 0);
                break;
            case 'volume':
                // 거래량 급증: 모든 코인 (밈코인 우선 가능)
                sortedCoins = sortedCoins;
                break;
            case 'longshort':
                // 롱/숏 비율: 순수하게 롱 비중 높은 순 (거래량 무관)
                sortedCoins = sortedCoins.filter(coin => coin.longAccount && coin.longAccount > 0.6);
                break;
            case 'ai':
                // AI 추천: AI 점수 높은 코인만
                sortedCoins = sortedCoins.filter(coin => coin.aiScore >= 3);
                break;
            default: // 'all'
                // 전체: 메인코인 우선 표시 (displayFilteredCoins와 동일한 로직)
                const mainCoins = ['BTC', 'ETH', 'BNB', 'SOL', 'ADA', 'AVAX', 'DOT', 'MATIC', 'LINK', 'UNI', 'XRP', 'DOGE', 'SHIB', 'LTC', 'BCH', 'ATOM', 'NEAR', 'FTM', 'ALGO', 'VET'];
                const mainCoinList = sortedCoins.filter(coin => mainCoins.includes(coin.symbol));
                const otherCoins = sortedCoins.filter(coin => !mainCoins.includes(coin.symbol));
                sortedCoins = [...mainCoinList, ...otherCoins].slice(0, 20);
                break;
        }

        // 롱숏 메뉴에서도 정렬 키에 따라 정렬 가능하도록 수정
        if (this.currentMenu === 'longshort') {
            console.log('롱숏 메뉴 정렬 시작 - 정렬 키:', key, '정렬 순서:', this.sortOrder);
            
            // 롱숏 데이터가 있는 코인만 필터링
            const longShortCoins = sortedCoins.filter(coin => {
                return coin && typeof coin === 'object' && coin.longAccount !== undefined && coin.longAccount !== null;
            });
            
            console.log(`롱숏 데이터가 있는 코인: ${longShortCoins.length}개`);
            
            if (longShortCoins.length === 0) {
                console.warn('롱숏 메뉴: 정렬할 롱숏 데이터가 없습니다.');
                return;
            }
            
            // 롱숏 메뉴에서는 기본적으로 롱 비중 순이지만, 다른 정렬도 허용
            if (key === 'longAccount' || this.sortKey === 'longAccount') {
                // 롱 비중 정렬
                sortedCoins = longShortCoins.sort((a, b) => {
                    const longA = parseFloat(a.longAccount) || 0;
                    const longB = parseFloat(b.longAccount) || 0;
                    const result = longB - longA;
                    return this.sortOrder === 'asc' ? -result : result;
                });
            } else {
                // 다른 정렬 기준 사용
                sortedCoins = longShortCoins.sort((a, b) => {
                    let valA = a[key];
                    let valB = b[key];

                    // null/undefined 체크
                    if (valA === null || valA === undefined) valA = 0;
                    if (valB === null || valB === undefined) valB = 0;

                    // 문자열인 경우 소문자로 변환하여 비교
                    if (typeof valA === 'string') valA = valA.toLowerCase();
                    if (typeof valB === 'string') valB = valB.toLowerCase();

                    if (valA < valB) return this.sortOrder === 'asc' ? -1 : 1;
                    if (valA > valB) return this.sortOrder === 'asc' ? 1 : -1;
                    return 0;
                });
            }
            
            console.log('sortCoins - 롱숏 메뉴 정렬 후:', sortedCoins.map(coin => ({
                symbol: coin.symbol,
                longAccount: coin.longAccount,
                sortKey: key,
                sortOrder: this.sortOrder
            })));
        } else {
            // 다른 메뉴에서는 현재 정렬 기준에 따라 정렬
            console.log(`다른 메뉴 정렬 - 키: ${key}, 순서: ${this.sortOrder}`);
            
            // 정렬할 데이터가 있는지 확인
            if (sortedCoins.length === 0) {
                console.warn('정렬할 코인 데이터가 없습니다.');
                return;
            }
            
            sortedCoins.sort((a, b) => {
                let valA = a[key];
                let valB = b[key];

                // null/undefined 체크
                if (valA === null || valA === undefined) valA = 0;
                if (valB === null || valB === undefined) valB = 0;

                // 문자열인 경우 소문자로 변환하여 비교
                if (typeof valA === 'string') valA = valA.toLowerCase();
                if (typeof valB === 'string') valB = valB.toLowerCase();

                if (valA < valB) return this.sortOrder === 'asc' ? -1 : 1;
                if (valA > valB) return this.sortOrder === 'asc' ? 1 : -1;
                return 0;
            });
        }

        // 정렬 후 순위 재설정
        sortedCoins.forEach((coin, index) => {
            coin.displayRank = index + 1;
        });

        this.displayCoins(sortedCoins);
        
        // 1위 코인 정보 업데이트 (정렬된 코인의 첫 번째)
        if (sortedCoins.length > 0) {
            const topCoin = sortedCoins[0];
            console.log(`1위 코인 업데이트 (정렬): ${topCoin.symbol} (${this.currentMenu} 메뉴)`);
            this.displayTopCoinInfo(topCoin.symbol, topCoin);
        }

        console.log(`정렬 완료 - 총 ${sortedCoins.length}개 코인 정렬됨`);

    } catch (error) {
        console.error('sortCoins 함수에서 오류 발생:', error);
        console.error('오류 상세 정보:', {
            key: key,
            sortKey: this.sortKey,
            sortOrder: this.sortOrder,
            currentMenu: this.currentMenu,
            allCoinsLength: this.allCoins ? this.allCoins.length : 'undefined'
        });
    }
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
            const langManager = window.languageManager;
            const t = langManager ? langManager.t.bind(langManager) : (key) => key;
            reasons.push(`${t('volume_usd')} ${volumeFormatted} USD`);
        }
        
        // 가격 변동률
        if (coin.priceChangePercent !== undefined) {
            const change = coin.priceChangePercent;
            const changeText = change >= 0 ? `+${change.toFixed(2)}%` : `${change.toFixed(2)}%`;
            const changeClass = change >= 0 ? 'positive' : 'negative';
            const langManager = window.languageManager;
            const t = langManager ? langManager.t.bind(langManager) : (key) => key;
            reasons.push(`${t('change_rate')} <span class="${changeClass}">${changeText}</span>`);
        }
        
        // 현재 가격
        if (coin.price) {
            const priceFormatted = this.formatUSDPrice(coin.price);
            const langManager = window.languageManager;
            const t = langManager ? langManager.t.bind(langManager) : (key) => key;
            reasons.push(`${t('current_price')} ${priceFormatted}`);
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
        const langManager = window.languageManager;
        const t = langManager ? langManager.t.bind(langManager) : (key) => key;
        
        // 거래량 급증 여부
        if (coin.volume > 1e9) { // 10억 달러 이상
            info.push(`🔥 ${t('volume_explosion')}`);
        } else if (coin.volume > 1e8) { // 1억 달러 이상
            info.push(`📈 ${t('volume_surge_status')}`);
        }
        
        // 가격 변동률에 따른 상태
        if (coin.priceChangePercent > 20) {
            info.push(`🚀 ${t('skyrocketing')}`);
        } else if (coin.priceChangePercent > 10) {
            info.push(`📈 ${t('rising')}`);
        } else if (coin.priceChangePercent < -10) {
            info.push(`📉 ${t('falling')}`);
        }
        
        // 롱숏 비율 분석
        if (coin.longShortRatio) {
            if (coin.longShortRatio > 1.5) {
                info.push(`🐂 ${t('bullish_long')}`);
            } else if (coin.longShortRatio < 0.7) {
                info.push(`🐻 ${t('bearish_short')}`);
            } else {
                info.push(`⚖️ ${t('balanced')}`);
            }
        }
        
        // 현재 시간 기준 상태
        const now = new Date();
        const hour = now.getHours();
        if (hour >= 9 && hour <= 17) {
            info.push(`🌞 ${t('active_trading')}`);
        } else {
            info.push(`🌙 ${t('night_trading')}`);
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
            if (coin.aiScore >= 5) {
                return '<span class="volume-surge-badge">🤖 최고</span>';
            } else if (coin.aiScore >= 3) {
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
        
        // 롱숏 비율 표시 (조건 완화)
        let longShortDisplay = '';
        if (coin.longAccount !== null && coin.shortAccount !== null && 
            coin.longAccount > 0 && coin.shortAccount > 0) {
            // 바이비트 API는 0~1 사이 값, CoinGecko는 이미 백분율
            const longPercent = coin.longAccount <= 1 ? (coin.longAccount * 100).toFixed(1) : coin.longAccount.toFixed(1);
            const shortPercent = coin.shortAccount <= 1 ? (coin.shortAccount * 100).toFixed(1) : coin.shortAccount.toFixed(1);
            const langManager = window.languageManager;
            const t = langManager ? langManager.t.bind(langManager) : (key) => key;
            const ratioText = coin.note ? `(${t('estimated')})` : '';
            longShortDisplay = `
                <div class="longshort-mini">
                    <div class="mini-ratio-bar">
                        <div class="mini-long-bar" style="width: ${longPercent}%"></div>
                        <div class="mini-short-bar" style="width: ${shortPercent}%"></div>
                    </div>
                    <div class="mini-ratio-text">${t('long_percent')} ${longPercent}% / ${t('short_percent')} ${shortPercent}% ${ratioText}</div>
                </div>
            `;
        } else {
            // 디버깅: 왜 데이터가 없는지 확인
            console.log(`롱숏 데이터 없음: ${coin.symbol}`, {
                longAccount: coin.longAccount,
                shortAccount: coin.shortAccount,
                longShortRatio: coin.longShortRatio
            });
            const langManager = window.languageManager;
            const t = langManager ? langManager.t.bind(langManager) : (key) => key;
            longShortDisplay = `<div class="no-data">${t('no_data')}</div>`;
        }
        
        // AI 추천 코인 스타일 적용
        const isAIRecommendation = this.currentMenu === 'ai' && coin.aiScore >= 3;
        const aiClass = isAIRecommendation ? 'ai-recommendation' : '';
        const aiBadge = isAIRecommendation ? '<div class="ai-badge">AI PICK</div>' : '';
        const langManager = window.languageManager;
        const t = langManager ? langManager.t.bind(langManager) : (key) => key;
        const aiScore = isAIRecommendation ? `<div class="ai-score">${coin.aiScore}${t('ai_score')}</div>` : '';
        
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
     * 숫자 포맷팅 (언어별 단위)
     */
    formatNumber(num) {
        // 모바일에서 안전한 숫자 처리
        if (!num || isNaN(num) || num <= 0) {
            return '0';
        }
        
        const langManager = window.languageManager;
        const isEnglish = langManager && langManager.currentLang === 'en';
        
        if (isEnglish) {
            // 영어: M/B/T 단위 사용
            if (num >= 1e12) {
                return (num / 1e12).toFixed(1) + 'T';
            } else if (num >= 1e9) {
                return (num / 1e9).toFixed(1) + 'B';
            } else if (num >= 1e6) {
                return (num / 1e6).toFixed(1) + 'M';
            } else if (num >= 1e3) {
                return (num / 1e3).toFixed(1) + 'K';
            }
            return num.toLocaleString('en-US');
        } else {
            // 한국어: 억/만/천 단위 사용
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
    }

    /**
     * 자동 새로고침 시작 (15분 기준 실시간 거래량 반영)
     */
    startAutoRefresh() {
        // 15분마다 자동 새로고침 (실시간 거래량 업데이트에 맞춤)
        this.autoRefreshInterval = setInterval(() => {
            console.log('15분 주기 자동 업데이트 시작...');
            this.loadCoinData();
        }, 15 * 60 * 1000);
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
        if (coin.priceChangePercent >= 6) {
            score += 2;
            reasons.push(`상승률 +${coin.priceChangePercent.toFixed(1)}%`);
        } else if (coin.priceChangePercent >= 3) {
            score += 1;
            reasons.push(`상승률 +${coin.priceChangePercent.toFixed(1)}%`);
        }
        
        // 거래량 증가율 점수 (이전 거래량과 비교)
        if (this.previousVolumes[coin.symbol]) {
            const previousVolume = this.previousVolumes[coin.symbol];
            const volumeChangePercent = ((coin.volume - previousVolume) / previousVolume) * 100;
            
            if (volumeChangePercent >= 40) {
                score += 2;
                reasons.push(`거래량 +${volumeChangePercent.toFixed(1)}%`);
            } else if (volumeChangePercent >= 20) {
                score += 1;
                reasons.push(`거래량 +${volumeChangePercent.toFixed(1)}%`);
            }
        }
        
        // 롱/숏 비율 점수
        if (coin.longAccount && coin.longAccount >= 0.7) {
            score += 2;
            const langManager = window.languageManager;
            const t = langManager ? langManager.t.bind(langManager) : (key) => key;
            reasons.push(`${t('long_ratio')} ${(coin.longAccount * 100).toFixed(1)}%`);
        } else if (coin.longAccount && coin.longAccount >= 0.6) {
            score += 1;
            const langManager = window.languageManager;
            const t = langManager ? langManager.t.bind(langManager) : (key) => key;
            reasons.push(`${t('long_ratio')} ${(coin.longAccount * 100).toFixed(1)}%`);
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
        
        // iOS 상태바 색상 업데이트
        this.setStatusBarColor();
        
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
        const contentDiv = document.getElementById('content');
        const topCoinInfo = document.getElementById('top-coin-info');
        const marketSentiment = document.getElementById('market-sentiment');
        const tipsContent = document.getElementById('tips-content');
        const myInvestContent = document.getElementById('myinvest-content');
        
        // 다른 영역들 숨기기
        if (topCoinInfo) topCoinInfo.style.display = 'none';
        if (marketSentiment) marketSentiment.style.display = 'none';
        if (tipsContent) tipsContent.style.display = 'none';
        if (myInvestContent) myInvestContent.style.display = 'none';

        if (!this.originalCoins || !this.originalCoins.length) return;

        console.log('displayFilteredCoins 시작 - 현재 메뉴:', this.currentMenu);
        console.log('원본 코인 개수:', this.originalCoins.length);

        // 원본 데이터에서 복사하여 필터링 (원본 데이터 보존)
        let filteredCoins = [...this.originalCoins];

        // AI 스코어 계산 (모든 코인에 대해)
        filteredCoins.forEach(coin => {
            const aiResult = this.calculateAIScore(coin);
            coin.aiScore = aiResult.score;
            coin.aiReasons = aiResult.reasons;
        });

        // 메뉴별 필터링 및 순위 재정렬
        switch (this.currentMenu) {
            case 'rising':
                // 급등 코인: 상승 중인 코인만 (밈코인 우선 가능)
                this.allCoins = filteredCoins
                    .filter(coin => coin.priceChangePercent > 0)
                    .sort((a, b) => b.priceChangePercent - a.priceChangePercent) // 변동률 높은 순
                    .slice(0, 10);
                break;
            case 'volume':
                // 거래량 급증: 거래량 기준 (밈코인 우선 가능)
                this.allCoins = filteredCoins
                    .sort((a, b) => b.volume - a.volume) // 거래량 높은 순
                    .slice(0, 10);
                break;
            case 'longshort':
                // 롱/숏 비율: 순수하게 롱 비중 높은 순 (거래량 무관)
                console.log('=== 스텝 2: 롱숏 메뉴 필터링 ===');
                console.log('전체 코인 개수:', filteredCoins.length);
                
                const longShortDataCoins = filteredCoins.filter(coin => coin.longAccount);
                console.log('롱숏 데이터가 있는 코인들:', longShortDataCoins.map(coin => ({
                    symbol: coin.symbol,
                    longAccount: coin.longAccount,
                    shortAccount: coin.shortAccount,
                    volume: coin.volume
                })));
                
                // 롱숏 데이터가 있는 모든 코인을 롱 비중 순으로 정렬 (거래량 무관)
                const longShortCoins = filteredCoins.filter(coin => coin.longAccount && coin.longAccount > 0.6);
                console.log('필터링 후 롱숏 코인들:', longShortCoins.map(coin => ({
                    symbol: coin.symbol,
                    longAccount: coin.longAccount,
                    shortAccount: coin.shortAccount,
                    volume: coin.volume
                })));
                
                // 정렬 전 상태 확인
                console.log('정렬 전 순서:', longShortCoins.map(coin => `${coin.symbol}: ${coin.longAccount}`));
                
                this.allCoins = longShortCoins
                    .sort((a, b) => {
                        const result = (b.longAccount || 0) - (a.longAccount || 0);
                        console.log(`정렬 비교: ${a.symbol}(${a.longAccount}) vs ${b.symbol}(${b.longAccount}) = ${result}`);
                        return result;
                    }) // 순수하게 롱 비중 높은 순
                    .slice(0, 15); // 더 많은 코인 표시
                
                console.log('=== 스텝 2 완료: 최종 정렬 후 코인들 ===');
                console.log('정렬 후 코인들:', this.allCoins.map(coin => ({
                    symbol: coin.symbol,
                    longAccount: coin.longAccount,
                    shortAccount: coin.shortAccount,
                    volume: coin.volume
                })));
                break;
            case 'ai':
                // AI 추천: AI 점수 높은 코인만
                this.allCoins = filteredCoins
                    .filter(coin => coin.aiScore >= 2)
                    .sort((a, b) => b.aiScore - a.aiScore) // AI 점수 높은 순
                    .slice(0, 10);
                break;
            default: // 'all'
                // 전체: 메인코인 우선 표시 (상위 20개 메인코인 + 10개 밈코인)
                const mainCoins = ['BTC', 'ETH', 'BNB', 'SOL', 'ADA', 'AVAX', 'DOT', 'MATIC', 'LINK', 'UNI', 'XRP', 'DOGE', 'SHIB', 'LTC', 'BCH', 'ATOM', 'NEAR', 'FTM', 'ALGO', 'VET'];
                
                const mainCoinList = filteredCoins.filter(coin => mainCoins.includes(coin.symbol));
                const otherCoins = filteredCoins.filter(coin => !mainCoins.includes(coin.symbol));
                
                console.log('전체 코인 개수:', filteredCoins.length);
                console.log('메인코인 개수:', mainCoinList.length);
                console.log('메인코인 목록:', mainCoinList.map(coin => coin.symbol));
                console.log('기타 코인 개수:', otherCoins.length);
                
                // 메인코인을 순수 거래량 기준으로 정렬 (진짜 지금 거래를 많이 하는 순서)
                const sortedMainCoins = mainCoinList.sort((a, b) => {
                    const aVolume = parseFloat(a.volume || 0);
                    const bVolume = parseFloat(b.volume || 0);
                    return bVolume - aVolume; // 거래량 높은 순
                });
                
                // 밈코인(기타 코인)도 순수 거래량 기준으로 정렬 (진짜 지금 거래를 많이 하는 순서)
                const sortedOtherCoins = otherCoins.sort((a, b) => {
                    const aVolume = parseFloat(a.volume || 0);
                    const bVolume = parseFloat(b.volume || 0);
                    return bVolume - aVolume; // 거래량 높은 순
                });
                
                // 메인코인을 먼저, 그 다음 다른 코인들
                this.allCoins = [...sortedMainCoins, ...sortedOtherCoins].slice(0, 20);
                
                // 거래량 기준 정렬 결과 로깅
                console.log('=== 거래량 기준 정렬 결과 ===');
                console.log('메인코인 거래량 순위:', sortedMainCoins.slice(0, 10).map(coin => ({
                    symbol: coin.symbol,
                    volume: `$${(coin.volume / 1e9).toFixed(2)}B`
                })));
                console.log('밈코인 거래량 순위:', sortedOtherCoins.slice(0, 5).map(coin => ({
                    symbol: coin.symbol,
                    volume: `$${(coin.volume / 1e6).toFixed(1)}M`
                })));
                console.log('최종 표시할 코인 개수:', this.allCoins.length);
                console.log('최종 코인 목록:', this.allCoins.map(coin => coin.symbol));
                break;
        }

        // 필터링된 코인에 대해 AI 스코어 및 순위 재설정
        this.allCoins.forEach((coin, index) => {
            const aiResult = this.calculateAIScore(coin);
            coin.aiScore = aiResult.score;
            coin.aiReasons = aiResult.reasons;
            coin.displayRank = index + 1; // 임시 순위
        });

        // 롱숏 메뉴에서도 정렬 키에 따라 정렬 가능하도록 수정
        if (this.currentMenu === 'longshort') {
            console.log('=== 스텝 3: 롱숏 메뉴 정렬 ===');
            console.log('정렬 전:', this.allCoins.map(coin => `${coin.symbol}: ${coin.longAccount}`));
            console.log('현재 정렬 키:', this.sortKey, '정렬 순서:', this.sortOrder);
            
            // 데이터 검증
            if (!this.allCoins || this.allCoins.length === 0) {
                console.warn('롱숏 메뉴: 정렬할 데이터가 없습니다.');
                return;
            }
            
            // 롱숏 데이터가 있는 코인만 필터링
            const validLongShortCoins = this.allCoins.filter(coin => {
                return coin && typeof coin === 'object' && 
                       coin.longAccount !== undefined && coin.longAccount !== null &&
                       !isNaN(parseFloat(coin.longAccount));
            });
            
            console.log(`유효한 롱숏 데이터가 있는 코인: ${validLongShortCoins.length}개`);
            
            if (validLongShortCoins.length === 0) {
                console.warn('롱숏 메뉴: 유효한 롱숏 데이터가 없습니다.');
                return;
            }
            
            // 완전히 새로운 배열을 만들어서 정렬 (원본 배열 영향 방지)
            let sortedLongShortCoins = [...validLongShortCoins];
            
            try {
                // 정렬 키에 따라 정렬
                if (this.sortKey === 'longAccount' || !this.sortKey || this.sortKey === 'rank') {
                    // 기본적으로 롱 비중 순 정렬
                    sortedLongShortCoins.sort((a, b) => {
                        const longA = parseFloat(a.longAccount) || 0;
                        const longB = parseFloat(b.longAccount) || 0;
                        const result = longB - longA;
                        return this.sortOrder === 'asc' ? -result : result;
                    });
                } else {
                    // 다른 정렬 기준 사용
                    sortedLongShortCoins.sort((a, b) => {
                        let valA = a[this.sortKey];
                        let valB = b[this.sortKey];

                        // null/undefined 체크
                        if (valA === null || valA === undefined) valA = 0;
                        if (valB === null || valB === undefined) valB = 0;

                        // 문자열인 경우 소문자로 변환하여 비교
                        if (typeof valA === 'string') valA = valA.toLowerCase();
                        if (typeof valB === 'string') valB = valB.toLowerCase();

                        if (valA < valB) return this.sortOrder === 'asc' ? -1 : 1;
                        if (valA > valB) return this.sortOrder === 'asc' ? 1 : -1;
                        return 0;
                    });
                }
                
                console.log('정렬 후:', sortedLongShortCoins.map(coin => ({
                    symbol: coin.symbol,
                    longAccount: coin.longAccount,
                    sortKey: this.sortKey,
                    sortOrder: this.sortOrder
                })));
                
                // 정렬 후 순위 재설정
                sortedLongShortCoins.forEach((coin, index) => {
                    coin.displayRank = index + 1;
                });
                
                console.log('순위 재설정 후:', sortedLongShortCoins.map(coin => `${coin.symbol}: ${coin.displayRank}위`));
                
                // 정렬된 배열로 교체
                this.allCoins = sortedLongShortCoins;
                console.log('=== 스텝 3 완료 ===');
                
            } catch (error) {
                console.error('롱숏 메뉴 정렬 중 오류 발생:', error);
                console.error('오류 상세 정보:', {
                    sortKey: this.sortKey,
                    sortOrder: this.sortOrder,
                    coinsCount: validLongShortCoins.length
                });
            }
        } else {
            // 다른 메뉴에서는 현재 정렬 기준에 따라 정렬
            if (this.sortKey && this.sortKey !== 'rank' && this.currentMenu !== 'all') {
                try {
                    console.log(`다른 메뉴 정렬 - 키: ${this.sortKey}, 순서: ${this.sortOrder}`);
                    
                    // 데이터 검증
                    if (!this.allCoins || this.allCoins.length === 0) {
                        console.warn('다른 메뉴: 정렬할 데이터가 없습니다.');
                        return;
                    }
                    
                    this.allCoins.sort((a, b) => {
                        let valA = a[this.sortKey];
                        let valB = b[this.sortKey];

                        // null/undefined 체크
                        if (valA === null || valA === undefined) valA = 0;
                        if (valB === null || valB === undefined) valB = 0;

                        // 문자열인 경우 소문자로 변환하여 비교
                        if (typeof valA === 'string') valA = valA.toLowerCase();
                        if (typeof valB === 'string') valB = valB.toLowerCase();

                        if (valA < valB) return this.sortOrder === 'asc' ? -1 : 1;
                        if (valA > valB) return this.sortOrder === 'asc' ? 1 : -1;
                        return 0;
                    });

                    // 정렬 후 순위 재설정
                    this.allCoins.forEach((coin, index) => {
                        coin.displayRank = index + 1;
                    });
                    
                    console.log(`다른 메뉴 정렬 완료 - ${this.allCoins.length}개 코인 정렬됨`);
                    
                } catch (error) {
                    console.error('다른 메뉴 정렬 중 오류 발생:', error);
                    console.error('오류 상세 정보:', {
                        sortKey: this.sortKey,
                        sortOrder: this.sortOrder,
                        coinsCount: this.allCoins ? this.allCoins.length : 0
                    });
                }
            }
        }

        // 롱숏 메뉴에서는 특별한 처리
        if (this.currentMenu === 'longshort') {
            console.log('=== 스텝 4: 최종 확인 ===');
            console.log('최종 표시할 코인들:', this.allCoins.map(coin => ({
                symbol: coin.symbol,
                rank: coin.displayRank,
                longAccount: coin.longAccount
            })));
            console.log('1위 코인:', this.allCoins[0] ? `${this.allCoins[0].symbol} (${this.allCoins[0].longAccount})` : '없음');
            console.log('=== 스텝 4 완료 ===');
        }
        
        // 코인 목록 표시
        this.displayCoins(this.allCoins);
        
        // 1위 코인 정보 업데이트 (필터링된 코인의 첫 번째)
        if (this.allCoins.length > 0) {
            const topCoin = this.allCoins[0];
            console.log(`1위 코인 업데이트: ${topCoin.symbol} (${this.currentMenu} 메뉴)`);
            this.displayTopCoinInfo(topCoin.symbol, topCoin);
        }
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

    /**
     * iOS 상태바 색상 설정
     */
    setStatusBarColor() {
        // iOS Safari에서 상태바 색상 설정
        if (navigator.userAgent.includes('iPhone') || navigator.userAgent.includes('iPad')) {
            const themeColor = document.documentElement.getAttribute('data-theme') === 'dark' ? '#0f172a' : '#ffffff';
            
            // 메타태그 동적 업데이트
            let themeMeta = document.querySelector('meta[name="theme-color"]');
            if (!themeMeta) {
                themeMeta = document.createElement('meta');
                themeMeta.name = 'theme-color';
                document.head.appendChild(themeMeta);
            }
            themeMeta.content = themeColor;
            
            // iOS 상태바 스타일 설정
            let statusBarMeta = document.querySelector('meta[name="apple-mobile-web-app-status-bar-style"]');
            if (!statusBarMeta) {
                statusBarMeta = document.createElement('meta');
                statusBarMeta.name = 'apple-mobile-web-app-status-bar-style';
                document.head.appendChild(statusBarMeta);
            }
            statusBarMeta.content = 'black-translucent';
            
            console.log('iOS 상태바 색상 설정:', themeColor);
        }
    }

    /**
     * 꿀팁 컨텐츠 표시
     */
    displayTipsContent() {
        // 기존 컨텐츠 숨기기
        const contentDiv = document.getElementById('content');
        const topCoinInfo = document.getElementById('top-coin-info');
        const marketSentiment = document.getElementById('market-sentiment');
        const tipsContent = document.getElementById('tips-content');
        const myInvestContent = document.getElementById('myinvest-content');
        const dictionaryContent = document.getElementById('dictionary-content');

        if (contentDiv) contentDiv.style.display = 'none';
        if (topCoinInfo) topCoinInfo.style.display = 'none';
        if (marketSentiment) marketSentiment.style.display = 'none';
        if (myInvestContent) myInvestContent.style.display = 'none';
        if (dictionaryContent) dictionaryContent.style.display = 'none';

        // 꿀팁 컨텐츠 표시 및 렌더링
        if (tipsContent) {
            tipsContent.style.display = 'block';
            this.renderTipsContent();
        }

        // 꿀팁 카드 클릭 이벤트 바인딩
        this.bindTipCardEvents();
    }

    /**
     * 꿀팁 카드 이벤트 바인딩
     */
    bindTipCardEvents() {
        // 아코디언 기능은 HTML의 onclick으로 처리
        console.log('꿀팁 카드 이벤트 바인딩 완료');
    }

    displayMyInvestContent() {
        // 다른 영역 숨기기
        const contentDiv = document.getElementById('content');
        const topCoinInfo = document.getElementById('top-coin-info');
        const marketSentiment = document.getElementById('market-sentiment');
        const tipsContent = document.getElementById('tips-content');
        const myInvestContent = document.getElementById('myinvest-content');
        const dictionaryContent = document.getElementById('dictionary-content');
        if (contentDiv) contentDiv.style.display = 'none';
        if (topCoinInfo) topCoinInfo.style.display = 'none';
        if (marketSentiment) marketSentiment.style.display = 'none';
        if (tipsContent) tipsContent.style.display = 'none';
        if (dictionaryContent) dictionaryContent.style.display = 'none';
        if (myInvestContent) {
            myInvestContent.style.display = 'block';
            this.renderMyInvestContent();
            renderMyInvestTestCards();
        }
    }

    /**
     * 투자유형 테스트 영역 렌더링
     */
    renderMyInvestContent() {
        const myInvestTitle = document.getElementById('myinvest-title');
        const myInvestSubtitle = document.getElementById('myinvest-subtitle');
        if (!myInvestTitle || !myInvestSubtitle) return;
        
        const t = window.languageManager.t.bind(window.languageManager);
        myInvestTitle.textContent = t('myinvest_title');
        myInvestSubtitle.textContent = t('myinvest_subtitle');
    }

    /**
     * 꿀팁 영역 렌더링
     */
    renderTipsContent() {
        const tipsContent = document.getElementById('tips-content');
        if (!tipsContent) return;
        const t = window.languageManager.t.bind(window.languageManager);
        tipsContent.innerHTML = `
            <div class="tips-header">
                <h2>${t('tips_title')}</h2>
                <p>${t('tips_subtitle')}</p>
            </div>
            <div class="tips-grid">
                ${[1,2,3,4,5,6,7,8].map(i => `
                <div class="tip-card">
                    <div class="tip-header" onclick="toggleTip(this)">
                        <div class="tip-header-left">
                            <div class="tip-icon">${['📈','⚖️','🚀','💰','📊','🎯','😰','📱'][i-1]}</div>
                            <h3>${t(`tips_card${i}_title`)}</h3>
                        </div>
                        <span class="tip-toggle">${t('tips_detail_view')}</span>
                    </div>
                    <div class="tip-content">
                        <p>${t(`tips_card${i}_summary`)}</p>
                        <div class="tip-detail">
                            <p>${t(`tips_card${i}_detail`)}</p>
                        </div>
                    </div>
                </div>
                `).join('')}
            </div>
        `;
    }

    /**
     * 용어사전 컨텐츠 표시
     */
    displayDictionaryContent() {
        console.log('용어사전 컨텐츠 표시 시작');
        
        // 다른 영역들 숨기기
        const contentDiv = document.getElementById('content');
        const topCoinInfo = document.getElementById('top-coin-info');
        const marketSentiment = document.getElementById('market-sentiment');
        const tipsContent = document.getElementById('tips-content');
        const myInvestContent = document.getElementById('myinvest-content');
        const dictionaryContent = document.getElementById('dictionary-content');
        
        if (contentDiv) contentDiv.style.display = 'none';
        if (topCoinInfo) topCoinInfo.style.display = 'none';
        if (marketSentiment) marketSentiment.style.display = 'none';
        if (tipsContent) tipsContent.style.display = 'none';
        if (myInvestContent) myInvestContent.style.display = 'none';
        
        // 용어사전 컨텐츠 표시
        if (dictionaryContent) {
            dictionaryContent.style.display = 'block';
            this.renderDictionaryContent();
        }
    }

    /**
     * 용어사전 컨텐츠 렌더링
     */
    renderDictionaryContent() {
        const dictionaryGrid = document.getElementById('dictionary-grid');
        if (!dictionaryGrid) return;

        const langManager = window.languageManager;
        const t = langManager ? langManager.t.bind(langManager) : (key) => key;

        const dictionaryCards = [
            {
                title: t('dictionary_basics_title'),
                subtitle: t('dictionary_basics_subtitle'),
                icon: '🔐',
                content: `
                    <h3>블록체인 (Blockchain)</h3>
                    <p>분산 원장 기술로, 모든 거래 기록이 투명하게 저장되는 기술</p>
                    
                    <h3>암호화폐 (Cryptocurrency)</h3>
                    <p>암호화 기술을 사용하여 보안을 유지하는 디지털 또는 가상 화폐</p>
                    
                    <h3>지갑 (Wallet)</h3>
                    <ul>
                        <li><strong>핫 지갑:</strong> 인터넷에 연결된 지갑 (편리하지만 보안 위험)</li>
                        <li><strong>콜드 지갑:</strong> 오프라인 지갑 (보안성이 높음)</li>
                        <li><strong>하드웨어 지갑:</strong> 물리적 장치로 보안성이 매우 높음</li>
                    </ul>
                    
                    <h3>채굴 (Mining)</h3>
                    <p>새로운 암호화폐를 생성하고 거래를 검증하는 과정</p>
                    
                    <h3>해시 (Hash)</h3>
                    <p>데이터를 고정 길이의 문자열로 변환하는 암호화 함수</p>
                `
            },
            {
                title: t('dictionary_exchange_title'),
                subtitle: t('dictionary_exchange_subtitle'),
                icon: '🏦',
                content: `
                    <h3>거래소 (Exchange)</h3>
                    <p>암호화폐를 사고팔 수 있는 온라인 플랫폼</p>
                    
                    <h3>스팟 거래 (Spot Trading)</h3>
                    <p>실제 암호화폐를 즉시 사고파는 거래</p>
                    
                    <h3>선물 거래 (Futures Trading)</h3>
                    <p>미래의 특정 가격으로 거래하는 계약</p>
                    
                    <h3>레버리지 (Leverage)</h3>
                    <p>자본 대비 거래 규모를 확대하는 것 (예: 10배 레버리지)</p>
                    
                    <h3>마진 (Margin)</h3>
                    <p>레버리지 거래에 필요한 보증금</p>
                    
                    <h3>청산 (Liquidation)</h3>
                    <p>마진이 부족해져서 강제로 포지션이 정리되는 것</p>
                    
                    <h3>스왑 (Swap)</h3>
                    <p>한 암호화폐를 다른 암호화폐로 교환하는 것</p>
                `
            },
            {
                title: t('dictionary_defi_title'),
                subtitle: t('dictionary_defi_subtitle'),
                icon: '🌊',
                content: `
                    <h3>DeFi (Decentralized Finance)</h3>
                    <p>중앙화된 기관 없이 블록체인 기반으로 운영되는 금융 서비스</p>
                    
                    <h3>NFT (Non-Fungible Token)</h3>
                    <p>대체 불가능한 고유한 디지털 자산</p>
                    
                    <h3>스마트 컨트랙트 (Smart Contract)</h3>
                    <p>자동으로 실행되는 디지털 계약</p>
                    
                    <h3>유동성 풀 (Liquidity Pool)</h3>
                    <p>DeFi에서 거래를 위한 자금 풀</p>
                    
                    <h3>Yield Farming</h3>
                    <p>DeFi 프로토콜에 자금을 제공하고 보상을 받는 것</p>
                    
                    <h3>스테이킹 (Staking)</h3>
                    <p>암호화폐를 네트워크에 예치하고 보상을 받는 것</p>
                    
                    <h3>DAO (Decentralized Autonomous Organization)</h3>
                    <p>중앙화된 관리 없이 자동으로 운영되는 조직</p>
                `
            },
            {
                title: t('dictionary_trading_title'),
                subtitle: t('dictionary_trading_subtitle'),
                icon: '📈',
                content: `
                    <h3>롱 (Long)</h3>
                    <p>가격 상승을 기대하는 포지션</p>
                    
                    <h3>숏 (Short)</h3>
                    <p>가격 하락을 기대하는 포지션</p>
                    
                    <h3>FOMO (Fear Of Missing Out)</h3>
                    <p>놓칠까봐 두려운 심리로 인한 성급한 투자</p>
                    
                    <h3>FUD (Fear, Uncertainty, Doubt)</h3>
                    <p>공포, 불확실성, 의심을 조성하는 정보</p>
                    
                    <h3>HODL</h3>
                    <p>Hold의 오타에서 유래한 암호화폐 홀딩 문화</p>
                    
                    <h3>웨일 (Whale)</h3>
                    <p>대량의 암호화폐를 보유한 대형 투자자</p>
                    
                    <h3>펌프 앤 덤프 (Pump and Dump)</h3>
                    <p>인위적으로 가격을 끌어올린 후 매도하는 조작</p>
                    
                    <h3>손절매 (Stop Loss)</h3>
                    <p>미리 정한 손실 한도에서 포지션을 정리하는 것</p>
                `
            }
        ];

        dictionaryGrid.innerHTML = dictionaryCards.map((card, index) => `
            <div class="tip-card" onclick="toggleDictionaryCard(this)">
                <div class="tip-header">
                    <div class="tip-icon">${card.icon}</div>
                    <div class="tip-title-section">
                        <h3 class="tip-title">${card.title}</h3>
                        <p class="tip-subtitle">${card.subtitle}</p>
                    </div>
                    <div class="tip-arrow">▼</div>
                </div>
                <div class="tip-content">
                    ${card.content}
                </div>
            </div>
        `).join('');

        console.log('용어사전 컨텐츠 렌더링 완료');
    }

    /**
     * 투자 경고 영역 렌더링
     */
    renderInvestmentWarning() {
        const warningDiv = document.getElementById('investment-warning');
        if (!warningDiv) return;
        const t = window.languageManager.t.bind(window.languageManager);
        warningDiv.innerHTML = `
            <div class="warning-header">
                <h3>${t('investment_warning_title')}</h3>
                <p>${t('investment_warning_subtitle')}</p>
            </div>
            <div class="warning-content">
                <div class="warning-item">
                    <div class="warning-icon">💡</div>
                    <div class="warning-text">
                        <h4>${t('warning_info_purpose_title')}</h4>
                        <p>${t('warning_info_purpose_content')}</p>
                    </div>
                </div>
                <div class="warning-item">
                    <div class="warning-icon">⚖️</div>
                    <div class="warning-text">
                        <h4>${t('warning_investment_responsibility_title')}</h4>
                        <p>${t('warning_investment_responsibility_content')}</p>
                    </div>
                </div>
                <div class="warning-item">
                    <div class="warning-icon">📊</div>
                    <div class="warning-text">
                        <h4>${t('warning_market_risk_title')}</h4>
                        <p>${t('warning_market_risk_content')}</p>
                    </div>
                </div>
                <div class="warning-item">
                    <div class="warning-icon">🔍</div>
                    <div class="warning-text">
                        <h4>${t('warning_careful_investment_title')}</h4>
                        <p>${t('warning_careful_investment_content')}</p>
                    </div>
                </div>
            </div>
        `;
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
                const lineColor = changeClass === 'positive' ? '#ef4444' : '#10b981';
                
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
        const langManager = window.languageManager;
        const t = langManager ? langManager.t.bind(langManager) : (key) => key;
        modalTitle.textContent = `${coin.symbol} ${t('coin_info')}`;
        
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
                        <div class="stat-label">${t('market_cap')}</div>
                        <div class="stat-value">$${window.coinApp.formatNumber(coin.accurateMarketCap || coin.marketCap)}</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-label">${t('volume_24h')}</div>
                        <div class="stat-value">$${window.coinApp.formatNumber(coin.volume)}</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-label">${t('rank')}</div>
                        <div class="stat-value">#${coin.rank}</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-label">${t('change')}</div>
                        <div class="stat-value ${changeClass}">${changeSymbol}${coin.priceChangePercent.toFixed(2)}%</div>
                    </div>
                </div>
                
                <div class="sparkline-section">
                    <h4>${t('price_chart_24h')}</h4>
                    <div class="sparkline-container">
                        <div class="sparkline-placeholder">
                            <div id="modal-sparkline-${coin.symbol}" class="sparkline-chart"></div>
                            <div class="sparkline-note">${t('chart_loading')}</div>
                        </div>
                    </div>
                </div>
                
                <div class="coin-info-section">
                    <h4>${t('coin_info')}</h4>
                    <div class="info-grid">
                        <div class="info-item">
                            <span class="info-label">${t('symbol')}:</span>
                            <span class="info-value">${coin.symbol}</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">${t('full_symbol')}:</span>
                            <span class="info-value">${coin.fullSymbol || coin.symbol}</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">${t('current_price')}:</span>
                            <span class="info-value">${window.coinApp.formatUSDPrice(coin.price)}</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">${t('krw_price')}:</span>
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
        const langManager = window.languageManager;
        const t = langManager ? langManager.t.bind(langManager) : (key) => key;
        modalTitle.textContent = symbol + ' ' + t('coin_info');
        modalContent.innerHTML = `
            <div class="coin-detail">
                <p>${t('coin_not_found')}</p>
                <p style="font-size: 0.9rem; color: var(--text-secondary); margin-top: 10px;">
                    ${t('searched_symbol')}: ${symbol}<br>
                    ${t('available_coins')}: ${window.coinApp?.currentCoins?.map(c => c.symbol).slice(0, 10).join(', ')}...
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

// 투자성향 테스트 질문/선택지/점수 (한글/영문)
const myInvestQuestions = [
    {
        ko: "급등 코인을 보면 어떻게 하시나요?",
        en: "What do you do when you see a skyrocketing coin?",
        options: [
            { ko: "안전한 코인으로 도망간다", en: "Move to a safe coin", score: 1 },
            { ko: "일부만 투자해본다", en: "Invest a small portion", score: 2 },
            { ko: "장기 성장성을 분석한다", en: "Analyze long-term growth", score: 3 },
            { ko: "즉시 대량 투자한다", en: "Invest big right away", score: 4 },
            { ko: "빠르게 사고 팔 계획한다", en: "Plan to buy and sell quickly", score: 5 }
        ]
    },
    {
        ko: "손실을 봤을 때 반응은?",
        en: "How do you react when you see a loss?",
        options: [
            { ko: "모든 투자를 중단한다", en: "Stop all investments", score: 1 },
            { ko: "일부만 손절매한다", en: "Sell some positions", score: 2 },
            { ko: "장기 관점으로 기다린다", en: "Wait with long-term perspective", score: 3 },
            { ko: "더 크게 베팅한다", en: "Bet bigger", score: 4 },
            { ko: "빠르게 다른 기회를 찾는다", en: "Quickly find other opportunities", score: 5 }
        ]
    },
    {
        ko: "투자 기간은 어느 정도로 생각하시나요?",
        en: "What investment period do you consider?",
        options: [
            { ko: "1년 이상", en: "More than 1 year", score: 1 },
            { ko: "6개월-1년", en: "6 months to 1 year", score: 2 },
            { ko: "3-5년", en: "3-5 years", score: 3 },
            { ko: "1주일-1개월", en: "1 week to 1 month", score: 4 },
            { ko: "1일-1주일", en: "1 day to 1 week", score: 5 }
        ]
    },
    {
        ko: "시장이 폭락하면?",
        en: "When the market crashes?",
        options: [
            { ko: "현금으로 도망간다", en: "Run to cash", score: 1 },
            { ko: "일부만 현금화한다", en: "Cash out some", score: 2 },
            { ko: "더 많이 산다", en: "Buy more", score: 3 },
            { ko: "레버리지로 공격한다", en: "Attack with leverage", score: 4 },
            { ko: "단기 바닥을 노린다", en: "Target short-term bottom", score: 5 }
        ]
    },
    {
        ko: "수익률 목표는?",
        en: "What's your profit target?",
        options: [
            { ko: "연 5-10%", en: "5-10% annually", score: 1 },
            { ko: "연 15-25%", en: "15-25% annually", score: 2 },
            { ko: "연 30-50%", en: "30-50% annually", score: 3 },
            { ko: "연 100% 이상", en: "100%+ annually", score: 4 },
            { ko: "일 1-5%", en: "1-5% daily", score: 5 }
        ]
    },
    {
        ko: "투자 금액은 어떻게 결정하나요?",
        en: "How do you decide investment amount?",
        options: [
            { ko: "안전한 비율만", en: "Only safe ratio", score: 1 },
            { ko: "수학적 계산으로", en: "Mathematical calculation", score: 2 },
            { ko: "장기 계획에 따라", en: "According to long-term plan", score: 3 },
            { ko: "가진 돈의 대부분", en: "Most of my money", score: 4 },
            { ko: "시장 상황에 따라", en: "According to market situation", score: 5 }
        ]
    },
    {
        ko: "새로운 코인을 발견하면?",
        en: "When you discover a new coin?",
        options: [
            { ko: "기다린다", en: "Wait", score: 1 },
            { ko: "소액으로 테스트한다", en: "Test with small amount", score: 2 },
            { ko: "백그라운드를 조사한다", en: "Research background", score: 3 },
            { ko: "즉시 투자한다", en: "Invest immediately", score: 4 },
            { ko: "단기 기회로 본다", en: "See as short-term opportunity", score: 5 }
        ]
    },
    {
        ko: "거래 빈도는?",
        en: "What's your trading frequency?",
        options: [
            { ko: "거의 하지 않는다", en: "Almost never", score: 1 },
            { ko: "월 1-2회", en: "1-2 times per month", score: 2 },
            { ko: "분기별 조정", en: "Quarterly adjustment", score: 3 },
            { ko: "매일 여러 번", en: "Several times daily", score: 4 },
            { ko: "시간당 여러 번", en: "Several times per hour", score: 5 }
        ]
    },
    {
        ko: "리스크 관리 방법은?",
        en: "How do you manage risk?",
        options: [
            { ko: "분산투자 + 현금보유", en: "Diversification + cash holding", score: 1 },
            { ko: "포트폴리오 균형", en: "Portfolio balance", score: 2 },
            { ko: "장기 관점 리스크 관리", en: "Long-term risk management", score: 3 },
            { ko: "리스크 무시", en: "Ignore risk", score: 4 },
            { ko: "빠른 손절매", en: "Quick stop-loss", score: 5 }
        ]
    },
    {
        ko: "성공한 투자 후에는?",
        en: "After a successful investment?",
        options: [
            { ko: "수익 실현한다", en: "Take profit", score: 1 },
            { ko: "일부 수익 실현한다", en: "Take partial profit", score: 2 },
            { ko: "더 오래 보관한다", en: "Hold longer", score: 3 },
            { ko: "더 크게 베팅한다", en: "Bet bigger", score: 4 },
            { ko: "즉시 팔고 다음 기회를 찾는다", en: "Sell immediately and find next opportunity", score: 5 }
        ]
    },
    {
        ko: "차트를 볼 때 가장 중요하게 보는 것은?",
        en: "What do you focus on most when looking at charts?",
        options: [
            { ko: "안정성 지표", en: "Stability indicators", score: 1 },
            { ko: "균형 지표", en: "Balance indicators", score: 2 },
            { ko: "장기 트렌드", en: "Long-term trends", score: 3 },
            { ko: "변동성", en: "Volatility", score: 4 },
            { ko: "단기 패턴", en: "Short-term patterns", score: 5 }
        ]
    },
    {
        ko: "투자 결정을 내릴 때?",
        en: "When making investment decisions?",
        options: [
            { ko: "신중하게 생각한다", en: "Think carefully", score: 1 },
            { ko: "장단점을 분석한다", en: "Analyze pros and cons", score: 2 },
            { ko: "장기 전망을 본다", en: "Look at long-term outlook", score: 3 },
            { ko: "직감에 따른다", en: "Follow intuition", score: 4 },
            { ko: "빠르게 결정한다", en: "Decide quickly", score: 5 }
        ]
    },
    {
        ko: "시장 정보를 얻는 방법은?",
        en: "How do you get market information?",
        options: [
            { ko: "신뢰할 수 있는 소스만", en: "Only reliable sources", score: 1 },
            { ko: "다양한 소스 종합", en: "Combine various sources", score: 2 },
            { ko: "장기 분석 자료", en: "Long-term analysis data", score: 3 },
            { ko: "실시간 알림", en: "Real-time alerts", score: 4 },
            { ko: "초고속 정보", en: "Ultra-fast information", score: 5 }
        ]
    },
    {
        ko: "투자 목표는?",
        en: "What's your investment goal?",
        options: [
            { ko: "자산 보존", en: "Asset preservation", score: 1 },
            { ko: "안정적 수익", en: "Stable profit", score: 2 },
            { ko: "장기 성장", en: "Long-term growth", score: 3 },
            { ko: "단기 대박", en: "Short-term jackpot", score: 4 },
            { ko: "빠른 수익", en: "Quick profit", score: 5 }
        ]
    },
    {
        ko: "손실이 계속되면?",
        en: "When losses continue?",
        options: [
            { ko: "모든 투자를 중단한다", en: "Stop all investments", score: 1 },
            { ko: "전략을 점검한다", en: "Review strategy", score: 2 },
            { ko: "장기 관점으로 기다린다", en: "Wait with long-term perspective", score: 3 },
            { ko: "더 공격적으로", en: "More aggressively", score: 4 },
            { ko: "다른 전략을 시도한다", en: "Try different strategy", score: 5 }
        ]
    }
];

const myInvestResults = [
    {
        min: 15, max: 27,
        ko: "🛡️ 안전제일형 (Conservative)",
        en: "🛡️ Conservative",
        desc_ko: "별명: 거북이 투자자<br><br>특징: 안정성 최우선, 원금보장 선호<br><br>투자 방식:<br>• 메인코인 위주, 분산투자<br>• 장기 보유, 안전한 비율<br>• 현금 보유 중시<br><br>조언: 천천히 가도 괜찮아요! 하지만 너무 보수적이면 기회를 놓칠 수 있어요 🐢",
        desc_en: "Nickname: Turtle Investor<br><br>Characteristics: Safety first, capital preservation preferred<br><br>Investment style:<br>• Main coins focus, diversification<br>• Long-term holding, safe ratio<br>• Cash holding emphasis<br><br>Advice: It's okay to go slow! But being too conservative might make you miss opportunities 🐢"
    },
    {
        min: 28, max: 41,
        ko: "⚖️ 균형추구형 (Balanced)",
        en: "⚖️ Balanced",
        desc_ko: "별명: 현명한 밸런서<br><br>특징: 안정성과 수익성의 균형<br><br>투자 방식:<br>• 포트폴리오 균형 유지<br>• 수학적 접근, 체계적 투자<br>• 리스크 관리 중시<br><br>조언: 가장 현명한 투자자! 하지만 가끔은 모험도 필요해요 ⚖️",
        desc_en: "Nickname: Wise Balancer<br><br>Characteristics: Balance between stability and profitability<br><br>Investment style:<br>• Portfolio balance maintenance<br>• Mathematical approach, systematic investment<br>• Risk management emphasis<br><br>Advice: The wisest investor! But sometimes adventure is needed ⚖️"
    },
    {
        min: 42, max: 54,
        ko: "🚀 성장추구형 (Growth)",
        en: "🚀 Growth",
        desc_ko: "별명: 미래투자자<br><br>특징: 장기 성장 가능성 중시<br><br>투자 방식:<br>• 혁신적 프로젝트 선호<br>• 장기 관점, 성장성 분석<br>• 기술과 트렌드 중시<br><br>조언: 미래를 보는 눈! 하지만 너무 먼 미래만 보면 현재를 놓칠 수 있어요 👀",
        desc_en: "Nickname: Future Investor<br><br>Characteristics: Long-term growth potential emphasis<br><br>Investment style:<br>• Innovative project preference<br>• Long-term perspective, growth analysis<br>• Technology and trend emphasis<br><br>Advice: Eyes that see the future! But focusing only on the distant future might make you miss the present 👀"
    },
    {
        min: 55, max: 64,
        ko: "🔥 적극공격형 (Aggressive)",
        en: "🔥 Aggressive",
        desc_ko: "별명: 승부사 투자자<br><br>특징: 고위험 고수익 추구<br><br>투자 방식:<br>• 높은 리스크, 높은 수익<br>• 직감적 거래, 단기 투자<br>• 레버리지 선호<br><br>조언: 용감한 투자자! 하지만 화재 보험은 필수예요 🔥",
        desc_en: "Nickname: Risk Taker<br><br>Characteristics: High risk, high return pursuit<br><br>Investment style:<br>• High risk, high return<br>• Intuitive trading, short-term investment<br>• Leverage preference<br><br>Advice: Brave investor! But fire insurance is essential 🔥"
    },
    {
        min: 65, max: 75,
        ko: "📈 단타매매형 (Speculative)",
        en: "📈 Speculative",
        desc_ko: "별명: 데이트레이더<br><br>특징: 빠른 수익실현, 시장 타이밍 중시<br><br>투자 방식:<br>• 단기 거래, 빠른 진입/청산<br>• 시장 타이밍, 기술적 분석<br>• 스캘핑, 데이트레이딩<br><br>조언: 빠른 손재주! 하지만 너무 빠르면 놓칠 수도 있어요 ⚡",
        desc_en: "Nickname: Day Trader<br><br>Characteristics: Quick profit realization, market timing emphasis<br><br>Investment style:<br>• Short-term trading, quick entry/exit<br>• Market timing, technical analysis<br>• Scalping, day trading<br><br>Advice: Quick hands! But being too fast might make you miss opportunities ⚡"
    }
];

function renderMyInvestTestCards() {
    const lang = (window.languageManager && window.languageManager.currentLang) || 'ko';
    const grid = document.getElementById('myinvest-grid');
    if (!grid) return;
    
    let currentQ = 0;
    let userAnswers = [];
    
    function showStartScreen() {
        grid.innerHTML = `
            <div class="tip-card">
                <div class="tip-header">
                    <div class="tip-header-left">
                        <div class="tip-icon">🧠</div>
                        <h3>${lang==='ko'?'투자성향 테스트':'Investment Type Test'}</h3>
                    </div>
                </div>
                <div class="tip-content" style="max-height: 500px;">
                    <div class="tip-detail">
                        <h4 style="margin-bottom: 16px; color: var(--text-primary);">${lang==='ko'?'나의 투자유형을 알아보세요!':'Find out your investment type!'}</h4>
                        <p style="color: var(--text-secondary); line-height: 1.6; margin-bottom: 20px;">
                            ${lang==='ko'?'15개의 질문에 답하고 당신의 투자 성향을 분석해드립니다.':'Answer 15 questions to analyze your investment style.'}
                        </p>
                        <button class="test-start-btn" onclick="startTest()">${lang==='ko'?'테스트 시작하기':'Start Test'}</button>
                    </div>
                </div>
            </div>
        `;
    }
    
    function showQuestion(idx) {
        if (idx >= myInvestQuestions.length) {
            showResult();
            return;
        }
        
        const q = myInvestQuestions[idx];
        grid.innerHTML = `
            <div class="tip-card">
                <div class="tip-header">
                    <div class="tip-header-left">
                        <div class="tip-icon">❓</div>
                        <h3>${lang==='ko'?'질문':'Q'} ${idx + 1}/15</h3>
                    </div>
                </div>
                <div class="tip-content" style="max-height: 500px;">
                    <div class="tip-detail">
                        <h4 style="margin-bottom: 20px; color: var(--text-primary);">${q[lang]}</h4>
                        <div class="q-options"></div>
                    </div>
                </div>
            </div>
        `;
        
        const opts = grid.querySelector('.q-options');
        q.options.forEach((opt, optIdx) => {
            const btn = document.createElement('button');
            btn.className = 'answer-btn';
            btn.innerText = opt[lang];
            btn.onclick = () => {
                userAnswers[idx] = opt.score;
                setTimeout(() => {
                    showQuestion(idx + 1);
                }, 200);
            };
            opts.appendChild(btn);
        });
    }
    
    function showResult() {
        const total = userAnswers.reduce((a,b)=>a+b,0);
        let result = myInvestResults.find(r => total >= r.min && total <= r.max) || myInvestResults[myInvestResults.length-1];
        
        grid.innerHTML = `
            <div class="tip-card">
                <div class="tip-header">
                    <div class="tip-header-left">
                        <div class="tip-icon">🎉</div>
                        <h3>${lang==='ko'?'결과':'Result'}</h3>
                    </div>
                </div>
                <div class="tip-content" style="max-height: 500px;">
                    <div class="tip-detail">
                        <h3 style="color: var(--accent); margin-bottom: 16px;">${result[lang]}</h3>
                        <div style="color: var(--text-secondary); line-height: 1.6; margin-bottom: 20px;">${result['desc_'+lang]}</div>
                        <button class="test-retry-btn" onclick="restartTest()">${lang==='ko'?'다시하기':'Retry'}</button>
                    </div>
                </div>
            </div>
        `;
    }
    
    window.startTest = function() {
        currentQ = 0;
        userAnswers = [];
        showQuestion(0);
    };
    
    window.restartTest = function() {
        showStartScreen();
    };
    
    showStartScreen();
}

/**
 * 가이드 콘텐츠 표시
 */
