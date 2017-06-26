let express = require('express')
let Yelp = require('node-yelp-fusion');
let path = require("path")
let app = express();
let request = require('request');

let clientId = "-1QwOXiItXRc4WP3s7yazw";
let clientSecret = "YuM1FkgCxrWAZG5CEmnUVwu412ncTO8PLj5VyNI7Aw9po0O49yohL7PBMrHXvF7p";
let googleapi = "AIzaSyBmVblixeQ5-vb_gvdTWuvznRs8lUuoV4k";
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