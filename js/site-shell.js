(() => {
    const pageMeta = {
        'about.html': {
            ko: ['사이트 소개', 'CoinRadar가 어떤 기준으로 코인 관심도를 보여주는지 확인하세요.'],
            en: ['About', 'See how CoinRadar ranks market attention across crypto assets.']
        },
        'market-analysis.html': {
            ko: ['시장 분석', '거래대금, 변동률, 롱/숏 쏠림을 읽는 방법을 정리했습니다.'],
            en: ['Market Analysis', 'Learn how to read volume, momentum, and long/short positioning.']
        },
        'crypto-guide.html': {
            ko: ['초보 가이드', '비트코인, 알트코인, 밈코인을 처음 보는 사람을 위한 입문 가이드입니다.'],
            en: ['Beginner Guide', 'A first look at Bitcoin, altcoins, and meme coins.']
        },
        'trading-basics.html': {
            ko: ['트레이딩 기초', '주문 방식, 리스크 관리, 포지션 운용의 기본을 확인하세요.'],
            en: ['Trading Basics', 'Review order types, risk control, and position management.']
        },
        'safety-tips.html': {
            ko: ['보안 가이드', '거래소, 지갑, 모바일 사용 시 반드시 확인할 보안 체크리스트입니다.'],
            en: ['Security Guide', 'A practical checklist for exchanges, wallets, and mobile trading.']
        },
        'faq.html': {
            ko: ['FAQ', 'CoinRadar와 코인 데이터에 대해 자주 묻는 질문을 모았습니다.'],
            en: ['FAQ', 'Common questions about CoinRadar and crypto market data.']
        },
        'contact.html': {
            ko: ['문의하기', '제안, 오류 신고, 협업 문의를 남겨주세요.'],
            en: ['Contact', 'Send suggestions, bug reports, or collaboration requests.']
        },
        'privacy.html': {
            ko: ['개인정보처리방침', '개인정보 처리 기준과 보관 방식을 안내합니다.'],
            en: ['Privacy Policy', 'How personal data is handled and stored.']
        },
        'terms.html': {
            ko: ['이용약관', '서비스 이용 기준과 책임 범위를 안내합니다.'],
            en: ['Terms', 'Service usage rules and responsibility scope.']
        },
        '404.html': {
            ko: ['페이지를 찾을 수 없음', '요청하신 페이지가 없거나 주소가 변경되었습니다.'],
            en: ['Page Not Found', 'The requested page does not exist or the address has changed.']
        }
    };

    const navItems = [
        ['nav_dashboard', 'index.html'],
        ['nav_market', 'market-analysis.html'],
        ['nav_guide', 'crypto-guide.html'],
        ['nav_trading', 'trading-basics.html'],
        ['nav_security', 'safety-tips.html'],
        ['nav_faq', 'faq.html']
    ];

    const text = {
        ko: {
            brandSubtitle: 'Crypto Market Watch',
            navLabel: '코인 레이더 메뉴',
            nav_dashboard: '대시보드',
            nav_market: '시장분석',
            nav_guide: '가이드',
            nav_trading: '트레이딩',
            nav_security: '보안',
            nav_faq: 'FAQ',
            nav_currency: 'KRW',
            langLabel: '언어 전환',
            searchLabel: '코인 검색',
            homeLabel: 'CoinRadar 홈'
        },
        en: {
            brandSubtitle: 'Crypto Market Watch',
            navLabel: 'CoinRadar menu',
            nav_dashboard: 'Dashboard',
            nav_market: 'Market',
            nav_guide: 'Guide',
            nav_trading: 'Trading',
            nav_security: 'Security',
            nav_faq: 'FAQ',
            nav_currency: 'USD',
            langLabel: 'Language',
            searchLabel: 'Search coins',
            homeLabel: 'CoinRadar home'
        }
    };

    function currentPage() {
        const file = window.location.pathname.split('/').pop();
        return file || 'index.html';
    }

    function normalizeLang(lang) {
        return lang === 'en' ? 'en' : 'ko';
    }

    function getStoredLang() {
        const saved = localStorage.getItem('language') || localStorage.getItem('siteLang');
        if (saved === 'ko' || saved === 'en') return saved;

        const browserLang = (navigator.language || '').toLowerCase();
        return browserLang.startsWith('en') ? 'en' : 'ko';
    }

    function t(key, lang) {
        const dict = text[normalizeLang(lang)] || text.ko;
        return dict[key] || text.ko[key] || key;
    }

    function createNav(page) {
        const lang = getStoredLang();
        const nav = document.createElement('nav');
        nav.className = 'site-nav';
        nav.setAttribute('aria-label', t('navLabel', lang));
        nav.innerHTML = `
            <a class="brand-mark" href="index.html" aria-label="${t('homeLabel', lang)}">
                <span class="brand-symbol">CR</span>
                <span>
                    <strong>CoinRadar</strong>
                    <small data-site-i18n="brandSubtitle">${t('brandSubtitle', lang)}</small>
                </span>
            </a>
            <div class="nav-links" aria-label="주요 메뉴">
                ${navItems.map(([key, href]) => `
                    <a href="${href}" data-site-i18n="${key}" ${page === href ? 'aria-current="page"' : ''}>${t(key, lang)}</a>
                `).join('')}
            </div>
            <div class="nav-tools">
                <a class="nav-currency" href="index.html" data-site-i18n="nav_currency">${t('nav_currency', lang)}</a>
            </div>
        `;
        return nav;
    }

    function ensureLanguageSwitcher(nav) {
        if (!nav || nav.querySelector('.nav-language-switch')) return;

        const tools = nav.querySelector('.nav-tools');
        if (!tools) return;

        const switcher = document.createElement('div');
        switcher.className = 'nav-language-switch';
        switcher.setAttribute('aria-label', t('langLabel', getStoredLang()));
        switcher.innerHTML = `
            <button class="site-lang-btn" type="button" data-site-lang="ko">KR</button>
            <button class="site-lang-btn" type="button" data-site-lang="en">EN</button>
        `;
        tools.append(switcher);
    }

    function enhanceHeader(page) {
        const meta = pageMeta[page];
        if (!meta) return;

        const header = document.querySelector(
            '.header, .analysis-header, .guide-header, .trading-header, .safety-header, .faq-header, .contact-header, .error-container'
        );

        if (!header) return;

        header.classList.add('subpage-hero');
        const title = header.querySelector('h1, .analysis-title, .guide-title, .trading-title, .safety-title, .faq-title, .contact-title, .error-title');
        if (title) {
            title.dataset.ko = meta.ko[0];
            title.dataset.en = meta.en[0];
        }

        if (!header.querySelector('.subpage-kicker')) {
            const kicker = document.createElement('p');
            kicker.className = 'subpage-kicker';
            kicker.textContent = 'CoinRadar';
            header.prepend(kicker);
        }

        if (!header.querySelector('.subpage-summary')) {
            const summary = document.createElement('p');
            summary.className = 'subpage-summary';
            summary.dataset.ko = meta.ko[1];
            summary.dataset.en = meta.en[1];
            header.append(summary);
        }
    }

    function translateDataAttrs(lang) {
        document.querySelectorAll('[data-ko][data-en]').forEach(element => {
            const value = element.getAttribute(`data-${normalizeLang(lang)}`);
            if (value !== null) {
                element.textContent = value;
            }
        });
    }

    function translateShell(lang) {
        document.documentElement.lang = normalizeLang(lang);

        const nav = document.querySelector('.site-nav');
        if (nav) {
            nav.setAttribute('aria-label', t('navLabel', lang));
            const brand = nav.querySelector('.brand-mark');
            if (brand) brand.setAttribute('aria-label', t('homeLabel', lang));
            const search = nav.querySelector('[data-jump-menu="all"]');
            if (search) search.setAttribute('aria-label', t('searchLabel', lang));
            const switcher = nav.querySelector('.nav-language-switch');
            if (switcher) switcher.setAttribute('aria-label', t('langLabel', lang));
        }

        document.querySelectorAll('[data-site-i18n]').forEach(element => {
            element.textContent = t(element.getAttribute('data-site-i18n'), lang);
        });

        translateDataAttrs(lang);
        syncLanguageButtons(lang);
    }

    function syncLanguageButtons(lang) {
        const current = normalizeLang(lang);
        document.querySelectorAll('.site-lang-btn, .lang-btn').forEach(button => {
            const buttonLang = button.getAttribute('data-site-lang') || button.getAttribute('data-lang');
            const active = buttonLang === current;
            button.classList.toggle('active', active);
            button.setAttribute('aria-pressed', active ? 'true' : 'false');
        });
    }

    function setLanguage(lang) {
        const nextLang = normalizeLang(lang);
        localStorage.setItem('language', nextLang);
        localStorage.setItem('siteLang', nextLang);

        if (window.languageManager && window.languageManager.currentLang !== nextLang) {
            window.languageManager.changeLanguage(nextLang);
            return;
        }

        translateShell(nextLang);
        window.dispatchEvent(new CustomEvent('coin-lang-change', { detail: { lang: nextLang } }));
    }

    function bindLanguageControls() {
        document.addEventListener('click', event => {
            const button = event.target.closest('[data-site-lang]');
            if (!button) return;
            setLanguage(button.getAttribute('data-site-lang'));
        });

        window.addEventListener('coin-lang-change', event => {
            translateShell(event.detail?.lang || getStoredLang());
        });
    }

    function init() {
        const page = currentPage();
        if (page === 'googlec2631b4483936e2a.html') return;

        const isSubpage = page !== 'index.html';
        if (isSubpage) {
            document.documentElement.setAttribute('data-theme', localStorage.getItem('theme') || 'dark');
            document.body.classList.add('subpage');
        }

        const container = document.querySelector('.container') || document.body;
        if (isSubpage && !document.querySelector('.site-nav')) {
            container.prepend(createNav(page));
        }

        ensureLanguageSwitcher(document.querySelector('.site-nav'));
        if (isSubpage) {
            enhanceHeader(page);
        }

        bindLanguageControls();
        translateShell((window.languageManager && window.languageManager.currentLang) || getStoredLang());
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
