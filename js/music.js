/* global $ */
(function() {

	"use strict";

	var getFavourites = function() {
		return $.getJSON("http://localhost:8080/music");
	};

	getFavourites().then(function(favourites) {

		favourites.result.forEach(function(album) {

			console.log(album);

			var albumContainer = document.createElement("div");
				albumContainer.setAttribute("class", "album");

			var image = document.createElement("div");
				image.setAttribute("class", "image");

			var img = document.createElement("img");
				img.setAttribute("src", album.dynamicIcon + "&w=400");

			image.appendChild(img);
			albumContainer.appendChild(image);

			var label = document.createElement("div");
				label.setAttribute("class", "details");
				label.innerHTML = album.name + " by " + album.artist;

			albumContainer.appendChild(label);

			// var player = document.createElement("iframe");
			// 	player.setAttribute("src", album.embedUrl);

			// image.appendChild(player);

			document.getElementById("images").appendChild(albumContainer);

		});

	});

})();