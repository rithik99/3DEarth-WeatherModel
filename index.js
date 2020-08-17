let fetch = require('node-fetch');
const express = require('express');
const app = express();
const navigator = require('web-midi-api');
const fs = require('fs');
const path = require('path');
const ejs = require('ejs');
app.listen( 5434 ,() => console.log("listening at 5434"));
const __dirnamee = path.join(__dirname,'/weather');
app.use(express.static('weather'));
var bodyParser = require('body-parser');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.set('views', __dirnamee);
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());


app.post('/index1', function(req1 ,res){
		var latt = req1.body.latt;
		var lnn = req1.body.lnn;
		console.log(latt);
		let darksky = 'https://api.darksky.net/forecast/';
		let key = 'a0d4469fcd29aa5a2454e8118f09ab53';
		let lat = latt;
		let lng = lnn;
		let uri = darksky + key + '/' + lat +','+ lng;
		uri = uri.concat('?units=ca');
		let options = {
			method: 'GET',
			mode: 'cors'
		}

		let req = new fetch.Request(uri, options);
		var strd;
		fetch(req)
			.then((response)=>{
				if(response.ok){
					return response.json();
				}else{
					throw new Error('Bad HTTP!')
				}
			})
			.then( (j) =>{
				var la = Math.floor(lat);
				var lg = Math.floor(lng);
				console.log(la);
				console.log(lg);
				console.log("-------------------WEATHER REPORT---------------------");
				console.log("Temperature:  "+j.currently.temperature);
				console.log( "Weather Prediction:  "+j.currently.summary);
				console.log("Humidity:   "+ j.currently.humidity);
				console.log("WindSpeed   "+ j.currently.windSpeed);
				console.log(j.currently.icon);
				if(j.currently.nearestStormDistance){
					console.log("Possible Storms(Distance):   "+ j.currently.nearestStormDistance);
					strd = j.currently.nearestStormDistance;
				}
				else{
				console.log("No Storm nearby");
				strd = "No Storm Nearby";
				}
				console.log(j.daily.data[0].temperatureMin);
				console.log(j.daily.data[0].temperatureMax);
				console.log(j.daily.data[0].icon);
		
				if (j.alerts){
					console.log("Alerts:   "+ j.alerts.title);
				}
				res.render('index2.html',{day1tmi:j.daily.data[0].temperatureMin,day1i:j.daily.data[0].icon,day1tma:j.daily.data[0].temperatureMax,day2tmi:j.daily.data[1].temperatureMin,day2i:j.daily.data[1].icon,day2tma:j.daily.data[1].temperatureMax,day3tmi:j.daily.data[2].temperatureMin,day3i:j.daily.data[2].icon,day3tma:j.daily.data[2].temperatureMax,ico:j.currently.icon,strd:strd,summ:j.currently.summary,temp:j.currently.temperature,hum:j.currently.humidity,wp:j.currently.windSpeed,lat1 : latt,lan1: lnn,sui:"shit" });
			})
			.catch( (err) =>{
				console.log('ERROR:', err.message);
			});
});
