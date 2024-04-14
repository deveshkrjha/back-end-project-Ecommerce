const request = require("request");
const constants = require("../config");

const weatherData = (address, callback) => {
    const url = constants.openWeatherApi.BASE_URL + encodeURIComponent(address) + "&appid=" + constants.openWeatherApi.SECRET_KEY;
    // console.log(url);
    // callback("url is working i guess");

    request({url, json:true}, (error, {body})=>{
        if(error){
            callback("Can't fetch the data from opneWeatherMapApi!", undefined);
        }
        else if(!body.main || !body.name || !body.weather){
            callback("Unable to fetch the data, try another location !", undefined);
        }
        else{
            callback(undefined, {
                temperature: body.main.temp,
                description: body.weather[0].description,
                cityName: body.name
            });
        }
    });
}

module.exports = weatherData;