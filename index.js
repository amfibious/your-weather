
const request = require('request');
const express = require('express');
const app = express();

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.set('view engine', 'ejs')

let apiKey = process.env.apiKey;
//Home
app.get('/', (req, res) => {
    res.render('index', {weather: null, error: null});
});

app.post('/', (req, res) => {
    let city = req.body['city'];
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appId=${apiKey}`;

    request(url, (err, resp, body) => {
        if(err){
            res.render('index', {weather: null, error: 'An error occured, please try again later'});
        }

        let weather = JSON.parse(body);
        if(!weather.main){
            res.render('index', {weather: null, error: 'Not found'});
        }
        else{
            let weatherText = `It's ${(weather.main.temp-273).toFixed(2)} degrees in ${weather.name}`;
            res.render('index', {weather: weatherText, error: null});
        }
    })
    // res.render('index');
    // console.log(req.body.city);
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Weather Application listening on port ${PORT}`)
})