$(document).ready(function() {
	$('#progressbar').hide();
	$('#alertpopup').hide();

	$('#location').keypress(function(e){
    	let location = $('#location').val();
    	
    	if(e.keyCode == 13)
    	{
    		$("#map").empty();
    		e.preventDefault()
	    	if(location == "" ||  $.trim(location) == "" || location.replace(" ", "") == "") {
	    		$("#alertpopup").show()
	    	}
	    	else {
	    	$("#alertpopup").hide()
	    	$('#progressbar').show();
			retrieveInfo(location)
			}
    	}
	});

	$('#goBtn').click(function () {
		let location = $('#location').val();
		$("#map").empty();
		
		if(location == "" ||  $.trim(location) == "" || location.replace(" ", "") == ""){
	    	$("#alertpopup").show()
	    	}
	    else {
	    	$("#alertpopup").hide()
	    	$('#progressbar').show();
			retrieveInfo(location)
			}
	});

	function drawMap(arr, latcoor, longcoor) {
		        let map = new google.maps.Map(document.getElementById('map'), {
			      zoom: 11,
			      center: {lat: latcoor, lng: longcoor},
			      mapTypeId: google.maps.MapTypeId.ROADMAP
			    });

			    let infowindow = new google.maps.InfoWindow();

			    let marker, i;

			    for (i = 0; i < arr.length; i++) {  
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
	            data["listings"].businesses[i].location.display_address
	            ]
	        }

	        latcoor = data["coordinates"].results[0].geometry.location.lat
	        longcoor = data["coordinates"].results[0].geometry.location.lng
	     	drawMap(arr, latcoor, longcoor)
	     	$('#progressbar').hide();
	}})
	}
});
