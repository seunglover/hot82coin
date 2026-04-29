import http from 'node:http';

const PORT = Number(process.env.PORT || process.env.COIN_API_PORT || 8787);
const CACHE_TTL_MS = Number(process.env.COIN_API_CACHE_TTL_MS || 15000);
const ALLOWED_ORIGINS = (process.env.COIN_API_ALLOWED_ORIGINS || '*')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);

const upstreams = {
    bybit: 'https://api.bybit.com',
    coingecko: 'https://api.coingecko.com',
    'exchange-rate': 'https://api.exchangerate-api.com'
};

const cache = new Map();

function send(res, status, body, headers = {}) {
    res.writeHead(status, {
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'no-store',
        ...headers
    });
    res.end(typeof body === 'string' ? body : JSON.stringify(body));
}

function corsHeaders(req) {
    const origin = req.headers.origin || '';
    const allowedOrigin = ALLOWED_ORIGINS.includes('*') || !origin
        ? '*'
        : ALLOWED_ORIGINS.includes(origin)
            ? origin
            : '';

    return {
        ...(allowedOrigin ? { 'Access-Control-Allow-Origin': allowedOrigin } : {}),
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Accept',
        'Vary': 'Origin'
    };
}

function proxyTarget(reqUrl) {
    const parsed = new URL(reqUrl, 'http://localhost');
    const [, prefix, upstreamName, ...rest] = parsed.pathname.split('/');

    if (prefix !== 'coin-api' || !upstreams[upstreamName] || rest.length === 0) {
        return null;
    }

    const upstreamPath = `/${rest.join('/')}`;
    return `${upstreams[upstreamName]}${upstreamPath}${parsed.search}`;
}

function cacheKey(req) {
    return `${req.method}:${req.url}`;
}

async function handle(req, res) {
    const headers = corsHeaders(req);

    if (req.method === 'OPTIONS') {
        res.writeHead(204, headers);
        res.end();
        return;
    }

    if (req.method !== 'GET') {
        send(res, 405, { error: 'method_not_allowed' }, headers);
        return;
    }

    const target = proxyTarget(req.url || '');
    if (!target) {
        send(res, 404, { error: 'not_found' }, headers);
        return;
    }

    const key = cacheKey(req);
    const cached = cache.get(key);
    if (cached && Date.now() - cached.time < CACHE_TTL_MS) {
        send(res, 200, cached.body, {
            ...headers,
            'Cache-Control': `public, max-age=${Math.floor(CACHE_TTL_MS / 1000)}`,
            'X-Coin-Proxy-Cache': 'HIT'
        });
        return;
    }

    try {
        const upstream = await fetch(target, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'User-Agent': 'StaticRuntimeGateway/1.0'
            }
        });

        const text = await upstream.text();
        if (!upstream.ok) {
            send(res, upstream.status, { error: 'upstream_error', status: upstream.status }, headers);
            return;
        }

        cache.set(key, { time: Date.now(), body: text });
        send(res, 200, text, {
            ...headers,
            'Cache-Control': `public, max-age=${Math.floor(CACHE_TTL_MS / 1000)}`,
            'X-Coin-Proxy-Cache': 'MISS'
        });
    } catch {
        send(res, 502, { error: 'proxy_failed' }, headers);
    }
}

http.createServer((req, res) => {
    handle(req, res).catch(() => {
        send(res, 500, { error: 'internal_error' }, corsHeaders(req));
    });
}).listen(PORT, '127.0.0.1', () => {
    console.log(`runtime-gateway listening on 127.0.0.1:${PORT}`);
});
