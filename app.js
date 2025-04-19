const base_URL="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";


const dropdownSelect=document.querySelectorAll(".sc");

const btn=document.querySelector("button");

 const fromCurr=document.querySelector(".from select");
 const toCurr=document.querySelector(".to select");
const msg = document.querySelector(".msg");

for(let select of dropdownSelect){
    for( currCode in countryList){
        let newoption = document.createElement("option");
        newoption.innerText = currCode;
        newoption.value=currCode;
        if(select.name==="from" && currCode ==="USD"){
            newoption.selected="selected";
        }
        else if(select.name==="to" && currCode ==="INR"){
            newoption.selected="selected";
        }
        select.append(newoption);
    }

    select.addEventListener("change",(event)=>{
        updateFlag(event.target);
    });
}

const updateFlag=(even)=>{
    let currCode=even.value;
    let currID=countryList[currCode];
    let newSrc=`https://flagsapi.com/${currID}/flat/64.png`;
    let img=even.parentElement.querySelector("img");
    img.src=newSrc;

}


btn.addEventListener("click",async (eve)=>{
    eve.preventDefault();
    let amount=document.querySelector("input");
    let amountVal=amount.value;
    if(amountVal==="" || amountVal<1){
        amountVal=1;
        amount.value="1";
    }

const URL=`${base_URL}/${fromCurr.value.toLowerCase()}.json`;
console.log(URL);

let response= await fetch(URL);
console.log(response);
let data= await response.json();
console.log(data);
let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
console.log(rate);

let finalAmount=amountVal*rate;
console.group(finalAmount);


msg.innerText=`${amountVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`

});



