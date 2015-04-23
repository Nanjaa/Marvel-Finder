$(document).ready(function() {
	$('#browseComics').hide();

// begin

// ********************************************UNIVERSAL FUNCTIONS******************************************************
function browseFunction() {
	$('#mainPage').hide();
	$('myComicsList').hide();
	$('#browseComics').fadeIn('slow');	
};
function homeFunction() {
	$('#browseComics').hide();
	$('#myComicsList').hide();
	$('#mainPage').fadeIn('slow');	
};
function myComicsFunction() {
	$('#browseComics').hide();
	$('#mainPage').hide();
	$('#myComicsList').fadeIn('slow');
}

$('#title1').click(homeFunction);
$('#title2').click(homeFunction);
$('#browse').click(browseFunction);
$('#home').click(homeFunction);
$('#myComics').click(myComicsFunction);
$('#marvelFinder').hover(
	function() {
		$('#title1').css('color', '#f78f3f');
		$('#title2').css('color', '#518cca');
	},
	function() {
		$('#title1').css('color', '#e23636');
		$('#title2').css('color', 'black');
	}
);

function showGif() {
	$('#loadingGif').toggle();
};

// ****************************************** MAIN PAGE *****************************************************************

$('#spiderman').click(browseFunction);

// ****************************************** SEARCH COMICS *************************************************************

var getSeries = function() {
	var noSpaces = $('#term').val();
	var series = noSpaces.split(' ').join('%20');
	if(series == '') {
		$('#loading').text('What would you like to search for?');
	}
	else {
		$('#loading').text('Loading');
		showGif();
// retrieve the seried information from the API
		$.get("http://gateway.marvel.com/v1/public/series?title=" + series + "&apikey=7e74289abba6ba60c0ec85bc595e7416", function(json) {
// respond if there is no data
			if(typeof json.data.results[0] == 'undefined') {
				$('#loading').hide();
				showGif();
				$('#title').text('No Results Found');
				$('#comicDescription').text("We're sorry, but we could not find anything under that name. Check your spelling, and try again!");
			}
// provide user with three series options
			else {
				var marvel = json
				$('#loading').text('Please choose a series above');
				showGif();
				$('.optionOne').text(marvel.data.results[0].title);	
				function showOptions() {				
					if(typeof marvel.data.results[2] != 'undefined') {
						$('.optionTwo').text(marvel.data.results[1].title);
						$('.optionThree').text(marvel.data.results[2].title);						
					}
					else {
						$('.optionTwo').text(marvel.data.results[1])
					};
				};
				showOptions();
// ************ THE FOLLOWING FUNCTIONS WILL ALL BE USED AFTER SELECTING A SERIES *****************
// sets up the function for later 
				function printInfo(test) {
					$('#title').text(test.data.results[0].title);
					function descriptionTest() {
						if(test.data.results[0].description == null) {
							$('#comicDescription').text(test.data.results[0].stories.items[0].name);
						};					
					};
					descriptionTest();
					$('#thumbnail').attr('src', test.data.results[0].thumbnail.path + '.' + marvel.data.results[0].thumbnail.extension);
					$('#rating').text("rating: " + test.data.results[0].rating);
					$('#url').attr('href', test.data.results[0].urls[0].url);
					$('#urlText').text('View this series at Marvel.com');
					$('#creatorsNumber').text('creators: ' + test.data.results[0].creators.available);
					$('#creatorsNumber').hover(
						function() {
							$('#creators').show();
							$('#thumbnail').hide();
						},
						function() {
							$('#creators').hide();
							$('#thumbnail').show();
						}
					);
					var creatorsList = marvel.data.results[0].creators.items;
					var findCreators = function() { 
						for(var i=0; i<creatorsList.length; i++) {
						$('#creators').append('<p>' + creatorsList[i].name + '</p>');
						};
					};
					findCreators();
					$('#rating').hover(
						function() {
							$('#ratingSystem').show();
							$('#thumbnail').hide();
						},
						function() {
							$('#ratingSystem').hide();
							$('#thumbnail').show();
						}
					);
					$('#loading').hide();
				};
// function to hide the options
				function noOptions() {
					$('.optionOne').hide();
					$('.optionTwo').hide();
					$('.optionThree').hide();
				}
// function to find the information 
				function getInfo(ID) {
					$.get("http://gateway.marvel.com:80/v1/public/series/" + ID + "?apikey=7e74289abba6ba60c0ec85bc595e7416", function(json) {
						var test = json
						printInfo(test);
					});
				} ;
				function noSearch() {
					$('#term').hide();
					$('#search').hide();
					$('#save').show();
				}
// function to save the series to local storage
				function addEntry(ID) {
					console.log(ID);
					var existingEntries = JSON.parse(localStorage.getItem("allEntries"));
					if(existingEntries == null) {
						existingEntries = [];
					}
					var entry = {
						"seriesID": ID
					};
					console.log(entry);
					localStorage.setItem("entry", JSON.stringify(entry));
					existingEntries.push(entry);
					localStorage.setItem("allEntries", JSON.stringify(existingEntries));
				};
// ************************** NOW TO USE THOSE FUNCTIONS! ******************************
// retrieve the information for option one
				$('.optionOne').click(function() {
					noOptions();
					noSearch();
					var ID = json.data.results[0].id;
					getInfo(ID);
					$('#save').click(function() {
						console.log("click");
						addEntry(ID);
						console.log(localStorage.getItem("allEntries"));
						console.log(localStorage.getItem("entry"));
					});
				});
// retrieve the information for option two
				$('.optionTwo').click(function() {
					noOptions();
					noSearch();
					var ID = json.data.results[1].id;
					getInfo(ID);
					$('#save').click(function() {
						console.log("click");
						addEntry();
						console.log(localStorage.getItem("allEntries"));
						console.log(localStorage.getItem("entry"));
					});
				});
// retrieve the information for option three
				$('.optionThree').click(function() {
					noOptions();
					noSearch();
					var ID = json.data.results[2].id;
					getInfo(ID);
					$('#save').click(function() {
						console.log("click");
						addEntry();
						console.log(localStorage.getItem("allEntries"));
						console.log(localStorage.getItem("entry"));
					});
// EVERYTHING BELOW THIS LINE IS HAPPY AND GOOD DO NOT INTERFERE
				});
			};		
		});
	};
	return false;
};

// K NOW YOU CAN INTERFERE - THIS NEXT PART CALLS THE FUNCTIONS

$('#search').click(getSeries);
$('#term').keyup(function(event) {
	if(event.keyCode == 13) {
		getSeries();
	}
});

// *************************************************** MY COMICS LIST ****************************************************************

function addEntry() {
	var existingEntries = JSON.parse(localStorage.getItem("allEntries"));
	if(existingEntries == null) {
		existingEntries = [];
	}
	var vegetable = $('#vegetableType').val();
	console.log(vegetable);
	var entry = {
		"myVegetable": vegetable
	};
	localStorage.setItem("entry", JSON.stringify(entry));
	existingEntries.push(entry);
	localStorage.setItem("allEntries", JSON.stringify(existingEntries));
};
$('#go').click(function() {
	console.log("click");
	addEntry();
	console.log(localStorage.getItem("allEntries"));
	console.log(localStorage.getItem("entry"));
});





$('#testButton').click(function() {
	localStorage.clear();
})


// end

});