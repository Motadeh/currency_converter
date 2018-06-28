


/* let droplist = document.getElementById('country');
droplist.length = 0;
let defaultoption = document.createElement('option');
defaultoption.text = 'choose country';
droplist.add(defaultoption);
droplist.selectedIndex = 0; */

const url = 'https://free.currencyconverterapi.com/api/v5/currencies';

// const url2 = 'https://free.currencyconverterapi.com/api/v5/convert';

// let data;
// Call currencyOption method not console.log on the data
fetch(url).then(response => response.json()).then(data => currencyOption(data.results));
// data;

//  let fromcurrency = document.getElementById('countries');

function currencyOption(data){

    let fromcurrency = document.getElementById('countries');
    let tocurrency = document.getElementById('countries2');


    for (let currency of Object.keys(data).sort()){
        let {currencyName, id} = data[currency];

        // console.log(currencyName);



        let optionFrom = document.createElement('option');
        optionFrom.innerText = `${currency} (${currencyName})`;
        optionFrom.value = `${currency}`;

        let optionTo = document.createElement('option');
        optionTo.innerText = `${currency} (${currencyName})`;
        optionTo.value = `${currency}`;

        fromcurrency.appendChild(optionFrom);

        tocurrency.appendChild(optionTo); // ToCurrencyInput is undefined!

    }

 /* function myfunction(amount, fromcurrency, tocurrency) {
    document.getElementById("fromcurrency").classList.toggle("show"); */

 }

