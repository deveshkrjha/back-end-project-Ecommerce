var fetchWeather = "/weather";
const inputBox = document.querySelector('.input-box');
const searchBtn = document.getElementById('weatherForm');
const weather_img = document.querySelector('.weather-img');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const humidity = document.getElementById('humidity');
const wind_speed = document.getElementById('wind-speed');

const location_not_found = document.querySelector('.location-not-found');

const heading = document.getElementById("heading");
const wimg = document.getElementById("wimg");

const weather_body = document.querySelector('.weather-body');

searchBtn.addEventListener("submit", (event)=>{
    event.preventDefault();
   
    location_not_found.style.display = "flex";
    heading.textContent = "LOADING!!";
    wimg.style.display = "none";

    const locationAPI = fetchWeather + "?address=" + inputBox.value;
    
    fetch(locationAPI).then((response)=>{
        return response.json();
    }).then((data)=>{
        if(data.error){
            location_not_found.style.display = "flex";
            heading.textContent = data.error;
            wimg.style.display = "block"
            weather_body.style.display = "none";
            console.log(data.error);
        }
        else{
            console.log("run");
            location_not_found.style.display = "none";
            weather_body.style.display = "flex";
            temperature.innerHTML = `${Math.round(data.temperature - 273.15)}°C`;
            description.innerHTML = `${data.description}`;
        
            humidity.innerHTML = `${data.humidity}%`;
            wind_speed.innerHTML = `${data.windSpeed}Km/H`;
            
            switch(data.main){
                case 'Clouds':
                    weather_img.setAttribute("src", "/assets/cloud.png");
                    break;
                case 'Clear':
                    weather_img.setAttribute("src", "/assets/clear.png");
                    break;
                case 'Rain':
                    weather_img.setAttribute("src", "/assets/rain.png");
                    break;
                case 'Mist':
                    weather_img.setAttribute("src", "/assets/mist.png");
                    break;
                case 'Snow':
                    weather_img.setAttribute("src", "/assets/snow.png");
                    break;
        
            }
        
        }
    })
})