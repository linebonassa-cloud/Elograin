const CACHE_NAME='elograin-v4-1';
const LOCAL=['/','/index.html','/style.css','/app.js','/manifest.json'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE_NAME).then(c=>Promise.allSettled(LOCAL.map(u=>c.add(u)))));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==CACHE_NAME).map(x=>caches.delete(x)))));self.clients.claim()});
// Rede primeiro; cache só como reserva offline. Assim um deploy novo nunca fica preso em cache antigo.
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;e.respondWith(fetch(e.request).then(r=>{if(r&&r.ok&&new URL(e.request.url).origin===location.origin){const cp=r.clone();caches.open(CACHE_NAME).then(c=>c.put(e.request,cp))}return r}).catch(()=>caches.match(e.request).then(c=>c||(e.request.destination==='document'?caches.match('/index.html'):undefined))))});
