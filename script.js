$(document).ready(function() {

// begin scripts

var getInformation = function() {
	var comic = $('#search').val();

	if(comic == '') {
		$('.holder').html("<h1 class='loading'>There's nothing in the search box.</h1>");
	}
	else {
		$('.holder').html("<h1 class='loading'>Your results are on the way</h1>");
		
		$.getJSON("http://gateway.marvel.com:80/v1/public/comics?title=" + comic + "&apikey=7e74289abba6ba60c0ec85bc595e7416", function(json) {
			console.log(json);
			}
		})
	}
}

$('#searchButton').click(getInformation);
$('#search').keyup(function(event) {
	if(event.keyCode == 13) {
		getInformation();
	}
});

// end scripts

});