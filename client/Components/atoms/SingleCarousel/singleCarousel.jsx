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
					<div className="slide-inner" />
					<div className="insideCarousel_sm">
						<img src="images/person3.png" className="singleCarousel_image_sm" />

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
					</div>
				</div>
			);
		}
	}
}

export default SingleCarousel;
