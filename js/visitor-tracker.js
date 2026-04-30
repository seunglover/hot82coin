(() => {
    const STORAGE_KEYS = {
        visitor: 'cr_visitor_id',
        session: 'cr_session_id',
        sessionTime: 'cr_session_time'
    };
    const SESSION_TTL = 30 * 60 * 1000;
    const DEDUPE_TTL = 20 * 1000;
    const PRODUCTION_HOSTS = ['cryptopulse.kr', 'www.cryptopulse.kr'];

    function randomId(prefix) {
        const bytes = new Uint8Array(12);
        crypto.getRandomValues(bytes);
        const value = Array.from(bytes, byte => byte.toString(16).padStart(2, '0')).join('');
        return `${prefix}_${value}`;
    }

    function getStorageValue(storage, key) {
        try {
            return storage.getItem(key);
        } catch (_) {
            return null;
        }
    }

    function setStorageValue(storage, key, value) {
        try {
            storage.setItem(key, value);
        } catch (_) {
            // Ignore storage failures; analytics should never affect the site.
        }
    }

    function getVisitorId() {
        const existing = getStorageValue(localStorage, STORAGE_KEYS.visitor);
        if (existing) return existing;

        const next = randomId('v');
        setStorageValue(localStorage, STORAGE_KEYS.visitor, next);
        return next;
    }

    function getSessionId() {
        const now = Date.now();
        const savedAt = Number(getStorageValue(sessionStorage, STORAGE_KEYS.sessionTime) || 0);
        const existing = getStorageValue(sessionStorage, STORAGE_KEYS.session);

        if (existing && savedAt && now - savedAt < SESSION_TTL) {
            setStorageValue(sessionStorage, STORAGE_KEYS.sessionTime, String(now));
            return existing;
        }

        const next = randomId('s');
        setStorageValue(sessionStorage, STORAGE_KEYS.session, next);
        setStorageValue(sessionStorage, STORAGE_KEYS.sessionTime, String(now));
        return next;
    }

    function shouldSkip() {
        const host = window.location.hostname;
        const isProductionHost = PRODUCTION_HOSTS.includes(host);

        if (!isProductionHost && window.PRIVATE_VISITS_ENABLED !== true) return true;
        if (host === 'localhost' || host === '127.0.0.1' || host === '::1') return true;
        if (window.location.pathname.endsWith('/debug.html')) return true;
        if (window.location.pathname.endsWith('/private-stats.html')) return true;
        if (navigator.doNotTrack === '1' || window.doNotTrack === '1') return true;
        return false;
    }

    function endpoint(path) {
        if (typeof window.coinApiUrl === 'function') {
            return window.coinApiUrl(path);
        }

        const gatewayPath = atob('L2NvaW4tYXBp');
        const remoteHost = atob('bW9kb25nLmJvYnNpZGEuY29t');
        return `https://${remoteHost}${gatewayPath}${path}`;
    }

    function referrerOrigin() {
        if (!document.referrer) return '';
        try {
            return new URL(document.referrer).origin;
        } catch (_) {
            return '';
        }
    }

    function sendPageview() {
        if (shouldSkip()) return;

        const path = `${window.location.pathname || '/'}${window.location.search || ''}`;
        const dedupeKey = `cr_hit_${path}`;
        const lastHit = Number(getStorageValue(sessionStorage, dedupeKey) || 0);
        const now = Date.now();
        if (lastHit && now - lastHit < DEDUPE_TTL) return;
        setStorageValue(sessionStorage, dedupeKey, String(now));

        const payload = {
            site: 'cryptopulse.kr',
            type: 'pageview',
            path,
            title: document.title || '',
            referrer: referrerOrigin(),
            visitorId: getVisitorId(),
            sessionId: getSessionId(),
            language: navigator.language || '',
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || '',
            screen: `${window.screen.width || 0}x${window.screen.height || 0}`,
            timestamp: new Date().toISOString()
        };
        const url = endpoint('/visits/pageview');
        const body = JSON.stringify(payload);

        try {
            fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'text/plain;charset=UTF-8' },
                body,
                mode: 'no-cors',
                credentials: 'omit',
                keepalive: true
            }).catch(() => {});
        } catch (_) {
            // Keep visitor tracking private and non-blocking.
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', sendPageview, { once: true });
    } else {
        sendPageview();
    }
})();
