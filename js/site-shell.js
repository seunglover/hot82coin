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
        'coin-volume-ranking.html': {
            ko: ['거래대금 순위', '코인 거래량과 거래대금 차이를 이해하고 실시간 관심 흐름을 읽는 방법입니다.'],
            en: ['Volume Ranking', 'How to read crypto turnover and volume rankings.']
        },
        'meme-coin-watch.html': {
            ko: ['밈코인 관심도', 'DOGE, SHIB, PEPE 같은 밈코인을 볼 때 확인할 거래대금과 포지션 신호입니다.'],
            en: ['Meme Coin Watch', 'Signals to check when watching DOGE, SHIB, PEPE, and other meme coins.']
        },
        'long-short-ratio.html': {
            ko: ['롱숏비율', '코인 선물 시장의 롱/숏 쏠림과 과열 위험을 해석하는 방법입니다.'],
            en: ['Long/Short Ratio', 'How to read position skew and crowding risk in crypto futures.']
        },
        'rising-coins.html': {
            ko: ['급등 코인', '상승률, 거래대금, 롱숏비율을 함께 보고 급등 코인을 확인하는 기준입니다.'],
            en: ['Rising Coins', 'How to scan fast-moving coins with momentum, turnover, and positioning.']
        },
        'today-rising-coins.html': {
            ko: ['오늘 급등 코인', '상승률과 15분 거래대금으로 오늘 관심이 몰린 코인을 확인하는 기준입니다.'],
            en: ['Today Rising Coins', 'How to check coins gaining attention today with momentum and 15-minute turnover.']
        },
        'volume-spike-coins.html': {
            ko: ['거래량 급증 코인', '거래량과 거래대금 급증이 실제 관심인지 단기 이벤트인지 구분하는 방법입니다.'],
            en: ['Volume Spike Coins', 'How to separate real attention from short-lived volume spikes.']
        },
        'altcoin-volume-ranking.html': {
            ko: ['알트코인 거래대금 순위', 'BTC와 ETH에 가려진 알트코인 순환매와 유동성 흐름을 확인하는 기준입니다.'],
            en: ['Altcoin Volume Ranking', 'How to read altcoin rotation and liquidity outside BTC and ETH.']
        },
        'bitcoin-long-short-ratio.html': {
            ko: ['비트코인 롱숏비율', 'BTC 선물 시장의 롱/숏 쏠림과 과열 위험을 해석하는 방법입니다.'],
            en: ['Bitcoin Long/Short Ratio', 'How to read BTC futures positioning and crowding risk.']
        },
        'meme-coin-ranking.html': {
            ko: ['밈코인 순위', 'DOGE, SHIB, PEPE, WIF 같은 밈코인을 거래대금과 변동성 기준으로 보는 방법입니다.'],
            en: ['Meme Coin Ranking', 'How to read meme coins such as DOGE, SHIB, PEPE, and WIF by turnover and volatility.']
        },
        'coin-market-cap-volume.html': {
            ko: ['시가총액과 거래대금 차이', '코인 시가총액, 거래량, 거래대금이 각각 어떤 의미인지 정리했습니다.'],
            en: ['Market Cap vs Turnover', 'The difference between crypto market cap, volume, and turnover.']
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
        ['nav_volume', 'coin-volume-ranking.html'],
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
            nav_volume: '거래대금',
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
            nav_volume: 'Volume',
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

    const seoPageTranslations = {
        'coin-volume-ranking.html': {
            en: [
                'What is a crypto volume ranking?',
                'A crypto volume ranking shows which coins had the largest traded value over a selected time window. Raw volume only counts token units, while turnover includes price, so it is easier to compare assets with very different unit prices such as BTC, ETH, SOL, and PEPE.',
                'For example, comparing Bitcoin and a low-priced meme coin by token count can be misleading. Turnover makes it clearer where actual money is moving.',
                'Volume vs turnover',
                'Type',
                'Meaning',
                'How to use it',
                'Volume',
                'Number of tokens traded',
                'Useful when comparing one coin against its own past average.',
                'Turnover',
                'Volume multiplied by price',
                'Useful for comparing real attention across different coins.',
                '15m turnover',
                'Money traded during the last 15 minutes',
                'Useful for finding coins that are gaining attention right now.',
                '5 checks before reading volume rankings',
                'Check whether 15-minute turnover suddenly expanded.',
                'Confirm 24-hour volume is high enough to avoid thin-liquidity coins.',
                'See whether price change is moving with turnover.',
                'Check whether the long/short ratio is crowded to one side.',
                'Separate benchmark coins such as BTC and ETH from meme coins.',
                'Frequently asked questions',
                'Does high turnover always mean a coin is good?',
                'No. Turnover means attention has increased; it does not guarantee upside. If turnover expands after a sharp rally, the move may already be overheated.',
                'How often should I check turnover rankings?',
                'Use 15-minute data for short-term flow and compare it with 24-hour data for the broader trend.',
                'Related pages',
                'How to watch meme coin attention',
                'How to read the long/short ratio',
                'How to find rising coins',
                'Live attention dashboard'
            ]
        },
        'meme-coin-watch.html': {
            en: [
                'Why should meme coins be watched separately?',
                'Meme coins react more to community attention, listings, social spread, and short-term liquidity than project fundamentals. DOGE, SHIB, PEPE, and WIF can move quickly when attention concentrates, so they need different checks from benchmark coins.',
                'For meme coins, it is better to read turnover growth, momentum, long/short skew, and how long the coin stays near the top together.',
                'Meme coin attention signals',
                'Signal',
                'Constructive read',
                'Risk read',
                'Turnover growth',
                'May show new attention entering early.',
                'If it appears after a rally, it can mark short-term overheating.',
                'Fast price jump',
                'Shows market participants are reacting quickly.',
                'If turnover is weak, the move may come from thin order books.',
                'Long crowding',
                'Shows strong upside expectation.',
                'One-sided positioning can increase liquidation volatility.',
                'Checklist before watching meme coins',
                'Check whether the coin appears repeatedly in top turnover.',
                'See whether 15-minute turnover increased before price became stretched.',
                'If momentum is high, confirm long/short positioning for crowding.',
                'Compare major meme coins and newer meme coins separately.',
                'When turnover rises during a fall, separate rebound attempts from sell pressure.',
                'Frequently asked questions',
                'If a meme coin ranks first, should I watch it immediately?',
                'It can be an attention candidate, but not an automatic entry signal. The key is whether turnover expanded before or after the price jump.',
                'Can DOGE and PEPE be read with the same standard?',
                'Both are meme coins, but liquidity and recognition differ. DOGE is a major meme coin, while PEPE or WIF are usually watched as higher-volatility meme coins.',
                'Related pages',
                'How to read crypto turnover rankings',
                'How to find rising coins',
                'How to read the long/short ratio',
                'Live attention dashboard'
            ]
        },
        'long-short-ratio.html': {
            en: [
                'What is the long/short ratio?',
                'The long/short ratio compares futures positions betting on upside with positions betting on downside. A high long share does not always mean price will rise; when positioning crowds too far to one side, liquidation volatility can increase.',
                'Read the long/short ratio together with price, turnover, and momentum. Direction calls based on the ratio alone are easy to misread.',
                'How to interpret long/short ratios',
                'Range',
                'Meaning',
                'What to check',
                'Longs near 50%',
                'Positioning is close to balanced.',
                'Turnover and trend matter more.',
                'Longs 60-70%',
                'Upside expectation has increased.',
                'Check whether price already moved too far.',
                'Longs above 70%',
                'Long positioning may be overheated.',
                'A sharp drop can increase long liquidation volatility.',
                'Practical check order',
                'First check whether price is surging or moving sideways.',
                'Confirm whether turnover is rising at the same time.',
                'If long share is above 70%, mark possible overheating separately.',
                'If short share is unusually high, watch for possible short covering.',
                'Check whether the ratio change is repeated or one-off.',
                'Frequently asked questions',
                'Does a high long ratio mean price will rise?',
                'Not necessarily. A high long ratio means more traders expect upside, but it also means many participants are already on the same side.',
                'Can a high short ratio lead to a rebound?',
                'If shorts are heavily built and price moves up, short covering can appear. Still, turnover and actual price reaction should confirm it.',
                'Related pages',
                'How to read crypto turnover rankings',
                'How to find rising coins',
                'How to watch meme coin attention',
                'Live attention dashboard'
            ]
        },
        'rising-coins.html': {
            en: [
                'How do you find rising coins?',
                'If you only look at the top percentage gainer, you may already be late. First check whether 15-minute turnover expands, then see if price momentum follows. This helps separate fresh attention from an already overheated move.',
                'Altcoins and meme coins can become volatile quickly, so liquidity and positioning need to be checked together.',
                'Momentum signals and caution signals',
                'Check',
                'Attention signal',
                'Caution signal',
                '15m turnover',
                'Turnover keeps growing before or during the price move.',
                'If it spikes once and fades, it may be a short event.',
                'Momentum',
                'Price expands gradually with turnover.',
                'If momentum rises without turnover, it may be a liquidity illusion.',
                'Long/short ratio',
                'Positioning is not extremely crowded yet.',
                'If the long share is too high, liquidation volatility can increase.',
                'Rising coin checklist',
                'Start with the highest momentum coins.',
                'Check whether 15-minute turnover actually increased.',
                'Filter out coins with very low 24-hour volume.',
                'Check whether the long/short ratio is already overheated.',
                'Compare benchmark coins, altcoins, and meme coins separately.',
                'Frequently asked questions',
                'Where can I check coins rising today?',
                'Use the rising coins menu in CoinRadar, then compare momentum with turnover and long/short positioning.',
                'Should I enter a coin immediately after it rises?',
                'Risk can be high if the move has already progressed far. Check whether turnover is holding and whether positioning is not overheated first.',
                'Related pages',
                'How to read crypto turnover rankings',
                'How to read the long/short ratio',
                'How to watch meme coin attention',
                'Live attention dashboard'
            ]
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

    function translateSeoStaticPage(page, lang) {
        const translations = seoPageTranslations[page];
        if (!translations) return;

        const elements = Array.from(document.querySelectorAll(
            '.seo-page h2, .seo-page h3, .seo-page p, .seo-page th, .seo-page td, .seo-page li, .seo-related-grid a'
        ));
        if (elements.length !== translations.en.length) return;

        elements.forEach((element, index) => {
            if (!element.dataset.koStatic) {
                element.dataset.koStatic = element.textContent.trim();
            }

            element.textContent = normalizeLang(lang) === 'en'
                ? translations.en[index]
                : element.dataset.koStatic;
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
        translateSeoStaticPage(currentPage(), lang);
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
