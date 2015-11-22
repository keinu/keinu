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
	var progress;

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

			var remainingTime = key.expires - (new Date()).getTime();
			if (progress) {
				clearTimeout(progress);
			}

			progress = loada.linearProgress(key.validity, remainingTime, function() {
				loada.hide();
				decrypter.revert();
			});

		});

	};

	var consumeKey = function(key) {

		key = keyRing.add(key);

		return decrypter.decryptGallery(key).then(function(key) {

			console.log(key.expires);
			console.log((new Date()).getTime());

			var remaining = key.expires - (new Date()).getTime();
			console.log(remaining);

			if (progress) {
				clearTimeout(progress);
			}

			progress = loada.linearProgress(key.validity, remaining, function() {
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

	$("#decrypt, .images").on("click", function() {

		$("#key").html("");
		$("#myModal").modal();

		$("#qrcode").addClass("loading");

		console.log(galleries.getGalleryId())

		payment.generateAddress(galleries.getGalleryId()).then(function(data) {

			$("#qrcode").removeClass("loading").addClass("loaded");

			setTimeout(function() {

				$("#qrcode").removeClass("loaded");
				$("#qrcodecontent").html("");
				$(".paymentlink").attr("href", "bitcoin:" + data.address).html();
				var qrcode = new QRCode("qrcodecontent", {
					text: data.address,
					width: 400,
					height: 400,
					colorDark : "#000000",
					colorLight : "#ffffff",
					correctLevel : QRCode.CorrectLevel.H
				});

				return qrcode; // useless

			}, 200);

			return data.channelName;

		}).then(function(channelName) {

			return payment.pollChannel(channelName);

		}).then(function(key) {

			$("#myModal").modal("hide");

			if (!key) {
				return false;
			}

			consumeKey(key);

		}).catch(function(err) {

			console.log(err);
			$("#qrcode").html("<p class='lead'>WebSockets do not seems to be working on your browser or network</p>");

		});

	});

	$("#myModal").on("hidden.bs.modal", function(e) {

		payment.stopPolling();

	});

})();
