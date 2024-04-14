var fetchWeather = "/weather";

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");

const weatherIcon = document.querySelector(".weatherIcon i");

const weatherCondition = document.querySelector(".weatherCondition");
const tempElement = document.querySelector(".temperature span");
const locationElement = document.querySelector(".place");

const dateElement = document.querySelector(".date");

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];


dateElement.textContent = new Date().getDate() + ", " + monthNames[new Date().getMonth()].substring(0,3); 

weatherForm.addEventListener("submit", (event)=>{
    event.preventDefault();

    weatherCondition.textContent = "";
    tempElement.textContent = "";
    locationElement.textContent = "Loading....";

    const locationAPI = fetchWeather + "?address=" + search.value;
    
    fetch(locationAPI).then((response)=>{
        return response.json();
    }).then((data)=>{
        if(data.error){
            weatherCondition.textContent = "";
            tempElement.textContent = "";
            locationElement.textContent = data.error;
        }
        else{
            weatherCondition.textContent = data.description.toUpperCase();
            tempElement.textContent = (data.temperature - 273.5).toFixed(2) + String.fromCharCode(176);
            locationElement.textContent = data.cityName;
        }
    })
})