/* global $ */
/* global QRCode */
/* global loada */
/* global Decrypter */
/* global keyRing */
/* global galleries */
/* global payment */

(function(){

	"use strict";

	var decrypter = new Decrypter(".images img");

	galleries.displyNavigation().then(function(firstGallery) {

		return galleries.displayGallery(firstGallery);

	}).fail(function(err) {

		console.error(err);

	});

	document.addEventListener("galleryDisplayed", function(e) {

		var galleryId = e.detail;
		decryptGallery(galleryId);

	}, false);


	var decryptGallery = function(galleryId) {

		var key = keyRing.getGalleryKey(galleryId);
		if (!key) {
			loada.hide();
			return false;
		}

		decrypter.decryptGallery(key).then(function(key) {

			decrypter.setTimers(key);

			var remainingTime = key.expires - (new Date()).getTime();
			loada.linearProgress(key.validity, remainingTime, function() {
				loada.hide();
				decrypter.revert();
			});

		});

	};

	var consumeKey = function(key) {

		return decrypter.decryptGallery(key).then(function(key) {

			key = keyRing.add(key);

			decrypter.setTimers(key);

			var remaining = key.expires - (new Date()).getTime();
			loada.linearProgress(key.validity, remaining, function() {
				loada.hide();
				decrypter.revert();
			});

		});

	};

	$("#getKey").on("click", function(e) {

		e.preventDefault();
		galleries.getKey().then(function(key) {

			return consumeKey(key);

		}).fail(function(err) {

			console.error(err);

		});

		$("#myModal").modal("hide");

	});

	$("#decrypt").on("click", function() {

		$("#qrcodecontent").html("");
		$("#key").html("");
		$("#myModal").modal();

		$("#qrcode").addClass("loading");

		payment.getClientId().then(function(clientId) {

			return payment.generateAddress(clientId, galleries.getGalleryId());

		}).then(function(address) {

			$("#qrcode").removeClass("loading").addClass("loaded");

			setTimeout(function() {
				$("#qrcode").removeClass("loaded");
				$(".paymentlink").attr("href", "bitcoin:" + address).html();
				var qrcode = new QRCode("qrcodecontent", {
					text: address,
					width: 400,
					height: 400,
					colorDark : "#000000",
					colorLight : "#ffffff",
					correctLevel : QRCode.CorrectLevel.H
				});
				return qrcode; // useless
			}, 200);

		}).catch(function(err) {

			console.log(err);
			$("#qrcode").html("<p class='lead'>WebSockets do not seems to be working on your browser or network</p>");

		});

		payment.on("key", function(data) {

			consumeKey(data.key);
			$("#myModal").modal("hide");

		});

	});

})();
