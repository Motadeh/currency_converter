const staticCacheName = 'cache-v1';

let allCaches = [
    staticCacheName
  ];

  const urlsToCache = [
    '/',
    '/main.js',
    '/db.js',
    '/idb/lib/idb.js',
    '/currencyconverter.html',
    '/currencyconverter.css',
    '/converter.js'
];

self.addEventListener('install', (event) => {
    console.log('[ServiceWorker] install');
    event.waitUntil(
        caches.open(staticCacheName)

            .then(

                (cache) => {
                    console.log('[ServiceWorker] Caching app shell');
                    return cache.addAll(urlsToCache);
                }
            )
    )
});

self.addEventListener('activate', (event) => {
    console.log('[ServiceWorker] Activate');
    event.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(
                cacheNames.filter(function (cacheName) {
                    console.log('[ServiceWorker] Removing old cache', cacheName);
                    return cacheName.startsWith('currency-') &&
                        !allCaches.includes(cacheName);
                }).map(function (cacheName) {
                    return caches.delete(cacheName);
                })
            );
        })
    );
})

self.addEventListener('fetch', (event) => {
    console.log('[ServiceWorker] Fetch', event.request.url);
    event.respondWith(
        caches.match(event.request).then(function (response) {
            if (response) return response;
            return fetch(event.request).then(function (response) {
                // console.log('[ServiceWorker] Response', response);
                return response
            });
        })
    );
})

/* self.addEventListener('fetch', function(e) {

    var dataUrl = 'https://free.currencyconverterapi.com/api/v5/convert?';

    if (e.request.url.includes(dataUrl)) {
  
      e.respondWith(
  
          fetch(e.request).then( (res) => {
  
              console.log('Fetching from Network');
  
              const resClone = res.clone();
  
              caches.open(dynamicCacheName).then( (cache) => {
  
                  cache.put(e.request, resClone);
  
              });
  
              return res;
  
          }).catch(function() {
  
              console.log('Fetching from Cache');
  
              return caches.match(e.request);
  
          })
  
      );
  
    } else {
  
      e.respondWith(
  
        caches.match(e.request).then( (response) => {
  
          return response || fetch(e.request);
  
        })
  
      );
  
    }
  
  }); */


self.addEventListener('message', function (event) {
    if (event.data.action === 'skipWaiting') {
        self.skipWaiting();
    }
});