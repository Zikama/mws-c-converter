const public = 'c-current-v5',
     // api=`https://free.currencyconverterapi.com/api/v5/convert?q=${identifyMe}&compact=y&callback=?`,
	  NamesOfChes =[public],allPub=[
        '/','./index.html','./script/vendor/jquery.js','./script/script.js','./script/numeral.min.js','./style/style.css']
;
self.addEventListener('install', (event)=> {
event.waitUntil(
	   caches.open(public).then((cache)=>{
	   return cache.addAll(allPub);
 })
    
);
});self.addEventListener('activate', (event)=> {
	event.waitUntil(caches.keys().then((cacheNames)=>{
        return Promise.all(
        cacheNames.filter((cacheName)=>{
        return cacheName.startsWith('c-') && !NamesOfChes.includes(cacheName);}).map((cacheName)=> { return caches.delete(cacheName);
        }));}));
});
self.addEventListener('fetch',(event)=> {
        let requestUrl = new URL(event.request.url);
        if (requestUrl.origin === location.origin) {
        if (requestUrl.pathname === '/') {event.respondWith(caches.match('./index.html'));return;	
}/*
		if(requestUrl.pathname === api){
			vent.respondWith(caches.match('./index.html'));
		return;}*/
		} 
event.respondWith(
       caches.match(event.request).then((response)=> {
       return response || fetch(event.request);
   }));
});

