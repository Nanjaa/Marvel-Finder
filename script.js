
$(document).ready(function() {
// the following will be used to reset the browse comics
$('#clear').click(function() {
	localStorage.clear();
})

// *****************************************************************************************************
// ******** 																					********
// ******** 							UNIVERSAL FUNCTIONS									    ********
// ******** 																				    ********
// *****************************************************************************************************

// navigate the site through navBar buttons, as well as the deadpool, spiderman, and ghostrider pictures
	$('.navigate').click(function() {
		$('div.content').hide();

		if($(this).hasClass('goHome')) {
			$('div.content#mainPage').fadeIn('slow');
		}
		else if($(this).hasClass('goBrowse')) {
			$('div.content#browseComics').fadeIn('slow');
		}
		else if($(this).hasClass('goMyComics')) {
			$('div.content#myComicsList').fadeIn('slow');
		}
		else if($(this).hasClass('goCalendar')) {
			$('div.content#calendar').fadeIn('slow');
		}
	})

// changes the colors of the logo
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

	var existingEntries = JSON.parse(localStorage.getItem("allEntries"));
	$('.term').val('')

// *****************************************************************************************************
// ******** 																					********
// ******** 								BROWSE COMICS									    ********
// ******** 																				    ********
// *****************************************************************************************************

// Click 'go' or press enter when searching for a series
	$('.searchButton').click(searchItem);
	$('.term').keyup(function(event) {
		if(event.keyCode == 13) {

			var browseValue = $('#browseTerm').val();
			var navValue = $('#navTerm').val();

			if($('#browseTerm').val() == '') {
				searchItem(navValue);
			}
			else {
				searchItem(browseValue);
			}
			$('div.content').hide();
			$('div.content#browseComics').show();
		}
	});

// If you click on the browse page's text box, the nav bar one will lose its value 
	$('#browseTerm').click(function() {
		$('#navTerm').val('');
	});	


// This checks that the user entered an inupt to search for
	function searchItem(value) {
		newSearch();
		if(value == '') {
			$('#serverResponses').show();
			$('#response').text('What would you like to search for?');
			showBrowseOne();
		}
		else {
			var noSpaces = value.toLowerCase();
			var series = noSpaces.split(' ').join('%20');
			getSeries(series);
		};	
	};


// This searches for more details based on the user's choice of series
	function getSeries(series) {
		$('#serverResponses').hide();
		showGif();
// retrieve the series information from the API
		$.get("http://gateway.marvel.com/v1/public/series?titleStartsWith=" + series + "&apikey=7e74289abba6ba60c0ec85bc595e7416", function(json) {
			unbindOptions();
			var count = 0;

// respond if there is no data
			if(typeof json.data.results[0] == 'undefined') {
				showBrowseOne();
				hideGif();
				$('#serverResponses').show();
				$('#response').text('No Results Found');
				$('#error').text("We're sorry, but we could not find anything under that name. Check your spelling, and try again!");
			}
// provide user with three series options
			else {
				showBrowseTwo();
				var marvel = json
				$('#serverResponses').show();
				$('#response').text('Please choose a series above');
				hideGif();
				getOptions(marvel, count);	
			};		
		});
	return false;
	};



// This provides the user with three options to choose as a result of the search
	function getOptions(marvel) {
		var count = 0;
		for (var i = 0; i < marvel.data.results.length; i++) {
			if (marvel.data.results[i].creators.available !== 0) {
				count = count + 1;
				$('.option:eq(' + (count - 1) + ')').text(marvel.data.results[i].title);
				// gives each option a data component
				$('.option:eq(' + (count - 1) + ')').data('identification', marvel.data.results[i].id);
				searchConduit();
				if (count === 3) {
					return;
				}
			}
		}
	}
	

// serves as a conduit between the choose options function and the results
	function searchConduit() {
		unbindOptions();
		$('.option').click(function() {
			ID = $(this).data('identification');
			getInfo(ID);
		});
	};


// This responds to the user choosing an option and begins to search for more information about the series
	function getInfo(ID) {
		$('#save').show();
		$('#serverResponses').hide();
		showBrowseThree();
		showGif();
		$.get("http://gateway.marvel.com:80/v1/public/series/" + ID + "?apikey=7e74289abba6ba60c0ec85bc595e7416", function(json) {
			var marvel = json;
			printInfo(marvel);
		});
	};

// This prints the info retrieved
	function printInfo(marvel) {
		hideGif();
		$('#title').text(marvel.data.results[0].title);
		getDescription(marvel);
		$('#thumbnail').attr('src', marvel.data.results[0].thumbnail.path + '.' + marvel.data.results[0].thumbnail.extension);
		$('#rating').text("rating: " + marvel.data.results[0].rating);
		$('#url').attr('href', marvel.data.results[0].urls[0].url);
		$('#urlText').text('View this series at Marvel.com');
		$('#creatorsNumber').text('creators: ' + marvel.data.results[0].creators.available);
		var creatorsList = marvel.data.results[0].creators.items;
		var findCreators = function() { 
			for(var i=0; i<creatorsList.length; i++) {
			$('#creators').append('<p>' + creatorsList[i].name + '</p>');
			};
		};
		findCreators();
		$('#loading').hide();
		// To view the function that is called when you hover or click on creators or ratings (to view the specifics), scroll down. It is just above minor functions.
		
// calls the function that is used to save the data to the local storage
		var ID = marvel.data.results[0].id;
		$('#save').click(function() {
			getEntry(ID);
		})
	}



// This is how the information will be saved 

	function getEntry(ID) {
		showGif();
		$.get("http://gateway.marvel.com:80/v1/public/series/" + ID + "/comics?apikey=7e74289abba6ba60c0ec85bc595e7416", function(json) {
			var info = json;

			var seriesIdentification = info.data.results[0].series.name;
			var seriesIdNoSpace = seriesIdentification.split(' ').join('');
			var seriesIdNoLeft = seriesIdNoSpace.split('(').join('');
			var seriesId = seriesIdNoLeft.split(')').join('');

			var seriesName = info.data.results[0].series.name;
			var seriesNext = info.data.results[0].title;
			var getRelease = info.data.results[0].dates[0].date;
			var seriesRelease = getRelease.split('T');
			seriesRelease = seriesRelease[0];
			var seriesDesc = info.data.results[0].description;
			var seriesThumb = info.data.results[0].images[0].path + "." + info.data.results[0].images[0].extension;
			addEntry(seriesId, seriesName, seriesNext, seriesRelease, seriesDesc, seriesThumb);
		})
	}

	function addEntry(seriesId, seriesName, seriesNext, seriesRelease, seriesDesc, seriesThumb) {
		if(existingEntries == null) {
			existingEntries = [];
		}
		var entry = {
			"seriesId": seriesId,
			"seriesName": seriesName,
			"seriesNext": seriesNext,
			"seriesRelease": seriesRelease,
			"seriesDesc": seriesDesc,
			"seriesThumb": seriesThumb
		};
		localStorage.setItem(seriesName, JSON.stringify(entry));
		existingEntries.push(entry);
		localStorage.setItem("allEntries", JSON.stringify(existingEntries));
		$('#saved').show();
		$('#save').hide();
		hideGif();
		console.log(existingEntries);
	};


// these next functions are for when the information is printed out (creators and ratings hover/click)
	$('#rating').click(function() {
	if ($(this).data('clicked')) {
		$(this).data('clicked', false);
	}
	else {
			$(this).data('clicked', true);
	}
	});

	$('#rating').hover(
		function() {
			$('#ratingSystem').show();
			$('#thumbnail').hide();
			$('#creators').hide();
		},
		function() {
			if($('#rating').data('clicked')) {
				$('#ratingSystem').show();
				$('#thumbnail').hide();
				$('#creators').hide();
				$('#creatorsList').data('clicked', false);
			}
			else {
			$('#ratingSystem').hide();
			$('#creators').hide();
			$('#thumbnail').show();
			}
		}
	);


	$('#creatorsNumber').click(function() {
		if ($(this).data('clicked')) {
			$(this).data('clicked', false);
		}
		else {
			$(this).data('clicked', true);
		}
	});

	$('#creatorsNumber').hover(
		function() {
			$('#creators').show();
			$('#thumbnail').hide();
			$('#ratingSystem').hide();
		},
		function() {
			if($('#creatorsNumber').data('clicked')) {
				$('#creators').show();
				$('#thumbnail').hide();
				$('#ratingSystem').hide();
				$('#ratingSystem').data('clicked', false);
			}
			else {
			$('#creators').hide();
			$('#ratingSystem').hide();
			$('#thumbnail').show();
			}
		}
	);


// The below functions are what I dub minor functions, that serve a very small purpose, and didn't need to be placed around the highly important functions

// Unbind the data associated with each option when you click the option
	function unbindOptions() {
		$('#optionOne').unbind('click');
		$('#optionTwo').unbind('click');
		$('#optionThree').unbind('click');
	}

// show and hide the loading information ("loading" "this may take a few minutes" and the gif)
	function showGif() {
		$('#loading').show();
		$('.loading').show();
		$('#loadingGif').show();
	};
	function hideGif() {
		$('#loading').hide();
		$('.loading').hide();
		$('#loadingGif').hide();
	}

// If you go from one search to another, this will reset the options
	function newSearch() {
		$('#optionOne').text('');
		$('#optionTwo').text('');
		$('#optionThree').text('');
	}

// This will take you from one browse page to another
	function showBrowseOne() {
		$('#browseOne').show();
		$('#browseTwo').hide();
		$('#browseThree').hide();
	}
	function showBrowseTwo() {
		$('#browseOne').hide();
		$('#browseTwo').show();
		$('#browseThree').hide();
	}
	function showBrowseThree() {
		$('#browseOne').hide();
		$('#browseTwo').hide();
		$('#browseThree').show();
		$('#saved').hide();
	}

// this will find the correct description for you
	function getDescription(marvel) {
		if(marvel.data.results[0].description == null) {
			if(typeof marvel.data.results[0].items == 'undefined') {
				$('#comicDescription').text("No description available. Sorry!");
			}
			else {
			$('#comicDescription').text(marvel.data.results[0].stories.items[0].name);
			}
		}
		else {
			$('#comicDescription').text(marvel.data.results[0].description);
		}				
	};

// ********************************* CLICK OPERATORS THAT BEGIN THE ABOVE STRING OF FUNCTIONS ********************************************************


// *****************************************************************************************************
// ******** 																					********
// ******** 							MY FAVORITE COMICS									    ********
// ******** 																				    ********
// *****************************************************************************************************



// *****************************************************************************************************
// ******** 																					********
// ******** 								CALENDAR										    ********
// ******** 																				    ********
// *****************************************************************************************************



// *****************************************************************************************************
// ******** 																					********
// ******** 								MEDIA QUERIES									    ********
// ******** 																				    ********
// ***************************************************************************************************** 

	// $('#mediaDropdown').click(function() {
	// 	$('#dropdownContent').toggle();
	// })

	// console.log(dropToggle);


	// $('#mediaDropdown').click(function() {
	// 	console.log("1: " + $(this).data('dropStatus'));
	// 	dropFunction();
	// });


	// $('#mediaDropdown').click(function() {
	// 	if($(this).data('dropStatus') == true) {
	// 		$(this).data('dropStatus', false);
	// 		$('#dropdownContent').slideUp();
	// 	}
	// 	else {
	// 		$(this).data('dropStatus', true);
	// 		$('#dropdownContent').slideDown();	
	// 	};	
	// });


	// $('#mediaHome').click(homeFunction);
	// $('#mediaBrowse').click(browseFunction);
	// $('#mediaMyComics').click(myComicsFunction);
	// $('#mediaMyCalendar').click(calendarFunction);



});
