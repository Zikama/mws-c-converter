
      //Selector and etc
      g=(k)=>document.querySelector(k);
      gA=(k)=>document.querySelectorAll(k);
      const indexController = new controller();

function writer (data) {
  calc.currencyFromValue.value += data;
  if(!"vibrate" in navigator) return;
  navigator.vibrate([25]);
}
// Registering Sw
if('serviceWorker' in navigator){
      window.addEventListener('load',()=>{
      navigator.serviceWorker.register('./new_sw.js').then(reg=>{
      console.log(`Wa, Service Worker registed!`);
      if(reg.waiting) {
        updateReady(reg.waiting);
        return;
      }
      if(reg.installing) {
        console.log('Service worker installing')
        reg.installing.addEventListener('statechange', () => {
          if(this.state == 'installed'){
            updateReady(this);
            return;
          }
        });
      }
      reg.addEventListener('updatefound', () => {
        reg.installing.addEventListener('statechange', function(){
          if(this.state == 'installed'){
            updateReady(this);
            return;
          }
        });
      })
    }).catch((error) =>  {
      // registration failed
      console.log('Registration failed with ' + error);
    });
    // Ensure refresh is only called once.
    // This works around a bug in "force update on reload".
    var refreshing;
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (refreshing) return;
      window.location.reload();
      refreshing = true;
    });
  })
  function updateReady(worker){
    indexController.showUI(g('#update-message'),'New version available');
    const updateMessage = document.querySelector('#update-message');
    updateMessage.addEventListener('click', (e) => {
      if(e.target && e.target.id== 'ok'){
        worker.postMessage({action: 'skipWaiting'});
      }else if( e.target && e.target.id== 'no' ){
        setTimeout(() => {
          if(document.querySelector('#update-message div')){
            document.querySelector('#update-message div').remove();
            g('#update-message').innerHTML =`
            <div class="details">
            <h1>About</h1>
            <p>
              Proudly developed by Nehemie Zikama,   All credits goes to Andela, Udacity and Google for such big opportunity they offered to me, I'm grateful to say a BIG thank you for such an Amazing opportunity, Live <a class="link" href="https://andela.com">Andela</a>,<a class="link" href="https://udacity.com">Udacity </a>and <a class="link" href="https://google.com">Google</a>, GoogleAfricaChallenge, GroWithGoogle,AlcWithgoogle3.0,MWS-Nanodegree .<br>
              <h2>Contact :</h2>
              If you would like to get in touch with me, you can contact me on the following Email Address and Phone Number: <br>
              <p style="margin: 0; font-weight:bold;width:100%;text-align: left;">Gmail : <a class="link" href="mailto:nehemiezikama@gmail.com">@nehemiezikama</a></p>
              <p style="margin: 0; font-weight:bold;width:100%;text-align: left;">Github : <a class="link" target="_blank" href="https://github.com/zikama">@Zikama</a></p>
              <p style="margin: 0; font-weight:bold;width:100%;text-align: left;">Tel : <a class="link" target="_blank" href="tel:+256791676272"> +(256) 079 167 6272 </a></p>

              <a class="link" href="mailto:nehemiezikama@gmail.com"><h4>Hire me</h4></a>
          </div>`;
          }
        }, 500);
      }
    })
  }
}
  //Stop form submit on anytime btn clicked
  const form  = g("form");
  form.addEventListener("submit",(d)=>d.preventDefault());
  function c(val)
    {
      if(val == 'Error!') {
        document.getElementById("currencyFromValue").setAttribute("placeholder",val);
        return
      }
    document.getElementById("currencyFromValue").value=val;

  }
  function v(val){
    document.getElementById("currencyFromValue").value+=val;
  }
  function f(val){
    const ans = document.getElementById("currencyFromValue");
    ans.value = ans.value.substring(0,ans.value.length-1);
  }
  function e(){
    try {
      c(eval(g("#currencyFromValue").value.replace("x",'*')))
    }
    catch(e)
    {
      c('Error!')
    }
  };
      const currencySelect  = gA(".currency"), 
      allCurrencies = [
       "AED","AFN","ALL","AMD","ANG","AOA","ARS","AUD","AWG","AZN","BAM","BBD","BDT","BGN","BHD","BIF","BND","BOB","BRL","BSD","BTC","BTN","BWP","BYN","BYR","BZD","CAD","CDF","CHF","CLP","CNY","COP","CRC","CUP","CVE","CZK","DJF","DKK","DOP","DZD","EGP","ERN","ETB","EUR","FJD","FKP","GBP","GEL","GHS","GIP","GMD","GNF","GTQ","GYD","HKD","HNL","HRK","HTG","HUF","IDR","ILS","INR","IQD","IRR","ISK","JMD","JOD","JPY","KES","KGS","KHR","KMF","KPW","KRW","KWD","KYD","KZT","LAK","LBP","LKR","LRD","LSL","LVL","LYD","MAD","MDL","MGA","MKD","MMK","MNT","MOP","MRO","MUR","MVR","MWK","MXN","MYR","MZN","NAD","NGN","NIO","NOK","NPR","NZD","OMR","PAB","PEN","PGK","PHP","PKR","PLN","PYG","QAR","RON","RSD","RUB","RWF","SAR","SBD","SCR","SDG","SEK","SGD","SHP","SLL","SOS","SRD","STD","SYP","SZL","THB","TJS","TMT","TND","TOP","TRY","TTD","TWD","TZS","UAH","UGX","USD","UYU","UZS","VEF","VND","VUV","WST","XAF","XCD","XDR","XOF","XPF","YER","ZAR","ZMW",
      ];
    function populateList() {

      for(let i=0; i<allCurrencies.length; i++){
        document.calc.currenciesFROM.options[i]=new Option("",allCurrencies[i] );
        document.calc.currenciesTO.options[i]=new Option("",allCurrencies[i] );
        g("#currenciesToC").innerHTML += 
         `<input type="button" class="bloc" readonly onclick="applyPopV(event)" value="${allCurrencies[i]}">`
      }

    fetch("./assets/data/currencies.json").then(data=>{
      return data.text()
    })
    .then(data =>{
      data = JSON.parse(data);
      data = data["results"];

      for(let i=0; i<allCurrencies.length; i++){
        let select = currencySelect[0].options[i];
        if(select.value == "UGX"){
          select.selected = true
        }
        
        if (data[select.value]) {          
          if(select.value == data[select.value].id){
            if (data[select.value].currencySymbol) {
              select.text = `${data[select.value].currencySymbol} - ${data[select.value].currencyName}`;
              select.setAttribute("data-symbol",`${data[select.value].currencySymbol}`);
            }else{
              select.text = `${data[select.value].id} - ${data[select.value].currencyName}`;
              select.setAttribute("data-symbol",`${data[select.value].id}`);
            }
          }
        }

        let select2 = currencySelect[1].options[i];
        if(select2.value == "USD"){
          select2.selected = true;
        }

        if (data[select2.value]) {          
          if(select2.value == data[select2.value].id){
            if (data[select2.value].currencySymbol) {
              select2.text = `${data[select2.value].currencySymbol} - ${data[select2.value].currencyName}`;
              select.setAttribute("data-symbol",`${data[select2.value].currencySymbol}`);
            }else{
              select2.text = `${data[select2.value].id} - ${data[select2.value].currencyName}`;
              select.setAttribute("data-symbol",`${data[select2.value].id}`);
            }
          }
        }
      }
    });

    //Show less function
    const h = g(".m_h"),recent1 =g("#acts"),
    show_les=(e,l)=>{
      e.addEventListener("click",()=>{
        l.classList.toggle("recent1_hide");
      })
    };
    show_les(h,recent1);

    // Use the menu Humberg
    const humberg = g(".menu #menu_humberg");
    humberg.addEventListener("click",e=>{
      g("body").classList.toggle("togo_overflow");
      g(".card_f").classList.toggle("togo_menu");
    });

    searchContent(".s-input",".s-container"); // Search content from IDB
}
    
  window.onload=populateList;
  function applyPopV(e) {
    for (let i = 0; i < allCurrencies.length; i++) {
      let select2 = currencySelect[1].options[i];
      if(select2.value == e.target.value){
        select2.selected = true;
      }      
    }
  }
