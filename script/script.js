"use strict";
         let btn=document.getElementById("convt"),
         foot=document.getElementById("foot");
    btn.addEventListener('click', ()=> {
      let currVal = document.getElementById("currency_Val");
      currVal.value="";
      let currFrSelect = document.getElementById("currency_Fr");
      let fro = currFrSelect.value;
      let currToSelect = document.getElementById("currency_To");
      let to = currToSelect.value;
      let identifyMe = fro + "_" + to;

      btn.innerHTML="Converting...";
      currVal.setAttribute("placeholder", "Converting...");
      $.getJSON(`https://free.currencyconverterapi.com/api/v5/convert?q=${identifyMe}&compact=y&callback=?`,
      function(data){
        try {
          let currFrVal = parseFloat(document.getElementById("currencyFromValue").value);
          currVal.value=numeral(currFrVal * data[identifyMe].val).format("0,0.00[0]");
          } catch (e) {
            alert("Please enter a number in the Amount field.");
          }
          currVal.setAttribute("placeholder", "#Results here");
          btn.innerHTML="Convert";
          if(1===1){
            $('#save').trigger("click");
          }
        });
    })	

 const currency_later = (function() {
   let db, clFV = document.querySelector('#currencyFromValue'),
           clFR = document.querySelector('#currency_Fr'),
           clTo = document.querySelector('#currency_To'),
           clV  = document.querySelector('#currency_Val');
  let content; 
  return {
    // Call events here not
    run: function() {
         this.openDb(); // init database
         this.fns(); // init database.
    },
    cueS:function(el) {
          return document.querySelector(el);
    },
    fns: function() {
      let self = this;
      this.cueS('#save').addEventListener('click', function(ev) {
        ev.preventDefault();
        let  n = self.cueS('#currencyFromValue'),
        p = self.cueS('#currency_Fr'),
        e = self.cueS('#currency_To'),
        d = self.cueS('#currency_Val');

        let rq = db.transaction("currencyUsed", "readwrite")
        .objectStore("currencyUsed")
        .add({
          currNum: n.value,
          currFR: p.value,
          currTO: e.value,
          currVL: d.value
        });

        rq.onsuccess = function(evt) {
          self.showcurrencyUsed();
          document.body.style.overflow = 'auto';
        };
        return false;
      });
    },
    openDb: function() {
      let self = this;
      let indexedDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || window.msIndexedDB,
      IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction;
      // Let the user know that the browser is not supporting IDB
      if (!indexedDB) {
        alert('Sorry indexedDB Not supported');
      }
      // Open a DataBase
      let idb = indexedDB.open('currencyBASE', 3);

      idb.onupgradeneeded =function(e) {
        let thisDb = e.target.result;
        if (!thisDb.objectStoreNames.contains('currencyUsed')) {
          let objectStore = thisDb.createObjectStore('currencyUsed', {keyPath: "id",autoIncrement: true });

          let index = objectStore.createIndex('by-rate','currVL');
        }
      };
      idb.addEventListener('success', function(e) {
        db = e.target.result;
        db.onerror = function(event) {
          console.dir('Database error: ' + event.target.errorCode);
        };
        self.showcurrencyUsed();
      });
    },
    showcurrencyUsed: function() {
      let self = this;
      // Create a Transaction
      let tx = db.transaction('currencyUsed', "readwrite");
      // Transaction is Completed
      tx.addEventListener('complete', (e)=> {
        // self.cueS("#acts").innerHTML ="";
        // self.cueS("#acts").innerHTML += content;  
        console.log(e);
      });
      // Transaction encoureted an Error
      tx.addEventListener('error' ,(e)=> {
        console.dir(e);
      }); 
      // Set the Store ready
      let store = tx.objectStore('currencyUsed');
      // Create a store Cursor
      self.cueS("#acts").innerHTML ="";
      store.openCursor().onsuccess = (e)=> {
        let getBackUser = e.target.result;
        if (getBackUser) {
          
          self.cueS("#acts").innerHTML += 
          "<br>" + getBackUser.value.currNum + " " +
          "" + getBackUser.value.currFR + " To " +
          " " + getBackUser.value.currTO + " " +
          " is " + getBackUser.value.currVL + " " +
          " </br>";
          // console.log(getBackUser.direction);
          getBackUser. continue (); 
        } else {
          content += "";
        }
      };
    }
  };
})();
currency_later.run();
	
