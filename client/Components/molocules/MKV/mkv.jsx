import React, { Component } from "react";
export class MKV extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showTabs: false,
			array: [2002, 2003, 2004, 2005, 2011, 2012, 2013, 2014]
		};
	}
	handleShowTabs = () => {
		this.setState({ showTabs: true });
	};
	render() {
		return (
			<div>
				<section className="bg-gray-100">
					<img src="https://ik.imagekit.io/gcwjdmqwwznjl/Booking_v2_HkCb1eBDV.png" />
				</section>
				<div style={{ textAlign: "center" }}>
					<p className="bookingForm">MKV</p>
				</div>
				<section className="text-center">
					<div className="container yearList">
						<div className="row offset-top-2">
							{this.state.array.map((item, key) => {
								return (
									<div
										key={key}
										className="col-sm-6 wow-outer OuterDiv"
										onClick={() => {
											this.handleShowTabs();
										}}
									>
										<article className="articleDiv wow slideInLeft">
											<div className="tour-default-caption">
												<p className="titleColor">{item}</p>
											</div>
										</article>
									</div>
								);
							})}
						</div>
						
					</div>
				</section>
				{this.state.showTabs ? (
					<section className="section section-lg">
						<div className="container tabPadLeft">
							<div className="row">
								<div className="col-sm-12 col-md-12 col-lg-12 col-xl-12">
									<div
										className="tabs-custom tabs-horizontal tabs-line"
										id="tabs-1"
									>
										<ul className="nav nav-tabs tabLeft">
											<li className="nav-item" role="presentation">
												<a
													className="nav-link active"
													href="#tabs-1-1"
													data-toggle="tab"
												>
													English
												</a>
											</li>
											<li className="nav-item" role="presentation">
												<a
													className="nav-link"
													href="#tabs-1-2"
													data-toggle="tab"
												>
													Russain
												</a>
											</li>
										</ul>
										<div className="tab-content">
											<div className="tab-pane fade show active" id="tabs-1-1">
												<div className="row row-50 row-lg-70 offset-top-2">
													<div className="col-sm-6 col-lg-3 wow-outer">
														<article className="thumbnail-light wow slideInLeft">
															<a
																className="thumbnail-light-media"
																href="https://nrs-site.s3.amazonaws.com/mkv/2002/Eng/2002_01_Guru Katha.pdf"
																target="_blank"
															>
																<img
																	className="thumbnail-light-image tabImg"
																	src="https://nrs-site.s3.amazonaws.com/mkv/2002/Eng/2002_01_Guru Katha_Cover.jpg"
																	alt=""
																	width="270"
																	height="300"
																/>
															</a>
															<h5 className="thumbnail-light-title">
																<a href="single-service.html">Mountain Tours</a>
															</h5>
														</article>
													</div>
													<div className="col-sm-6 col-lg-3 wow-outer">
														<article className="thumbnail-light wow slideInLeft">
															<a
																className="thumbnail-light-media"
																href="https://nrs-site.s3.amazonaws.com/mkv/2002/Eng/2002_01_Guru Katha.pdf"
																target="_blank"
															>
																<img
																	className="thumbnail-light-image tabImg"
																	src="https://nrs-site.s3.amazonaws.com/mkv/2002/Eng/2002_01_Guru Katha_Cover.jpg"
																	alt=""
																	width="270"
																	height="300"
																/>
															</a>
															<h5 className="thumbnail-light-title">
																<a href="single-service.html">Mountain Tours</a>
															</h5>
														</article>
													</div>
												</div>
											</div>
											<div className="tab-pane fade" id="tabs-1-2">
												<div className="row row-50 row-lg-70 offset-top-2">
													<div className="col-sm-6 col-lg-3 wow-outer">
														<article className="thumbnail-light wow slideInLeft">
															<a
																className="thumbnail-light-media"
																href="https://nrs-site.s3.amazonaws.com/mkv/2002/Eng/2002_01_Guru Katha.pdf"
																target="_blank"
															>
																<img
																	className="thumbnail-light-image tabImg"
																	src="https://nrs-site.s3.amazonaws.com/mkv/2003/Eng/2003_01_MKV_Cover.jpg"
																	alt=""
																	width="270"
																	height="300"
																/>
															</a>
															<h5 className="thumbnail-light-title">
																<a href="single-service.html">Mountain Tours</a>
															</h5>
														</article>
													</div>
													<div className="col-sm-6 col-lg-3 wow-outer">
														<article className="thumbnail-light wow slideInLeft">
															<a
																className="thumbnail-light-media tabImg"
																href="https://nrs-site.s3.amazonaws.com/mkv/2002/Eng/2002_01_Guru Katha.pdf"
																target="_blank"
															>
																<img
																	className="thumbnail-light-image tabImg"
																	src="https://nrs-site.s3.amazonaws.com/mkv/2002/Eng/2002_01_Guru Katha_Cover.jpg"
																	alt=""
																	width="270"
																	height="300"
																/>
															</a>
															<h5 className="thumbnail-light-title">
																<a href="single-service.html">Mountain Tours</a>
															</h5>
														</article>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</section>
				) : null}
			</div>
		);
	}
}

export default MKV;
