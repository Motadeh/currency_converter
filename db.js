// import {idb} from 'idb-master/lib/idb.js';


/* var dbPromise = idb.open('test2', 1, function(upgradeDb){
    var tx = upgradeDb.createObjectStore('countries', {keyPath: 'id'});
    tx.put('world', 'hello');
}); */



let currencies;
/* const dbPromise = idb.open('currencies_country', 1, upgradeDb => {
   switch (upgradeDb.oldversion) {
        case 0:
        upgradeDb.createObjectStore('countries', {keyPath: 'id'});
    }
});
 */


var dbPromise = idb.open('test2', 1, function(upgradeDb){
    var tx = upgradeDb.createObjectStore('countries', {keyPath: 'id'});
    tx.put('world', 'hello');
});


fetch('https://free.currencyconverterapi.com/api/v5/currencies').then(response => response.json()).then(function(currency) {
    dbPromise.then(db => {
        if(!db) return;

        currencies = [currency.results];

        const ty = db.transaction('countries', 'readwrite');
        const store = ty.objectStore('countries');

        currencies.forEach(countrycurrency => {
            for (let value in countrycurrency){
                store.put(countrycurrency[value]);
            }
        });
        return ty.complete;

        

        
       /*  currencies = [currency.results];
        const tx = db.createObjectStore('countries', {keyPath: 'id'});
        tx.createIndex("hours", "hours", {unique: false});
        tx.createIndex("minutes", "minutes", {unique: false});


        const store = tx.objectStore('countries');
        

        currencies.forEach(countrycurrency => {
            for (let value in countrycurrency){
                store.put(countrycurrency[value]);
            }
        });
        return tx.complete; */
    });
});


// }