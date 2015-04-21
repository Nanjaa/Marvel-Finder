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
				var marvel = json

				var name = json.data.results[0].title;
				var thumbnail = marvel.data.results[0].thumbnail.path + '.' + marvel.data.results[0].thumbnail.extension;


					$('#comicTitle').text(name);
					$('#comicStart').text(marvel.data.results[0].startYear + " - " + marvel.data.results[0].endYear);
					$('#comicThumb').attr('src', thumbnail);
					$('#comicDescription').text(marvel.data.results[0].description);
					$('#comicAvail').text(marvel.data.results[0].comics.available + "issues available");
					$('#content').text("this is a test");


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













<div class="container">
  <section id="fetch">
    <input type="text" placeholder="search" id="term" />
    <button id="search">Go</button>
  </seciton>
  <section id="comicInfo">
    <h1 id="loading"></h1>
    <h1 id="comicTitle"></h1>
    <p id="comicTitleSmall"></p>
    <p id="comicDescription"></p>
    <p id="comicStart"></p>
    <p id="comicEnd"></p>
    <img id="comicThumb">
    <p id="comicAvail"></p>
    <p id="content"></p>
  </section>
</div>