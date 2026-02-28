/* ══════════════════════════════════════════════════════
   Controle Financeiro do Décio — Service Worker v1.0
   Cache strategy: cache-first for assets, network-first for API
══════════════════════════════════════════════════════ */

const CACHE_NAME = 'financeiro-decio-v1';
const CACHE_VERSION = '1.0.0';

// Assets to cache on install
const PRECACHE_URLS = [
  './',
  './index.html',
  './manifest.json',
  './icon.svg',
  './icon-192.png',
  './icon-512.png',
  'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap',
];

/* ─── INSTALL ─── */
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      // Cache local assets; don't fail on font CDN errors
      const localAssets = PRECACHE_URLS.filter(u => !u.startsWith('http'));
      return cache.addAll(localAssets).catch(() => {});
    }).then(() => self.skipWaiting())
  );
});

/* ─── ACTIVATE ─── */
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      )
    ).then(() => self.clients.claim())
  );
});

/* ─── FETCH ─── */
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET, Chrome extensions, and browser-internal requests
  if (request.method !== 'GET') return;
  if (url.protocol === 'chrome-extension:') return;
  if (url.protocol === 'data:') return;

  // Google Fonts: stale-while-revalidate
  if (url.hostname.includes('fonts.googleapis.com') ||
      url.hostname.includes('fonts.gstatic.com')) {
    event.respondWith(staleWhileRevalidate(request));
    return;
  }

  // App shell and local assets: cache-first
  if (url.origin === self.location.origin) {
    event.respondWith(cacheFirst(request));
    return;
  }
});

/* ─── STRATEGIES ─── */

async function cacheFirst(request) {
  const cached = await caches.match(request);
  if (cached) return cached;
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    // Offline fallback: return index.html for navigation requests
    if (request.mode === 'navigate') {
      return caches.match('./index.html');
    }
    return new Response('Offline', { status: 503 });
  }
}

async function staleWhileRevalidate(request) {
  const cached = await caches.match(request);
  const fetchPromise = fetch(request).then(response => {
    if (response.ok) {
      caches.open(CACHE_NAME).then(cache => cache.put(request, response.clone()));
    }
    return response;
  }).catch(() => null);
  return cached || await fetchPromise || new Response('', { status: 503 });
}

/* ─── BACKGROUND SYNC ─── */
// Reserved for future use (e.g. sync financial data)
self.addEventListener('sync', event => {
  if (event.tag === 'sync-data') {
    // Future: sync to cloud backup
  }
});

/* ─── PUSH NOTIFICATIONS ─── */
// Reserved for future use (e.g. bill due reminders)
self.addEventListener('push', event => {
  const data = event.data?.json() || {};
  const title = data.title || 'Controle Financeiro do Décio';
  const options = {
    body: data.body || 'Você tem uma notificação financeira.',
    icon: './icon-192.png',
    badge: './icon-192.png',
    data: data.url || '/',
    vibrate: [200, 100, 200],
    actions: [
      { action: 'open', title: 'Abrir' },
      { action: 'dismiss', title: 'Dispensar' },
    ]
  };
  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', event => {
  event.notification.close();
  if (event.action !== 'dismiss') {
    event.waitUntil(clients.openWindow(event.notification.data));
  }
});
