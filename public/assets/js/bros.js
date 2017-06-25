$(document).ready(function() {
	$('#tabs a').click(function(e) {
		e.preventDefault()
		$(this).tab('show')
	})

	$('#goBtn').click(function () {
		let location = $('#location').val();
		console.log(location)
		retrieveInfo(location)
	});

	function retrieveInfo(location) {
	 $.ajax({
	      type: 'GET',
	      url: ("/" + location),
	      
	      success: function(data) {
	        var lengtharray = data.businesses.length
	        var arr = []

	        for (var i = 0; i < lengtharray; i++) {
	            arr[i] = [data.businesses[i].name, 
	            data.businesses[i].coordinates.latitude, 
	            data.businesses[i].coordinates.longitude,
	            data.businesses[i].location.display_address]
	        }
	        console.log(arr)
	      }
	})
	} 

	
});
