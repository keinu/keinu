/* global $ */
/* global QRCode */
/* global loada */
/* global Decrypter */
/* global keyRing */
/* global galleries */
/* global payment */

(function(){

	"use strict";

	var decrypter, currentGalleryId,
		galleriesPlaceholder = document.querySelector(".galleries");

	galleries.getGalleries(function(galleryIds) {

		galleriesPlaceholder.innerHTML = "";
		var i = 1;
		galleryIds.forEach(function(galleryId) {

			var a = document.createElement("a");
				a.innerHTML = "Gallery " + i++;
				a.setAttribute("href", "#");
				a.onclick = function(e) {

					e.preventDefault();

					var links = document.querySelectorAll(".galleries a");
					for (var i = 0; i < links.length; ++i) {
						links[i].removeAttribute("class");
					}

					e.target.setAttribute("class", "active");

					var imaagesPlaceholder = document.querySelector(".images");
						imaagesPlaceholder.innerHTML = "<p>Loading Gallery ...</p>";

					galleries.getImages(galleryId, function(images) {

						var image, i = 0;

						imaagesPlaceholder.innerHTML = "";

						currentGalleryId = galleryId;

						while (image = images[i++]) {

							var img = document.createElement("img");
								img.setAttribute("src", image);

							imaagesPlaceholder.appendChild(img);

						}

						decrypter = new Decrypter(".images img");

						var key = keyRing.getGalleryKey(galleryId);
						if (!key) {
							loada.hide();
							return false;
						}

						decrypter.decrypt(key);

						var remaining = key.expires - (new Date()).getTime();
						loada.linearProgress(key.validity, remaining, function() {
							loada.hide();
							decrypter.revert();
						});

					});

				};

				galleriesPlaceholder.appendChild(a);

		});

		galleriesPlaceholder.querySelector("a").click();

	});

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

	$("#getKey").on("click", function(e) {

		e.preventDefault();

		galleries.getKey(currentGalleryId, consumeKey);

		$("#myModal").modal("hide");

	});

	$("#decrypt").on("click", function() {

		$("#qrcodecontent").html("");
		$("#key").html("");
		$("#myModal").modal();

		$("#qrcode").addClass("loading");

		payment.getClientId(function(clientId) {

			console.log("Got a client id", clientId);
			console.log(clientId, currentGalleryId);

			return payment.getPaymentInfo(clientId, currentGalleryId);

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
