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
			if (this.props.status === "even") {
				return (
					<div
						className="swiper-slide caraousel_sm_even"
						// data-slide-bg={this.props.image}
					>
						<div className="slide-inner" />
						<div className="insideCarousel_sm_even">
							<img
								src="images/person3.png"
								className="singleCarousel_image_sm"
							/>

							<div style={{ paddingTop: "9px" }}>
								<p className="singleCarousel_p1_sm">ISKCON Founder - Acarya </p>

								<p className="singleCarousel_p2_sm">
									A.C Bhakthivedanta Swami Prabhupada
								</p>
							</div>
						</div>
					</div>
				);
			} else {
				return (
					<div
						className="swiper-slide caraousel_sm_odd"
						// data-slide-bg={this.props.image}
					>
						<div className="slide-inner" />
						<div className="insideCarousel_sm_odd">
							<img
								src="images/person3.png"
								className="singleCarousel_image_sm"
							/>

							<div style={{ paddingTop: "9px" }}>
								<p className="singleCarousel_p1_sm">ISKCON Founder - Acarya </p>

								<p className="singleCarousel_p2_sm">
									A.C Bhakthivedanta Swami Prabhupada
								</p>
							</div>
						</div>
					</div>
				);
			}
		} else {
			if (this.props.status === "even") {
				return (
					<div className="swiper-slide caraousel_even">
						<div className="slide-inner">
							<div className="insideCarousel_even">
								<img
									src="images/person3.png"
									className="singleCarousel_image"
								/>

								<div style={{ paddingTop: "9px" }}>
									<p className="singleCarousel_p1_lg_even">
										ISKCON Founder - Acarya{" "}
									</p>

									<p className="singleCarousel_p2_lg_even">
										A.C Bhakthivedanta Swami Prabhupada
									</p>
								</div>
							</div>
						</div>
					</div>
				);
			} else {
				return (
					<div className="swiper-slide caraousel_odd">
						<div className="slide-inner">
							<div className="insideCarousel_odd">
								<img
									src="images/person3.png"
									className="singleCarousel_image"
								/>

								<div style={{ paddingTop: "9px" }}>
									<p className="singleCarousel_p1_lg_odd">
										ISKCON Founder - Acarya{" "}
									</p>

									<p className="singleCarousel_p2_lg_odd">
										A.C Bhakthivedanta Swami Prabhupada
									</p>
								</div>
							</div>
						</div>
					</div>
				);
			}
		}
	}
}

export default SingleCarousel;
