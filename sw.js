//Initializing Service Worker by Nemie
  const cacheName = "V1",sw = "Service Worker: ";
  self.addEventListener("install",e=>{
    console.log(sw+ "instaling");
  });//Activate
  self.addEventListener("activate",e=>{
e.waitUntil(
    caches.keys().then(cache_nms=>{
       return Promise.all(
       	    cache_nms.map(cache =>{
       	    	if(cache != cacheName){
			            console.log("Clearing old caches");
			             return caches.delete(cache);
					     }
				     })
           );
         })/*.then(e=> e.skipWaiting())*/
	   );
   }); //Fetch
  self.addEventListener("fetch",e=>{
    e.respondWith(
      fetch(e.request)
      .then(res=>{//Clone
        const resClone = res.clone();// cache
        caches.open(cacheName)
        .then(cache =>{
        	console.log("Caching new request");
          cache.put(e.request, resClone);
        });return res;
      }).catch(err=>caches.match(e.request).then(res=> res))
      );
  }); 
