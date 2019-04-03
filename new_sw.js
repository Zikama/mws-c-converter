//Initializing Service Worker
  const cacheName = "V2",sw = "Service Worker: ";
  self.addEventListener("install",e=>{
  });//Activate  
  self.addEventListener("activate",e=>{
e.waitUntil(
    caches.keys().then(cache_nms=>{
       return Promise.all(
       	    cache_nms.map(cache =>{
       	    	if(cache != cacheName){
			             return caches.delete(cache);
					     }
				     })
           );
         })
	   );
   }); //Fetch
  self.addEventListener("fetch",e=>{
    e.respondWith(
      fetch(e.request)
      .then(res=>{//Clone
        const resClone = res.clone();// cache
        caches.open(cacheName)
        .then(cache =>{
          cache.put(e.request, resClone); 
        })/*.then(num=>console.log(num.length))*/;return res;
      }).catch(err=>caches.match(e.request).then(res=> res))
      );
  }); 
self.addEventListener('message', (event) => {
    if (event.data.action === 'skipWaiting') {
        self.skipWaiting();
    }
});
