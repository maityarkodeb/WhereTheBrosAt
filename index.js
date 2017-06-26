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

app.get('/config.js', function(req, res) {
	res.send("var googleSrcApi='"+process.env.GOOGLEMAPSAPI+"'");
})

app.get('/location/:search', function(req, res) {
	let input = req.params.search


	yelp.search("term=frat&location=" + input)
	    .then(function(result){
	           res.json(result);
	        })
	    .catch(function (err) {
	    console.error(err);
		});
})

app.get('/coordinates/:points', function(req, res) {
	let input = req.params.points
	request(('https://maps.googleapis.com/maps/api/geocode/json?address=' + input + "&key=" + googleapi), function (error, response, body) {
	  let latlang = body
	})
	res.json(latlang)
})

app.listen(process.env.PORT || 3000, function() {
console.log("express is listening")
})