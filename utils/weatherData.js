const request = require("request");
const constants = require("../config");

const weatherData = (address, callback) => {
    const url = constants.openWeatherApi.BASE_URL + encodeURIComponent(address) + "&appid=" + constants.openWeatherApi.SECRET_KEY;

    request({url, json:true}, (error, {body})=>{
        if(error){
            callback("Can't fetch the data from opneWeatherMapApi!", undefined);
        }
        else if(!body.main || !body.name || !body.weather){
            callback("Unable to fetch the data, try another location !", undefined);
        }
        else{
            callback(undefined, {
                main: body.weather[0].main,
                temperature: body.main.temp,
                description: body.weather[0].description,
                humidity: body.main.humidity,
                windSpeed: body.wind.speed
            });
        }
    });
}

module.exports = weatherData;