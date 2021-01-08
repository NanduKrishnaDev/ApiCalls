let form = document.getElementById("form");           //initialisation of variables
let submit = document.getElementById("submit1"); 
let loader = document.getElementById("loader");
let output = document.getElementById("output");
let reset = document.getElementById("reset1");


form.addEventListener('submit', e => {                  //event listener to manage submit click
    e.preventDefault();
    let name = document.getElementById("name").value.trim();
    if(name==""){ alert("Type some name");}
    else{
        console.log(name);
        reset.style.display = 'none';                       //changes in page after submit
        submit.style.display = 'none';
        loader.style.display = 'block';
        promise1(name);     
    }                                //main function called
    });
form.addEventListener('reset', e => {                   //event listener to manage reset click
    submit.style.display = 'flex';
    output.style.display = 'none';
    reset.style.display = 'none'; 

    document.getElementById("output").innerHTML ='<span id="name1"></span >&nbsp; has a country ID &nbsp;<span id="country"></span>&nbsp; with probability of &nbsp;<span id="probability"></span>';

});

function promise1(inputname){                            //function with promise    
    new Promise((resolve,reject)=>{
        fetch('https://api.nationalize.io/?name='.concat(inputname)).then(response => {        //request api with input                                                
        if (response.ok){
        let data = response.json().then(data => {                                   //get the results                
            let api = data;
            let api1 = api.country[0];
            if (typeof (api1) != 'undefined'){
                var countryid = api1.country_id;
                var probability = api1.probability;
                document.getElementById("name1").innerHTML = inputname;               //paint the results
                document.getElementById("country").innerHTML = countryid;
                let pro = Math.round((probability + Number.EPSILON) * 100) / 100;
                document.getElementById("probability").innerHTML = pro;
            }
            else{ document.getElementById("output").innerHTML ="invalid name";}               
                });
            }else{
                document.getElementById("output").innerHTML ="invalid name";
            }
            setTimeout(() => {                    //timeout set for the loader
              
                loader.style.display = 'none';
                output.style.display = 'flex';
                reset.style.display = 'flex';
            },1000)
        })
    });
   
   
}