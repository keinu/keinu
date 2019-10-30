/* global Q */

var galleries = (function() {

	"use strict";

	var currentGalleryId;

	var imaagesPlaceholder = document.querySelector(".images");
	var galleriesPlaceholder = document.querySelector(".galleries");
	var containers;

	var ROOT_URL = "https://crzgjyz1ek.execute-api.eu-west-1.amazonaws.com/production";

	var getContainers = function() {

		var deferred = Q.defer();

		var xhr = new XMLHttpRequest();
			xhr.open("GET", ROOT_URL + "/containers?user=VJ2uHpzee");
			xhr.responseType = "json";

		xhr.onload = function() {
			containers = this.response.container;
			deferred.resolve(containers);
		};

		xhr.onerror = function() {
			deferred.reject("Error getting gallery");
		};

		xhr.send();

		return deferred.promise;

	};

	var getImages = function(galleryId) {

		return containers.find(function(container) {
			return container.id === galleryId;
		}).files;

	};

	var getKey = function() {

		var deferred = Q.defer();

		var xhr = new XMLHttpRequest();
			xhr.open("GET", ROOT_URL + "/payment/key/" + currentGalleryId, true);
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

		return getContainers().then(function(containers) {

			var i = 1;

			galleriesPlaceholder.innerHTML = "";

			containers.forEach(function(container) {

				var a = document.createElement("a");
					a.innerHTML = "Gallery " + i++;
					a.setAttribute("href", "#");
					a.dataset.galleryId = container.id;

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

			return containers[0].id;

		}).fail(function(err) {

			console.error(err);
			console.trace(err.stack);

		});

	};

	var displayGallery = function(galleryId) {

		imaagesPlaceholder.innerHTML = "<p>Loading Gallery ...</p>";
		currentGalleryId = galleryId;

		var images = galleries.getImages(galleryId);

		var image, i = 0;

		imaagesPlaceholder.innerHTML = "";

		while (image = images[i++]) {

			var img = document.createElement("img");
				img.setAttribute("src", "https://s3-eu-west-1.amazonaws.com/dvolvr/" + image.key);

				// Sends origin headers so the response get cached with CROS credentials
				img.setAttribute("crossorigin", "use-credentials");

			imaagesPlaceholder.appendChild(img);

		}

		var event = new CustomEvent("galleryDisplayed", {
			detail: galleryId
		});
		document.dispatchEvent(event);

		return galleryId;

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