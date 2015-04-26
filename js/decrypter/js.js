/* global $ */
/* global QRCode */
/* global io */
/* global loada */
/* global Decrypter */
/* global keyRing */

(function(){

	"use strict";

	var galleryId = "1";

	var GALLERIES_API = "http://www.mukuzu.com/gallery/";
	var PAYMENTS_API = "http://www.mukuzu.com/payment/";
	var PAYMENTS_SOCKET_URL = "//www.mukuzu.com";
	var GALLERIES_PUBLIC_PATH = "http://www.mukuzu.com";
	var decrypter;

	var xhr = new XMLHttpRequest();
		xhr.open("GET", GALLERIES_API + galleryId, true);
		xhr.responseType = "json";

	xhr.onload = function() {

		var image, i = 0,
			images = this.response,
			imaagesPlaceholder = document.querySelector(".images");

		while (image = images[i++]) {

			var img = document.createElement("img");
				img.setAttribute("src", GALLERIES_PUBLIC_PATH + image);

			imaagesPlaceholder.appendChild(img);

		}

		decrypter = new Decrypter(".images img");

		var key = keyRing.getGalleryKey(galleryId);
		if (!key) {
			loada.hide();
			return false;
		}

		console.log(key);

		decrypter.decrypt(key);

		var remaining = key.expires - (new Date()).getTime();
		loada.linearProgress(key.validity, remaining, function() {
			loada.hide();
			decrypter.revert();
		});

	};

	xhr.send();

	var getPaymentInfo = function (clientId) {

		$("#qrcode").addClass("loading");

		var xhr = new XMLHttpRequest();
			xhr.open("GET", PAYMENTS_API  + "generate/" + galleryId + "/" + clientId, true);
			xhr.responseType = "json";

		xhr.onload = function() {

			var data = this.response;

			$("#qrcode").removeClass("loading").addClass("loaded");

			setTimeout(function() {
				$("#qrcode").removeClass("loaded");
				$(".paymentlink").attr("href", "bitcoin:" + data.input_address).html(data.input_address);
				var qrcode = new QRCode("qrcodecontent", {
					text: data.input_address,
					width: 400,
					height: 400,
					colorDark : "#000000",
					colorLight : "#ffffff",
					correctLevel : QRCode.CorrectLevel.H
				});
			}, 200);

		};

		xhr.send();

	};

	var consumeKey = function(key) {

		key = keyRing.setExpiry(key);

		var remaining = key.expires - (new Date()).getTime();
		loada.linearProgress(key.validity, remaining, function() {
			loada.hide();
			decrypter.revert();
		});

		decrypter.decrypt(key);
		decrypter.on("decrypt", function(e) {
			keyRing.add(e.detail.key);
		});

	};

	var connector = (function() {

		var clientId, socket;

		var getClientId = function(callback) {

			if (clientId) {
				callback(clientId);
				return;
			}

			socket = io.connect(PAYMENTS_SOCKET_URL, {"sync disconnect on unload": true} );

			socket.on("client", function(client) {
				clientId = client.clientId;
				callback(client.clientId);
				console.log("client is %s", client.clientId);
			});

			socket.on("error", function(){
				$("#qrcode").html("<p class='lead'>WebSockets do not seems to be working on your browser or network</p>");
			});

		};

		var on = function(event, callback) {

			socket.on(event, callback);

		};

		return {
			getClientId: getClientId,
			on: on
		};

	})();


	$("#getKey").on("click", function(e) {

		e.preventDefault();

		var xhr = new XMLHttpRequest();
			xhr.open("GET", GALLERIES_API + galleryId + "/key", true);
			xhr.responseType = "json";

		xhr.onload = function() {

			consumeKey(this.response);

		};

		xhr.send();
		$("#myModal").modal("hide");

	});

	$("#decrypt").on("click", function() {

		$("#qrcodecontent").html("");
		$("#key").html("");
		$("#myModal").modal();

		connector.getClientId(function(clientId) {

			getPaymentInfo(clientId);

		});

		connector.on("key", function(data) {

			consumeKey(data.key);
			$("#myModal").modal("hide");

		});

	});

})();
