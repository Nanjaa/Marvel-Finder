
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
	function browseFunction() {
		$('#mainPage').hide();
		$('#myComicsList').hide();
		$('#calendar').hide();
		$('#browseComics').fadeIn('slow');	
	};
	function homeFunction() {
		$('#browseComics').hide();
		$('#myComicsList').hide();
		$('#calendar').hide();
		$('#mainPage').fadeIn('slow');	
	};
	function myComicsFunction() {
		$('#browseComics').hide();
		$('#mainPage').hide();
		$('#calendar').hide();
		$('#myComicsList').fadeIn('slow');
	}
	function calendarFunction() {
		$('#browseComics').hide();
		$('#myComicsList').hide();
		$('#mainPage').hide();
		$('#calendar').fadeIn('slow');	
	}

	$('#title1').click(homeFunction);
	$('#title2').click(homeFunction);
	$('#browse').click(browseFunction);
	$('#home').click(homeFunction);
	$('#myComics').click(myComicsFunction);
	$('#myCalendar').click(calendarFunction);
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
// ******** 									MAIN PAGE									    ********
// ******** 																				    ********
// *****************************************************************************************************

	$('#spiderman').click(browseFunction);
	$('#deadpool').click(myComicsFunction);
	$('#ghostRider').click(calendarFunction);

// *****************************************************************************************************
// ******** 																					********
// ******** 								BROWSE COMICS									    ********
// ******** 																				    ********
// *****************************************************************************************************

// Call the functions you will read about below

// THE FOLLOWING IS THE MAIN FUNCTION FOR BROWSE COMICS. BELOW IT YOU WILL FIND THE FUNCTIONS CALLED WITHIN getSeries
	function newSearch() {
		$('#optionOne').text('');
		$('#optionTwo').text('');
		$('#optionThree').text('')
		var IDOne = null;
		var IDTwo = null;
		var IDThree = null;
		var ID = null;
		var marvel = null;
		var count = null;
		var creatorsList = null;
		var seriesIdentification = null;
		var seriesIdNoSpace = null;
		var seriesIdNoLeft = null;
		var seriesId = null;
		var seriesName = null;
		var seriesNext = null;
		var seriesRelease = null;
		var seriesDesc = null;
		var seriesThumb = null;
		var getRelease = null;
		var entry = null;

	}
	function searchItem() {
		if($('#navTerm').val() == '') {
			var noSpaces = $('#browseTerm').val().toLowerCase();
			var series = noSpaces.split(' ').join('%20');
			getSeries(series);
		}
		else {
			var noSpaces = $('#navTerm').val().toLowerCase();
			var series = noSpaces.split(' ').join('%20');
			newSearch();
			getSeries(series);
		};	
	};


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


	function getSeries(series) {
		if(series == '') {
			$('#serverResponses').show();
			$('#response').text('What would you like to search for?');
			showBrowseOne();
		}
		else {
			$('#serverResponses').hide();
			showGif();

// retrieve the series information from the API
			$.get("http://gateway.marvel.com/v1/public/series?titleStartsWith=" + series + "&apikey=7e74289abba6ba60c0ec85bc595e7416", function(json) {
// retrieve the information for option one
				var count = 0;
				function getOptions(marvel, count) {
					for(var i = 0; i < (marvel.data.results).length; i++) {
						if(marvel.data.results[i].creators.available !== 0) {
							count = count + 1;
							if(count === 1) {
								$('#optionOne').text(marvel.data.results[i].title);

								var IDOne = marvel.data.results[i].id;

								$('#optionOne').click(function() {
									$('#serverResponses').hide();
									var choiceNumber = 1;
									clickOptions(choiceNumber, IDOne)
								})
							}
							else if(count === 2) {
								$('#optionTwo').text(marvel.data.results[i].title);
								var IDTwo = marvel.data.results[i].id;

								$('#optionTwo').click(function() {
									$('#serverResponses').hide();
									var choiceNumber = 2;
									clickOptions(choiceNumber, IDTwo)									
								})
							}
							else if(count === 3) {
								$('#optionThree').text(marvel.data.results[i].title)
								var IDThree = marvel.data.results[i].id;

								$('#optionThree').click(function() {
									$('#serverResponses').hide();
									var choiceNumber = 3	
									clickOptions(choiceNumber, IDThree)								
								})
								return;
							}
						}
					}
				}
				function clickOptions(choiceNumber, IDOne, IDTwo, IDThree) {
					if(choiceNumber = 1) {
						ID = IDOne;
						$('#save').show();
						getInfo(ID);	
						$('#save').click(function() {
							getEntry(ID);
							$('#saved').hide();
						});					
					}
					else if(choiceNumber = 2) {
						ID = IDTwo;
						$('#save').show();
						getInfo(ID);
						$('#save').click(function() {
							getEntry(ID);
							$('#saved').hide();
						});
					}
					else if(choiceNumber = 3) {
						ID = IDThree;
						$('#save').show();
						getInfo(ID);
						$('#save').click(function() {
							getEntry(ID);
							$('#saved').hide();
						});
					}
				}

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
		};
		return false;
	};
// The below functions are in order of when they are called in the above function
	function showGif() {
		$('#loading').show();
		$('#loadingGif').show();
	};
	function hideGif() {
		$('#loading').hide();
		$('#loadingGif').hide();
	}
	function noOptions() {
		$('.optionOne').hide();
		$('.optionTwo').hide();
		$('.optionThree').hide();
	}
	function getInfo(ID) {
		$('#serverResponses').hide();
		$('#browseTwo').hide();
		$('#browseThree').show();
		showGif();
		$.get("http://gateway.marvel.com:80/v1/public/series/" + ID + "?apikey=7e74289abba6ba60c0ec85bc595e7416", function(json) {
			var test = json
			printInfo(test);
		});
	};
	function printInfo(test) {
		hideGif();
		$('#title').text(test.data.results[0].title);
		function descriptionTest() {
			if(test.data.results[0].description == null) {
				if(typeof test.data.results[0].items == 'undefined') {
					$('#comicDescription').text("No description available. Sorry!");
				}
				else {
				$('#comicDescription').text(test.data.results[0].stories.items[0].name);
				}
			}
			else {
				$('#comicDescription').text(test.data.results[0].description);
			}				
		};
		descriptionTest();
		$('#thumbnail').attr('src', test.data.results[0].thumbnail.path + '.' + test.data.results[0].thumbnail.extension);
		$('#rating').text("rating: " + test.data.results[0].rating);
		$('#url').attr('href', test.data.results[0].urls[0].url);
		$('#urlText').text('View this series at Marvel.com');
		$('#creatorsNumber').text('creators: ' + test.data.results[0].creators.available);
		var creatorsList = test.data.results[0].creators.items;
		var findCreators = function() { 
			for(var i=0; i<creatorsList.length; i++) {
			$('#creators').append('<p>' + creatorsList[i].name + '</p>');
			};
		};
		findCreators();
		$('#loading').hide();




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

	};




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
		showData();
		hideGif();
		console.log(existingEntries);
	};
	function showData() {
		$('#saved').show();
		$('#save').hide();
	}
// ********************************* CLICK OPERATORS THAT BEGIN THE ABOVE STRING OF FUNCTIONS ********************************************************

	$('.searchButton').click(searchItem);
	$('.term').keyup(function(event) {
		if(event.keyCode == 13) {
			newSearch();
			searchItem();
			browseFunction();

		}
	});

	$('#browseTerm').click(function() {
		newSearch();
		$('#navTerm').val('');
	});	


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


	$('#mediaDropdown').click(function() {
		if($(this).data('dropStatus') == true) {
			$(this).data('dropStatus', false);
			$('#dropdownContent').slideUp();
		}
		else {
			$(this).data('dropStatus', true);
			$('#dropdownContent').slideDown();	
		};	
	});


	$('#mediaHome').click(homeFunction);
	$('#mediaBrowse').click(browseFunction);
	$('#mediaMyComics').click(myComicsFunction);
	$('#mediaMyCalendar').click(calendarFunction);



});