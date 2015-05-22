"use strict";

$(document).ready(function() {
	var simon = [];
	var player = [];
	var divColor = $(".container").children();
	var timer = 5;
	var round = 1;
	var timeout;
	var interval;
	var i = 0;
	
	function simonChoice() {
		var random = Math.floor(Math.random()*(divColor.length-1));
		// var selectedDiv = $(divColor[random]);
		timeout = setInterval(function () {
		simon.push(random);
			if(i < simon.length) {
				$(divColor[simon[i]])
					.animate({opacity: "1"}, 100)
					.animate({opacity: ".50"}, 1000);
				console.log("simon array = " + simon);
				i++;
			} else {
				clearInterval(timeout);
			}
		}, 500);
		interval = setInterval(updateTimer, 1000);
	}

	function updateTimer() {
		if (timer == 0) {
			alert("Game Over. Simon Wins.");
		} else if (timer > 0) {
			$(".start").html(timer);
		};
		timer--;
	};

	$(".start").click(function () {
		$("h2").html("Watch The Sequence")
		simonChoice();
		$('.box').click(function () {
			clearInterval(interval);
			player.push($(this).data("number"));
			timer = 5;
			$(".start").html(timer);
			$(this)
				.animate({opacity: "1"}, 100)
				.animate({opacity: ".50"}, 500);
			simonChoice();	
			console.log("player array = " + player);
			if (simon.length == player.length) {
				if (simon.toString() == player.toString()) {
					round++;
					$("#round").html(round);
					console.log("test");
				} else if (simon.toString() != player.toString()) {
					clearInterval(interval);
					alert("Game Over. Simon Wins.");
				}
			};
		});
	});
})