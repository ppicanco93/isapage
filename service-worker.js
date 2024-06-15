// service-worker.js
self.addEventListener('install', (event) => {
  console.log('Service Worker: Installing');
  event.waitUntil(
    caches.open('static-assets').then((cache) => {
      return cache.addAll([
        '/',
        '/style.css',
        '/script.js',
        '/Imagens/logo.png',
        '/Imagens/isa1.png',
        '/Imagens/isa2.png',
        '/Imagens/isa3.png',
        '/Imagens/logo.ico'
      ]);
    })
  );
});

self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activating');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== 'static-assets') {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', (event) => {
  console.log('Service Worker: Fetching');
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        console.log('Service Worker: Found in cache');
        return response;
      }
      console.log('Service Worker: Not found in cache, fetching from network');
      return fetch(event.request).then((response) => {
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }
        const responseToCache = response.clone();
        caches.open('static-assets').then((cache) => {
          cache.put(event.request, responseToCache);
        });
        return response;
      });
    })
  );
});
