
let submitBtn = document.getElementById("submitBtn")
let submitBtn2 = document.getElementById("submitBtn2")
let NewzForm = document.getElementById("NewzForm")
let reset = document.getElementById("reset")
let contname = [];

reset.addEventListener("click", function () {
    setTimeout(() => {
        let table = document.getElementById("table");
        table.innerHTML = "";
        getletter()
    }, 3000);

})



let counterynames = { "a": { "Argentina": "ar", "Australia": "au", "Austria": "at" }, "b": { "Belgium": "be", "Brazil": "br", "Bulgaria": "bg" }, "c": { "Canada": "ca", "China": "cn", "Colombia": "co", "Cuba": "cu", "Czech_Republic": "cz" }, "e": { "Egypt": "eg" }, "f": { "France": "fr" }, "g": { "Germany": "de", "Greece": "gr" }, "h": { "Hong_Kong": "hk", "Hungary": "h" }, "i": { "Indonesia": "id", "Ireland": "ie", "Israel": "il", "Italy": "it", "India": "in" }, "j": { "Japan": "jp" }, "l": { "Latvia": "lv", "Lithuania": "lt" }, "m": { "Malaysia": "my", "Mexico": "mx", "Morocco": "ma" }, "n": { "Netherlands": "nl", "New Zealand": "nz", "Nigeria": "ng", "Norway": "no" }, "p": { "Philippines": "ph", "Poland": "pl", "Portugal": "pt" }, "r": { "Romania": "ro", "Russia": "ru" }, "s": { "Saudi_Arabia": "sa", "Serbia": "rs", "Singapore": "sg", "Slovakia": "sk", "Slovenia": "si", "South_Africa": "za", "South_Korea": "kr", "Sweden": "se", "Switzerland": "ch" }, "t": { "Taiwan": "tw", "Thailand": "th", "Turkey": "tr" }, "u": { "UAE": "ae", "Ukraine": "ua", "United_Kingdom": "gb" }, "v": { "Venuzuela": "ve" } }
console.log("get newz updates")

//1 st run this function
//this function is to get the first letter of country name
function getletter() {
    let divform = document.getElementById("NewzdivForm")
    let cntrynmhtml = '';
    let cntrynmhtm = '';
    for (key in counterynames) {
        word = key;
        cntrynmhtml += `<div class="form-check">
        <input class="form-check-input" type="radio" name="type" id=${key} value=${key}
            checked>
        <label class="form-check-label" for="fiction">
            ${word.toUpperCase()}
        </label>
    </div>`
        //add if loop 
        //console.log("key =="+key )   
    }
    divform.innerHTML = cntrynmhtml;
    cntrynmhtml = '';
    submitBtn.removeAttribute('disabled');
    submitBtn2.disabled = true;
}

getletter()

//GetName('i')
//2 funtion that will run
//this function will take alphabet and will print all country whose name start with that alphabet
function GetName(alphabet) {
    let head = document.getElementById("head")
    head.innerText = "Select country whose news you want"
    //console.log(alphabet)
    //console.log("hi4")
    let divform = document.getElementById("NewzdivForm")
    let cntrynmhtml = '';
    contname = [];
    for (key in counterynames) {
        //console.log("hi5")

        if (key == alphabet) {
            //console.log("hi6")
            //if (key == "i"){//just for checking
            let word = counterynames[key[0]]
            for (item in word) {
                //console.log("hi7")
                //console.log("item==="+item)
                cntrynmhtml += `<div class="form-check">
                            <input class="form-check-input" type="radio" name="type" id=${item} value=${word[item]}
                                checked>
                            <label class="form-check-label" for="fiction">
                                ${item}
                            </label>
                        </div>`;
                //console.log(cntrynmhtml)
                contname.push(item);
            }
            divform.innerHTML = cntrynmhtml
            cntrynmhtml = '';
        }
        else {
            continue;
        }
        submitBtn2.removeAttribute('disabled');
        submitBtn.disabled = true;

    }
}





let apikey = '0288a15294494a2588dda96b6c184872';
//3rd function to run
function getnews(source) {
    let table = document.getElementById("table")
    let Xhr = new XMLHttpRequest();
    Xhr.open("GET", `https://newsapi.org/v2/top-headlines?country=${source}&apiKey=${apikey}`, false)
    Xhr.onprogress = function(){
        table.innerHTML = " <h1> please waite for few seconds </h1> "
    }
    Xhr.onload = function () {
        let newz = JSON.parse(this.responseText);
        let innhtml = '';
        let len = newz.articles;
        //console.log(newz)
        if (newz.totalResults == 0) {
            innhtml += "Sorry no news found"
        }
        else {
            for (let i = 0; i < len.length; i++) {
                //console.log("newz.articles[i] == " + newz.articles[i])
                if (newz.articles[i].author == null) {
                    innhtml += `<div class="accordion" id="accordionExample">
                <div class="card">
                  <div class="card-header" id="heading${i}">
                    <h2 class="mb-0">
                    <h5>${newz.articles[i].title}</h5>
                      <button class="btn btn-link btn-block text-left" type="button" data-toggle="collapse" data-target="#collapse${i}" aria-expanded="false" aria-controls="collapseOne">
                    ${newz.articles[i].source["name"]} 
                    publishedAt:${newz.articles[i].publishedAt}
                    
                      </button>
                    </h2>
                  </div>
              
                  <div id="collapse${i}" class="collapse" aria-labelledby="heading${i}" data-parent="#accordionExample">
                    <div class="card-body">
                     ${newz.articles[i].content}
                     <br><a href =${newz.articles[i].url}> To read more click here </a> 
                     </div>
                  </div>
                </div>`
                }
                else {
                    innhtml += `<div class="accordion" id="accordionExample">
                <div class="card">
                  <div class="card-header" id="heading${i}">
                    <h2 class="mb-0">
                    <h5>${newz.articles[i].title}</h5>
                      <button class="btn btn-link btn-block text-left" type="button" data-toggle="collapse" data-target="#collapse${i}" aria-expanded="false" aria-controls="collapseOne">
                    ${newz.articles[i].source["name"]} : By ${newz.articles[i].author} 
                    publishedAt:${newz.articles[i].publishedAt}
                    
                      </button>
                    </h2>
                  </div>
              
                  <div id="collapse${i}" class="collapse" aria-labelledby="heading${i}" data-parent="#accordionExample">
                    <div class="card-body">
                     ${newz.articles[i].content}
                     <br><a href =${newz.articles[i].url}> To read more click here </a> 
                     </div>
                  </div>
                </div>`
                }


            }
        }

        table.innerHTML = innhtml
        innhtml = '';

        //console.log(newz.articles[0].author)
    }
    Xhr.send()
}
//getnews("in")

//last adding event listner
submitBtn.addEventListener("click", function (e) {
    //console.log("hi")
    e.preventDefault;
    let alpbet;
    for (key in counterynames) {
        //console.log("hi2")
        let word = key;
        let wrd = document.getElementById(word)
        //console.log(wrd)
        if (wrd.checked) {
            //console.log("hi3")
            alpbet = wrd.value;
            //console.log("alpbet = " + alpbet)
        }
    }
    //console.log(alpbet)
    GetName(alpbet)
})

submitBtn2.addEventListener("click", function (e) {
    e.preventDefault;
    alpbet = ''
    for (key in counterynames) {
        //console.log("hi9")
        //console.log(contname)
        for (item in contname) {
            let word = '';
            word = contname[item]
            //console.log('word = ' + word)
            let wrd = document.getElementById(word)
            //console.log("wrd==" + wrd)
            if (wrd.checked) {
                //console.log("hi10")
                alpbet = wrd.value

                //console.log("alpbet = " + alpbet)
            }
        }
        getnews(alpbet)

    }

}) 