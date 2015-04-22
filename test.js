$(document).ready(function() {

// begin

$('#term').select();
var script = document.createElement('script');

$('#search').click(function(inp) {
	var series = $('#term').val();
	if(series == '') {
		$('#loading').text('PLEASE ENTER SOMETHING, COCKHEAD');
	}
	else {
		script.src = 'http://gateway.marvel.com:80/v1/public/series?title=' + series + '&apikey=7e74289abba6ba60c0ec85bc595e7416';
	}
	scrit = null;
	$(script).remove();
	script = document.createElement('script');
})

});

// get data from api

var getSeries = function(marvel) {
	if('error' in marvel.data) {
		$('#loading').text('INVALID SEARCH');
		return;
	}
	else {
		$('#loading').text('');
		$('#title').text(name);
		$('#comicThumb').attr('src', thumbnail);
		$('#comicDescription').text(marvel.data.results[0].description);
		$('#comicAvail').text(marvel.data.results[0].comics.available + " issues available");

	}
} 


$('#search').click(getSeries);
$('#term').keyup(function(event) {
	if(event.keyCode == 13) {
		getSeries();
	}
});





// end

});