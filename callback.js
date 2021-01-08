let form = document.getElementById("form");         //initialisation of variables
let submit = document.getElementById("submit1");
let loader = document.getElementById("loader");
let output = document.getElementById("output");
let reset = document.getElementById("reset1");


form.addEventListener('submit', e => {            //event listener to manage submit click
    e.preventDefault();
    let name = document.getElementById("name").value.trim();
    if(name==""){ alert("Type some name");}
    else{formSubmit(name,callback1);}                   //main function called
});

form.addEventListener('reset', e => {             //event listener to manage reset click
    submit.style.display = 'flex';
    output.style.display = 'none';
    reset.style.display = 'none'; 

    document.getElementById("output").innerHTML ='<span id="name1"></span >&nbsp; has a country ID &nbsp;<span id="country"></span>&nbsp; with probability of &nbsp;<span id="probability"></span>';
});

async function callback1(inputname) {                                                        //function with async await
    let response = await fetch('https://api.nationalize.io/?name='.concat(inputname));   //request api with input 
    let data = await response.json();                                                    //get the results 
    let api1 = data.country[0];
    if (typeof (api1) != 'undefined'){
        var countryid = api1.country_id;
        var probability = api1.probability;
        document.getElementById("name1").innerHTML = inputname;                          //paint the results
        document.getElementById("country").innerHTML = countryid;
        let pro = Math.round((probability + Number.EPSILON) * 100) / 100;
        document.getElementById("probability").innerHTML = pro;
    }
    else{
        document.getElementById("output").innerHTML ="invalid name";               
        }  
    setTimeout(formReset,1000);                                                                 //timeout set for the loader

}

function formSubmit(name,callback){
         reset.style.display = 'none';                 //changes in page after submit
         submit.style.display = 'none';
         loader.style.display = 'block';
         callback(name);

}

function formReset(){
    loader.style.display = 'none';
    output.style.display = 'flex';
    reset.style.display = 'flex';
}