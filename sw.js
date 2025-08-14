const CACHE_NAME='bibleversequest-v1';
const ASSETS=['./','./index.html','./manifest.webmanifest','./favicon.png','./og-image.png','./icons/icon-192.png','./icons/icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE_NAME).then(c=>c.addAll(ASSETS)));self.skipWaiting();});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE_NAME).map(k=>caches.delete(k)))));self.clients.claim();});
self.addEventListener('fetch',e=>{const u=new URL(e.request.url);if(u.origin===location.origin){e.respondWith((async()=>{try{const fresh=await fetch(e.request);const c=await caches.open(CACHE_NAME);c.put(e.request,fresh.clone());return fresh;}catch(err){const cached=await caches.match(e.request);return cached||new Response('Offline',{status:503,statusText:'Offline'});}})());}});
