var loada = (function() {

	var loada, complete;

	// Show progress bar
	var show = function() {

		if (!loada.classList.contains("show")) {
			loada.classList.add("show");
		}

	};

	// Hide progress bar
	var hide = function() {

		loada.classList.remove("show");

	};

	// Go to desired percentage
	var go =  function(percent) {

		if (percent > 100) {
			percent = 100;
			hide();
		}

		loada.style.transitionDuration = "1s, 1s";
		loada.style.transitionTimingFunction = "ease, ease";
		loada.style.width = percent + "%";

		show();

	};

	//  Will use CSS animation tp let the progressbar complete in a given time
	var linearProgress = function(totalDuration, remainingDuration, callback) {

		var initialProgress = 100 - (remainingDuration / totalDuration * 100);
			initialProgress = initialProgress.toFixed(4);

		// Go to the initial position
		go(initialProgress);

		// Will wait for the go() to complete
		setTimeout(function(){

			// Set transition properties
			loada.style.transitionDuration = "1s, " + (remainingDuration / 1000) + "s";
			loada.style.transitionTimingFunction = "ease, linear";

			// Delay this so the animation can be taken into account
			setTimeout(function() {
				loada.style.width = "100%";
			}, 100);

		}, 1100);

		// Callback when it's done
		setTimeout(function() {
			callback();
		}, remainingDuration);

	};

	// Sets a callback when animation is complete
	var onComplete = function(callback) {

		if (typeof callback === "function") {
			loada.addEventListener("transitionend", callback);
		}

	};

	// Initiate the loader
	loada = document.createElement("div");
	loada.setAttribute("id", "loada");
	document.body.insertBefore(loada, document.body.firstChild);

	return {
		show: show,
		hide: hide,
		go: go,
		linearProgress: linearProgress,
		onComplete: onComplete
	};

})();
