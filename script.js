$(document).ready(function() {

// begin


var getPoster = function() {
	var film = $('#term').val();
	console.log(film);
	if(film == '') {
		$('#poster').html("<h2 class='loading'>Fuck you</h2>")
	}
	else {
		$('#poster').html("<h2 class='loading'>Loading</h2>");
		$.get("http://gateway.marvel.com/v1/public/series?title=" + film + "&apikey=7e74289abba6ba60c0ec85bc595e7416", function(json) {
			if (json != "Nothing found.") {
				$('#poster').html('<h2 class="loading">Here are your details</h2><p>(json[0].data.results[0].title)</p>')
			}
			else {
				$.get("http://gateway.marvel.com/v1/public/series?title=hulk&apikey=7e74289abba6ba60c0ec85bc595e7416", function(json) {
					console.log(json);
					$('#poster').html('<h2 class="loading">Unfortunately I fucked up</h2>');
				});
			}
		});
	}
	return false;

}

$('#search').click(getPoster);
$('#term').keyup(function(event) {
	if(event.keyCode == 13) {
		getPoster();
	}
});






// end

});