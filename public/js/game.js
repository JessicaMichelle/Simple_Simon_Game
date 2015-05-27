"use strict";

$(document).ready(function() {
	// computers choice array
	var simon = [];
	// setting players choice index to 0
	var player = 0
	// used for the index of the simon array
	var i = 0;
	// the different div's that are green, red, blue and yellow
	var divColor = $(".container").children();
	// what will count down as time player has to make choice
	var timer = 10;
	// the round that the player is on
	var round = 1;
	// variable used to be able to clear the timeout
	var timeout;
	// used to set interval for timer so it updates
	var interval;
	
	// function to highlight the divs in the simon array
	function showSimonChoices() {
		// if index is less than the length of the simon array
		if(i < simon.length) {
			console.log(simon.length);
			// highligh the array div's
			$(divColor[simon[i]])
				.animate({opacity: "1"}, 500)
				.animate({opacity: ".50"}, 500);
			// logging just to verify
			console.log("simon array = " + simon);
			// have i add 1 each time
			i++;
		} else {
			// if i is not less than the length of the simon array, it clears the interval
			clearInterval(timeout);
		};
	};
	// function to have computer choose random div, push that random choice to array and set the interval
	function simonChoice() {
		// resets i to 0 so the index of simon will start at the beginning
		i = 0;
		// resets player to 0 so the index of players choices will start at the beginning
		player = 0;
		// function that will allow computer to make random choice of div
		var random = Math.floor(Math.random()*(divColor.length-1));
		// pushes the computer's random choice onto the simon array
		simon.push(random);
		// sets the interval to cycle through the array with the showSimonChoices function
		setInterval(showSimonChoices, 1000);
	}

	function updateTimer() {
		// if player does not guess before time runs out
		if (timer == 0) {
			alert("Game Over. Simon Wins.");
		// makes timer count down
		} else if (timer > 0) {
			$(".start").html(timer);
		};
		// subtracts 1 each second based on interval
		timer--;
	};

	// adding event listener to the start button
	$(".start").click(function () {
		// starts the timer to count down for how long the player has to complete sequence
		interval = setInterval(updateTimer, 2000);
		// change the html to alert user to watch the sequence
		$("h2").html("Watch The Sequence")
		// calling function for random choice to be made
		simonChoice();
		// adding event listener to the div that is clicked on by user
		$('.box').click(function () {
			if ( $(this).data("number") == simon[player]) {
				if (player + 1 == simon.length) {
					round++;
					$("#round").html(round);
					simonChoice();
					timer = 10;
				} else {
					player++;
				}
			} else {
				alert("You made it to level " + round);
				clearInterval(interval);
				round = 1;
			}
			console.log("player array = " + $(this).data("number"));
		});
	});
})