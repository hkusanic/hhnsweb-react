var keystone = require('keystone');
let modelHelper = require('../helpers/modelHelper');

// Then to get access to our API route we will use importer
var importRoutes = keystone.importer(__dirname);
// And finally set up the api on a route
var routes = {
	api: importRoutes('./api'),
};

// Export our app routes
exports = module.exports = function (app) {
	// Get access to the API route in our app
	app.get('/api/recipe/', keystone.middleware.api, routes.api.recipe.list);
	app.get('/api/page/', keystone.middleware.api, routes.api.page.list);
	// Set up the default app route to  http://localhost:3000/index.html
	app.get('/index.html', function (req, res) {

		keystone.set('updateDatabase', false);
		// Render some simple boilerplate html
		function renderFullPage (result) {
			// Note the div class name here, we will use that as a hook for our React code
			// static menu
			return `
				<!doctype html>
				<html>
					<head>
						<title>H.H. Niranjana Swami - Official web-site</title>
						<link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Work+Sans:300,500,700,800%7COswald:300,400,500">
						<link rel="stylesheet" href="../css/bootstrap.css">
						<link rel="stylesheet" href="../css/fonts.css">
						<link rel="stylesheet" href="../css/style.css" id="main-styles-link">
					</head>
					<body>
						<div class="page">
							<!-- Page Header-->
							<header class="section page-header">
								<!-- RD Navbar-->
								<div class="rd-navbar-wrap">
									<nav class="rd-navbar rd-navbar-corporate" data-layout="rd-navbar-fixed" data-sm-layout="rd-navbar-fixed" data-md-layout="rd-navbar-fixed" data-md-device-layout="rd-navbar-fixed" data-lg-layout="rd-navbar-static" data-lg-device-layout="rd-navbar-fixed" data-xl-layout="rd-navbar-static" data-xl-device-layout="rd-navbar-static" data-xxl-layout="rd-navbar-static" data-xxl-device-layout="rd-navbar-static" data-lg-stick-up-offset="46px" data-xl-stick-up-offset="46px" data-xxl-stick-up-offset="46px" data-lg-stick-up="true" data-xl-stick-up="true" data-xxl-stick-up="true">
										<div class="rd-navbar-aside-outer">
											<div class="rd-navbar-aside">
												<!-- RD Navbar Panel-->
												<div class="rd-navbar-panel">
													<!-- RD Navbar Toggle-->
													<button class="rd-navbar-toggle" data-rd-navbar-toggle="#rd-navbar-nav-wrap-1"><span></span></button>
													<!-- RD Navbar Brand--><a class="rd-navbar-brand" href="index.html"><img src="images/logo-default-256x50.png" alt="" width="256" height="50" srcset="images/logo-default-512x100.png 2x"/></a>
												</div>
												<div class="rd-navbar-collapse">
													<button class="rd-navbar-collapse-toggle rd-navbar-fixed-element-1" data-rd-navbar-toggle="#rd-navbar-collapse-content-1"><span></span></button>
													<div class="rd-navbar-collapse-content" id="rd-navbar-collapse-content-1">
														<div>
															<article class="unit align-items-center">
																<div class="unit-left"><span class="icon icon-md icon-modern mdi mdi-phone"></span></div>
																<div class="unit-body">
																	<ul class="list-0">
																		<li><a class="link-default" href="tel:#">1-800-1234-567</a></li>
																		<li><a class="link-default" href="tel:#">1-800-8763-765</a></li>
																	</ul>
																</div>
															</article>
														</div>
														<div>
															<article class="unit align-items-center">
																<div class="unit-left"><span class="icon icon-md icon-modern mdi mdi-map-marker"></span></div>
																<div class="unit-body"><a class="link-default" href="tel:#">2130 Fulton Street <br> San Diego, CA 94117-1080</a></div>
															</article>
														</div><a class="button button-primary-outline button-winona" href="tours.html">Find your tour</a>
													</div>
												</div>
											</div>
										</div>
										<div class="rd-navbar-main-outer">
											<div class="rd-navbar-main">
												<div class="rd-navbar-nav-wrap" id="rd-navbar-nav-wrap-1">
													<!-- RD Navbar Search-->
													<div class="rd-navbar-search" id="rd-navbar-search-1">
														<button class="rd-navbar-search-toggle" data-rd-navbar-toggle="#rd-navbar-search-1"><span></span></button>
														<form class="rd-search" action="search-results.html" data-search-live="rd-search-results-live-1" method="GET">
															<div class="form-wrap">
																<label class="form-label" for="rd-navbar-search-form-input-1">Search...</label>
																<input class="form-input rd-navbar-search-form-input" id="rd-navbar-search-form-input-1" type="text" name="s" autocomplete="off">
																<div class="rd-search-results-live" id="rd-search-results-live-1"></div>
															</div>
															<button class="rd-search-form-submit fa-search" type="submit"></button>
														</form>
													</div>
													<!-- RD Navbar Nav-->
													<ul class="rd-navbar-nav">
														<li class="rd-nav-item active"><a class="rd-nav-link" href="index.html">Home</a>
														</li>
														<li class="rd-nav-item"><a class="rd-nav-link" href="#">Features</a>
															<!-- RD Navbar Megamenu-->
															<ul class="rd-menu rd-navbar-megamenu">
																<li class="rd-megamenu-item">
																	<ul class="rd-megamenu-list">
																		<li class="rd-megamenu-list-item"><a class="rd-megamenu-list-link" href="typography.html">Typography</a></li>
																		<li class="rd-megamenu-list-item"><a class="rd-megamenu-list-link" href="buttons.html">Buttons</a></li>
																		<li class="rd-megamenu-list-item"><a class="rd-megamenu-list-link" href="forms.html">Forms</a></li>
																		<li class="rd-megamenu-list-item"><a class="rd-megamenu-list-link" href="progress-bars.html">Progress bars</a></li>
																		<li class="rd-megamenu-list-item"><a class="rd-megamenu-list-link" href="tabs.html">Tabs</a></li>
																		<li class="rd-megamenu-list-item"><a class="rd-megamenu-list-link" href="tables.html">Tables</a></li>
																		<li class="rd-megamenu-list-item"><a class="rd-megamenu-list-link" href="accordions.html">Accordions</a></li>
																	</ul>
																</li>
																<li class="rd-megamenu-item">
																	<ul class="rd-megamenu-list">
																		<li class="rd-megamenu-list-item"><a class="rd-megamenu-list-link" href="blog-layouts.html">Blog Layouts</a></li>
																		<li class="rd-megamenu-list-item"><a class="rd-megamenu-list-link" href="calls-to-action.html">Calls to Action</a></li>
																		<li class="rd-megamenu-list-item"><a class="rd-megamenu-list-link" href="footers.html">Footers</a></li>
																		<li class="rd-megamenu-list-item"><a class="rd-megamenu-list-link" href="maps-and-contacts.html">Maps &amp; Contacts</a></li>
																		<li class="rd-megamenu-list-item"><a class="rd-megamenu-list-link" href="navigation-bars.html">Navigation Bars</a></li>
																		<li class="rd-megamenu-list-item"><a class="rd-megamenu-list-link" href="screens.html">Screens</a></li>
																		<li class="rd-megamenu-list-item"><a class="rd-megamenu-list-link" href="portfolio-and-galleries.html">Portfolio &amp; Galleries</a></li>
																	</ul>
																</li>
																<li class="rd-megamenu-item">
																	<ul class="rd-megamenu-list">
																		<li class="rd-megamenu-list-item"><a class="rd-megamenu-list-link" href="small-features.html">Small Features</a></li>
																		<li class="rd-megamenu-list-item"><a class="rd-megamenu-list-link" href="team.html">Team</a></li>
																		<li class="rd-megamenu-list-item"><a class="rd-megamenu-list-link" href="testimonials.html">Testimonials</a></li>
																		<li class="rd-megamenu-list-item"><a class="rd-megamenu-list-link" href="large-features.html">Large Features</a></li>
																		<li class="rd-megamenu-list-item"><a class="rd-megamenu-list-link" href="pricing.html">Pricing</a></li>
																	</ul>
																</li>
															</ul>
														</li>
														<li class="rd-nav-item"><a class="rd-nav-link" href="tours.html">Tours</a>
														</li>
														<li class="rd-nav-item"><a class="rd-nav-link" href="#">Blog</a>
															<!-- RD Navbar Dropdown-->
															<ul class="rd-menu rd-navbar-dropdown">
																<li class="rd-dropdown-item"><a class="rd-dropdown-link" href="grid-blog.html">Grid Blog</a></li>
																<li class="rd-dropdown-item"><a class="rd-dropdown-link" href="sidebar-blog.html">Sidebar Blog</a></li>
																<li class="rd-dropdown-item"><a class="rd-dropdown-link" href="single-blog-post.html">Single Blog Post</a></li>
															</ul>
														</li>
														<li class="rd-nav-item"><a class="rd-nav-link" href="#">Destinations</a>
															<!-- RD Navbar Dropdown-->
															<ul class="rd-menu rd-navbar-dropdown">
																<li class="rd-dropdown-item"><a class="rd-dropdown-link" href="grid-layout.html">Grid Layout</a></li>
																<li class="rd-dropdown-item"><a class="rd-dropdown-link" href="masonry-layout.html">Masonry Layout</a></li>
																<li class="rd-dropdown-item"><a class="rd-dropdown-link" href="modern-layout.html">Modern Layout</a></li>
																<li class="rd-dropdown-item"><a class="rd-dropdown-link" href="single-destination.html">Single Destination</a></li>
															</ul>
														</li>
														<li class="rd-nav-item"><a class="rd-nav-link" href="#">Pages</a>
															<!-- RD Navbar Megamenu-->
															<ul class="rd-menu rd-navbar-megamenu">
																<li class="rd-megamenu-item">
																	<div class="banner" style="background-image: url(images/megamenu-banner-1-570x380.jpg);"><a class='button button-sm button-primary button-winona' href='tours.html'>Find a tour</a>
																	</div>
																</li>
																<li class="rd-megamenu-item">
																	<ul class="rd-megamenu-list">
																		<li class="rd-megamenu-list-item"><a class="rd-megamenu-list-link" href="404-page.html">404 Page</a></li>
																		<li class="rd-megamenu-list-item"><a class="rd-megamenu-list-link" href="503-page.html">503 Page</a></li>
																		<li class="rd-megamenu-list-item"><a class="rd-megamenu-list-link" href="coming-soon.html">Coming Soon</a></li>
																		<li class="rd-megamenu-list-item"><a class="rd-megamenu-list-link" href="under-construction.html">Under Construction</a></li>
																		<li class="rd-megamenu-list-item"><a class="rd-megamenu-list-link" href="about-us.html">About Us</a></li>
																		<li class="rd-megamenu-list-item"><a class="rd-megamenu-list-link" href="about-me.html">About Me</a></li>
																		<li class="rd-megamenu-list-item"><a class="rd-megamenu-list-link" href="grid-gallery.html">Grid Gallery</a></li>
																		<li class="rd-megamenu-list-item"><a class="rd-megamenu-list-link" href="masonry-gallery.html">Masonry Gallery</a></li>
																	</ul>
																</li>
																<li class="rd-megamenu-item">
																	<ul class="rd-megamenu-list">
																		<li class="rd-megamenu-list-item"><a class="rd-megamenu-list-link" href="careers.html">Careers</a></li>
																		<li class="rd-megamenu-list-item"><a class="rd-megamenu-list-link" href="search-results.html">Search results</a></li>
																		<li class="rd-megamenu-list-item"><a class="rd-megamenu-list-link" href="services.html">Services</a></li>
																		<li class="rd-megamenu-list-item"><a class="rd-megamenu-list-link" href="single-service.html">Single Service</a></li>
																		<li class="rd-megamenu-list-item"><a class="rd-megamenu-list-link" href="single-job.html">Single Job</a></li>
																		<li class="rd-megamenu-list-item"><a class="rd-megamenu-list-link" href="privacy-policy.html">Privacy policy</a></li>
																		<li class="rd-megamenu-list-item"><a class="rd-megamenu-list-link" href="modern-gallery.html">Modern Gallery</a></li>
																	</ul>
																</li>
															</ul>
														</li>
														<li class="rd-nav-item"><a class="rd-nav-link" href="contacts.html">Contacts</a>
														</li>
													</ul>
												</div>
											</div>
										</div>
									</nav>
								</div>
							</header>
							<!-- Slider Light-->
							<section class="swiper-container swiper-slider swiper-slider-light bg-gray-700" data-loop="true" data-autoplay="5000" data-simulate-touch="false" data-custom-slide-effect="inter-leave-effect" data-inter-leave-offset="-.5">
								<div class="swiper-wrapper">
									<div class="swiper-slide" data-slide-bg="images/slide-1-1920x776.jpg">
										<div class="slide-inner">
											<div class="container">
												<div class="swiper-slide-caption">
													<h1 class="wow-outer"><span class="font-weight-light wow-outer"><span class="wow" data-caption-animate="slideInDown">Unique Travel</span></span><span class="font-weight-bold wow-outer"><span class="wow" data-caption-animate="slideInDown" data-wow-delay="0">Insights & Tips</span></span></h1>
													<div class="wow-outer button-outer"><a class="button button-lg button-primary button-winona wow" href="#" data-caption-animate="slideInDown" data-wow-delay=".2s">Learn More</a></div>
												</div>
											</div>
										</div>
									</div>
									<div class="swiper-slide" data-slide-bg="images/slide-2-1920x776.jpg">
										<div class="slide-inner">
											<div class="container">
												<div class="swiper-slide-caption">
													<h1 class="wow-outer"><span class="font-weight-light wow-outer"><span class="wow" data-caption-animate="slideInDown">Enjoy Your</span></span><span class="font-weight-bold wow-outer"><span class="wow" data-caption-animate="slideInDown" data-wow-delay="0">Dream Vacation</span></span></h1>
													<div class="wow-outer button-outer"><a class="button button-lg button-primary button-winona wow" href="#" data-caption-animate="slideInDown" data-wow-delay=".2s">Learn More</a></div>
												</div>
											</div>
										</div>
									</div>
									<div class="swiper-slide" data-slide-bg="images/slide-3-1920x776.jpg">
										<div class="slide-inner">
											<div class="container">
												<div class="swiper-slide-caption">
													<h1 class="wow-outer"><span class="font-weight-light wow-outer"><span class="wow" data-caption-animate="slideInDown">Wide Variety of</span></span><span class="font-weight-bold wow-outer"><span class="wow" data-caption-animate="slideInDown" data-wow-delay="0">Amazing Tours</span></span></h1>
													<div class="wow-outer button-outer"><a class="button button-lg button-primary button-winona wow" href="#" data-caption-animate="slideInDown" data-wow-delay=".2s">Learn More</a></div>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div class="swiper-pagination-outer container">
									<div class="swiper-pagination swiper-pagination-modern swiper-pagination-marked" data-index-bullet="true"></div>
								</div>
							</section>
							<!-- Small Features-->
							<section class="section section-lg cloud-1">
								<div class="container">
									<div class="row row-30">
										<div class="col-sm-6 col-lg-4 wow-outer">
											<!-- Box Minimal-->
											<article class="box-minimal">
												<div class="box-minimal-icon linearicons-plane wow fadeIn"></div>
												<div class="box-minimal-main wow-outer">
													<h4 class="box-minimal-title wow slideInDown">Air Tickets</h4>
													<p class="wow fadeInUpSmall">At our travel agency, you can book air tickets to any world destination. We also provide online ticket booking via our website.</p>
												</div>
											</article>
										</div>
										<div class="col-sm-6 col-lg-4 wow-outer">
											<!-- Box Minimal-->
											<article class="box-minimal">
												<div class="box-minimal-icon linearicons-ship2 wow fadeIn" data-wow-delay=".1s"></div>
												<div class="box-minimal-main wow-outer">
													<h4 class="box-minimal-title wow slideInDown" data-wow-delay=".1s">Voyages & Cruises</h4>
													<p class="wow fadeInUpSmall" data-wow-delay=".1s">Besides regular tours, we also offer a variety of cruises & sea voyages for different customers looking for awesome experiences.</p>
												</div>
											</article>
										</div>
										<div class="col-sm-6 col-lg-4 wow-outer">
											<!-- Box Minimal-->
											<article class="box-minimal">
												<div class="box-minimal-icon linearicons-city wow fadeIn" data-wow-delay=".2s"></div>
												<div class="box-minimal-main wow-outer">
													<h4 class="box-minimal-title wow slideInDown" data-wow-delay=".2s">Hotel Bookings</h4>
													<p class="wow fadeInUpSmall" data-wow-delay=".2s">We offer a wide selection of hotels ranging from 5-star ones to small properties located worldwide so that you could book a hotel you like.</p>
												</div>
											</article>
										</div>
									</div>
								</div>
							</section>
							<!-- Services-->
							<section class="section-lg text-center bg-gray-100">
								<div class="container">
									<h3 class="wow-outer"><span class="wow slideInUp">Our Best Tours</span></h3>
									<p class="wow-outer"><span class="wow slideInDown text-width-1">Discovery Tour provides a variety of great tours to travelers throughout the world. We offer top deals at affordable prices and we can create the most unforgettable holiday for you!</span></p>
									<div class="row row-50 row-lg-70 offset-top-2">
										<div class="col-sm-6 col-lg-3 wow-outer">
											<!-- Tour Default-->
											<article class="tour-default wow slideInLeft"><a class="tour-default-figure" href="#"><img src="images/tour-1-270x200.jpg" alt="" width="270" height="200"/></a>
												<div class="tour-default-caption">
													<h5 class="tour-default-title"><a href="#">France, Paris</a></h5>
													<div class="heading-5 tour-default-price">$280</div>
												</div>
											</article>
										</div>
										<div class="col-sm-6 col-lg-3 wow-outer">
											<!-- Tour Default-->
											<article class="tour-default wow slideInLeft" data-wow-delay=".05s"><a class="tour-default-figure" href="#"><img src="images/tour-2-270x200.jpg" alt="" width="270" height="200"/></a>
												<div class="tour-default-caption">
													<h5 class="tour-default-title"><a href="#">USA, Boston</a></h5>
													<div class="heading-5 tour-default-price">$380</div>
												</div>
											</article>
										</div>
										<div class="col-sm-6 col-lg-3 wow-outer">
											<!-- Tour Default-->
											<article class="tour-default wow slideInLeft" data-wow-delay=".1s"><a class="tour-default-figure" href="#"><img src="images/tour-3-270x200.jpg" alt="" width="270" height="200"/></a>
												<div class="tour-default-caption">
													<h5 class="tour-default-title"><a href="#">Italy, Venice</a></h5>
													<div class="heading-5 tour-default-price">$540</div>
												</div>
											</article>
										</div>
										<div class="col-sm-6 col-lg-3 wow-outer">
											<!-- Tour Default-->
											<article class="tour-default wow slideInLeft" data-wow-delay=".15s"><a class="tour-default-figure" href="#"><img src="images/tour-4-270x200.jpg" alt="" width="270" height="200"/></a>
												<div class="tour-default-caption">
													<h5 class="tour-default-title"><a href="#">Spain, Benidorm</a></h5>
													<div class="heading-5 tour-default-price">$350</div>
												</div>
											</article>
										</div>
										<div class="col-sm-6 col-lg-3 wow-outer">
											<!-- Tour Default-->
											<article class="tour-default wow slideInLeft"><a class="tour-default-figure" href="#"><img src="images/tour-5-270x200.jpg" alt="" width="270" height="200"/></a>
												<div class="tour-default-caption">
													<h5 class="tour-default-title"><a href="#">Egypt, Cairo</a></h5>
													<div class="heading-5 tour-default-price">$290</div>
												</div>
											</article>
										</div>
										<div class="col-sm-6 col-lg-3 wow-outer">
											<!-- Tour Default-->
											<article class="tour-default wow slideInLeft" data-wow-delay=".05s"><a class="tour-default-figure" href="#"><img src="images/tour-6-270x200.jpg" alt="" width="270" height="200"/></a>
												<div class="tour-default-caption">
													<h5 class="tour-default-title"><a href="#">Swiss Alps</a></h5>
													<div class="heading-5 tour-default-price">$390</div>
												</div>
											</article>
										</div>
										<div class="col-sm-6 col-lg-3 wow-outer">
											<!-- Tour Default-->
											<article class="tour-default wow slideInLeft" data-wow-delay=".1s"><a class="tour-default-figure" href="#"><img src="images/tour-7-270x200.jpg" alt="" width="270" height="200"/></a>
												<div class="tour-default-caption">
													<h5 class="tour-default-title"><a href="#">Czech Republic</a></h5>
													<div class="heading-5 tour-default-price">$530</div>
												</div>
											</article>
										</div>
										<div class="col-sm-6 col-lg-3 wow-outer">
											<!-- Tour Default-->
											<article class="tour-default wow slideInLeft" data-wow-delay=".15s"><a class="tour-default-figure" href="#"><img src="images/tour-8-270x200.jpg" alt="" width="270" height="200"/></a>
												<div class="tour-default-caption">
													<h5 class="tour-default-title"><a href="#">Great Britain, London</a></h5>
													<div class="heading-5 tour-default-price">$340</div>
												</div>
											</article>
										</div>
									</div>
								</div>
								<div class="wow-outer button-outer-2"><a class="button button-primary-outline button-winona offset-top-2 wow slideInUp" href="tours.html">View all tours</a></div>
							</section>
							<section class="section parallax-container bg-primary-darker text-center" data-parallax-img="images/parallax-3.jpg">
								<div class="parallax-content">
									<div class="section-xs">
										<div class="container">
											<div class="row justify-content-center">
												<div class="col-sm-10 col-md-12">
													<div class="box-cta-thin">
														<h4 class="wow-outer"><span class="wow slideInRight">We Provide Only the <span class="font-weight-bold">Best Tours</span></span></h4>
														<div class="wow-outer button-outer"><a class="button button-primary button-winona wow slideInLeft" href="tours.html">Find your Tour</a></div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</section>
							<!-- Testimonials-->
							<section class="section section-lg text-center">
								<div class="container">
									<h3 class="wow-outer"><span class="wow slideInDown">Testimonials</span></h3>
									<!-- Owl Carousel-->
									<div class="owl-carousel wow fadeIn" data-items="1" data-md-items="2" data-lg-items="3" data-dots="true" data-nav="false" data-loop="true" data-margin="30" data-stage-padding="0" data-mouse-drag="false">
										<blockquote class="quote-classic">
											<div class="quote-classic-meta">
												<div class="quote-classic-avatar"><img src="images/testimonials-person-3-96x96.jpg" alt="" width="96" height="96"/>
												</div>
												<div class="quote-classic-info">
													<cite class="quote-classic-cite">Albert Webb</cite>
													<p class="quote-classic-caption">Regular Client</p>
												</div>
											</div>
											<div class="quote-classic-text">
												<p>I wanted to thank you very much for planning the trip to France for my sister and me. It was amazing and exceeded my expectations! We had a wonderful time and were very pleased.</p>
											</div>
										</blockquote>
										<blockquote class="quote-classic">
											<div class="quote-classic-meta">
												<div class="quote-classic-avatar"><img src="images/testimonials-person-1-96x96.jpg" alt="" width="96" height="96"/>
												</div>
												<div class="quote-classic-info">
													<cite class="quote-classic-cite">Kelly McMillan</cite>
													<p class="quote-classic-caption">Regular Client</p>
												</div>
											</div>
											<div class="quote-classic-text">
												<p>We had a marvelous time in our travels to Madagascar, Zimbabwe, and Botswana, we had just wonderful experiences. Your service was amazing and everyone was very attentive!</p>
											</div>
										</blockquote>
										<blockquote class="quote-classic">
											<div class="quote-classic-meta">
												<div class="quote-classic-avatar"><img src="images/testimonials-person-2-96x96.jpg" alt="" width="96" height="96"/>
												</div>
												<div class="quote-classic-info">
													<cite class="quote-classic-cite">Harold Barnett</cite>
													<p class="quote-classic-caption">Regular Client</p>
												</div>
											</div>
											<div class="quote-classic-text">
												<p>Just wanted to say many, many thanks for helping me set up an amazing Costa Rican adventure! My nephew and I had a great time! All of the accommodations were perfect, thank you!</p>
											</div>
										</blockquote>
										<blockquote class="quote-classic">
											<div class="quote-classic-meta">
												<div class="quote-classic-avatar"><img src="images/testimonials-person-5-96x96.jpg" alt="" width="96" height="96"/>
												</div>
												<div class="quote-classic-info">
													<cite class="quote-classic-cite">Bill Warner</cite>
													<p class="quote-classic-caption">Regular Client</p>
												</div>
											</div>
											<div class="quote-classic-text">
												<p>The trip you put together for us in Italy went splendidly. Each touch point, each adventure, felt like you planned it with care about our needs and expectations. Thank you!</p>
											</div>
										</blockquote>
										<blockquote class="quote-classic">
											<div class="quote-classic-meta">
												<div class="quote-classic-avatar"><img src="images/testimonials-person-4-96x96.jpg" alt="" width="96" height="96"/>
												</div>
												<div class="quote-classic-info">
													<cite class="quote-classic-cite">Theresa Barnes</cite>
													<p class="quote-classic-caption">Regular Client</p>
												</div>
											</div>
											<div class="quote-classic-text">
												<p>We had a marvelous time in our travels to Madagascar, Zimbabwe, and Botswana, we had just wonderful experiences. Your service was amazing and everyone was very attentive!</p>
											</div>
										</blockquote>
										<blockquote class="quote-classic">
											<div class="quote-classic-meta">
												<div class="quote-classic-avatar"><img src="images/testimonials-person-6-96x96.jpg" alt="" width="96" height="96"/>
												</div>
												<div class="quote-classic-info">
													<cite class="quote-classic-cite">Jason Hughes</cite>
													<p class="quote-classic-caption">Regular Client</p>
												</div>
											</div>
											<div class="quote-classic-text">
												<p>Just wanted to say many, many thanks for helping me set up an amazing Costa Rican adventure! My nephew and I had a great time! All of the accommodations were perfect, thank you!</p>
											</div>
										</blockquote>
									</div>
								</div>
							</section>
							<!-- Centered CTA-->
							<section class="section parallax-container bg-primary-darker text-center" data-parallax-img="images/parallax-4.jpg">
								<div class="parallax-content">
									<div class="section-1">
										<div class="container">
											<div class="row justify-content-center">
												<div class="col-sm-10 col-lg-7 col-xl-6">
													<h3 class="wow-outer"><span class="wow slideInDown">Buy a Tour Without <br> <span class="font-weight-bold">Leaving Your Home</span></span></h3>
													<p class="wow-outer offset-top-3"><span class="wow slideInDown" data-wow-delay=".05s">Using our website, you can easily find and book any tour you want. Mobile users will definitely enjoy our app available on all devices.</span></p>
													<div class="wow-outer button-outer"><a class="button button-primary button-winona wow slideInDown" href="#" data-wow-delay=".1s">Book now</a></div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</section>
							<!-- Latest Blog Posts-->
							<section class="section section-lg text-center">
								<div class="container">
									<h3 class="wow-outer text-center"><span class="wow slideInDown">Latest Blog Posts</span></h3>
									<div class="row row-50">
										<div class="col-md-6 wow-outer">
											<!-- Post Modern-->
											<article class="post-modern wow slideInLeft"><a class="post-modern-media" href="single-blog-post.html"><img src="images/grid-blog-1-571x353.jpg" alt="" width="571" height="353"/></a>
												<h4 class="post-modern-title"><a href="single-blog-post.html">How to Plan Your Vacation in Advance</a></h4>
												<ul class="post-modern-meta">
													<li>by Theresa Barnes</li>
													<li>
														<time datetime="2018">Apr 21, 2018 at 12:05 pm</time>
													</li>
													<li><a class="button-winona" href="#">News</a></li>
												</ul>
												<p>There are different types of travelers but all of them often ask us about proper travel planning. In this post, we decided to gather tips from our staff and famous travelers that we hope will help you...</p>
											</article>
										</div>
										<div class="col-md-6 wow-outer">
											<!-- Post Modern-->
											<article class="post-modern wow slideInLeft"><a class="post-modern-media" href="single-blog-post.html"><img src="images/grid-blog-2-571x353.jpg" alt="" width="571" height="353"/></a>
												<h4 class="post-modern-title"><a href="single-blog-post.html">Your Personal Guide to 5 Best Places</a></h4>
												<ul class="post-modern-meta">
													<li>by Theresa Barnes</li>
													<li>
														<time datetime="2018">Apr 21, 2018 at 12:05 pm</time>
													</li>
													<li><a class="button-winona" href="#">News</a></li>
												</ul>
												<p>Popular destinations change from year to year and what was trending in 2017 isn’t so interesting now. However, we have picked 5 best places worth visiting where most travelers haven’t been yet...</p>
											</article>
										</div>
									</div>
									<div class="wow-outer button-outer"><a class="button button-primary-outline button-winona wow slideInUp" href="grid-blog.html">View all Blog posts</a></div>
								</div>
							</section>
							<!-- Contacts-->
							<section class="section bg-gray-100">
								<div class="range justify-content-xl-between">
									<div class="cell-xl-6 align-self-center container">
										<div class="row">
											<div class="col-lg-9 cell-inner">
												<div class="section-lg">
													<h3 class="wow-outer"><span class="wow slideInDown">Contact Us</span></h3>
													<!-- RD Mailform-->
													<form class="rd-form rd-mailform" data-form-output="form-output-global" data-form-type="contact" method="post" action="bat/rd-mailform.php">
														<div class="row row-10">
															<div class="col-md-6 wow-outer">
																<div class="form-wrap wow fadeSlideInUp">
																	<label class="form-label-outside" for="contact-first-name">First Name</label>
																	<input class="form-input" id="contact-first-name" type="text" name="name" data-constraints="@Required">
																</div>
															</div>
															<div class="col-md-6 wow-outer">
																<div class="form-wrap wow fadeSlideInUp">
																	<label class="form-label-outside" for="contact-last-name">Last Name</label>
																	<input class="form-input" id="contact-last-name" type="text" name="name" data-constraints="@Required">
																</div>
															</div>
															<div class="col-md-6 wow-outer">
																<div class="form-wrap wow fadeSlideInUp">
																	<label class="form-label-outside" for="contact-email">E-mail</label>
																	<input class="form-input" id="contact-email" type="email" name="email" data-constraints="@Email @Required">
																</div>
															</div>
															<div class="col-md-6 wow-outer">
																<div class="form-wrap wow fadeSlideInUp">
																	<label class="form-label-outside" for="contact-phone">Phone</label>
																	<input class="form-input" id="contact-phone" type="text" name="phone" data-constraints="@PhoneNumber">
																</div>
															</div>
															<div class="col-12 wow-outer">
																<div class="form-wrap wow fadeSlideInUp">
																	<label class="form-label-outside" for="contact-message">Your Message</label>
																	<textarea class="form-input" id="contact-message" name="message" data-constraints="@Required"></textarea>
																</div>
															</div>
														</div>
														<div class="group group-middle">
															<div class="wow-outer"> 
																<button class="button button-primary button-winona wow slideInRight" type="submit">Send Message</button>
															</div>
															<p>or use</p>
															<div class="wow-outer"><a class="button button-primary-outline button-icon button-icon-left button-winona wow slideInLeft" href="#"><span class="icon text-primary mdi mdi-facebook-messenger"></span>Messenger</a></div>
														</div>
													</form>
												</div>
											</div>
										</div>
									</div>
									<div class="cell-xl-5 height-fill wow fadeIn">
										<!--Please, add the data attribute data-key="YOUR_API_KEY" in order to insert your own API key for the Google map.-->
										<!--Please note that YOUR_API_KEY should replaced with your key.-->
										<!--Example: <div class="google-map-container" data-key="YOUR_API_KEY">-->
										<div class="google-map-container" data-center="9870 St Vincent Place, Glasgow, DC 45 Fr 45." data-zoom="5" data-icon="images/gmap_marker.png" data-icon-active="images/gmap_marker_active.png" data-styles="[{&quot;featureType&quot;:&quot;water&quot;,&quot;elementType&quot;:&quot;geometry&quot;,&quot;stylers&quot;:[{&quot;color&quot;:&quot;#e9e9e9&quot;},{&quot;lightness&quot;:17}]},{&quot;featureType&quot;:&quot;landscape&quot;,&quot;elementType&quot;:&quot;geometry&quot;,&quot;stylers&quot;:[{&quot;color&quot;:&quot;#f5f5f5&quot;},{&quot;lightness&quot;:20}]},{&quot;featureType&quot;:&quot;road.highway&quot;,&quot;elementType&quot;:&quot;geometry.fill&quot;,&quot;stylers&quot;:[{&quot;color&quot;:&quot;#ffffff&quot;},{&quot;lightness&quot;:17}]},{&quot;featureType&quot;:&quot;road.highway&quot;,&quot;elementType&quot;:&quot;geometry.stroke&quot;,&quot;stylers&quot;:[{&quot;color&quot;:&quot;#ffffff&quot;},{&quot;lightness&quot;:29},{&quot;weight&quot;:0.2}]},{&quot;featureType&quot;:&quot;road.arterial&quot;,&quot;elementType&quot;:&quot;geometry&quot;,&quot;stylers&quot;:[{&quot;color&quot;:&quot;#ffffff&quot;},{&quot;lightness&quot;:18}]},{&quot;featureType&quot;:&quot;road.local&quot;,&quot;elementType&quot;:&quot;geometry&quot;,&quot;stylers&quot;:[{&quot;color&quot;:&quot;#ffffff&quot;},{&quot;lightness&quot;:16}]},{&quot;featureType&quot;:&quot;poi&quot;,&quot;elementType&quot;:&quot;geometry&quot;,&quot;stylers&quot;:[{&quot;color&quot;:&quot;#f5f5f5&quot;},{&quot;lightness&quot;:21}]},{&quot;featureType&quot;:&quot;poi.park&quot;,&quot;elementType&quot;:&quot;geometry&quot;,&quot;stylers&quot;:[{&quot;color&quot;:&quot;#dedede&quot;},{&quot;lightness&quot;:21}]},{&quot;elementType&quot;:&quot;labels.text.stroke&quot;,&quot;stylers&quot;:[{&quot;visibility&quot;:&quot;on&quot;},{&quot;color&quot;:&quot;#ffffff&quot;},{&quot;lightness&quot;:16}]},{&quot;elementType&quot;:&quot;labels.text.fill&quot;,&quot;stylers&quot;:[{&quot;saturation&quot;:36},{&quot;color&quot;:&quot;#333333&quot;},{&quot;lightness&quot;:40}]},{&quot;elementType&quot;:&quot;labels.icon&quot;,&quot;stylers&quot;:[{&quot;visibility&quot;:&quot;off&quot;}]},{&quot;featureType&quot;:&quot;transit&quot;,&quot;elementType&quot;:&quot;geometry&quot;,&quot;stylers&quot;:[{&quot;color&quot;:&quot;#f2f2f2&quot;},{&quot;lightness&quot;:19}]},{&quot;featureType&quot;:&quot;administrative&quot;,&quot;elementType&quot;:&quot;geometry.fill&quot;,&quot;stylers&quot;:[{&quot;color&quot;:&quot;#fefefe&quot;},{&quot;lightness&quot;:20}]},{&quot;featureType&quot;:&quot;administrative&quot;,&quot;elementType&quot;:&quot;geometry.stroke&quot;,&quot;stylers&quot;:[{&quot;color&quot;:&quot;#fefefe&quot;},{&quot;lightness&quot;:17},{&quot;weight&quot;:1.2}]}]">
											<div class="google-map"></div>
											<ul class="google-map-markers">
												<li data-location="9870 St Vincent Place, Glasgow, DC 45 Fr 45." data-description="9870 St Vincent Place, Glasgow"></li>
											</ul>
										</div>
									</div>
								</div>
							</section>
							<!-- Contact Info-->
							<div class="cloud-2">
								<section class="section section-sm">
									<div class="container">
										<div class="layout-bordered">
											<div class="layout-bordered-item wow-outer">
												<div class="layout-bordered-item-inner wow slideInUp">
													<div class="icon icon-lg mdi mdi-phone text-primary"></div>
													<ul class="list-0">
														<li><a class="link-default" href="tel:#">1-800-1234-678</a></li>
														<li><a class="link-default" href="tel:#">1-800-9876-098</a></li>
													</ul>
												</div>
											</div>
											<div class="layout-bordered-item wow-outer">
												<div class="layout-bordered-item-inner wow slideInUp">
													<div class="icon icon-lg mdi mdi-email text-primary"></div><a class="link-default" href="mailto:#">info@demolink.org</a>
												</div>
											</div>
											<div class="layout-bordered-item wow-outer">
												<div class="layout-bordered-item-inner wow slideInUp">
													<div class="icon icon-lg mdi mdi-map-marker text-primary"></div><a class="link-default" href="#">2130 Fulton Street San Diego, CA 94117-1080 USA</a>
												</div>
											</div>
										</div>
									</div>
								</section>
							</div>
							<!-- Page Footer-->
							<footer class="section footer-advanced bg-gray-700">
								<div class="footer-advanced-main">
									<div class="container">
										<div class="row row-50">
											<div class="col-lg-4">
												<h4>About Us</h4>
												<p class="footer-advanced-text">Our tour agency was established in 1999 with just one aim - to show travelers the true wonders of the world, away from easy tourist stereotypes. Since then, we’ve put together a range of great experiences and tours that show you interesting places less frequented by tourists, where you can get a real understanding of tourism.</p>
											</div>
											<div class="col-sm-7 col-md-5 col-lg-4">
												<h4>Recent Blog Posts</h4>
												<!-- Post Inline-->
												<article class="post-inline">
													<p class="post-inline-title"><a href="single-blog-post.html">How to Plan Your Vacation in Advance and Why It’s Beneficial</a></p>
													<ul class="post-inline-meta">
														<li>by Theresa Barnes</li>
														<li><a href="single-blog-post.html">2 days ago</a></li>
													</ul>
												</article>
												<!-- Post Inline-->
												<article class="post-inline">
													<p class="post-inline-title"><a href="single-blog-post.html">9 Easy Ways to Save on Traveling While Being on Vacation</a></p>
													<ul class="post-inline-meta"> 
														<li>by Theresa Barnes</li>
														<li><a href="single-blog-post.html">2 days ago</a></li>
													</ul>
												</article>
											</div>
											<div class="col-sm-5 col-md-7 col-lg-4">
												<h4>Gallery</h4>
												<div class="row row-x-10" data-lightgallery="group">
													<div class="col-3 col-sm-4 col-md-3"><a class="thumbnail-minimal" href="images/gallery-original-3.jpg" data-lightgallery="item"><img class="thumbnail-minimal-image" src="images/footer-gallery-1-85x85.jpg" alt=""/>
															<div class="thumbnail-minimal-caption"></div></a></div>
													<div class="col-3 col-sm-4 col-md-3"><a class="thumbnail-minimal" href="images/gallery-original-10.jpg" data-lightgallery="item"><img class="thumbnail-minimal-image" src="images/footer-gallery-2-85x85.jpg" alt=""/>
															<div class="thumbnail-minimal-caption"></div></a></div>
													<div class="col-3 col-sm-4 col-md-3"><a class="thumbnail-minimal" href="images/gallery-original-4.jpg" data-lightgallery="item"><img class="thumbnail-minimal-image" src="images/footer-gallery-3-85x85.jpg" alt=""/>
															<div class="thumbnail-minimal-caption"></div></a></div>
													<div class="col-3 col-sm-4 col-md-3"><a class="thumbnail-minimal" href="images/gallery-original-5.jpg" data-lightgallery="item"><img class="thumbnail-minimal-image" src="images/footer-gallery-4-85x85.jpg" alt=""/>
															<div class="thumbnail-minimal-caption"></div></a></div>
													<div class="col-3 col-sm-4 col-md-3"><a class="thumbnail-minimal" href="images/gallery-original-11.jpg" data-lightgallery="item"><img class="thumbnail-minimal-image" src="images/footer-gallery-5-85x85.jpg" alt=""/>
															<div class="thumbnail-minimal-caption"></div></a></div>
													<div class="col-3 col-sm-4 col-md-3"><a class="thumbnail-minimal" href="images/gallery-original-6.jpg" data-lightgallery="item"><img class="thumbnail-minimal-image" src="images/footer-gallery-6-85x85.jpg" alt=""/>
															<div class="thumbnail-minimal-caption"> </div></a></div>
													<div class="col-3 col-sm-4 col-md-3"><a class="thumbnail-minimal" href="images/gallery-original-8.jpg" data-lightgallery="item"><img class="thumbnail-minimal-image" src="images/footer-gallery-7-85x85.jpg" alt=""/>
															<div class="thumbnail-minimal-caption"></div></a></div>
													<div class="col-3 col-sm-4 col-md-3"><a class="thumbnail-minimal" href="images/gallery-original-12.jpg" data-lightgallery="item"><img class="thumbnail-minimal-image" src="images/footer-gallery-8-85x85.jpg" alt=""/>
															<div class="thumbnail-minimal-caption"></div></a></div>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div class="footer-advanced-aside">
									<div class="container">
										<div class="footer-advanced-layout">
											<div>
												<ul class="list-nav"> 
													<li><a href="index.html">Home</a></li>
													<li><a href="about-us.html">About</a></li>
													<li><a href="services.html">Services</a></li>
													<li><a href="grid-gallery.html">Gallery</a></li>
													<li><a href="grid-blog.html">Blog</a></li>
													<li><a href="contacts.html">Contacts</a></li>
												</ul>
											</div>
											<div>
												<ul class="list-inline list-inline-md">
													<li><a class="icon icon-sm link-default mdi mdi-facebook" href="#"></a></li>
													<li><a class="icon icon-sm link-default mdi mdi-twitter" href="#"></a></li>
													<li><a class="icon icon-sm link-default mdi mdi-instagram" href="#"></a></li>
													<li><a class="icon icon-sm link-default mdi mdi-google" href="#"></a></li>
													<li><a class="icon icon-sm link-default mdi mdi-linkedin" href="#"></a></li>
												</ul>
											</div>
										</div>
									</div>
								</div>
								<div class="container">
									<hr/>
								</div>
								<div class="footer-advanced-aside">
									<div class="container">
										<div class="footer-advanced-layout"><a class="brand" href="index.html"><img src="images/logo-inverse-256x50.png" alt="" width="256" height="50" srcset="images/logo-inverse-512x100.png 2x"/></a>
											<!-- Rights-->
											<p class="rights"><span>&copy;&nbsp;</span><span class="copyright-year"></span><span>&nbsp;</span><span>All Rights Reserved.</span><span>&nbsp;</span><br class="d-sm-none"/><a href="#">Terms of Use</a><span> and</span><span>&nbsp;</span><a href="privacy-policy.html">Privacy Policy</a>.<span>Design&nbsp;by&nbsp;<a href="https://zemez.io/">Zemez</a></span></p>
										</div>
									</div>
								</div>
							</footer>
						</div>
						<div class="preloader"> 
							<div class="preloader-logo"><img src="images/logo-default-256x50.png" alt="" width="256" height="50" srcset="images/logo-default-512x100.png 2x"/>
							</div>
							<div class="preloader-body">
								<div id="loadingProgressG">
									<div class="loadingProgressG" id="loadingProgressG_1"></div>
								</div>
							</div>
						</div>
						<!-- Global Mailform Output-->
						<div class="snackbars" id="form-output-global"></div>
						<!-- Javascript-->
						<script src="styles/js/core.min.js"></script>
						<script src="styles/js/script.js"></script>
					</body>
				</html>
				`;
		}

		modelHelper.getStaticNavigation().then((result) => {
			console.log('KEYSTONE STATIC MENU RESTORED');
			console.dir(result);
			// Send the html boilerplate
			res.send(renderFullPage(result));
		});
	});
};
