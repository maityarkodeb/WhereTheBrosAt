let express = require('express')
let Yelp = require('node-yelp-fusion');
let path = require("path")
let app = express();
let request = require('request');

let clientId = process.env.CLIENT_ID;
let clientSecret = process.env.CLIENT_SECRET;
let googleapi = process.env.GOOGLEMAPSAPI;
let yelp = new Yelp({ id: clientId , secret: clientSecret });


let publicPath = path.resolve(__dirname, "public")
app.use(express.static(publicPath))

app.get('/location/:search', function(req, res) {
	let input = req.params.search

	let firstQuery = new Promise((resolve, reject) => {
		yelp.search("term=frat&location=" + input)
	    .then(function(result){
	           resolve(result)
	        })
	    .catch(function (err) {
	    	reject(err)
		});
    });

	let secondQuery = new Promise((resolve, reject) => {
        request(('https://maps.googleapis.com/maps/api/geocode/json?address=' + input + "&key=" + googleapi), function (error, response, body) {
            if (!error) {
            	let latlang = JSON.parse(body)
                resolve(latlang);
            } else {
                reject(error);
            }
        })
    })

    Promise.all([firstQuery, secondQuery])
        .then((results) => {
            res.send({ "listings": results[0], "coordinates": results[1] });
        })
        .catch((err) => {
            res.send({});
        });
})

app.listen(process.env.PORT || 3000, function() {
console.log("express is listening")})