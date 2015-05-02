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
		$('#myCalendar').hide();
		$('#browseComics').fadeIn('slow');	
	};
	function homeFunction() {
		$('#browseComics').hide();
		$('#myComicsList').hide();
		$('#myCalendar').hide();
		$('#mainPage').fadeIn('slow');	
	};
	function myComicsFunction() {
		$('#browseComics').hide();
		$('#mainPage').hide();
		$('#myCalendar').hide();
		$('#myComicsList').fadeIn('slow');
	}
	function calendarFunction() {
		$('#browseComics').hide();
		$('#myComicsList').hide();
		$('#mainPage').hide();
		$('#myCalendar').fadeIn('slow');	
	}

	$('#title1').click(homeFunction);
	$('#title2').click(homeFunction);
	$('#browse').click(browseFunction);
	$('#home').click(homeFunction);
	$('#myComics').click(myComicsFunction);
	$('#calendar').click(calendarFunction);
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
	function searchItem() {
		if($('#navTerm').val() == '') {
			var noSpaces = $('#browseTerm').val();
			var series = noSpaces.split(' ').join('%20');
			getSeries(series);
		}
		else {
			var noSpaces = $('#navTerm').val();
			var series = noSpaces.split(' ').join('%20');
			getSeries(series);
		};	
	};

	function getSeries(series) {
		if(series == '') {
			$('#response').text('What would you like to search for?');
		}
		else {
			showGif();
// retrieve the series information from the API
			$.get("http://gateway.marvel.com/v1/public/series?titleStartsWith=" + series + "&apikey=7e74289abba6ba60c0ec85bc595e7416", function(json) {
// functions that will be used in the below chunks

// retrieve the information for option one

				var count = 0;
				function getOptions(marvel, count) {
					for(var i = 0; i < (marvel.data.results).length; i++) {
						console.log(marvel.data.results[i].creators.available);
						if(marvel.data.results[i].creators.available !== 0) {
							count = count + 1;
							if(count === 1) {
								$('#optionOne').text(marvel.data.results[i].title);
								var ID = marvel.data.results[i].id;
								// $('.optionOne').click(clickOptions(ID));
							}
							else if(count === 2) {
								$('#optionTwo').text(marvel.data.results[i].title);
								var ID = marvel.data.results[i].id;
								// $('.optionTwo').click(clickOptions(ID));
							}
							else if(count === 3) {
								$('#optionThree').text(marvel.data.results[i].title)
								var ID = marvel.data.results[i].id;
								// $('.optionThree').click(clickOptions(ID));
								return;
							}
						}
					}
				}
				$('#optionOne').click(function() {
					console.log(ID);
				})
				function clickOptions(ID) {
					console.log(ID)
					// noOptions();
					// noSearch();
					// getInfo(ID);
					// $('#save').click(function() {
					// 	getEntry(ID);
					// 	hideStats();
					// })
				}

// respond if there is no data
				if(typeof json.data.results[0] == 'undefined') {
					hideGif();
					$('#serverResponses').show();
					$('#response').text('No Results Found');
					$('#error').text("We're sorry, but we could not find anything under that name. Check your spelling, and try again!");
				}
// provide user with three series options
				else {
					$('#browseOne').hide();
					$('#browseTwo').show();
					$('#response').show();
					$('#error').hide();
					var marvel = json
					$('#response').text('Please choose a series above');
					hideGif();
					getOptions(marvel, count);	

// retrieve the information for option one
					// $('.optionOne').click(function() {
					// 	noOptions();
					// 	noSearch();
					// 	var ID = json.data.results[i].id;
					// 	getInfo(ID);
					// 	$('#save').click(function() {
					// 		getEntry(ID);
					// 		hideStats();
					// 	});
					// });
// retrieve the information for option two
					// $('.optionTwo').click(function() {
					// 	noOptions();
					// 	noSearch();
					// 	var ID = json.data.results[1].id;
					// 	getInfo(ID);
					// 	$('#save').click(function() {
					// 		getEntry(ID);
					// 		hideStats()
					// 	});
					// });
// retrieve the information for option three
					// $('.optionThree').click(function() {
					// 	noOptions();
					// 	noSearch();
					// 	var ID = json.data.results[2].id;
					// 	getInfo(ID);
					// 	$('#save').click(function() {
					// 		getEntry(ID);
					// 		hideStats();

					// 	});
					// });
				};		
			});
		};
		return false;
	};
// The below functions are in order of when they are called in the above function
	function showGif() {
		console.log("the gif should be shown");
		$('#loading').show();
		$('#loadingGif').show();
	};
	function hideGif() {
		console.log("the gif should be hidden");
		$('#loading').hide();
		$('#loadingGif').hide();
	}
	function noOptions() {
		$('.optionOne').hide();
		$('.optionTwo').hide();
		$('.optionThree').hide();
	}
	function noSearch() {
		$('#term').hide();
		$('#search').hide();
		$('#save').show();
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
			var seriesName = info.data.results[0].series.name;
			var seriesNext = info.data.results[0].title;
			var getRelease = info.data.results[0].dates[0].date;
			var seriesRelease = getRelease.split('T');
			seriesRelease = seriesRelease[0];
			var seriesDesc = info.data.results[0].description;
			var seriesThumb = info.data.results[0].images[0].path + "." + info.data.results[0].images[0].extension;
			addEntry(seriesName, seriesNext, seriesRelease, seriesDesc, seriesThumb);
		})
	}
	function addEntry(seriesName, seriesNext, seriesRelease, seriesDesc, seriesThumb) {
		if(existingEntries == null) {
			existingEntries = [];
		}
		var entry = {
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
		console.log(entry);
		console.log(existingEntries);
	};
	function hideStats() {
		$('#rating').hide();
		$('#creatorsNumber').hide();
		$('#url').hide();
		$('#saved').hide();

	};
	function showData() {
		$('#saved').show();
		$('#save').hide();
	}
// ********************************* CLICK OPERATORS THAT BEGIN THE ABOVE STRING OF FUNCTIONS ********************************************************

	$('.searchButton').click(searchItem);
	$('.term').keyup(function(event) {
		if(event.keyCode == 13) {
			searchItem();
			browseFunction();
		}
	});

	$('#browseTerm').click(function() {
		$('#navTerm').val('');
	});	
	

// *****************************************************************************************************
// ******** 																					********
// ******** 							MY FAVORITE COMICS									    ********
// ******** 																				    ********
// *****************************************************************************************************

var saveData = localStorage.getItem("allEntries")
var dataList = JSON.parse(saveData);

if(dataList != null) {
	savedTable();
}

function savedTable() {
	for(var i = 0; i < dataList.length; i++) {
		var newName = "<tr><td class = 'newSeriesName' id = '" + dataList[i]['seriesName'] + "'><b>" + dataList[i]["seriesName"] + "</b></td>";
		var newNext = "<td id = 'newComicNext'>" + dataList[i]["seriesNext"] + "</td>";
		var newRelease = "<td>" + dataList[i]["seriesRelease"] + "</td>";
		var newDesc = "<td>" + dataList[i]["seriesDesc"] + "</td>";
		var newThumb = "<td><img src = '" + dataList[i]["seriesThumb"] + "'></td>";
		var deleteSeries = "<td id='deleteMe'><i class='icon-cancel-circled2-1'></i></td></tr>";
		$('#myComicsTable').append(newName+newNext+newRelease+newDesc+newThumb+deleteSeries);
	}	
}





$('.icon-cancel-circled2-1').click(function() {
	var rawKey = $(this).parent().siblings().get(0).id;
	var key = '"' + rawKey + '"';
	localStorage.removeItem(key);
	localStorage.setItem("allEntries", JSON.stringify(existingEntries));
	console.log(saveData);
	console.log(existingEntries);
	console.log(localStorage.getItem(key));
})

// *****************************************************************************************************
// ******** 																					********
// ******** 								CALENDAR										    ********
// ******** 																				    ********
// *****************************************************************************************************





});