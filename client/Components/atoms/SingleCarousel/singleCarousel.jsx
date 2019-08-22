import React, { Component } from "react";
import { throttle } from "lodash";
import renderHTML from "react-render-html";

class SingleCarousel extends Component {
	constructor(props) {
		super(props);
		this.resize = throttle(this.resize.bind(this), 100);
		this.state = {};
	}

	resize = () => this.forceUpdate();

	componentDidMount() {
		window.addEventListener("resize", this.resize);
	}

	componentWillUnmount() {
		window.removeEventListener("resize", this.resize);
	}
	render() {
		const maxWidth = window.screen.width;
		if (maxWidth <= 425) {
			return (
				<div
					className="swiper-slide caraousel_sm"
					data-slide-bg={this.props.image}
				>
					<div className="slide-inner">
						<div className="container textCarousel">
							<div
								className="container "
								style={{ marginLeft: "70px", marginTop: "40px" }}
								data-caption-animate="slideInDown"
							>
								<div>
									<div className="row">
										<div
											className="singleCarousel_heading_sm"
											data-caption-animate="slideInDown"
										>
											{this.props.heading}
											<br />{" "}
										</div>
									</div>
								</div>
							</div>

							<div>
								<span
									className="quote"
									data-caption-animate="slideInDown"
									data-wow-delay="0"
								>
									<h4
										className="singleCarousel_text_sm"
										style={{
											color: "black"
										}}
									>
										{" "}
										{renderHTML(this.props.text)}{" "}
									</h4>
									<p
										style={{
											marginLeft: "11px",
											fontSize: "2.4641288433382138vw"
										}}
									>
										-{this.props.author}
									</p>
								</span>
							</div>
						</div>
					</div>
				</div>
			);
		} else {
			return (
				<div
					className="swiper-slide caraousel"
					data-slide-bg={this.props.image}
				>
					<div className="slide-inner">
						<div className="insideCarousel">
							<img src="images/person3.png" className="singleCarousel_image" />

							<div style={{ paddingTop: "9px" }}>
								<p className="singleCarousel_p1_lg">ISKCON Founder - Acarya </p>

								<p className="singleCarousel_p2_lg">
									A.C Bhakthivedanta Swami Prabhupada
								</p>
							</div>
						</div>

						<div
							className="container "
							style={{ marginLeft: "70px", marginTop: "40px" }}
							data-caption-animate="slideInDown"
						>
							<div className="swiper-slide-caption">
								<div className="row">
									<img
										src="images/quote.jpg"
										className="singleCarousel_quotes"
									/>
									<div
										className="singleCarousel_heading_lg"
										data-caption-animate="slideInDown"
									>
										{this.props.heading}
										<br />{" "}
									</div>
								</div>
								<div>
									<span
										className="quote"
										data-caption-animate="slideInDown"
										data-wow-delay="0"
									>
										<h4
											className="singleCarousel_text_lg"
											style={{
												color: "black"
											}}
										>
											{" "}
											{renderHTML(this.props.text)}{" "}
										</h4>
										<p style={{ marginLeft: "35px", fontSize: "20px" }}>
											-{this.props.author}
										</p>
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			);
		}
	}
}

export default SingleCarousel;
