
class CurrencyLater {
  constructor(){
    this.init();
    this.db = "Let's say IDB";
    this.clFV = this.g('#currencyFromValue');
    this.clFR = this.g('#currency_Fr');
    this.clTo = this.g('#currency_To');
    this.clV  = this.g('#currency_Val');
  }
  init(){
    let btn=document.getElementById("convt");
    // Call converter
    btn.addEventListener('click', ()=> {
      let currVal      = this.clV;
      let cFroVal      = this.clFV.value;
      let currFrSelect = this.clFR;
      let fro          = currFrSelect.value;
      let currToSelect = this.clTo;
      let to           = currToSelect.value;
      let identifyMe   = fro + "_" + to;

      if (cFroVal !== "") {
        btn.innerHTML = "Converting...";
        currVal.value = "";
        currVal.setAttribute("placeholder", "Converting...");
//https://free.currencyconverterapi.com/api/v5/convert?q=${identifyMe},${identifyMe} https://free.currencyconverterapi.com/api/v6/convert?q=${identifyMe}&compact=ultra&apiKey=b042c83a9cd4341475c3
        fetch(`https://free.currencyconverterapi.com/api/v6/convert?q=${identifyMe}&compact=ultra&apiKey=b042c83a9cd4341475c3`,{mode:'no-cors'})
        .then(response => response.json())
        .then(data=>{
          let currFrVal = parseFloat(cFroVal);
          currVal.value = numeral(currFrVal * data[identifyMe].val).format("0,0.00[0]");
          
          currVal.setAttribute("placeholder", "#Results");
          btn.innerHTML = "Convert";
          this.g('#save').click();

        })
        .catch(e=>{
          btn.innerHTML = "Converting...";
          setTimeout(()=>{
            btn.innerHTML = "Convert";
            currVal.setAttribute("placeholder", "Something went wrong, try sgain");
          },700);
          console.dir(e);
        })
      }else{
          btn.innerHTML = "Converting...";
          setTimeout(()=>{
            btn.innerHTML = "Convert";
            currVal.style.fontSize = "8.4pt";
            currVal.setAttribute("placeholder","Please, put the Amount to convert in the Enter Amount Field")
          },700);
          setTimeout(()=>{
            currVal.style.fontSize = "18.4pt";
            currVal.setAttribute("placeholder","#Results Here")
          },9000)
      }
    });
  }
  // Call events here 
  run() {
    this.openDb(); // init database
    this.insertData() // DB data -> insert
  }
  g(el) {
    return document.querySelector(el);
  }
  openDb() { 
    let self = this,
        indexedDB = window.indexedDB || window.webkitIndexedDB || 
        window.mozIndexedDB || window.msIndexedDB,
        IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction;

    // Let the user know that the browser is not supporting IDB
    if (!indexedDB) {
      console.error('Sorry indexedDB Not supported');
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
      self.idb = e.target.result;
      this.db = e.target.result;
      let db = this.db;

      db.onerror = function(event) {
        console.dir('Database error: ' + event.target.errorCode);
      };

      self.showcurrencyUsed(db);
    });
  }
  showcurrencyUsed(db){
    return new Promise(resolve=>{
      resolve((()=>{

        let self = this;
        // Create a Transaction
        let tx = db.transaction('currencyUsed', "readwrite");

        // Transaction encoureted an Error
        tx.addEventListener('error' ,(e)=> {
          console.dir(e);
        }); 
        // Set the Store ready
        let store = tx.objectStore('currencyUsed');

        self.g("#acts").innerHTML ="";
        // Create a store Cursor
        store.openCursor().onsuccess = (e)=> {

          let getBackUser = e.target.result,
          g =(l)=> self.g(l);

          if (getBackUser) {

            g("#acts").innerHTML += `<p class="rec">${getBackUser.value.currNum} ${getBackUser.value.currFR} to ${getBackUser.value.currTO} is : ${getBackUser.value.currVL} ${getBackUser.value.currTO}</p>`;

            getBackUser. continue (); 
          }
        };
        return self;
      })());
    });
  }
  insertData() {
    return new Promise(resolve=>{
      resolve((()=>{
        let self = this;
        self.g('#save').addEventListener('click', function(ev) {

          ev.preventDefault();

          let n = self.g('#currencyFromValue'),
              p = self.g('#currency_Fr'),
              e = self.g('#currency_To'),
              d = self.g('#currency_Val'),
              db = self.idb;

          let rq = db.transaction("currencyUsed", "readwrite")
                  .objectStore("currencyUsed")
                    .add({
                      currNum: n.value,
                      currFR: p.value,
                      currTO: e.value,
                      currVL: d.value
                    });

          rq.onsuccess = function(evt) {
            self.showcurrencyUsed(db)
            .then((e)=>{
              document.body.style.overflow = 'auto';
            })

                      };
          return false;
        });
        return self
      })())
    })
  }
};
const currency_later = new CurrencyLater();
currency_later.run();
	
