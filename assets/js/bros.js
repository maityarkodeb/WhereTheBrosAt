$(document).ready(function() {
	$('#tabs a').click(function(e) {
		e.preventDefault()
		$(this).tab('show')
	})

	$('#goBtn').click(function () {
		let location = $('#location').val();
		console.log(location)
	});
});
