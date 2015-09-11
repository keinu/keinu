/* Contact us form managment */
/* global $ */

(function() {

	"use strict";

	var CONTACT_API = "http://www.mukuzu.com/contact/send";

	$(document).on("submit", "form[name='contact']", function(e) {

		e.preventDefault();

		$(this).find(".help-block").html("");
		var btn = $(this).find("button");
		var form = this;
		var data = $(this).serialize();
		    // Do this on the server FFS
		    data.message = "From: " + data.email + "\n\n" + data.message;
		
		$.ajax({

			method: "POST",
			data: $(this).serialize(),
			url: CONTACT_API,
			dataType: "json"

		}).done(function() {

			$(form).find(" > .lead").html("Thank you " + $(form).find("[name='name']").val() + ", <br />I'll get back to you.<br />");
			$(form).find(".form-group").hide();

		}).fail(function(data) {

			var response = data.responseJSON.validation;
			if (response.keys[0] === "email") {
				$(form).find("[name='email'] + .help-block").html("Check your email");
				$(form).find("[name='email']").parent(".form-group").addClass("has-error");
			}

			if (response.keys[0] === "name") {
				$(form).find("[name='name'] + .help-block").html("Check your name");
				$(form).find("[name='name']").parent(".form-group").addClass("has-error");
			}

			if (response.keys[0] === "message") {
				$(form).find("[name='message'] + .help-block").html("Check your message");
				$(form).find("[name='message']").parent(".form-group").addClass("has-error");
			}

			btn.html("Send");

		});

		$(this).find("button").html("Sending...");

	});

})();
