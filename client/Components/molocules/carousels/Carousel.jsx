import React, { Component } from "react";
// import { Carousel, Icon } from 'antd';
import script from "../../../assets/script";
import renderHTML from "react-render-html";
import reactCookie from "react-cookies";
import SingleCarousel from "../../atoms/SingleCarousel/singleCarousel";
import Biography from "../Biography/Biography";
import Announcement from "../../organisms/Announcement/Announcement";
import GridLayoutMenus from "../../organisms/GridLayoutMenu/GridLayoutMenus";
import QuoteOfDay from "../../molocules/SingleQuote/QuotesOfDay";
import ContentDetails from "../../../containers/contents/ContentDetails";
import Blog from "../../organisms/BlogHome/bloghome";
import "./index.css";
import { connect } from "react-redux";
import { quoteOfDay } from "../../../actions/quoteActions";

export class Carousel2 extends Component {
	constructor(props) {
		super(props);
		this.state = {
			quotes: []
		};
	}
	componentDidMount() {
		script();
		let authorList = ["Niranjana Swami", "Srila Prabhupada"];
		this.props.quoteOfDay(authorList);
		this.setState({
			quotes: this.props.quoteOfDay.quotes
		});
	}

	render() {
		console.log("quotes=========>", this.props.quote.quotes);
		return (
			<div>
				{/* <Carousel autoplay={true} arrows={true} autoplaySpeed={3000}>
					<div>
						<img
							src='https://ik.imagekit.io/gcwjdmqwwznjl/Home_Page-carousel_picture_portrait_no_logo_rJorBWrIN.jpg'
							alt='image1'
						/>
					</div>
					<div>
						<img
							src='https://ik.imagekit.io/gcwjdmqwwznjl/Home_Page-carousel_picture-abhishek_no_logo_rk3rB-HLV.jpg'
							alt='image2'
						/>
					</div>
					<div>
						<img
							src='https://ik.imagekit.io/gcwjdmqwwznjl/Home_Page-carousel_picture_kirtan_no_logo_HJiHHWrLN.jpg'
							alt='image3'
						/>
					</div>
				</Carousel> */}
				<section
					className="swiper-container swiper-slider swiper-slider-light bg-gray-700 carouselMargin"
					// data-loop="true"
					// data-autoplay="5000"
					// data-simulate-touch="false"
					// data-custom-slide-effect="inter-leave-effect"
					// data-inter-leave-offset="-.5"
				>
					{/* className="swiper-wrapper" */}
					<div className="swiper-wrapper">
						<SingleCarousel
							image="https://ik.imagekit.io/gcwjdmqwwznjl/4-c-7-a-9333_wnQXEX0yy.jpg"
							heading="Quote of the Day"
							text="The desire for fame and recognition is an anarthа."
							author="Niranjana Swami"
						/>
						{/* <SingleCarousel
							image="https://ik.imagekit.io/gcwjdmqwwznjl/Home_Page-carousel_picture-abhishek_no_logo_rk3rB-HLV.jpg"
							heading="Quote of the Day"
							text="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
						/>
						<SingleCarousel
							image="https://ik.imagekit.io/gcwjdmqwwznjl/Home_Page-carousel_picture_kirtan_no_logo_HJiHHWrLN.jpg"
							heading="Quote of the Day"
							text="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
						/> */}
					</div>
					{/* <div className="swiper-pagination-outer container alignment">
						<div
							className="swiper-pagination swiper-pagination-modern swiper-pagination-marked"
							data-index-bullet="true"
						/>
					</div> */}
				</section>
				<Biography {...this.props} />
				{/* <QuoteOfDay /> */}
				<br />
				<br />
				<div>
					<img
						src="images/circle.png"
						style={{
							width: "5.124450951683748vw",
							height: "10.46337817638266vh",
							opacity: "0.4",
							backgroundRepeat: "no-repeat",
							position: "absolute",
							zIndex: "0",
							marginLeft: "914px",
							marginTop: "-39px"
						}}
					/>
					<img
						src="images/circle.png"
						style={{
							width: "63px",
							height: "63px",
							opacity: "0.4",
							backgroundRepeat: "no-repeat",
							position: "absolute",
							zIndex: "0",
							marginLeft: "28%",
							marginTop: "8%"
						}}
					/>
					<img
						src="images/circle.png"
						style={{
							width: "1182px",
							height: "1182px",
							opacity: "0.4",
							backgroundRepeat: "no-repeat",
							position: "absolute",
							zIndex: "0",
							marginTop: "5%",
							marginLeft: "40%"
						}}
					/>
					<GridLayoutMenus />
					<img
						src="images/circle.png"
						style={{
							width: "75px",
							height: "75px",
							opacity: "0.4",
							backgroundRepeat: "no-repeat",
							position: "absolute",
							zIndex: "0",
							marginLeft: "28%"
						}}
					/>
					<Blog />
				</div>
				<br />
				<Announcement />
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		quote: state.quoteReducer
	};
};

const mapDispatchToProps = dispatch => {
	return {
		quoteOfDay: authorList => {
			dispatch(quoteOfDay(authorList));
		}
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Carousel2);
