$(document).ready(function() {
// the following will be used to reset the browse comics
	var titleClone = $('.defaultTitle').clone();
	var descClone = $('.defaultDesc').clone();
	var thumbClone = $('.defaultThumb').clone();
	var termClone = $('.defaultTerm').clone();
	var searchClone = $('.defaultSearch').clone();
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
	var getSeries = function() {
		var noSpaces = $('#term').val();
		var series = noSpaces.split(' ').join('%20');
		if(series == '') {
			$('#loading').text('What would you like to search for?');
		}
		else {
			$('#loading').text('Loading');
			showGif();
// retrieve the series information from the API
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
					showOptions(marvel);
// retrieve the information for option one
					$('.optionOne').click(function() {
						noOptions();
						noSearch();
						var ID = json.data.results[0].id;
						getInfo(ID);
						$('#save').click(function() {
							getEntry(ID);
							hideStats();
							showData();
						});
					});
// retrieve the information for option two
					$('.optionTwo').click(function() {
						noOptions();
						noSearch();
						var ID = json.data.results[1].id;
						getInfo(ID);
						$('#save').click(function() {
							getEntry(ID);
							hideStats()
							showData();
						});
					});
// retrieve the information for option three
					$('.optionThree').click(function() {
						noOptions();
						noSearch();
						var ID = json.data.results[2].id;
						getInfo(ID);
						$('#save').click(function() {
							getEntry(ID);
							hideStats();
							showData();

						});
					});
				};		
			});
		};
		return false;
	};
// The below functions are in order of when they are called in the above function
	function showGif() {
		$('#loadingGif').toggle();
	};

	function showOptions(marvel) {				
		if(typeof marvel.data.results[2] != 'undefined') {
			$('.optionTwo').text(marvel.data.results[1].title);
			$('.optionThree').text(marvel.data.results[2].title);						
		}
		else {
			$('.optionTwo').text(marvel.data.results[1])
		};
	};
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
		$.get("http://gateway.marvel.com:80/v1/public/series/" + ID + "?apikey=7e74289abba6ba60c0ec85bc595e7416", function(json) {
			var test = json
			printInfo(test);
		});
	} ;
	function printInfo(test) {
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
		var creatorsList = test.data.results[0].creators.items;
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

	function getEntry(ID) {
		console.log(ID);
		$.get("http://gateway.marvel.com:80/v1/public/series/" + ID + "/comics?apikey=7e74289abba6ba60c0ec85bc595e7416", function(json) {
			var info = json;
			var seriesName = info.data.results[0].series.name;
			var seriesNext = info.data.results[0].title;
			var getRelease = info.data.results[0].dates[0].date;
			var seriesRelease = getRelease.split('T');
			seriesRelease = seriesRelease[0];
			var seriesDesc = info.data.results[0].description;
			var seriesThumb = info.data.results[0].images[0].path + "." + info.data.results[0].images[0].extension;
			console.log(seriesName, seriesNext, seriesName, seriesRelease, seriesDesc, seriesThumb);
			addEntry(seriesName, seriesNext, seriesRelease, seriesDesc, seriesThumb);
		})
	}
	function addEntry(seriesName, seriesNext, seriesRelease, seriesDesc, seriesThumb) {
		var existingEntries = JSON.parse(localStorage.getItem("allEntries"));
		if(existingEntries == null || typeof existingEntries == 'undefined') {
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
// Refresh the browse comics page
	$('#refresh').click(function() {
		$('#title').replaceWith(titleClone);
		$('#comicDescription').replaceWith(descClone);
		$('#thumbnail').replaceWith(thumbClone);
		// $('#search').replaceWith(searchClone);
		// $('#term').replaceWith(termClone)
		$('#search').show();
		$('#term').show();
		hideStats();
		$('#save').hide();
		console.log("hello, this should be resetting");
	});
	$('#search').click(getSeries);
	$('#term').keyup(function(event) {
		if(event.keyCode == 13) {
			getSeries();
		}
	});

// *****************************************************************************************************
// ******** 																					********
// ******** 							MY FAVORITE COMICS									    ********
// ******** 																				    ********
// *****************************************************************************************************

// var saveData = localStorage.getItem("allEntries")
// var dataList = JSON.parse(saveData);
// console.log(dataList);

for(var i = 0; i < dataList.length; i++) {
	var newName = "<tr><td id = 'newComicName'><b>" + dataList[i]["seriesName"] + "</b></td>";
	var newNext = "<td id = 'newComicNext'>" + dataList[i]["seriesNext"] + "</td>";
	var newRelease = "<td>" + dataList[i]["seriesRelease"] + "</td>";
	var newDesc = "<td>" + dataList[i]["seriesDesc"] + "</td>";
	var newThumb = "<td><img src = '" + dataList[i]["seriesThumb"] + "'></td>";
	var deleteSeries = "<td id='deleteMe'><i class='icon-cancel-circled2-1' id='deleteIcon'></i></td></tr>";
	$('#myComicsTable').append(newName+newNext+newRelease+newDesc+newThumb+deleteSeries);
}

// go up to <td> from i, then go all the way up to the first td at the beginning of the table

localStorage.clear();
// $('#deleteIcon').click(function() {
// 	var guardTest = "Ms. Marvel (2014 - Present)";
// 	console.log("here is the information: " + localStorage.getItem(guardTest));
// 	localStorage.removeItem(guardTest);
// 	localStorage.setItem("allEntries", JSON.stringify());
// 	console.log(saveData);
// })

// *****************************************************************************************************
// ******** 																					********
// ******** 								CALENDAR										    ********
// ******** 																				    ********
// *****************************************************************************************************





});