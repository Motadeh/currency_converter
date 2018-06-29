var filesToCache = [
    '.',
    'db.js',
    'main.js',
    'converter.js',
    'currencyconverter.css',
    'currencyconverter.html',
    'idb/lib/idb.js',

];

var staticCacheName = 'cache-v1';

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(staticCacheName).then(cache => {
            return cache.addAll(filesToCache);
        })
    );
});