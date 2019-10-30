/* global $ */
/* global _ */
/* global d3 */
/* global moment */

(function() {

	"use strict";

	if (!$("body").is("#resume")) {
		return false;
	}

	var dataStructurer = function(resume) {

		var languages = {},
			tags = {},
			totalDuration = moment.duration();

		var setDuration = function(activity) {

			activity.endDate = activity.endDate ? moment(activity.endDate) : moment();
			activity.startDate = activity.startDate ? moment(activity.startDate) : moment();
			activity.days = activity.endDate.diff(activity.startDate, 'days');

		};

		_.each(resume.experiences, function(experience) {

			setDuration(experience);

			_.each(experience.projects, function(project) {

				setDuration(project);

				totalDuration.add(project.days, 'days');

				_.each(project.languages, function(language) {
					if (typeof languages[language] === "undefined") {
						languages[language] = project.days;
					} else {
						languages[language] += project.days;
					}
				});

				_.each(project.tags, function(tag) {
					if (typeof tags[tag] === "undefined") {
						tags[tag] = project.days;
					} else {
						tags[tag] += project.days;
					}
				});

			});

		});

		return {
			getExperiences: function() {
				return resume.experiences;
			},
			getLanguages: function() {
				return _.sortBy(_.pairs(languages), function(key){ return -key[1]; });
			},
			getTags: function() {
				return _.sortBy(_.pairs(tags), function(key){ return -key[1]; });
			},
			getTotalDuation: function() {
				 return totalDuration.asDays();
			}
		};

	};

	var drowDonuts = function(resume) {

		var drawDonut = function(element, label, percent, val) {

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

			var donut = svg.append("g")
				.attr("transform", "translate(" + width / 2 + "," + 100 + ")");

			// assigned to variable for readbility
			var background = donut.append("path")
				.datum({endAngle: τ})
				.attr("class", "color1")
				.attr("d", arc);

			var foreground = donut.append("path")
				.datum({endAngle: 0 * τ})
				.attr("class", "color0")
				.attr("filter", "url(#dropshadow)")
				.attr("d", arc);

			var text = donut.append("text")
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

		_.each(resume.getLanguages(), function(element){
			drawDonut(
				'#lang-exp',
				element[0],
				(100 * element[1]) / resume.getTotalDuation(),
				element[1]
			);
		});

		_.each(resume.getTags(), function(element){
			drawDonut(
				'#tag-exp',
				element[0],
				(100 * element[1]) / resume.getTotalDuation(),
				element[1]
			);
		});

	};

	var drawTimeline = function(resume) {

		var m = [90, 10, 0, 10],
		w = 700 - m[1] - m[3],
		h = 120 - m[0] - m[2];

		var isOverlapping = function(ex, key) {
			for (var i = 0; i <= key; i++) {
				var e = resume.getExperiences()[i];
				if (!(e.startDate.isSame(ex.startDate) && e.endDate.isSame(ex.endDate)) &&
					!(e.startDate.isBefore(ex.startDate) && e.endDate.isBefore(ex.startDate) &&
					!(e.startDate.isAfter(ex.endDate) && e.endDate.isAfter(ex.endDate)))) {
					return true;
				}
			}
			return false;
		};

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

		var x = d3.time.scale()
			.domain([ moment("2003-01-01"), moment()])
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
			.data(resume.getExperiences())
			.enter().append("g")
			.attr("class", "bar")
			.on("click", highlight);

		bar.append("rect")
			.attr("width", function(d) {
				return x(d.endDate) - x(d.startDate);
			})
 			.attr("transform", function(d, key) {
 				var y = isOverlapping(d, key) ? '-30' : '-60';
 				return "translate(" + x(d.startDate) + "," + y + ")";
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
			.text(function(d) { return d.days; });

		svg.append("g")
			.attr("class", "xaxis")
			.call(xAxis);

		$.fn.d3Click = function () {
			this.each(function (i, el) {
				var evt = document.createEvent("MouseEvents");
				evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
				el[0].dispatchEvent(evt);
			});
		};

		var rotateExperiences = function(i) {
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

	};


	// Apply dropshadow
	var applyHighlights = function() {

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

	};

	applyHighlights();


	$.getJSON("/js/resume.json").done(function(data) {

		var resume = dataStructurer(data);

		drawTimeline(resume);
		drowDonuts(resume);

  	}).fail(function(err, message) {

  		console.error(err, message);

  	});

})();

