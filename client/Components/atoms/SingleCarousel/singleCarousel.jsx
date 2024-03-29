import React, { Component } from 'react';
import { throttle } from 'lodash';

class SingleCarousel extends Component {
	constructor(props) {
		super(props);
		this.resize = throttle(this.resize.bind(this), 100);
		this.state = {};
	}

	resize = () => this.forceUpdate();

	componentDidMount() {
		window.addEventListener('resize', this.resize);
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.resize);
	}
	render() {
		const maxWidth = window.screen.width;
		if (maxWidth <= 592) {
			if (this.props.status === 'even') {
				return (
					<div className="swiper-slide caraousel_sm_even">
						<div className="slide-inner" />
						<div className="insideCarousel_sm_even">
							<img
								src="images/person3.png"
								className="singleCarousel_image_sm"
							/>

							<div style={{ paddingTop: '9px' }}>
								<p className="singleCarousel_p1_sm_even">
									ISKCON Founder - Acarya
								</p>

								<p className="singleCarousel_p2_sm_even">
									A.C Bhaktivedanta Swami Prabhupada
								</p>
							</div>
						</div>
					</div>
				);
			} else {
				return (
					<div className="swiper-slide caraousel_sm_odd">
						<div className="slide-inner" />
						<div className="insideCarousel_sm_odd">
							<img
								src="images/person3.png"
								className="singleCarousel_image_sm"
							/>

							<div style={{ paddingTop: '9px' }}>
								<p className="singleCarousel_p1_sm_odd">
									ISKCON Founder - Acarya
								</p>

								<p className="singleCarousel_p2_sm_odd">
									A.C Bhaktivedanta Swami Prabhupada
								</p>
							</div>
						</div>
					</div>
				);
			}
		} else {
			if (this.props.status === 'even') {
				return (
					<div className="swiper-slide caraousel_even">
						<div className="slide-inner">
							<div className="insideCarousel_even">
								<img
									src="images/person3.png"
									className="singleCarousel_image"
								/>

								<div style={{ paddingTop: '9px' }}>
									<p className="singleCarousel_p1_lg_even">
										ISKCON Founder - Acarya
									</p>

									<p className="singleCarousel_p2_lg_even">
										A.C Bhaktivedanta Swami Prabhupada
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

								<div style={{ paddingTop: '9px' }}>
									<p className="singleCarousel_p1_lg_odd">
										ISKCON Founder - Acarya
									</p>

									<p className="singleCarousel_p2_lg_odd">
										A.C Bhaktivedanta Swami Prabhupada
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
