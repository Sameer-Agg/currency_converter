const URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies"


const option = document.querySelector("option")
const menu = document.querySelectorAll(".select-area select")
const btn = document.querySelector("#btn")

const fromcur = document.querySelector(".from-con select")
const tocur = document.querySelector(".to-con select")


const msg = document.querySelector(".final")


console.log(menu);



const rates = async () => {
  
    let amt = document.querySelector("input")
    let amtval = amt.value;
    if(amtval === "" || amtval === 1){
      amtval = 1
      amt.value = "1"
    }
  
    const mainurl = `${URL}/${fromcur.value.toLowerCase()}/${tocur.value.toLowerCase()}.json`
    
  
    let res = await fetch(mainurl)
  
    let data = await res.json()
  
  
    let rate = data[tocur.value.toLowerCase()];
  
    let final = amtval * rate ;
  
     msg.innerText = `${amtval} ${fromcur.value}   =   ${final} ${tocur.value} `
}

for (let select of menu) {
    for(code in countryList){
        let newop = document.createElement("option")
        newop.innerText = code;
        newop.value = code
        if(select.name === "from"  && code==="USD"){
            newop.selected = "selected"
        }
        if(select.name === "to"  && code==="INR"){
            newop.selected = "selected"
        }
        select.append(newop);
    }
    select.addEventListener("change" , (e) => {
        flags(e.target);
    })
}





const flags = (e) => {
    let code = e.value;
    let country = countryList[code]
    let newimg = `https://flagsapi.com/${country}/flat/64.png`
    let img = e.parentElement.querySelector("img")
    img.src = newimg
}

btn.addEventListener("click" , async (e) => {
  e.preventDefault()
  rates()
}
)


window.addEventListener("load" , () => {
  rates();
}
)