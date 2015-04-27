$(document).ready(function() {
// the following will be used to reset the browse comics
	var titleClone = $('.defaultTitle').clone();
	var descClone = $('.defaultDesc').clone();
	var thumbClone = $('.defaultThumb').clone();
	var termClone = $('.defaultTerm').clone();
	var searchClone = $('.defaultSearch').clone();
// test button to clear local storage
	$('#testButton').click(function() {
		localStorage.clear();
		console.log("local storage cleared")
	})
// ******************************************* UNIVERSAL FUNCTIONS *************************************
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
// ****************************************** MAIN PAGE *****************************************************************

	$('#spiderman').click(browseFunction);
// ************************************************ BROWSE COMICS *************************************
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
							toggleStats();
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
							toggleStats()
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
							toggleStats();
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
				$('#comicDescription').text(test.data.results[0].stories.items[0].name);
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
		$.get("http://gateway.marvel.com:80/v1/public/series/" + ID + "/comics?apikey=7e74289abba6ba60c0ec85bc595e7416", function(json) {
			var info = json;
			var seriesName = info.data.results[0].series.name;
			var seriesNext = info.data.results[0].title;
			var seriesRelease = info.data.results[0].dates[0].date;
			// var seriesPrice = info.data.results[0].urls[1].url;
			var seriesDesc = info.data.results[0].description;
			var seriesThumb = info.data.results[0].images[0].path + "." + info.data.results[0].images[0].extension;
			console.log(seriesName, seriesNext, seriesName, seriesRelease, seriesDesc, seriesThumb);
			addEntry(seriesName, seriesNext, seriesRelease, seriesDesc, seriesThumb);
		})
	}
	function addEntry(seriesName, seriesNext, seriesRelease, seriesDesc, seriesThumb) {
		var existingEntries = JSON.parse(localStorage.getItem("allEntries"));
		if(existingEntries == null) {
			existingEntries = [];
		}
		var entry = {
			"seriesName": seriesName,
			"seriesNext": seriesNext,
			"seriesRelease": seriesRelease,
			// "seriesPrice": seriesPrice,
			"seriesDesc": seriesDesc,
			"seriesThumb": seriesThumb
		};
		localStorage.setItem("entry", JSON.stringify(entry));
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

});


	// var saveData = localStorage.getItem("allEntries")
	// var dataList = JSON.parse(saveData);
	// setting up the function
	// function getTableInfo(ID) {
	// 		var comicThumb = info.data.results[0].images[0].path + "." + info.data.results[0].images[0].extension;
	// set up to print the variables
			// var newComicTitle = "<tr><td id='newComicName'><b>" + info.data.results[0].series.name + "</b></td>";
			// var newComicNext = "<td id='newComicNext'>" + info.data.results[0].title + "</td>";
			// var newComicRelease = "<td>" + info.data.results[0].dates[0].date + "</td>";
			// var newComicPrice = "<td><a target='_blank' href='" + info.data.results[0].urls[1].url + "'>$" + info.data.results[0].prices[0].price + "</a></td>";
			// var newComicDesc = "<td>" + info.data.results[0].description + "</td>";
			// var newComicThumb = "<td><img src='" + comicThumb + "'></td></tr>";
	// prints the variables
			// $('#myComicsTable').append(newComicTitle+newComicNext+newComicRelease+newComicPrice+newComicDesc+newComicThumb);
	// 	});
	// };
	// calling the function
	// for(var i=0; i<dataList.length; i++) {
	// 	var ID = dataList[i]["seriesID"];
	// 	getTableInfo(ID);
	// }


