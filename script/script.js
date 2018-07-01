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
          //foot.removeClass("hidd");
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
    //foot.addClass("hiid");
         currVal.setAttribute("placeholder", "#Results here");
          btn.innerHTML="Convert";
      if(1===1){
		  $('#save').trigger("click");
	  }		  
  });
})	

/*
const url_currency = "https://currencyconverterapi.com/api/v5/currencies";
fetch(url_currency)
  .then(handleErrors)
  .then(parseJSON)
  .then(dataParse)
  .then(populateSelect)
  .catch(Errors);

  //handlling errors response function
function handleErrors(res) {
  if ( !res.ok ) {
    throw Error(res.status);
  }
  return res;
}

//Parsing Response into JSON format
function parseJSON(res) {
  return res.json();
}

//Looping data parse into for loop with key
function dataParse(data) {
  for ( const key in data ) {
    return data[key];

  }
}

//Populate curruncies data through select fields
function populateSelect(res) {
  for ( const results in res) {
    const value = res[results].id;
    const currency = res[results].currencyName;
    $('#currency_Fr, #currency_To').append($('<option>').text(`${currency}  - ${value}`).attr('value', value)
      );
	 
  }
} 

/*
//Errors handling
function Errors(error) {
  console.log("Errors", error);
} 
//$('#FroValue').html($('#currency_Fr option:selected').val());
 //$('#IntoVonverted').html($('#currency_To option:selected').val());

//Instructions for conversion click actions
  btn.addEventListener("click", () => {
  const amount = $('#currencyFromValue').val();
  const From = $('#currency_Fr option:selected').val();
  const To = $('#currency_To option:selected').val(); 
  const query = `${From}_${To}`;
  const queryUrl = `https://free.currencyconverterapi.com/api/v5/convert?q=${query}&compact=y&callback=?`; 
  fetch(queryUrl)
    .then(parseJSON)
    .then(parsedData => {
      for(let rate in parsedData){
         let calc = (parsedData[rate].val); 
      let total = (Number(amount) * calc);
      $('#currency_Val').val(Math.round(total * 100) / 100);
      }
    })
    .catch(Errors);
});


*/



 const currency_later = (function() {
   let db, clFV = document.querySelector('#currencyFromValue'),
         clFR =  document.querySelector('#currency_Fr'),
         clTo = document.querySelector('#currency_To'),
         clV = document.querySelector('#currency_Val');
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
        		
        let rq = db.transaction("currencyUsed", "readwrite").objectStore("currencyUsed").add({
            currNum: n.value,
            currFR: p.value,
            currTO: e.value,
            currVL: d.value
        });
        rq.onsuccess = function(evt) {
          self.showcurrencyUsed();
        //  self.cueS('.fot').classList.toggle('hidd');
          document.body.style.overflow = 'auto';
        };
        return false;
        });
   },
       openDb: function() {
               let self = this;
			   let indexedDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || window.msIndexedDB,
			   IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction;
			   if (!indexedDB) {
			   alert('Sorry indexedDB Not supported');
     }
       let idb = indexedDB.open('currencyBASE', 3);
                 idb.onupgradeneeded =function(e) {
                 let thisDb = e.target.result;
                 if (!thisDb.objectStoreNames.contains('currencyUsed')) {
                 let objectStore = thisDb.createObjectStore('currencyUsed', {keyPath: "id",autoIncrement: true }
				 );
				 let index = objectStore.createIndex('by-rate','currVL');
      }};
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
               let transaction = db.transaction('currencyUsed', "readwrite");
			   transaction.addEventListener('complete', (e)=> {
               self.cueS("#acts").innerHTML =content;  
     });
///////////////////////////////////////////////////////////////////////////////////////////////////////////
              transaction.addEventListener('error' ,(e)=> {
              console.dir(e);
      }); 
	    let store = transaction.objectStore('currencyUsed');
	          store.openCursor().onsuccess = (e)=> {
              let getBackUser = e.target.result;
			  if (getBackUser) {
              content +=
                        "<br>" + getBackUser.value.currNum + " " +
                        "" + getBackUser.value.currFR + " To " +
                        " " + getBackUser.value.currTO + " " +
                        " is " + getBackUser.value.currVL + " " +
						" </br>";
                                 getBackUser. continue ();
        } else {
                content += "";
               }
      };
    }
  };
})();
currency_later.run();
	
