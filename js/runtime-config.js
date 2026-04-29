(() => {
    const gatewayPath = atob('L2NvaW4tYXBp');
    const remoteHost = atob('bW9kb25nLmJvYnNpZGEuY29t');
    const configuredBase = (window.RUNTIME_GATEWAY_BASE || window.COIN_API_PROXY_BASE || '').replace(/\/$/, '');
    const localBase = ['127.0.0.1', 'localhost'].includes(window.location.hostname)
        ? `http://127.0.0.1:8787${gatewayPath}`
        : '';
    const sameOriginBase = window.location.hostname === remoteHost ? gatewayPath : '';
    const remoteBase = `https://${remoteHost}${gatewayPath}`;
    const proxyBase = configuredBase || localBase || sameOriginBase || remoteBase;

    function withProxy(path) {
        const normalizedPath = String(path || '').startsWith('/') ? path : `/${path}`;
        return `${proxyBase}${normalizedPath}`;
    }

    window.coinApiUrl = withProxy;
})();
