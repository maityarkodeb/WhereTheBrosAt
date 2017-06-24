$(document).ready(function() {
	$('#tabs a').click(function(e) {
		e.preventDefault()
		$(this).tab('show')
	})

	$('#goBtn').click(function () {
		let location = $('#location').val();
		console.log(location)
	});

	var yelpurl  = "https://api.yelp.com/v3/businesses/search?term=frat&location=";
	var location = "Atlanta"
	// inputlocation.replace(",", "%2C")
	var totalurl = yelpurl + location
	var secretpass = "jE6PgDRPzcRPX7bY0i5huNjzGcAU84H1b53LCNziU20kojs5PS4WM4ZWJttRbEkaZ_aLy3leic6lC0tPy6VBpj-cwRO5ZJbrvsraR_r5N3OeGKdeJj16thk4TQ5LWXYx"


	function retrieveInfo() {
	 $.ajax({
	      
	      xhrFields: { withCredentials: true},
	      headers: {'Authorization': 'Bearer ' + secretpass},
	      url: yelpurl + location ,
	      type: 'GET',
	      
	      success: function(data) {
	        var lengtharray = data.busineses.length
	        var arr = []

	        for (var i =o; i < lengtharray; i++) {
	            arr.push({
	            name : data.businesses[i].name,
	            lat : data.businesses[i].coordinates.latitude,
	            long : data.businesses[i].coordinates.longitude
	            })
	        }
	      }
	})
	}

	retrieveInfo()

	 /* xhrFields: {
	        withCredentials: true
	    },
	    headers: {
	        'Authorization': 'Basic ' + btoa('myuser:mypswd')
	    },
	    url: "https://www.example.org/protected-data.php"
	}**/


	
});
