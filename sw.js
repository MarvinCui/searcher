// Searcher的Service Worker
const CACHE_NAME = 'searcher-cache-v1';
const urlsToCache = [
    '/searcher/',
    '/searcher/index.html',
    '/searcher/favicon/favicon.svg',
    '/searcher/favicon/favicon-96x96.png',
    '/searcher/favicon.ico',
    '/searcher/favicon/apple-touch-icon.png',
    '/searcher/favicon/site.webmanifest'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                    // 如果找到缓存，返回响应
                    if (response) {
                        return response;
                    }
                    return fetch(event.request);
                }
            )
    );
});