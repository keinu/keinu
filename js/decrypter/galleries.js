var galleries = (function() {

	"use strict";

	var ROOT_URL = "http://www.mukuzu.com/gallery";

	var getGalleries = function(callback) {

		var xhr = new XMLHttpRequest();
			xhr.open("GET", ROOT_URL + "/list", true);
			xhr.responseType = "json";

		xhr.onload = function() {
			callback(this.response);
		};

		xhr.send();

	};

	var getImages = function(galleryId, callback) {

		var xhr = new XMLHttpRequest();
			xhr.open("GET", ROOT_URL + "/" + galleryId + "/list", true);
			xhr.responseType = "json";

		xhr.onload = function() {
			callback(this.response);
		};

		xhr.send();

	};

	var getKey = function(galleryId, callback) {

		var xhr = new XMLHttpRequest();
			xhr.open("GET", ROOT_URL + "/" + galleryId + "/key", true);
			xhr.responseType = "json";

		xhr.onload = function() {
			console.log(this.response);
			callback(this.response);
		};

		xhr.onerror = function() {
			console.log("ERROR");
		};

		xhr.send();

	};

	return {

		getGalleries: getGalleries,
		getImages: getImages,
		getKey: getKey

	};

})();