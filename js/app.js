requirejs.config({
    baseUrl: '/js/lib/',
    shim: {
        "bootstrap": {
            deps: ["jquery"]
        }
    }
});
requirejs(['jquery', 'underscore', 'd3', 'moment', 'bootstrap'],
function ($, _, d3, moment) {


	$.fn.d3Click = function () {
		this.each(function (i, el) {
			var evt = document.createEvent("MouseEvents");
			evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
			el[0].dispatchEvent(evt);
		});
	};

	var isOverlapping = function(ex, key) {

		for( i = 0; i <= key; i++){
			e = employers[i];
			if (!(e.startDate.isSame(ex.startDate) && e.endDate.isSame(ex.endDate)) &&
				!(e.startDate.isBefore(ex.startDate) && e.endDate.isBefore(ex.startDate) &&
				!(e.startDate.isAfter(ex.endDate) && e.endDate.isAfter(ex.endDate)))) {
				return true;
			}

		}
		return false;
	};

	$(document).on("mouseenter mouseleave", ".navbar-brand img", function(){
		var initial = $(this).attr("src");
		$(this).attr("src", $(this).data("hover-src"));
		$(this).data("hover-src", initial);
	});

	// Home animation
	if($("body").hasClass("home")) {

		var top = $("#splash-wrapper").position().top;
		var height = 150;

		var s = $(window).scrollTop();
		$(document).on("scroll", window, function(){
			scrollAnimate();
		});
		$(document).on("touchmove", window, function(){
			scrollAnimate();
		});

		$("#splash").fadeTo( 0, 0.9 - (s/height));
		$(document).on("click", ".scroll-hint", function(){
			$('html, body').animate({
				scrollTop: 500
			}, 2000);
		});

		var scrollAnimate = function() {
			var s = $(window).scrollTop();
			$("#splash").fadeTo(0, 0.9 - (s/height));
			$(".home-content").fadeTo(0, (s/height) * 0.5);
			$("#splash-wrapper").offset({
				top: top - s
			});
		};
	}

	// Resume visualisation
	if($("body").hasClass("resume")) {

		var languages = [],
			tags = [],
			projects = [],
			employers = [],
			totalDuration = moment.duration();

		_.each(cv.experiences, function(experience) {

			var employer = experience;
			var projects = [];

			_.each(experience.projects, function(project) {
				var s = moment(project.startDate);
				var e = moment(project.endDate);
				var days = e.diff(s, 'days');

				project.startDate = s;
				project.endDate = e;
				project.days = days;

				projects.push(project);

				if (typeof employer.startDate == "undefined" ||
					s.isBefore(employer.startDate)) {
					employer.startDate = s;
				}
				if (typeof employer.endDate == "undefined" ||
					e.isAfter(employer.endDate)) {
					employer.endDate = e;
				}
				totalDuration.add(days, 'days');

				_.each(project.languages, function(language) {
					if (typeof languages[language] == "undefined") {
						languages[language] = days;
					} else {
						languages[language] += days;
					}
				});
				_.each(project.tags, function(tag) {
					if (typeof tags[tag] == "undefined") {
						tags[tag] = days;
					} else {
						tags[tag] += days;
					}
				});

			});

			employer.projects = projects;
			employer.days = employer.endDate.diff(employer.startDate, 'days');
			employer.name = experience.name;

			employers.push(employer);

		});


		tags = _.sortBy(_.pairs(tags), function(key){ return -key[1]; });
		languages = _.sortBy(_.pairs(languages), function(key){ return -key[1]; });

		var totalDays = totalDuration.asDays();
		var duration   = 500,
		transition = 200;


		var highlight = function(d) {
			svg.selectAll("g.bar").attr("filter", "").attr("class", "bar");
			$(this).attr("filter", "url(#dropshadow)").attr("class", "bar selected");
			$("#distribution-details h3 span:first").html(d.name);
			$("#distribution-details h3 .start").html(d.startDate.format("MMM YY"));
			$("#distribution-details h3 .end").html(d.endDate.format("MMM YY"));
			$("#distribution-details .description").html(d.description);
			$("#distribution-details .location").html(d.location);
			var template = _.template($("#project-template").html());
			$("ul.projects").html("");
			_.each(d.projects, function(project) {
				$("ul.projects").append(template(project));
			});
		};

		var dropshadow = function(svg) {

			var defs = svg.append("defs");

			var filter = defs.append("filter")
				.attr("id", "dropshadow");

			filter.append("feGaussianBlur")
				.attr("in", "SourceGraphic")
				.attr("stdDeviation", 4)
				.attr("result", "blur");
			filter.append("feOffset")
				.attr("in", "blur")
				.attr("dx", 0)
				.attr("dy", 0)
				.attr("result", "offsetBlur");

			var feMerge = filter.append("feMerge");

			feMerge.append("feMergeNode")
				.attr("in", "offsetBlur");
			feMerge.append("feMergeNode")
				.attr("in", "SourceGraphic");

		};

		dropshadow(d3.select("footer").append("svg").attr("style", "height: 0; position: absolute"));

		var drawDonutChart = function(element, label, percent, val) {

			var τ = 2 * Math.PI, // http://tauday.com/tau-manifesto
				width = 100,
				height = 150,
				radius = Math.min(width, height) / 2;
			var arc = d3.svg.arc()
				.innerRadius(radius -20)
				.outerRadius(radius)
				.startAngle(0);

			var svg = d3.select(element).append("svg")
				.attr("width", width)
				.attr("height", width + 50);

			svg.append("foreignObject")
				.attr("x", 0) /*the position of the text (left to right)*/
				.attr("y", 0) /*the position of the text (Up and Down)*/
				.attr("text-anchor", "middle")
				.attr("width", 100)
				.attr("height", 50)
				.append("xhtml:body")
				.append("p")
				.attr("class", "donut-label")
				.text(label);

			var svg = svg.append("g")
				.attr("transform", "translate(" + width / 2 + "," + 100 + ")");

			var background = svg.append("path")
				.datum({endAngle: τ})
				.attr("class", "color1")
				.attr("d", arc);

			var foreground = svg.append("path")
				.datum({endAngle: 0 * τ})
				.attr("class", "color0")
				.attr("filter", "url(#dropshadow)")
				.attr("d", arc);

			var text = svg.append("text")
				.attr("text-anchor", "middle")
				.attr("dy", "5px");

			function arcTween(transition, newAngle) {
				transition.attrTween("d", function(d) {
					var interpolate = d3.interpolate(d.endAngle, newAngle);
					return function(t) {
						d.endAngle = interpolate(t);
						text.text(parseInt(val * t));
						return arc(d);
					};
				});
			}
			foreground.transition()
      			.duration(2000)
      			.call(arcTween, τ * percent/100);

		};

		_.each(languages, function(element){
			drawDonutChart(
				'#lang-exp',
				element[0],
				(100 * element[1]) / totalDays,
				element[1]
			);
		});

		_.each(tags, function(element){
			drawDonutChart(
				'#tag-exp',
				element[0],
				(100 * element[1]) / totalDays,
				element[1]
			);
		});


		var m = [90, 10, 0, 10],
		w = 700 - m[1] - m[3],
		h = 120 - m[0] - m[2];

		var x = d3.time.scale()
			.domain([ moment("2003-01-01"), moment("2014-06-30")])
			.range([0, w - m[1] - m[2]]);


		var xAxis = d3.svg.axis()
			.scale(x)
			.ticks(d3.time.years, 1)
			.tickSize(5, 1)
    		.tickFormat(d3.time.format("%y"))
			.orient("bottom");


		var svg = d3.select("#distribution").append("svg")
			.attr("width", w + m[1] + m[3])
			.attr("height", h + m[0] + m[2])
			.append("g")
			.attr("transform", "translate(" + m[3] + "," + m[0] + ")");

		var bar = svg.selectAll("g.bar")
			.data(employers)
			.enter().append("g")
			.attr("class", "bar")
			.on("click", highlight)

		bar.append("rect")
			.attr("width", function(d) { return x(d.endDate) - x(d.startDate) })
 			.attr("transform", function(d, key) {

 				console.log(arguments);
 				console.log(isOverlapping(d, key));

 				var y = isOverlapping(d, key) ? '-30' : '-60';
 				return "translate("
 					+ x(d.startDate) + "," + y + ")";
 			})
			.attr("class", "color0")
			.attr("height", 25);

		bar.append("text")
			.attr("class", "textbar")
			.attr("text-anchor", "left")
			.attr("x", function(d) { return x(d.startDate) + 3; })
			.attr("y", function(d, key) {
				return isOverlapping(d, key) ? '-12' : '-43';
			})
			.text(function(d) { return d.days });

		svg.append("g")
			.attr("class", "xaxis")
			.call(xAxis);

		var rotateExperiences = function(i){
			if (i >= 1) {
				$(svg.selectAll("g.bar:nth-child(" + i + ")")).d3Click();
			} else {
				clearInterval(inteval);
			}
		};

		var i = svg.selectAll("g.bar")[0].length;
		rotateExperiences(i--);
		var inteval = setInterval(function() {
			rotateExperiences(i--);
		}, 2000);

	}

	// Contact me stuff
	$(document).on("submit", "form", function(e){

		e.preventDefault();

		$("form .help-block").html("");
		var btn = $(this).find("button").button('loading');

		$.ajax({

			method: "POST",
			data: $("form").serialize(),
			url: "http://www.janveu.com/do.php",
			dataType: "jsonp"

		}).done(function(data) {

			btn.button('reset');

			if (data.status == "success") {

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

});

