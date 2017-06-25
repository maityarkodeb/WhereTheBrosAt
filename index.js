let express = require('express')
let Yelp = require('node-yelp-fusion');
let path = require("path")
let app = express();


//let clientId = process.env.CLIENT_ID;
//let clientSecret = process.env.CLIENT_SECRET;
let clientId = "-1QwOXiItXRc4WP3s7yazw"
let clientSecret = "YuM1FkgCxrWAZG5CEmnUVwu412ncTO8PLj5VyNI7Aw9po0O49yohL7PBMrHXvF7p"
let yelp = new Yelp({ id: clientId , secret: clientSecret });


let publicPath = path.resolve(__dirname, "public")
app.use(express.static(publicPath))

app.get('/:search', function(req, res) {
let input = req.params.search


yelp.search("term=frat&location=" + input)
    .then(function(result){
           res.json(result);
        })
    .catch(function (err) {
    console.error(err);
	});
  })

app.listen(process.env.PORT || 3000, function() {
console.log("express is listening")
})