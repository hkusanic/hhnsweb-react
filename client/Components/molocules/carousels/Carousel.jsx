import React, { Component } from "react";
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
import RussianDubbedLectures from "../../../containers/Lectures/LecturesInRussian";
import "./index.css";
import { connect } from "react-redux";
import { quoteOfDay } from "../../../actions/quoteActions";

export class Carousel2 extends Component {
	constructor(props) {
		super(props);
		var date = new Date().getSeconds();
		if (date % 2 === 0) {
			this.state = {
				quotes: [],
				evenodd: "even"
			};
		} else {
			this.state = {
				quotes: [],
				evenodd: "odd"
			};
		}
	}

	componentDidMount() {
		script();
		let authorList = ["Niranjana Swami", "Srila Prabhupada"];
		this.props.quoteOfDay(authorList);
		this.setState({
			quotes: this.props.quote.quotes
		});
	}

	render() {
		if (!this.props.quote) {
			<div> Loading... </div>;
		}
		return (
			<div>
				<section className="swiper-container swiper-slider swiper-slider-light bg-gray-700 carouselMargin">
					<div className="swiper-wrapper">
						{this.props.quote.quotes.length > 0 ? (
							<SingleCarousel
								// image="https://ik.imagekit.io/gcwjdmqwwznjl/4-c-7-a-9333_wnQXEX0yy.jpg"
								image="../images/swami-background.jpg"
								heading="Quote of the Day"
								text={this.props.quote.quotes[0].en.body}
								author={this.props.quote.quotes[0].author}
								status={this.state.evenodd}
							/>
						) : null}
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
					{/* <Blog {...this.props}/> */}
					<br />
					<br />

					<div class="container">
						<div className="row row-50 row-xxl-70">
							<div className="wow-outer col-md-6 col-lg-6 col-sm-12 page1">
								<ContentDetails />
							</div>
							<div className="wow-outer col-md-6 col-lg-6 col-sm-12 page1">
								<RussianDubbedLectures />
							</div>
						</div>
					</div>
					<QuoteOfDay />
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
