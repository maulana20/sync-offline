var nama_tabel='pos_trx';
const objtb = idb.open('erpku3', 1, db => {

    if (!db.objectStoreNames.contains(nama_tabel))
    {
      db.createObjectStore(nama_tabel);
    }
  });
 
const idb_pos_trx = {
    get(key) {
      return objtb.then(db => {
        return db.transaction(nama_tabel)
          .objectStore(nama_tabel).get(key);
      });
    },
    getAll() {
        return objtb.then(db => {
          return db.transaction(nama_tabel)
            .objectStore(nama_tabel).getAll();
        });
    },
    set(key, val) {
      return objtb.then(db => {
        const tx = db.transaction(nama_tabel, 'readwrite');
        tx.objectStore(nama_tabel).put(val, key);
        return tx.complete;
      });
    },
    delete(key) {
      return objtb.then(db => {
        const tx = db.transaction(nama_tabel, 'readwrite');
        tx.objectStore(nama_tabel).delete(key);
        return tx.complete;
      });
    },
    clear() {
      return objtb.then(db => {
        const tx = db.transaction(nama_tabel, 'readwrite');
        tx.objectStore(nama_tabel).clear();
        return tx.complete;
      });
    },
    keys() {
      return objtb.then(db => {
        const tx = db.transaction(nama_tabel);
        const keys = [];
        const store = tx.objectStore(nama_tabel);
  
        // This would be store.getAllKeys(), but it isn't supported by Edge or Safari.
        // openKeyCursor isn't supported by Safari, so we fall back
        (store.iterateKeyCursor || store.iterateCursor).call(store, cursor => {
          if (!cursor) return;
          keys.push(cursor.key);
          cursor.continue();
        });
  
        return tx.complete.then(() => keys);
      });
    }
  };

function kirimData(pos_trx)
{
    console.log('processing id ' + pos_trx.pos_trx_id);
    fetch('/post.php',{
        method: 'POST',
        headers:{
            'Content-Type':'application/json',
            'Accept':'application/json'
        },
        body: JSON.stringify({
        pos_trx_id:pos_trx.pos_trx_id,
        item_id:pos_trx.item_id,
        qty:pos_trx.qty
        })
    })
    .then(function(response){
        response.text().then(function(textku){
            if (textku=="oke")
            {
                console.log('deleting id ' + pos_trx.pos_trx_id);
                idb_pos_trx.delete(pos_trx.pos_trx_id);
            }
        });
    })
    .catch(function(err)
    {
        console.log("error " + err);
    });
}
