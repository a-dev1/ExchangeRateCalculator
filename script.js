// Your API key is: 38ddfa1d8c2a7512c9ba60a4
//GET https://v6.exchangerate-api.com/v6/YOUR-API-KEY/latest/USD
let select1 = document.querySelector("#primary")
let select2 = document.querySelector("#secondary")
let display1 = document.querySelector('#display1')
let display2 = document.querySelector('#display2')
let button = document.querySelector('.swap')
let reset_button = document.querySelector('.reset')
let data,
    input=0;

fetch(`https://v6.exchangerate-api.com/v6/38ddfa1d8c2a7512c9ba60a4/latest/USD`)
.then(response => response.json())
.then(obj => data = obj)
.catch(() => console.log('something Went wrong'));
 
let createOption = (dropDown) => {
    let rates = Object.entries(data.conversion_rates);
    
    rates.forEach(currency => {
        let option = document.createElement("option");

        option.innerHTML = currency[0];
        option.setAttribute("class", `${currency[0]}`) 
        option.value =  currency[1];

        // console.log(option)
        dropDown.appendChild(option)
    })
    
}  

let initial = () => {
    createOption(select1)
    createOption(select2)
}


function calculateOnSelect(e) {

    (e.target.id === `display1`) ? input = +e.target.value : input=input;
    
    display2.value = +select2.value/+select1.value * input;
}

[select1, select2].forEach(element =>
    element.addEventListener('change', calculateOnSelect)
);

display1.addEventListener('input', calculateOnSelect)

let swapValues = (e) => {
    input = display2.value
    display1.value = input
    temp = select1.selectedIndex
    select1.selectedIndex = select2.selectedIndex
    select2.selectedIndex = temp
    console.log(temp)
    calculateOnSelect(e)
}

button.addEventListener('click', swapValues)
reset_button.addEventListener('click', (e) => {
    display1.value = 0
    display2.value = 0
})