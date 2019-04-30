import React, { Component } from 'react';
// import Antd from 'antd';
import { Carousel, Icon } from 'antd';
import { Link } from 'react-router-dom';
import script from '../../../assets/script';
import SingleCarousel from '../../atoms/SingleCarousel/singleCarousel';
import Biography from '../Biography/Biography';
import Announcement from '../../organisms/Announcement/Announcement';
import GridLayoutMenus from '../../organisms/GridLayoutMenu/GridLayoutMenus';
import './index.css';
export class Carousel2 extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	componentDidMount() {
		script();
	}

	render() {
		// console.log('history from Carousel: ', this.props.history);

		return (
			<div>
				<Carousel autoplay={true} arrows={true} autoplaySpeed={2000}>
					<div>
						<img
							src="https://ik.imagekit.io/gcwjdmqwwznjl/Home_Page-carousel_picture_portrait_no_logo_rJorBWrIN.jpg"
							alt="image1"
						/>
					</div>
					<div>
						<img
							src="https://ik.imagekit.io/gcwjdmqwwznjl/Home_Page-carousel_picture-abhishek_no_logo_rk3rB-HLV.jpg"
							alt="image2"
						/>
					</div>
					<div>
						<img
							src="https://ik.imagekit.io/gcwjdmqwwznjl/Home_Page-carousel_picture_kirtan_no_logo_HJiHHWrLN.jpg"
							alt="image3"
						/>
					</div>
				</Carousel>
				{/* <section
					className="swiper-container swiper-slider swiper-slider-light bg-gray-700"
					data-loop="true"
					data-autoplay="5000"
					data-simulate-touch="false"
					data-custom-slide-effect="inter-leave-effect"
					data-inter-leave-offset="-.5">
					<div className="swiper-wrapper">
						<SingleCarousel
							image="https://ik.imagekit.io/gcwjdmqwwznjl/Home_Page-carousel_picture_portrait_no_logo_rJorBWrIN.jpg"
							heading=""
							text=""
						/>
						<SingleCarousel
							image="https://ik.imagekit.io/gcwjdmqwwznjl/Home_Page-carousel_picture-abhishek_no_logo_rk3rB-HLV.jpg"
							heading=""
							text=""
						/>
						<SingleCarousel
							image="https://ik.imagekit.io/gcwjdmqwwznjl/Home_Page-carousel_picture_kirtan_no_logo_HJiHHWrLN.jpg"
							heading=""
							text=""
						/>
					</div>
					<div className="swiper-pagination-outer container alignment">
						<div
							className="swiper-pagination swiper-pagination-modern swiper-pagination-marked"
							data-index-bullet="true"
						/>
					</div>
        </section> */}

				<Biography {...this.props} />
				<GridLayoutMenus />
				<Announcement />
			</div>
		);
	}
}

export default Carousel2;
