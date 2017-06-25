let express = require('express')
let app = express();
var Yelp = require('node-yelp-fusion');

let clientId = process.env.CLIENT_ID;
let clientSecret = process.env.CLIENT_SECRET;
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