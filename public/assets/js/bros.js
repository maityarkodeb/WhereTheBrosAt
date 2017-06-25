$(document).ready(function() {
	$('#tabs a').click(function(e) {
		e.preventDefault()
		$(this).tab('show')
	})

	$('#goBtn').click(function () {
		let location = $('#location').val();
		console.log(location)
		retrieveInfo(location)


	/*

	 var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 10,
      center: location,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    var infowindow = new google.maps.InfoWindow();

    var marker, i;

    for (i = 0; i < locations.length; i++) {  
      marker = new google.maps.Marker({
        position: new google.maps.LatLng(arr[i][1], arr[i][2]),
        map: map
      });

      google.maps.event.addListener(marker, 'click', (function(marker, i) {
        return function() {
          infowindow.setContent(arr[i][0]), arr[i][3];
          infowindow.open(map, marker);
        }
      })(marker, i));
    }
	**/
	});

	function retrieveInfo(location) {
	 $.ajax({
	      type: 'GET',
	      url: ("/" + location),
	      
	      success: function(data) {
	        let lengtharray = data.businesses.length
	        let arr = []

	        for (let i = 0; i < lengtharray; i++) {
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
