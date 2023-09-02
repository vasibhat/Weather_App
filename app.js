const express = require("express");
const https=require("https");
  const bodyParser=require("body-parser");


const app= express(); 
 app.use(bodyParser.urlencoded({extended:true}));


 app.get("/",function(req, res)
 {
    res.sendFile(__dirname+"/index.html");

 });

 app.post("/",function(req,res){  
    console.log(req.body.cityName);
    console.log("post req recieved");
    const query=req.body.cityName;
    const apikey="dc09bf1f32fed289d99621d29d8df4f3";
    const url="https://api.openweathermap.org/data/2.5/weather?q="+ query + "&appid=" +apikey;
    https.get(url ,function(response){
       console.log(response.statusCode); 
       response.on("data",function(data){
        const weatherData=JSON.parse(data)
        const temp=weatherData.main.temp
        const weatherDescription=weatherData.weather[0].description
        const icon=weatherData.weather[0].icon
        const imageURL="http://openweather.org/img/wn/"+ icon +"@2x.png"
        res.write("<p> The weather is currently " +weatherDescription+ "<p>");
        res.write("<h1>The Temprature in "+query+" is "+temp+" kelvin</h1>");
        res.write("<img src="+imageURL +">");
        res.send()
       })
    })
        
    
 })

  





app.listen(3000, function(){ 
    console.log("server is running on port 3000.");

})
  