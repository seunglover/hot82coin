/**
 * 다국어 지원 언어 데이터
 */
const i18n = {
    ko: {
        // 헤더
        title: "🔥 지금 핫한 코인 순위",
        subtitle: "해외거래소에서 핫한 코인",
        
        // 메뉴
        menu_all: "전체",
        menu_rising: "급등 코인",
        menu_volume: "거래량 급증",
        menu_longshort: "롱/숏 비율",
        menu_ai: "🔮 AI 추천",
        
        // 1위 코인 정보
        top_coin_label: "🥇 1위 코인:",
        
        // 로딩
        loading_message: "코인 데이터를 불러오는 중...",
        loading_note: "모바일에서는 잠시 기다려주세요",
        
        // 시장 심리 지표
        market_sentiment_label: "📊 시장 심리 지표",
        sentiment_neutral: "중립",
        sentiment_bullish: "강세",
        sentiment_bearish: "약세",
        long_label: "롱:",
        short_label: "숏:",
        
        // 푸터
        realtime_updating: "실시간 반영중",
        next_update: "다음 업데이트:",
        mobile_optimized: "📱 모바일 최적화 | 🔄 5분 자동 업데이트",
        about_link: "📖 사이트 소개",
        
        // 모달
        coin_info: "코인 정보",
        
        // 기타
        volume_surge: "거래량 급증",
        volume_high: "거래량 높음",
        ai_pick: "AI PICK",
        rank_new: "NEW",
        no_data: "데이터 없음",
        
        // 테이블 헤더
        rank: "순위",
        coin: "코인명",
        longshort: "롱/숏",
        volume: "거래량",
        change: "변동률",
        chart: "차트",
        interest: "관심도",
        
        // 언어 전환
        language_ko: "한국어",
        language_en: "English"
    },
    
    en: {
        // 헤더
        title: "🔥 Hot Coin Rankings Now",
        subtitle: "Hot coins from overseas exchanges",
        
        // 메뉴
        menu_all: "All",
        menu_rising: "Rising",
        menu_volume: "Volume Surge",
        menu_longshort: "Long/Short",
        menu_ai: "🔮 AI Pick",
        
        // 1위 코인 정보
        top_coin_label: "🥇 Top Coin:",
        
        // 로딩
        loading_message: "Loading coin data...",
        loading_note: "Please wait on mobile",
        
        // 시장 심리 지표
        market_sentiment_label: "📊 Market Sentiment",
        sentiment_neutral: "Neutral",
        sentiment_bullish: "Bullish",
        sentiment_bearish: "Bearish",
        long_label: "Long:",
        short_label: "Short:",
        
        // 푸터
        realtime_updating: "Real-time updating",
        next_update: "Next update:",
        mobile_optimized: "📱 Mobile optimized | 🔄 5min auto update",
        about_link: "📖 About",
        
        // 모달
        coin_info: "Coin Info",
        
        // 기타
        volume_surge: "Volume Surge",
        volume_high: "High Volume",
        ai_pick: "AI PICK",
        rank_new: "NEW",
        no_data: "No data",
        
        // 테이블 헤더
        rank: "Rank",
        coin: "Coin",
        longshort: "Long/Short",
        volume: "Volume",
        change: "Change",
        chart: "Chart",
        interest: "Interest",
        
        // 언어 전환
        language_ko: "한국어",
        language_en: "English"
    }
};

/**
 * 현재 언어 설정 관리
 */
class LanguageManager {
    constructor() {
        this.currentLang = this.loadLanguage();
        this.init();
    }
    
    /**
     * 언어 설정 초기화
     */
    init() {
        this.updatePageLanguage();
        
        // IP 기반 지역 감지 실행 (비동기)
        this.detectLanguageByIP();
    }
    
    /**
     * 저장된 언어 설정 불러오기
     */
    loadLanguage() {
        // 저장된 언어 설정이 있으면 사용
        const savedLang = localStorage.getItem('language');
        if (savedLang) {
            return savedLang;
        }
        
        // 저장된 설정이 없으면 자동 감지
        return this.detectLanguage();
    }
    
    /**
     * 자동 언어 감지
     */
    detectLanguage() {
        // 1. 브라우저 언어 설정 확인
        const browserLang = navigator.language || navigator.userLanguage;
        if (browserLang) {
            const langCode = browserLang.toLowerCase();
            if (langCode.startsWith('ko') || langCode.startsWith('ko-kr')) {
                return 'ko';
            } else if (langCode.startsWith('en')) {
                return 'en';
            }
        }
        
        // 2. 사용 가능한 언어 목록 확인
        const languages = navigator.languages || [navigator.language];
        for (const lang of languages) {
            const langCode = lang.toLowerCase();
            if (langCode.startsWith('ko')) {
                return 'ko';
            } else if (langCode.startsWith('en')) {
                return 'en';
            }
        }
        
        // 3. IP 기반 지역 감지 (비동기)
        this.detectLanguageByIP();
        
        // 4. 기본값 (영어) - 한국 이외 지역에서는 영어로 표시
        return 'en';
    }
    
    /**
     * IP 기반 지역 감지
     */
    async detectLanguageByIP() {
        try {
            // 무료 IP 지역 감지 API 사용
            const response = await fetch('https://ipapi.co/json/');
            const data = await response.json();
            
            if (data.country_code === 'KR') {
                // 한국에서 접속한 경우 한국어로 설정
                if (this.currentLang !== 'ko') {
                    this.changeLanguage('ko');
                }
            } else if (data.country_code) {
                // 한국이 아닌 다른 국가에서 접속한 경우 영어로 설정
                if (this.currentLang !== 'en') {
                    this.changeLanguage('en');
                }
            }
        } catch (error) {
            console.log('IP 기반 언어 감지 실패, 브라우저 설정 사용:', error);
            // IP 감지 실패 시 기본값은 영어로 설정
            if (this.currentLang !== 'en') {
                this.changeLanguage('en');
            }
        }
    }
    
    /**
     * 언어 설정 저장
     */
    saveLanguage(lang) {
        localStorage.setItem('language', lang);
        this.currentLang = lang;
    }
    
    /**
     * 텍스트 번역
     */
    t(key) {
        return i18n[this.currentLang][key] || i18n.ko[key] || key;
    }
    
    /**
     * 언어 변경
     */
    changeLanguage(lang) {
        this.saveLanguage(lang);
        this.updatePageLanguage();
        
        // 언어 전환 버튼 업데이트
        this.updateLanguageButtons();
        
        // 페이지 새로고침 없이 텍스트 업데이트
        this.updateAllTexts();
        
        // 사용자에게 언어 변경 알림
        this.showLanguageChangeNotification(lang);
    }
    
    /**
     * 언어 변경 알림 표시
     */
    showLanguageChangeNotification(lang) {
        const notification = document.createElement('div');
        notification.className = 'language-notification';
        notification.innerHTML = `
            <div class="notification-content">
                <span>🌐 ${lang === 'ko' ? '한국어로 변경되었습니다' : 'Changed to English'}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;
        
        // 스타일 적용
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--bg-card);
            border: 1px solid var(--border);
            border-radius: 8px;
            padding: 12px 16px;
            box-shadow: var(--shadow);
            z-index: 1000;
            animation: slideIn 0.3s ease-out;
            font-size: 0.9rem;
            color: var(--text-primary);
        `;
        
        // 닫기 버튼 이벤트
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.style.cssText = `
            background: none;
            border: none;
            color: var(--text-secondary);
            font-size: 1.2rem;
            cursor: pointer;
            margin-left: 10px;
            padding: 0;
        `;
        
        closeBtn.addEventListener('click', () => {
            notification.style.animation = 'slideOut 0.3s ease-in';
            setTimeout(() => notification.remove(), 300);
        });
        
        // 3초 후 자동 제거
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.animation = 'slideOut 0.3s ease-in';
                setTimeout(() => notification.remove(), 300);
            }
        }, 3000);
        
        document.body.appendChild(notification);
    }
    
    /**
     * 페이지 언어 속성 업데이트
     */
    updatePageLanguage() {
        document.documentElement.lang = this.currentLang;
    }
    
    /**
     * 언어 전환 버튼 업데이트
     */
    updateLanguageButtons() {
        const langButtons = document.querySelectorAll('.lang-btn');
        langButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-lang') === this.currentLang) {
                btn.classList.add('active');
            }
        });
    }
    
    /**
     * 모든 텍스트 업데이트
     */
    updateAllTexts() {
        // 헤더
        const title = document.querySelector('.header h1');
        const subtitle = document.querySelector('.header p');
        if (title) title.textContent = this.t('title');
        if (subtitle) subtitle.textContent = this.t('subtitle');
        
        // 메뉴 버튼
        const menuButtons = document.querySelectorAll('.menu-btn');
        menuButtons.forEach(btn => {
            const menuType = btn.getAttribute('data-menu');
            if (menuType && menuType !== 'theme') {
                btn.textContent = this.t(`menu_${menuType}`);
            }
        });
        
        // 1위 코인 라벨
        const topCoinLabel = document.querySelector('.top-coin-label');
        if (topCoinLabel) topCoinLabel.textContent = this.t('top_coin_label');
        
        // 로딩 메시지
        const loadingMessages = document.querySelectorAll('.loading p');
        if (loadingMessages.length > 0) {
            loadingMessages[0].textContent = this.t('loading_message');
            if (loadingMessages[1]) {
                loadingMessages[1].textContent = this.t('loading_note');
            }
        }
        
        // 시장 심리 지표
        const sentimentLabel = document.querySelector('.sentiment-label');
        if (sentimentLabel) sentimentLabel.textContent = this.t('market_sentiment_label');
        
        // 시장 심리 상태 텍스트
        const sentimentStatus = document.getElementById('sentiment-status');
        if (sentimentStatus) {
            const currentStatus = sentimentStatus.textContent;
            if (currentStatus === '중립' || currentStatus === 'Neutral') {
                sentimentStatus.textContent = this.t('sentiment_neutral');
            } else if (currentStatus === '강세' || currentStatus === 'Bullish') {
                sentimentStatus.textContent = this.t('sentiment_bullish');
            } else if (currentStatus === '약세' || currentStatus === 'Bearish') {
                sentimentStatus.textContent = this.t('sentiment_bearish');
            }
        }
        
        // 롱/숏 라벨
        const longRatio = document.getElementById('long-ratio');
        const shortRatio = document.getElementById('short-ratio');
        if (longRatio) {
            const currentText = longRatio.textContent;
            const ratioMatch = currentText.match(/:\s*(.+)$/);
            const ratioValue = ratioMatch ? ratioMatch[1] : '-';
            longRatio.textContent = `${this.t('long_label')} ${ratioValue}`;
        }
        if (shortRatio) {
            const currentText = shortRatio.textContent;
            const ratioMatch = currentText.match(/:\s*(.+)$/);
            const ratioValue = ratioMatch ? ratioMatch[1] : '-';
            shortRatio.textContent = `${this.t('short_label')} ${ratioValue}`;
        }
        
        // 푸터
        const footerText = document.querySelector('.footer p');
        if (footerText) footerText.textContent = this.t('mobile_optimized');
        
        const aboutLink = document.querySelector('.footer-link');
        if (aboutLink) aboutLink.textContent = this.t('about_link');
        
        // 모달 제목
        const modalTitle = document.getElementById('modalTitle');
        if (modalTitle) modalTitle.textContent = this.t('coin_info');
        
        // 실시간 업데이트 텍스트
        const lastUpdate = document.getElementById('last-update');
        if (lastUpdate) {
            lastUpdate.textContent = this.t('realtime_updating');
        }
        
        // 다음 업데이트 텍스트
        const nextUpdate = document.getElementById('next-update');
        if (nextUpdate) {
            // 기존 시간 정보를 보존
            const currentText = nextUpdate.textContent;
            const timeMatch = currentText.match(/:\s*(.+)$/);
            const timeText = timeMatch ? timeMatch[1] : '-';
            nextUpdate.textContent = `${this.t('next_update')} ${timeText}`;
        }
    }
}

// 전역 언어 관리자 인스턴스
window.languageManager = new LanguageManager(); 