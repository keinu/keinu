/* homepage animation stuff */
/* global $ */

(function() {

	"use strict";

	if ($("body").hasClass("home")) {

		var top = $("#splash-wrapper").position().top,
			height = 150,
			s = $(window).scrollTop();

		var scrollAnimate = function() {
			var s = $(window).scrollTop();
			$("#splash").fadeTo(0, 0.9 - (s/height));
			$(".home-content").fadeTo(0, (s/height) * 0.5);
			$("#splash-wrapper").offset({
				top: top - s
			});
		};

		$(document).on("scroll touchmove", window, function(){
			scrollAnimate();
		});

		$("#splash").fadeTo(0, 0.9 - (s/height));

		$(document).on("click", ".scroll-hint", function(){
			$('html, body').animate({
				scrollTop: 500
			}, 2000);
		});

	}

})();
