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
				A standard formatted résumé is boring and rather difficult to read and analyse. <br />
				Instead, I thought of having my resume in a JSON format. Allowing me to manipulate it and display the data in a meaninful way. For instance:
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
				</dd>
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
				</dd>
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
				</dd>

				<dt>
					2000 - 2001<br />
					Uztaritze, Basque Country
				</dt>
				<dd>
					<h3>
						Self-taught web technologies 
					</h3>
					Graphical tools, user interface design and programming languages learning.
				</dd>

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
				</dd>
			</dl>
		</div>
	</div>
</div>

<script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/d3/3.5.5/d3.min.js"></script>
<script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/moment.js/2.9.0/moment.min.js"></script>
<script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.2/underscore-min.js"></script>
<script type="text/javascript" src="/js/app.js"></script>