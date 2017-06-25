let express = require('express')
let app = express();
var Yelp = require('node-yelp-fusion');

let clientId = "-1QwOXiItXRc4WP3s7yazw";
let clientSecret = "YuM1FkgCxrWAZG5CEmnUVwu412ncTO8PLj5VyNI7Aw9po0O49yohL7PBMrHXvF7p";
var yelp= new Yelp({ id:clientId , secret:clientSecret });


app.get('/:search', function(req, res) {
let input = req.params.search


yelp.search("term=frat&location=" + input)
    .then(function(result){
           res.json(result);
        })
  })

app.listen(process.env.PORT || 3000, function() {
console.log("express is listening")
})