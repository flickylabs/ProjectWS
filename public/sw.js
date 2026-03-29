// 솔로몬 Service Worker — PWA 설치 지원 + 오프라인 셸 캐시
const CACHE_NAME = 'solomon-v1'
const SHELL_ASSETS = ['/', '/index.html', '/manifest.json', '/icon-192.png', '/icon-512.png']

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(SHELL_ASSETS))
  )
  self.skipWaiting()
})

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  )
  self.clients.claim()
})

self.addEventListener('fetch', (e) => {
  // API 호출은 캐시하지 않음
  if (e.request.url.includes('/api/')) return

  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  )
})
