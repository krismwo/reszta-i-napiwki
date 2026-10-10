var CACHE = 'reszta-v3';
var FILES = ['./', 'index.html', 'manifest.webmanifest', 'icon-192.png', 'icon-512.png', 'icon-maskable-512.png'];

self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(CACHE)
      .then(function (c) { return Promise.all(FILES.map(function (f) { return c.add(new Request(f, { cache: 'reload' })); })); })
      .then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then(function (ks) {
      return Promise.all(ks.filter(function (k) { return k !== CACHE; }).map(function (k) { return caches.delete(k); }));
    }).then(function () { return self.clients.claim(); })
  );
});

// Najpierw sieć (nowa wersja od razu, gdy jest internet), a bez internetu lub przy bardzo wolnej sieci kopia z pamięci telefonu.
self.addEventListener('fetch', function (e) {
  if (e.request.method !== 'GET') return;
  e.respondWith(new Promise(function (resolve) {
    var done = false;
    function finish(res) { if (!done && res) { done = true; resolve(res); } }
    var timer = setTimeout(function () {
      caches.match(e.request, { ignoreSearch: true }).then(finish);
    }, 2500);
    fetch(e.request, { cache: 'no-cache' }).then(function (res) {
      clearTimeout(timer);
      if (res && res.ok) {
        var copy = res.clone();
        caches.open(CACHE).then(function (c) { c.put(e.request, copy); });
      }
      finish(res);
    }).catch(function () {
      clearTimeout(timer);
      caches.match(e.request, { ignoreSearch: true }).then(function (c) {
        return c || caches.match('index.html');
      }).then(finish);
    });
  }));
});
