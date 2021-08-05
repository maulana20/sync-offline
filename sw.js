var nama_cache = "cacheku";
var daftar_file = 
[
    '/index.html',
    '/idb.js',
    '/pos_trx.js',
    '/app.js',
    '/offline.txt',
];

importScripts('/idb.js');
importScripts('/pos_trx.js');

self.addEventListener('install', function(event)
{
    console.log('instal ya');
    event.waitUntil(
        caches.open(nama_cache)
        .then(function(cache)
        {
            console.log('melakukan caching');
            return cache.addAll(daftar_file);
        })
    );
});

self.addEventListener('fetch',function(event)
{
    console.log("masuk ke fetch listener");
    event.respondWith(
        caches.match(event.request)
        .then( (response)=>
        {
            if (response)
            {
                return response;
            }
                    
            return fetch(event.request).catch(function()
            {
                return caches.match('/offline.txt');
            });
        })
    )
});

self.addEventListener('sync',function(event)
{
    console.log("masuk ke sync listener");

    if (event.tag==='sync-new-trx')
	{
        idb_pos_trx.getAll().then (function(all_row)
        {
            for (var pos_trx of all_row)
            {
                kirimData(pos_trx);
            }
        });
    }
});
