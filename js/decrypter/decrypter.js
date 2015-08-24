/* global async */
/* global CryptoJS */
/* global Q */

var Decrypter = function(selector, options) {

	"use strict";

	// The separator string must be the same as the separator used when encrypting the image
	var SEPARATOR = "+FFFFFF+";

	options = options ? options : {};
	options = {
		// Set options.placeholder to the path of a placeholder image when dealing with fully encrypted images
		// Otherwise and image containing a preview + separator + encrypted image will be considered
		placeholder: options.placeholder ? options.placeholder : false
	};

	// Converts a Buffer into a Base64 string;
	var arrayBufferToBase64 = function(buffer) {

	    var binary = "",
	    	bytes = new Uint8Array(buffer),
	    	len = bytes.byteLength;

	    for (var i = 0; i < len; i++) {
	        binary += String.fromCharCode(bytes[i]);
	    }

	    return window.btoa(binary);

	};

	// Retrieves the remote file
	// Make sure to properly cache the image so this will retreive the binary data of the image from the browser's cache
	var getRemoteFile = function(src, callback) {

		var xhr = new XMLHttpRequest();
		xhr.open("GET", src, true);
		xhr.responseType = "arraybuffer";
		// Send preflight header
      		xhr.setRequestHeader('X-PINGOTHER', 'pingpong');
		xhr.onload = function() {
			callback(arrayBufferToBase64(this.response));
		};

		xhr.send();

	};

	// Decrypts the image
	// Finds the second part of the image after the separator
	// Decryptsit wit h the provided key
	// Replaces the src with a data-URI
	var decryptImage = function(data, key) {

		// read the image and look for the seaprator
		var splitted = data.split(SEPARATOR);
		if (splitted.length === 2) {
			data = splitted[1];
		}
		// otherwise consider the image as fully encrypted

		var decrypted = CryptoJS.AES.decrypt(data, key);

		// Convert the decrypted image into a Hex string
		var decryptedHex = decrypted.toString(CryptoJS.enc.Hex);

		// JPG Hex image signature is ffd8
		if (decryptedHex.indexOf("ffd8") === 0) {
			return decryptedHex;
		}

		console.error("Cannot decrypt image with", key);
		return false;

	};

	// Public function for decryption of all selected images
	var decryptGallery = function(key) {

		var deferred = Q.defer();

		var decrypter = function(image, callback) {

			// Check for previously saved origin (fully encrypted image)
			var src = image.dataset.originSrc;
			if (!src) {
				src = image.getAttribute("src");
			}

			if (!src) {
				callback(true, "Error src not defined");
				return false;
			}

			getRemoteFile(src, function (data) {

				data = decryptImage(data, key.value);

				if (!data) {
					callback(true, "Error, cannot decrypt image");
					return false;
				}

				if (!image.dataset.originSrc) {
					image.dataset.originSrc = image.getAttribute("src");
				}

				var byteArray = new Uint8Array(data.length/2);
				for (var x = 0; x < byteArray.length; x++){
				    byteArray[x] = parseInt(data.substr(x * 2, 2), 16);
				}
				var blob = new Blob([byteArray], {type: "image/jpg"});

				var src = URL.createObjectURL(blob);

				image.setAttribute("class", "loading");
				image.onload = function(){
					image.removeAttribute("class");
					callback(null, "done");
				};
				image.setAttribute("src", src);

			});

		};

		var images = document.querySelectorAll(selector);

		async.map(images, decrypter, function(err) {

			if (err) {
				deferred.reject(err);
				console.log("Error decrypting");
				return;
			}

			deferred.resolve(key);

			setTimers(key, images);

		});

		return deferred.promise;

	};

	// Sets the original src back into place
	var revertImage = function(image, callback) {

		var src = image.dataset.originSrc;
		if (!src) {
			return;
		}

		image.setAttribute("class", "loading");
		image.onload = function() {
			image.removeAttribute("class");
			callback(null, "Reverted");
		};
		image.setAttribute("src", src);
		delete image.dataset.originSrc;

	};

	var setTimers = function(key, images) {

		var now = (new Date()).getTime();
		setTimeout(function() {
			revert(images);
			console.log("Reverted");
		}, key.expires - now);
		console.log("Valid key, expires in %d seconds", (key.expires - now) / 1000);

		// Failsafe, set timeout not trigered when page is out of focus
		window.addEventListener("focus", function() {
			if (hasExpired(key)) {
				revert(images);
				console.log("Reverted onfocus");
			}
		});

	};


	// Public function for revert all selected images to their initial state
	var revert = function(images) {

		if (!images) {
			return;
		}

		async.mapSeries(images, revertImage, function() {
			intitialise();
		});

	};

	// Initialisation
	// For every on load error of an image, likely due to the file being encrypted and unreadble,
	// save the origin and replace it with a placeholder
	var intitialise = function() {

		var addPlaceHolder = function(image) {

			if (!options.placeholder) {
				console.error("Placeholder image path option is not set");
				return;
			}
			image.dataset.originSrc = image.getAttribute("src");
			image.setAttribute("src", options.placeholder);

		};

		var i = 0;
		var images = document.querySelectorAll(selector);

		while (images[i]) {
			var image = images[i++];
			var probe = document.createElement("img");
			probe.onerror = addPlaceHolder;
			probe.setAttribute("src", image.getAttribute("src"));
		}

	};

	var hasExpired = function(key) {

		var now = (new Date()).getTime();
		if (key.expires > now) {
			return false;
		}
		return true;

	};

	var on = function(event, callback) {
		document.addEventListener(event, callback, false);
	};

	intitialise();

	return {
		decryptGallery: decryptGallery,
		revert: revert,
		setTimers: setTimers,
		on: on
	};

};
