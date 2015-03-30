---
layout: default
title: Résumé
class: resume
permalink: /resume/
---

<div class="container">

	<div class="row">

		<div class="col-md-3 titles">
			<h2>Empirical résumé</h2>
		</div>

		<div class="col-md-8 contents">

			<p class="lead">
				A standard formatted résumé is quite boring and rather difficult to read and analyse. <br />
				Instead, I thought of having my resume in a JSON format. Allowing me to manipulate, and display the data in a meaninful way. For instance:
			</p>

			<h3>Days of experience per language:</h3>
			<div id="lang-exp" class="donuts"></div>

			<h3>Days of experience per tag:</h3>
			<div id="tag-exp" class="donuts"></div>

			<h3>Experience timeline per employer:</h3>
			<div id="distribution"></div>

			<div id="distribution-details">

				<h3>
					<span></span>
					<br />
					<small>
						<span class="start"></span> -
						<span class="end"></span> |
						<span class="location"></span>
					</small>
				</h3>
				<div class="row">
					<div class="col-md-4">
						<p class="description"></p>
					</div>
					<div class="col-md-8">
						<script type="text/template" id="project-template">
							<li>
								<h5>
									<span><%= name %></span>
									<small><span><%= days %></span> days</small>
								</h5>
								<p class="project-decription">
									<%= description %>
								</p>
								<p class="languages">
									Laguages: <span><%= languages %></span>
								</p>
								<p class="tags">
									Tags: <span><%= tags %></span>
								</p>
							</li>
						</script>
						<ul class="list-unstyled projects"></ul>
					</div>
				</div>

			</div>

		</div>

	</div>

	<br />
	<br />

	<div class="row">
		<div class="col-md-3 titles">
			<h2>Classic resume</h2>
		</div>
		<div class="col-md-8">
			<p class="lead">
				The traditional way of reading a resume
			</p>
		</div>
	</div>

	<br />

	<div class="row">
		<div class="col-md-3 titles">
			<h2>Skills</h2>
		</div>
	</div>

	<div class="row">
		<div class="col-md-12">
			<dl class="dl-horizontal">
				<dt>
					Web development
				</dt>
				<dd>
					HTML, CSS, JavaScript, JSTL, PHP, SQL. 
				</dd>
				<dt>
					Web design
				</dt>
				<dd>
					Photoshop, Illustrator
				</dd>
				<dt>
 					Frameworks
				</dt>
				<dd>
					YUI, jQuery, Liferay, Zend, Jelix, Wordpress.
				</dd>
				<dt>
					Other skills
				</dt>
				<dd>
					W3C/WCAG compliance, user experience, search engine optimisation, cross browser compliancy
				</dd>
			</dl>
		</div>
	</div>

	<div class="row">
		<div class="col-md-3 titles">
			<h2>Experience</h2>
		</div>
	</div>

	<div class="row">
		<div class="col-md-12">
			<dl class="dl-horizontal dl-content">
				<dt>
					Jul. 09 - Present<br />
					NSW Department of Education and Communities<br />
					Sydney, Australia
				</dt>
				<dd>
					<h3>Senior front-end developer</h3>
					Enterprise CMS development using Liferay portal technology. <br />
					Front-end integration of numerous education related websites. <br />
					Pixel-perfect theme integration, contribution to user experience requirements, front-end techniques advising and responsive design development.<br />
					Technologies: JavaScript / CSS / JSTL / Liferay
				</dd>

				<dt>
					Mar. 08 - Apr. 09<br />
					Orange / France Telecom<br />
					Toulouse, France
				</dt>
				<dd>
					<h3>Front-end developer</h3>
					Embedded TV application development.
					Pure JavaScript application on a set top box<br />
					Full CSS3 and JavaScript development<br />
					Best practises teaching, code optimisation<br />
					Technologies: JavaScript / CSS3 / JSON on ANT Galio browser
				</dd>

				<dt>
					August 2006 – January 2008<br />
					JFG Networks<br />
					Toulouse, France
				</dt>
				<dd>
					<h3>Web developer / Traffic manager</h3>
					Development of a major blog platform in Europe.<br />
					Back-end and front-end development. Development of administration tools, domain name registration and payment processing scripts.<br />
					Technologies: JavaScript / CSS / PHP / Jelix
				</dd>

				<dt>
					September 2005 – April 2006<br />
					Freescale Semiconductor<br />
					Toulouse, France 
				</dt>
				<dd>
					<h3>Web developer</h3>
					Development of career section of the company's website.<br />
					Update content pages and internal tools development.<br />
					Banner design and integration.<br />
					Technologies: JavaScript / CSS
				</dd>

				<dt>
					July 2004 - April 2005<br />
					Chubb Security<br />
					Pau, France 
				</dt>
				<dd>
					<h3>Web developer</h3>
					Extranet development for VIP customers of security and alarm
					service company.<br >
					Business case writing<br />
					Development of reporting and data visualisation tools<br />
					PDF document creation script and secure system implementation. <br />
					Technologies: JavaScript / CSS / Flash / PHP / MsSQL
				</dd>

				<dt>
					January 2003<br />
					Futurcom – Paris<br />
					France 
				</dt>
				<dd>
					<h3>PHP Developer</h3>
					PHP code enhancement and refactoring<br />
					Module development for a gastronomical website.<br />
					Remote work.
					Technologies: HTML / CSS / Flash / PHP / MySQL
				</dt>
			</dl>
		</div>
	</div>

	<div class="row">
		<div class="col-md-3 titles">
			<h2>Freelance work</h2>
		</div>
	</div>

	<div class="row">
		<div class="col-md-12">
			<dl class="dl-horizontal dl-content">
				<dt>
					July 2003 – Present<br />
					Ordered and self ventures<br />
				</dt>
				<dd>
					Vast range of profit and non-for-profit oriented websites and application development.<br />
					Fullstack development, research, marketing, webdesign, search engine optimisation, traffic management.<br />
					Non-exhaustive list of technologies: Node.js, MongoDB, KeystoneJs, Ghost, ExpressJs, Jade, Handlebars, Wordpress, PHP, HTML, JavaScript, Flash, API Mashups, P2P networks.<br />
				</dt>
			</dl>
		</div>
	</div>

	<div class="row">
		<div class="col-md-3 titles">
			<h2>Education</h2>
		</div>
	</div>
	<div class="row">
		<div class="col-md-12">
			<dl class="dl-horizontal dl-content">
				<dt>
					2001 - 2002<br />
					Université de Pau et des <br />pays de l'Adour<br />
					Pau, France
				</dt>
				<dd>
					<h3>
						Diplome universitaire Techniques du Multimedia<br />
						<small>English language equivalence will vary</small>
					</h3>
					Multimedia and web application programming<br />
					Visual communication and design
				</dt>

				<dt>
					2000 - 2001<br />
					Uztaritze, Basque Country
				</dt>
				<dd>
					<h3>
						Self-taught web technologies 
					</h3>
					Graphical tools, user interface design and programming languages learning.
				</dt>

				<dt>
					1998 - 2000 <br />
					Lycée St Pierre<br />
					Tarbes, France
				</dt>
				<dd>
					<h3>
						BTS Informatique Industrielle<br />
						<small>English language equivalence will vary</small>
					</h3>
					Software development and embedded software development in industrial environment. 
				</dt>
			</dl>
		</div>
	</div>
</div>

<script type="text/javascript">
	var cv = {
	"summary": "Lorem ipsum",
	"experiences": [
		{
			"name": "Self Employed",
			"employerProfile": "http://www.keinu.net",
			"location": "Teh Internetz",
			"position": "Full stack developer",
			"description": "Experiments, hot projects, successes, mostly failures.",
			"projects": [
				{
					"name": "This website",
					"startDate": "2014-05-01",
					"endDate": undefined,
					"description": "Some fun with d3, Ghost and other cool techs.",
					"link": "/",
					"languages": [
						"HTML", "JavaScript", "LESS"
					],
					"tags": [
						"Node.js", "Ghost", "Twitter Bootstrap", "Handlebars"
					]
				},
				{
					"name": "Higiezina",
					"startDate": "2014-04-10",
					"endDate": "2014-04-25",
					"description": "Real estate website in Euskara based on KeystoneJS",
					"link": "http://www.higiezina.com",
					"languages": [
						"HTML", "JavaScript", "LESS"
					],
					"tags": [
						"Node.js", "KeystoneJs", "Twitter Bootstrap", "Jade"
					]
				},
				{
					"name": "Seaskaren lagunak",
					"startDate": "2014-01-15",
					"endDate": "2014-02-15",
					"description": "Wordpress website about fundraising for Ikastola, the Basque Language immersive schools",
					"link": "http://www.seaskarenlagunak.org",
					"languages": [
						"HTML", "JavaScript", "LESS", "PHP"
					],
					"tags": [
						"LAMP", "Wordpress", "Twitter Bootstrap"
					]
				},
				{
					"name": "Top secret websites",
					"startDate": "2003-01-15",
					"endDate": "2009-09-12",
					"description": "Web service design, UX, design, development, testing, refactoring, marketing, SEO. Some of them are defunct, some others still alive but I would have to kill your whole family if I tell you what they are.",
					"link": "http://www.topsecret.com",
					"languages": [
						"HTML", "JavaScript", "LESS", "PHP"
					],
					"tags": [
						"LAMP", "Wordpress", "Native JavaScript"
					]
				}
			],
			"duties": []
		},
		{
			"name": "NSW Departement of Attorney General and Justice",
			"employerProfile": "http://www.linkedin.com/company/department-of-justice-and-attorney-general?trk=prof-exp-company-name",
			"location": "Sydney, Australia",
			"position": "Senior Front End Developer",
			"description": "Development of a Jury Management Solution",
			"projects": [
				{
					"name" : "Jury Management System",
					"startDate": "2013-03-22",
					"endDate": undefined,
					"description": "Development using modern front end technologies. \
Responsive design web application development for desktop and tablet users. \
Front end design patterns and functionality framework implementation.",
					"link": "http://...",
					"languages": [
						"HTML", "JavaScript", "Java", "LESS"
					],
					"tags": [
						"Spring", "Twitter Bootstrap", "Handlebars"
					],
				}
			],
			"duties": [
			]
		},
		{
			"name": "NSW Department of Education and Communities",
			"employerProfile": "http://www.linkedin.com/company/nsw-department-of-education-and-communities?trk=prof-exp-company-name",
			"location": "Sydney, Australia",
			"position": "Senior Front End developer",
			"description": "Enterprise CMS development",
			"projects": [
				{
					"name": "School Website Service",
					"startDate": "2009-07-06",
					"endDate": "2011-03-23",
					"description": "Enterprise grade CMS front-end development. Pixel-perfect theme integration, contribution to user experience requirements, front-end techniques advising and responsive design development.",
					"link": "http://...",
					"languages": [
						"HTML", "JavaScript", "CSS", "JSP/JSTL"
					],
					"tags": [
						"Liferay", "jQuery", "Teamsite"
					]
				},
				{
					"name": "Public Website Service",
					"startDate": "2011-03-24",
					"endDate": "2011-12-15",
					"description": "Enterprise grade CMS front-end development. Pixel-perfect theme integration, contribution to user experience requirements, front-end techniques advising and responsive design development.",
					"link": "http://...",
					"languages": [
						"HTML", "JavaScript", "CSS", "JSP/JSTL"
					],
					"tags": [
						"Liferay", "jQuery"
					]
				},
				{
					"name": "School Website Service Mobile",
					"startDate": "2012-10-01",
					"endDate": "2013-03-22",
					"description": "Enterprise grade CMS front-end development. Pixel-perfect theme integration, contribution to user experience requirements, front-end techniques advising and responsive design development.",
					"link": "http://...",
					"languages": [
						"HTML", "JavaScript", "CSS", "JSP/JSTL", "LESS"
					],
					"tags": [
						"Liferay", "jQuery", "Mobile"
					]
				},
				{
					"name": "School A-to-Z",
					"startDate": "2011-12-15",
					"endDate": "2012-05-15",
					"description": "Enterprise grade CMS front-end development. Pixel-perfect theme integration, contribution to user experience requirements, front-end techniques advising and responsive design development.",
					"link": "http://...",
					"languages": [
						"HTML", "JavaScript", "CSS", "JSP/JSTL", "LESS"
					],
					"tags": [
						"Liferay", "jQuery"
					]
				}
			],
			"duties": [
			]
		},
		{
			"name": "Orange / France Telecom",
			"employerProfile": "http://www.linkedin.com/company/orange?trk=prof-exp-company-name",
			"location": "Toulouse, France",
			"position": "Front-end developer",
			"description": "Historical Telecom operator in France",
			"projects": [
				{
					"name": "Zone Non Eligible (Satellite TV)",
					"startDate": "2008-03-01",
					"endDate": "2009-04-30",
					"description": "Pure JavaScript application enbedded on a set top box for satellite TV",
					"languages": [
						"HTML", "JavaScript", "CSS"
					],
					"tags": [
						"Galio Browser", "Samsung firmware"
					]
				}
			],
			"duties": [
				"Full CSS3 and JavaScript development",
				"Best practises teaching, code optimisation"
			]
		},
		{
			"name": "JFG Networks",
			"employerProfile": "http://www.linkedin.com/company/overblog?trk=prof-exp-company-name",
			"location": "Toulouse, France",
			"position": "Web developer",
			"description": "Major blog platform in France",
			"projects": [
				{
					"name": "Over Blog v2",
					"startDate": "2006-08-01",
					"endDate": "2008-01-31",
					"description": "Back-end and front-end development. Development of administration tools, domain name registration and payment processing scripts.",
					"languages": [
						"HTML", "JavaScript", "CSS", "PHP"
					],
					"tags": [
						"Jelix", "YUI"
					]
				}
			],
			"duties": [
				"Back-end and front-end development",
				"Development of administration tools",
				"Domain name registration and payment processing scripts"
			]
		},
		{
			"name": "Freescale Semiconductor",
			"employerProfile": "http://www.linkedin.com/company/freescale-semiconductor?trk=prof-exp-company-name",
			"location": "Toulouse, France",
			"position": "Front End Developer",
			"description": "Semiconductor company",
			"projects": [
				{
					"name": "Careers website development",
					"startDate": "2005-09-12",
					"endDate": "2006-04-30",
					"description": "Maintenance of the careers webpages",
					"languages": [
						"HTML", "JavaScript", "CSS"
					],
					"tags": [
						"Teamsite"
					]
				}
			],
			"duties": [
				"Update content pages and internal tools development",
				"Banner design and integration",
				"Development of career pages of the company's website"
			]
		},
		{
			"name": "Chubb Security",
			"employerProfile": "http://www.linkedin.com/company/chubb-security_2?trk=prof-exp-company-name",
			"location": "Pau, France",
			"position": "Web developer",
			"description": "Extranet development for VIP customers of security and alarm service company",
			"projects": [
				{
					"name": "VIP customer extranet",
					"startDate": "2004-07-01",
					"endDate": "2005-04-30",
					"description": "VIP customer extranet development",
					"languages": [
						"HTML", "JavaScript", "CSS", "ActionScript", "PHP"
					],
					"tags": [
						"Flash"
					]
				}
			],
			"duties": [
				"Schedule of conditions writing",
				"Development of reporting tools, data visualisation tools",
				"PDF document creation script"
			]
		},
		{
			"name": "Futurcom",
			"employerProfile": "",
			"location": "Paris, France",
			"position": "Web developer",
			"description": "Remote working for refactoring of a websites.",
			"projects": [
				{
					"name": "Recette et Terroirs",
					"startDate": "2003-01-01",
					"endDate": "2003-01-31",
					"description": "Development and maintenance of a gastronomical website",
					"languages": [
						"HTML", "JavaScript", "CSS", "PHP"
					],
					"tags": [
						"Flash"
					]
				}
			],
			"duties": [
				"Remote work",
				"Code refactoring",
				"New module development"
			]
		}
	]
}
</script>
Apple
:   Pomaceous fruit of plants of the genus Malus in 
    the family Rosaceae.
