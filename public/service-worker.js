/* eslint-disable no-restricted-globals */
// Service Worker for PWA functionality
// This file must be in the public folder to be accessible

const CACHE_NAME = 'restaurant-v1';
const RUNTIME_CACHE = 'restaurant-runtime-v1';

// Assets to cache immediately on install
// Note: Only include paths that are guaranteed to exist in production.
// Static assets (JS/CSS) have content-hashed filenames in production builds,
// so they are cached on-demand via the runtime cache strategy instead.
const PRECACHE_ASSETS = [
  '/',
  '/manifest.json',
];

// Install event - precache assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        console.log('[Service Worker] Precaching assets');
        return cache.addAll(PRECACHE_ASSETS);
      })
      .then(() => {
        // Only skip waiting if precaching succeeded
        console.log('[Service Worker] Precache successful, activating service worker');
        return self.skipWaiting();
      })
      .catch((error) => {
        // Log error but still activate service worker
        // Runtime caching will handle assets on-demand
        console.error('[Service Worker] Precache failed:', error);
        console.log('[Service Worker] Activating service worker anyway - assets will be cached on-demand');
        return self.skipWaiting();
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (
              cacheName !== CACHE_NAME &&
              cacheName !== RUNTIME_CACHE
            ) {
              console.log('[Service Worker] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        // Take control of all pages immediately
        return self.clients.claim();
      })
  );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip cross-origin requests
  if (url.origin !== location.origin) {
    return;
  }

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Strategy: Cache First for static assets, Network First for API calls
  if (
    request.url.includes('/static/') ||
    request.url.includes('/manifest.json') ||
    request.url.includes('/favicon') ||
    request.url.includes('/android-chrome') ||
    request.url.includes('/apple-touch-icon')
  ) {
    // Cache First strategy for static assets
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }
        return fetch(request).then((response) => {
          // Don't cache if not a valid response
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }
          const responseToCache = response.clone();
          caches.open(RUNTIME_CACHE).then((cache) => {
            cache.put(request, responseToCache);
          });
          return response;
        });
      })
    );
  } else {
    // Network First strategy for pages and API calls
    event.respondWith(
      fetch(request)
        .then((response) => {
          // Don't cache if not a valid response
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }
          const responseToCache = response.clone();
          caches.open(RUNTIME_CACHE).then((cache) => {
            cache.put(request, responseToCache);
          });
          return response;
        })
        .catch(() => {
          // Network failed, try cache
          return caches.match(request).then((cachedResponse) => {
            if (cachedResponse) {
              return cachedResponse;
            }
            // If it's a navigation request and we have no cache, try root page
            if (request.mode === 'navigate') {
              return caches.match('/').then((rootCachedResponse) => {
                if (rootCachedResponse) {
                  return rootCachedResponse;
                }
                // Fallback to offline message if root is not cached
                return new Response('Offline - No cached content available', {
                  status: 503,
                  statusText: 'Service Unavailable',
                  headers: new Headers({
                    'Content-Type': 'text/plain',
                  }),
                });
              });
            }
            return new Response('Offline - No cached content available', {
              status: 503,
              statusText: 'Service Unavailable',
              headers: new Headers({
                'Content-Type': 'text/plain',
              }),
            });
          });
        })
    );
  }
});

// Handle background sync (if needed in the future)
self.addEventListener('sync', (event) => {
  console.log('[Service Worker] Background sync:', event.tag);
  // Implement background sync logic here if needed
});

// Handle push notifications (if needed in the future)
self.addEventListener('push', (event) => {
  console.log('[Service Worker] Push notification received');
  // Implement push notification logic here if needed
});

// Handle messages from the client (e.g., skip waiting)
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    console.log('[Service Worker] Skipping waiting and activating immediately');
    self.skipWaiting();
  }
});
