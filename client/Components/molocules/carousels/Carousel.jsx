import React, { Component } from "react";
import script from "../../../assets/script";
import SingleCarousel from "../../atoms/SingleCarousel/singleCarousel";
import Biography from "../Biography/Biography";
import Announcement from "../../organisms/Announcement/Announcement";
import GridLayoutMenus from "../../organisms/GridLayoutMenu/GridLayoutMenus";
import QuoteOfDay from "../../molocules/SingleQuote/QuotesOfDay";
import ContentDetails from "../../../containers/contents/ContentDetails";
import Blog from "../../organisms/BlogHome/bloghome";
import "./index.css";

export class Carousel2 extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	componentDidMount() {
		script();
	}

	render() {
		return (
			<div>
				<section className="swiper-container swiper-slider swiper-slider-light bg-gray-700 carouselMargin">
					<div className="swiper-wrapper">
						<SingleCarousel
							image="https://ik.imagekit.io/gcwjdmqwwznjl/4-c-7-a-9333_wnQXEX0yy.jpg"
							heading="Quote of the Day"
							text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusm tempor incididunt ut"
							author="Niranjana Swami"
						/>
					</div>
				</section>
				<Biography {...this.props} />

				<br />
				<br />
				<div>
					<img className="img1" src="images/circle.png" />
					<img className="img2" src="images/circle.png" />
					<img className="img3" src="images/circle.png" />
					<GridLayoutMenus />
					<img className="img4" src="images/circle.png" />
					<Blog {...this.props} />
				</div>
				<br />
				<Announcement />
			</div>
		);
	}
}

export default Carousel2;
