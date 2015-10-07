/* global Q */

var galleries = (function() {

	"use strict";

	var currentGalleryId;

	var imaagesPlaceholder = document.querySelector(".images");
	var galleriesPlaceholder = document.querySelector(".galleries");

	var ROOT_URL = "http://www.mukuzu.com/gallery";

	var getGalleries = function() {

		var deferred = Q.defer();

		var xhr = new XMLHttpRequest();
			xhr.open("GET", ROOT_URL + "/list", true);
			xhr.responseType = "json";

		xhr.onload = function() {
			deferred.resolve(this.response);
		};

		xhr.onerror = function() {
			deferred.reject("Error getting gallery");
		};

		xhr.send();

		return deferred.promise;

	};

	var getImages = function(galleryId) {

		var deferred = Q.defer();

		var xhr = new XMLHttpRequest();
			xhr.open("GET", ROOT_URL + "/" + galleryId + "/list", true);
			xhr.responseType = "json";

		xhr.onload = function() {
			deferred.resolve(this.response);
		};

		xhr.onerror = function() {
			deferred.reject(this.responseStatus);
		};

		xhr.send();

		return deferred.promise;

	};

	var getKey = function() {

		var deferred = Q.defer();

		var xhr = new XMLHttpRequest();
			xhr.open("GET", ROOT_URL + "/" + currentGalleryId + "/key", true);
			xhr.responseType = "json";

		xhr.onload = function() {
			deferred.resolve(this.response);
		};

		xhr.onerror = function() {
			deferred.reject(this.responseStatus);
		};

		xhr.send();

		return deferred.promise;

	};

	var displyNavigation = function() {

		return getGalleries().then(function(galleryIds) {

			var i = 1;

			galleriesPlaceholder.innerHTML = "";

			galleryIds.forEach(function(galleryId) {

				var a = document.createElement("a");
					a.innerHTML = "Gallery " + i++;
					a.setAttribute("href", "#");
					a.dataset.galleryId = galleryId;

				galleriesPlaceholder.appendChild(a);

			});

			// Attach link events
			var links = document.querySelectorAll(".galleries a");
				links = Array.prototype.slice.call(links); // convert NodeList to Array

			links.forEach(function(link) {

				link.addEventListener("click", function(e) {

					e.preventDefault();

					var galleryId = e.target.dataset.galleryId;

					displayGallery(galleryId);

					for (var i = 0; i < links.length; ++i) {
						links[i].removeAttribute("class");
					}

					e.target.setAttribute("class", "active");

				}, false);

			});

			return galleryIds[0];

		}).fail(function(err) {

			console.error(err);

		});

	};

	var displayGallery = function(galleryId) {

		imaagesPlaceholder.innerHTML = "<p>Loading Gallery ...</p>";
		currentGalleryId = galleryId;

		return galleries.getImages(galleryId).then(function(images) {

			var image, i = 0;

			imaagesPlaceholder.innerHTML = "";

			while (image = images[i++]) {

				var img = document.createElement("img");
					img.setAttribute("src", image);
					img.setAttribute("crossorigin", "use-credentials");

				imaagesPlaceholder.appendChild(img);

			}

			var event = new CustomEvent("galleryDisplayed", {
				detail: galleryId
			});
			document.dispatchEvent(event);

			return galleryId;

		});

	};

	var getGalleryId = function() {

		return currentGalleryId;

	};

	return {

		displyNavigation: displyNavigation,
		displayGallery: displayGallery,
		getImages: getImages,
		getKey: getKey,
		getGalleryId: getGalleryId

	};

})();