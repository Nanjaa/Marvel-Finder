$(document).ready(function() {
	$('#browseComics').hide();

// begin

// ********************************************UNIVERSAL FUNCTIONS******************************************************
function browseFunction() {
	$('#mainPage').hide();
	$('#browseComics').fadeIn('slow');	
}
function homeFunction() {
	$('#browseComics').hide();
	$('#mainPage').fadeIn('slow');	
}

$('#browse').click(browseFunction);
$('#home').click(homeFunction);

// ****************************************** MAIN PAGE *****************************************************************

$('#spiderman').click(browseFunction);
$('#spiderman').click(function() {
})
$('#spiderman').hover(function() {
})
// ****************************************** SEARCH COMICS *************************************************************

var getSeries = function() {
	var noSpaces = $('#term').val();
	var series = noSpaces.split(' ').join('%20');
	if(series == '') {
		$('#loading').text('What would you like to search for?');
	}
	else {
		$('#loading').text('Loading');
		$('#loadingGif').show();
// retrieve the seried information from the API
		$.get("http://gateway.marvel.com/v1/public/series?title=" + series + "&apikey=7e74289abba6ba60c0ec85bc595e7416", function(json) {
// respond if there is no data
			if(typeof json.data.results[0] == 'undefined') {
				$('#loading').hide();
				$('#loadingGif').hide();
				$('#title').text('No Results Found');
				$('#comicDescription').text("We're sorry, but we could not find anything under that name. Check your spelling, and try again!");
			}
// provide user with three series options
			else {
				var marvel = json
				$('#loading').text('Please choose a series above');
				$('#loadingGif').hide();
				$('.optionOne').text(marvel.data.results[0].title);
				$('.optionTwo').text(marvel.data.results[1].title);
				$('.optionThree').text(marvel.data.results[2].title);
// retrieve the information for option one
				$('.optionOne').click(function() {
					$('.optionOne').hide();
					$('.optionTwo').hide();
					$('.optionThree').hide();
					var ID = json.data.results[0].id;
					$('loadingGif').show();
					$.get("http://gateway.marvel.com:80/v1/public/series/" + ID + "?apikey=7e74289abba6ba60c0ec85bc595e7416", function(json) {
						$('loadingGif').hide();
						var marvel = json
						$('#title').text(marvel.data.results[0].title);
						$('#comicDescription').text(marvel.data.results[0].description);
						$('#thumbnail').attr('src', marvel.data.results[0].thumbnail.path + '.' + marvel.data.results[0].thumbnail.extension);
						$('#rating').text("rating: " + marvel.data.results[0].rating);
						$('#url').attr('href', marvel.data.results[0].urls[0].url);
						$('#urlText').text('View this series at Marvel.com');
						$('#creatorsNumber').text('creators: ' + marvel.data.results[0].creators.available);
						$('#creatorsNumber').hover(function() {
							$('#creators').show();
						});
						console.log(marvel.data.results[0].creators.available);
						var creatorsList = marvel.data.results[0].creators.items;

						var findCreators = function() { 
							for(var i=0; i<creatorsList.length; i++) {
							$('#creators').append('<p>' + creatorsList[i].name + '</p>');
							};
						};
						findCreators();

						$('#loading').hide();
					});
				});
// retrieve the information for option two
				$('.optionTwo').click(function() {
					$('.optionOne').hide();
					$('.optionTwo').hide();
					$('.optionThree').hide();
					var ID = json.data.results[1].id;
					$.get("http://gateway.marvel.com:80/v1/public/series/" + ID + "?apikey=7e74289abba6ba60c0ec85bc595e7416", function(json) {
						var marvel = json
						$('#title').text(marvel.data.results[1].title);
						$('#comicDescription').text(marvel.data.results[1].description);
						$('#thumbnail').attr('src', marvel.data.results[1].thumbnail.path + '.' + marvel.data.results[0].thumbnail.extension);
						$('#rating').text("rating: " + marvel.data.results[1].rating);
						$('#url').attr('href', marvel.data.results[1].urls[0].url);
						$('#urlText').text('View this series at Marvel.com');
						$('#creatorsNumber').text('creators: ' + marvel.data.results[1].creators.available);
						$('#creatorsNumber').hover(function() {
							$('#creators').show();
						})
						var creatorsList = marvel.data.results[1].creators.items;

						var findCreators = function() { 
							for(var i=0; i<creatorsList.length; i++) {
							$('#creators').append('<p>' + creatorsList[i].name + '</p>');
							};
						};
						findCreators();

						$('#loading').hide();
					});
				});
// retrieve the information for option three
				$('.optionThree').click(function() {
					$('.optionOne').hide();
					$('.optionTwo').hide();
					$('.optionThree').hide();
					var ID = json.data.results[2].id;
					$.get("http://gateway.marvel.com:80/v1/public/series/" + ID + "?apikey=7e74289abba6ba60c0ec85bc595e7416", function(json) {
						var marvel = json
						$('#title').text(marvel.data.results[2].title);
						$('#comicDescription').text(marvel.data.results[2].description);
						$('#thumbnail').attr('src', marvel.data.results[2].thumbnail.path + '.' + marvel.data.results[0].thumbnail.extension);
						$('#rating').text("rating: " + marvel.data.results[2].rating);
						$('#url').attr('href', marvel.data.results[2].urls[0].url);
						$('#urlText').text('View this series at Marvel.com');
						$('#creatorsNumber').text('creators: ' + marvel.data.results[2].creators.available);
						$('#creatorsNumber').hover(function() {
							$('#creators').show();
						})
						var creatorsList = marvel.data.results[2].creators.items;

						var creatorsList = marvel.data.results[2].creators.items;

						var findCreators = function() { 
							for(var i=0; i<creatorsList.length; i++) {
							$('#creators').append('<p>' + creatorsList[i].name + '</p>');
							};
						};
						findCreators();

						$('#loading').hide();
					});
// EVERYTHING BELOW THIS LINE IS HAPPY AND GOOD DO NOT INTERFERE
				});
			};		
		});
	};
	return false;
};

// K NOW YOU CAN INTERFERE

$('#search').click(getSeries);
$('#term').keyup(function(event) {
	if(event.keyCode == 13) {
		getSeries();
	}
});

// end

});