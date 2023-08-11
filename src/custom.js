const result = document.querySelector(".result");
const form = document.querySelector(".get-weather");
const nameCity = document.querySelector("#city");
const nameCountry = document.querySelector("#country");

form.addEventListener("submit", (e)=> {
    e.preventDefault();

    if(nameCity.value === "" || nameCountry.value === ""){
        showError('Ambos campos son obligatorios...')
        return;
    }
    
    
    callApi(nameCity.value, nameCountry.value);
});


function callApi(city, country){
    const apiID = '1854f23ff6b8bd67ff3f2f6f8b0f18ab';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiID}`;
    //https://api.openweathermap.org/data/2.5/weather?q=managua,Nicaragua&appid=1854f23ff6b8bd67ff3f2f6f8b0f18ab
    fetch(url)
     .then(data => {
        return data.json();
     })
     .then(dataJSON => {
        if(dataJSON.cod=== "404"){
            showError("ciudad no encontrada....");
        } else{
            clearHTML();
            showWeather(dataJSON);
        }
        console.log(dataJSON);
     })
     .catch(error => {
        console.log(error);
     })
}

function showWeather(data){
    const  {name,main:{temp, temp_min, temp_max },weather:[arr]} = data;

    const degrees = kelvinToCentigrade(temp);
    const Min = kelvinToCentigrade(temp_min);
    const Max = kelvinToCentigrade(temp_max);

    const content = document.createElement('div');
    content.innerHTML = `
      <h5>Clima en ${name}</h5>
      <img src="https://openweathermap.org/img/wn/${arr.icon}@2x.png" alt="icon">
    
      <h2> ${degrees}°C</h2>
      <p>Max: ${Min}°C</p>
      <p>Min: ${Max}°C</p> 
    `;
    result.appendChild(content);

    console.log(name);
    console.log(temp);
    console.log(temp_max);
    console.log(temp_min);
    console.log(arr.icon);
}

function showError(message){
    console.log(message);
    const alert = document.createElement("p");
    alert.classList.add('alert-message');
    alert.innerHTML = message;

    form.appendChild(alert);
    setTimeout(() =>{
        alert.remove();
    }, 3000);
}

function kelvinToCentigrade (temp) {
    return parseInt(temp - 273.15)
}

function clearHTML () {
    result.innerHTML = "";
}