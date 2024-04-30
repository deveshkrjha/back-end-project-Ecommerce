const express = require("express");
const hbs = require("hbs");
const path = require("path");
const app = express();

const weatherData = require("../utils/weatherData");

const port = 3000;

const publicStaticDirPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

app.use(express.static(publicStaticDirPath));
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);


app.get("/", (req,res)=>{
    res.render("index");
});


app.get("/weather", (req,res)=>{
    const address = req.query.address;

    if(!address){
        return res.send({
            error: "You must enter address in search box!"
        });
    }

    weatherData(address, (error, {main, temperature, description, humidity, windSpeed} = {})=>{
        if(error){
            return res.send({error});
        }
        console.log(main, temperature, description, humidity, windSpeed);
        res.send({
            main,
            temperature,
            description,
            humidity,
            windSpeed
        });
    });
});


app.get("*", (req,res)=>{
    res.render("404", {
        title: "Page Not Found !!"
    });
});


app.listen(port, ()=>{
    console.log(`Server is listening on port ${port}`);
});