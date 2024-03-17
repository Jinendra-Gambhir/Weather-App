const express = require('express');
const axios = require('axios');
const { response } = require('express');
require('dotenv').config();
const app = express();
const API_KEY = process.env.API_KEY;
const port = 3033;
app.get('/', function(req, res) {
    const address = req.query.address;
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${address}&units=metric&appid=${API_KEY}`;
    console.log(url)

    axios.get(url).then(response=>{
        const data = response.data;
        const cityName = data.name;
        const temperature = data.main.temp;
        const sunsetTime = new Date(data.sys.sunset * 1000).toLocaleTimeString();
        const message = `City Name: ${cityName}<br>Temperature: ${temperature}&deg;C<br>Sunset Time: ${sunsetTime}`;

        res.send(`<html><body><div id='container'><h1>${message}</h1></div></body></html>`);

        response.end();
    })
    .catch(error=> {
        console.error(error);
        res.status(500).send('Error Occured')
    })
});

app.listen(port, function(){
    console.log(`Application is running on ${port}`);
})