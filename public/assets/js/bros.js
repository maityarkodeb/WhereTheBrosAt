$(document).ready(function() {
	$('#tabs a').click(function(e) {
		e.preventDefault()
		$(this).tab('show')
	})

	$('#goBtn').click(function () {
		$("#map").empty();
		let location = $('#location').val();

		retrieveInfo(location)
	});

	function drawMap(arr, latcoor, longcoor) {
		        let map = new google.maps.Map(document.getElementById('map'), {
			      zoom: 10,
			      center: {lat: latcoor, lng: longcoor},
			      mapTypeId: google.maps.MapTypeId.ROADMAP
			    });


		        console.log(latcoor, longcoor, location)
			    let infowindow = new google.maps.InfoWindow();

			    let marker, i;

			    for (i = 0; i < arr.length; i++) {  
			      marker = new google.maps.Marker({
			        position: new google.maps.LatLng(arr[i][1], arr[i][2]),
			        map: map
			      });

			      map.setCenter({lat: latcoor, lng: longcoor});

			      google.maps.event.addListener(marker, 'click', (function(marker, i) {
			        return function() {
			          infowindow.setContent(arr[i][0]), arr[i][3];
			          infowindow.open(map, marker);
			        	}	
			      })(marker, i));
	    		}
		        }

	function retrieveInfo(location) {
	 $.ajax({
	      type: 'GET',
	      url: ("/location/" + location),
	      
	      success: function(data) {
	        let lengtharray = data["listings"].businesses.length
	        let arr = []

	        for (let i = 0; i < lengtharray; i++) {
	            arr[i] = [data["listings"].businesses[i].name, 
	            data["listings"].businesses[i].coordinates.latitude, 
	            data["listings"].businesses[i].coordinates.longitude,
	            data["listings"].businesses[i].location.display_address]
	        }
	        console.log(data)
	        latcoor = data["coordinates"].results[0].geometry.location.lat
	        longcoor = data["coordinates"].results[0].geometry.location.lng
	     	drawMap(arr, latcoor, longcoor)
	}})
	}
});
