/* Contact us form managment */
/* global $ */

(function() {

	"use strict";

	$(document).on("submit", "form", function(e) {

		e.preventDefault();

		$("form .help-block").html("");
		var btn = $(this).find("button").html('loading');

		$.ajax({

			method: "POST",
			data: $("form").serialize(),
			url: "http://www.janveu.com/do.php",
			dataType: "jsonp"

		}).done(function(data) {

			btn.html('reset');

			if (data.status === "success") {

				$("form > .lead").html("Thank you! <br />I'll get back to you.");
				$("form .form-group").hide();

			} else {

				if(data.email) {
					$("form [name='email'] + .help-block").html(data.email);
					$("form [name='email']").parent(".form-group").addClass("has-error");
				}

				if(data.name) {
					$("form [name='name'] + .help-block").html(data.name);
					$("form [name='name']").parent(".form-group").addClass("has-error");
				}

				if(data.message) {
					$("form [name='message'] + .help-block").html(data.message);
					$("form [name='message']").parent(".form-group").addClass("has-error");
				}

			}

		});

		$("form button").html("Sending...");

	});

})();