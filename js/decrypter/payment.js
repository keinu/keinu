/* global Promise */
/* global payment */

var payment = (function() {

	"use strict";

	var PAYMENTS_API = "https://crzgjyz1ek.execute-api.eu-west-1.amazonaws.com/production/payment/";
	var poll = true;

	var generateAddress = function(galleryId) {

		return new Promise(function (resolve, reject) {

			var xhr = new XMLHttpRequest();
				xhr.open("GET", PAYMENTS_API  + "generate/" + galleryId, true);
				xhr.responseType = "json";

			xhr.onload = function() {

				var data = this.response;
				resolve(data);

			};

			xhr.onerror = function() {

				reject(this.statusText);

			};

			xhr.send();

		});

	};

	var pollChannel = function(channelName) {

		poll = true;

		return new Promise(function (resolve, reject) {

			var xhr = new XMLHttpRequest();
				xhr.open("GET", PAYMENTS_API + channelName + "/poll", true);
				xhr.responseType = "json";

			xhr.onload = function() {

				var data = this.response;
				if (data.message) {
					return resolve(data.message);
				}

				if (poll) {
					resolve(pollChannel(channelName));
				}

			};

			xhr.onerror = function() {

				reject(this.statusText);

			};

			xhr.send();

		});

	};

	var stopPolling = function() {
		poll = false;
	};

	return {
		generateAddress: generateAddress,
		pollChannel: pollChannel,
		stopPolling: stopPolling
	};

})();

