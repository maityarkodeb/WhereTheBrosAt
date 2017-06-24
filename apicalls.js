let yelpurl  = "https://api.yelp.com/v3/businesses/search?term=frat&location=";
let location = inputlocation.replace(",", "%2C")
let totalurl = yelpurl + location


function retrieveInfo() {
$.getJSON((totalurl), function(data) {

  let name, lat, long, placeinorder;
  placeinorder = int(x)
  name = data.businesses[x].name
  lat = data.businesses[x].coordinates.latitude
  long = data.businesses[x].coordinates.longitude
}