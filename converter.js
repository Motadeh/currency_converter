function myfunction() {
    let from = document.getElementById("countries").value; ////getElementsByClassName retrieves all elements, you need the first one only with [0]
    let to = document.getElementById("countries2").value; //getElementsByClassName retrieves all elements, you need the first one only with [0]
    let fromAmount = document.getElementById("amount").value;
    // let toAmount        =   document.getElementById("toAmount");
    // you dont need this, you already declared it
    //let fromQuery       =   `${from}`;
    //you dont need this, you already declared it
    //let toQuery         =   `${to}`;
    fetch(`https://free.currencyconverterapi.com/api/v5/convert?q=${from}_${to}&compact=ultra`).then(response => response.json()
    ).then(rates => {
        for (let rate in rates) {
            console.log(rates[rate]);
            let calc = rates[rate]; //You need to pass rate back into the object to get the value
            let total = (calc * fromAmount); //calculation
            console.log(total);
            toAmount.value = total;

           
        }
    })
}
