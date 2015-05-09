/* global io */
/* global Promise */
/* global payment */

var payment = (function() {

	"use strict";

	var PAYMENTS_API = "http://www.mukuzu.com/payment/";
	var PAYMENTS_SOCKET_URL = "//www.mukuzu.com";

	var clientId, socket;
	var generateAddress = function(clientId, galleryId) {

		return new Promise(function (resolve, reject) {

			var xhr = new XMLHttpRequest();
				xhr.open("GET", PAYMENTS_API  + "generate/" + galleryId + "/" + clientId, true);
				xhr.responseType = "json";

			xhr.onload = function() {

				var data = this.response;
				resolve(data.input_address);

			};

			xhr.onerror = function() {

				reject(this.statusText);

			};


			xhr.send();

		});

	};

	var getClientId = function() {

    	return new Promise(function (resolve, reject) {

			if (clientId) {
				return resolve(clientId);
			}

			socket = io.connect(PAYMENTS_SOCKET_URL, {"sync disconnect on unload": true} );

			socket.on("client", function(client) {

				clientId = client.clientId; // save it for later
				resolve(client.clientId);

			});

			socket.on("error", function(err) {

				reject(err);

			});

		});

	};

	var on = function(event, callback) {

		socket.on(event, callback);

	};

	return {
		generateAddress: generateAddress,
		getClientId: getClientId,
		on: on
	};

})();

