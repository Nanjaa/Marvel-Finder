$(document).ready(function() {
	// $('#comicInfo').hide();

// begin


var getSeries = function() {
	var noSpaces = $('#term').val();
	var series = noSpaces.split(' ').join('%20');
	console.log(series);
	if(series == '') {
		$('#loading').text('What would you like to search for?');
	}
	else {
		$('#loading').text('Loading');
// retrieve the seried information from the API
		$.get("http://gateway.marvel.com/v1/public/series?title=" + series + "&apikey=7e74289abba6ba60c0ec85bc595e7416", function(json) {
// respond if there is no data
			if(typeof json.data.results[0] == 'undefined') {
				$('#loading').hide();
				$('#title').text('No Results Found');
				$('#comicDescription').text("We're sorry, but we could not find anything under that name. Check your spelling, and try again!");
			}
// retrieve series ID
			else {
				console.log(json.data.results);
				var marvel = json
				var ID = json.data.results[0].id;
				console.log(ID);
// find information on the series from the ID
				var getComic = function() {
					$.get("http://gateway.marvel.com:80/v1/public/series/" + ID + "?apikey=7e74289abba6ba60c0ec85bc595e7416");
						$('#status').text(marvel.data.results[0].)
				}

// find information on the comics from the ID

			}
		});
	}
	return false;

}

// var getComic = function() {
// 	var series = $('#comicID').text().;
// 	console.log(series);
// 	if(series == '') {
// 		$('#loading').text('Fuck you');
// 	}
// 	else {
// 		$('#loading').text('Loading');
// 		$.get("http://gateway.marvel.com:80/v1/public/series/" + series + "/comics?apikey=7e74289abba6ba60c0ec85bc595e7416", function(json) {
// 			var marvel = json
// 			var mostRecent = marvel.data.results[0].title;
// 			var seriesName = marvel.data.results[0].series.name;
// 			var release = marvel.data.results[0].dates[0].date;
// 			var price = marvel.data.results[0].prices[0].price;
// 			var thumb = marvel.data.results[0].thumbnail.path;
// 			var nail = marvel.data.results[0].thumbnail.extension;
// 			var thumbnail = thumb + "." + nail;
// 			console.log(mostRecent + " " + seriesName + " " + release + " " + price + " " + thumbnail);
// 		});
// 	};
// };



$('#search').click(getSeries);
$('#term').keyup(function(event) {
	if(event.keyCode == 13) {
		getSeries();
	}
});

// $('#test').click(getComic);

// Pictoral links on the home page

// $('#spiderman').click(function() {
// 	switch(this.id) {
// 		window.location.href="comicFind.html"
// 	}
// })

// end

});