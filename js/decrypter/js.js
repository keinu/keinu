/* global $ */
/* global QRCode */
/* global loada */
/* global Decrypter */
/* global keyRing */

(function(){

	"use strict";

	var galleryId = 1, clientId;

	var GALLERIES_API = "http://www.mukuzu.com/gallery/";
	var PAYMENTS_API = "http://www.mukuzu.com/payment/";
	var PAYMENTS_SOCKET_URL = "//www.mukuzu.com";
	var GALLERIES_PUBLIC_PATH = "http://www.mukuzu.com";
	var decrypter;

	var xhr = new XMLHttpRequest();
		xhr.open('GET', GALLERIES_API + galleryId, true);
		xhr.responseType = 'json';

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
		if (key) {
			decrypter.decrypt(key);
		}

	};

	xhr.send();

	var getPaymentInfo = function () {

		$("#qrcode").addClass("loading");

		var xhr = new XMLHttpRequest();
			xhr.open('GET', PAYMENTS_API  + "generate/" + galleryId + "/" + clientId, true);
			xhr.responseType = 'json';

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

	$('#getKey').on("click", function(e) {

		e.preventDefault();

		var xhr = new XMLHttpRequest();
			xhr.open('GET', GALLERIES_API + galleryId + "/key", true);
			xhr.responseType = 'json';

		xhr.onload = function() {

			console.log("got key", this.response);
			decrypter.decrypt(this.response);
			decrypter.on("decrypt", function(e) {
				keyRing.add(e.detail.key);
			});

		};

		xhr.send();
		$('#myModal').modal('hide');

	});

	$("#decrypt").on("click", function() {

		$("#qrcodecontent").html("");
		$("#key").html("");
		$('#myModal').modal();

		getPaymentInfo();

	});

	var socket = io.connect(PAYMENTS_SOCKET_URL);
	socket.on('message', function(msg) {
		clientId = msg.clientId;
	});

	setInterval(function() {

		var key = keyRing.getGalleryKey(galleryId);
		if (!key) {
			loada.hide();
			return false;
		}

		var remaining = key.expires - (new Date()).getTime();
		var percent = 100 - (remaining / key.validity * 100);
			percent = percent.toFixed(4);

		loada.go(percent);

	}, 100);

})();
