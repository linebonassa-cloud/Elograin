const CACHE_NAME='elograin-v4';
const LOCAL=['/','/index.html','/style.css','/app.js','/manifest.json'];
const CDN=['https://unpkg.com/leaflet@1.9.4/dist/leaflet.css','https://unpkg.com/leaflet@1.9.4/dist/leaflet.js','https://cdn.jsdelivr.net/npm/motion@10.18.0/dist/motion.js','https://cdnjs.cloudflare.com/ajax/libs/lottie-web/5.12.2/lottie.min.js'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE_NAME).then(async c=>{await c.addAll(LOCAL);await Promise.allSettled(CDN.map(u=>c.add(u)))}));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==CACHE_NAME).map(x=>caches.delete(x)))));self.clients.claim()});
self.addEventListener('fetch',e=>{e.respondWith(caches.match(e.request).then(c=>c||fetch(e.request).catch(()=>{if(e.request.destination==='document')return caches.match('/index.html')})))});
