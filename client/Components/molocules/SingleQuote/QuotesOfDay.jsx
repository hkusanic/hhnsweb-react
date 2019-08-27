/* eslint-disable no-mixed-spaces-and-tabs */
import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { quoteOfDay } from "../../../actions/quoteActions";
import renderHTML from "react-render-html";
import reactCookie from "react-cookies";
import script from "../../../assets/script.js";
import { Card } from "antd";
import { Translate } from "react-localize-redux";
import ContentDetails from "../../../containers/contents/ContentDetails";
import RussianDubbedLectures from "../../../containers/Lectures/LecturesInRussian";

export class QuoteOfDay extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			quotes: []
		};
	}
	showing100Characters = sentence => {
		var result = sentence;
		var resultArray = result.split(" ");
		if (resultArray.length > 67) {
			resultArray = resultArray.slice(0, 67);
			result = resultArray.join(" ") + "...";
		}
		return result;
	};
	componentDidMount() {
		script();
		let authorList = ["Niranjana Swami", "Srila Prabhupada"];
		this.props.quoteOfDay(authorList);
		this.setState({
			quotes: this.props.quoteOfDay.quotes
		});
	}

	render() {
		if (!this.props.quote) {
			<div>Loading...</div>;
		}
		return (
			<div>
				<section class="section section-lg text-center">
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
					<div class="container">
						<br />
						<br />
						<h3>Quotes of the day</h3>
						<br />
						<br />
						<div className="row row-50 row-xxl-70">
							<div
								className="wow-outer col-md-6 col-lg-6 col-sm-12 page1"
								style={{ padding: "2vw" }}
							>
								{/* <Card hoverable> */}
								<div>
									<Link
										to={{
											pathname: `/quotes/Niranjana Swami`,
											state: "Niranjana Swami"
										}}
									>
										<blockquote class="quote-modern quote-modern-big wow fadeInUpSmall">
											<svg
												class="quote-modern-mark"
												x="0px"
												y="0px"
												width="35px"
												height="25px"
												viewbox="0 0 35 25"
											>
												<path d="M27.461,10.206h7.5v15h-15v-15L25,0.127h7.5L27.461,10.206z M7.539,10.206h7.5v15h-15v-15L4.961,0.127h7.5L7.539,10.206z" />
											</svg>
											<div class="quote-modern-text">
												<p className="singleblog_description">
													{renderHTML(
														this.showing100Characters(
															reactCookie.load("languageCode") === "en"
																? this.props &&
																  this.props.quote &&
																  this.props.quote.quotes &&
																  this.props.quote.quotes[0] &&
																  this.props.quote.quotes[0].en &&
																  this.props.quote.quotes[0].en.body
																	? this.props.quote.quotes[0].en.body
																	: "Sorry, No data available"
																: this.props &&
																  this.props.quote &&
																  this.props.quote.quotes &&
																  this.props.quote.quotes[0] &&
																  this.props.quote.quotes[0].ru &&
																  this.props.quote.quotes[0].ru.body
																? this.props.quote.quotes[0].ru.body
																: "Sorry, No data available"
														)
													)}
												</p>
											</div>
											<div class="quote-modern-meta">
												<div class="quote-modern-avatar">
													<img
														src="https://ik.imagekit.io/gcwjdmqwwznjl/NRSBio_HkSdTWBLE.png"
														alt=""
														width="96"
														height="96"
													/>
												</div>
												<div class="quote-modern-info">
													<cite className="singleblog_title">
														{this.props &&
															this.props.quote &&
															this.props.quote.quotes &&
															this.props.quote.quotes[0] &&
															titleCase(this.props.quote.quotes[0].author)}
													</cite>
													<p className="singleblog_author">
														{renderHTML(
															reactCookie.load("languageCode") === "en"
																? this.props &&
																  this.props.quote &&
																  this.props.quote.quotes &&
																  this.props.quote.quotes[0] &&
																  this.props.quote.quotes[0].en &&
																  this.props.quote.quotes[0].en.source_of_quote
																	? this.props.quote.quotes[0].en
																			.source_of_quote
																	: "Sorry, No data available"
																: this.props &&
																  this.props.quote &&
																  this.props.quote.quotes &&
																  this.props.quote.quotes[0] &&
																  this.props.quote.quotes[0].ru &&
																  this.props.quote.quotes[0].ru.source_of_quote
																? this.props.quote.quotes[0].ru.source_of_quote
																: "Sorry, No data available"
														)}
													</p>
												</div>
											</div>
										</blockquote>
									</Link>
									<Link
										style={{ fontFamily: "Charter" }}
										className="button-winona post-modern-title readMoreFont"
										to={{
											pathname: `/quotes/Niranjana Swami`,
											state: "Niranjana Swami"
										}}
									>
										<Translate>
											{({ translate }) => translate("FOOTER.readmore")}
										</Translate>
									</Link>
									{/* </Card> */}
								</div>
							</div>

							<div
								className="wow-outer col-md-6 col-lg-6 col-sm-12 page1"
								style={{ padding: "2vw" }}
							>
								{/* <Card hoverable> */}
								<div>
									<Link
										to={{
											pathname: "/quotes/Srila Prabhupada",
											state: "Srila Prabhupada"
										}}
									>
										<blockquote class="quote-modern quote-modern-big wow fadeInUpSmall">
											<svg
												class="quote-modern-mark"
												x="0px"
												y="0px"
												width="35px"
												height="25px"
												viewbox="0 0 35 25"
											>
												<path d="M27.461,10.206h7.5v15h-15v-15L25,0.127h7.5L27.461,10.206z M7.539,10.206h7.5v15h-15v-15L4.961,0.127h7.5                L7.539,10.206z" />
											</svg>
											<div class="quote-modern-text">
												<p className="singleblog_description">
													{renderHTML(
														this.showing100Characters(
															reactCookie.load("languageCode") === "en"
																? this.props &&
																  this.props.quote &&
																  this.props.quote.quotes &&
																  this.props.quote.quotes[1] &&
																  this.props.quote.quotes[1].en &&
																  this.props.quote.quotes[1].en.body &&
																  this.props.quote.quotes[1].en.body
																	? this.props.quote.quotes[1].en.body
																	: "Sorry ,No data available"
																: this.props &&
																  this.props.quote &&
																  this.props.quote.quotes &&
																  this.props.quote.quotes[1] &&
																  this.props.quote.quotes[1].ru &&
																  this.props.quote.quotes[1].ru.body &&
																  this.props.quote.quotes[1].ru.body
																? this.props.quote.quotes[1].ru.body
																: "Sorry, No data available"
														)
													)}
												</p>
											</div>
											<div class="quote-modern-meta">
												<div class="quote-modern-avatar">
													<img
														src="https://ik.imagekit.io/gcwjdmqwwznjl/Prabhupada-Bio_BkS_T-HUE.png"
														alt=""
														width="96"
														height="96"
													/>
												</div>
												<div class="quote-modern-info">
													<cite class="singleblog_title">
														{this.props &&
															this.props.quote &&
															this.props.quote.quotes &&
															this.props.quote.quotes[1] &&
															titleCase(this.props.quote.quotes[1].author)}
													</cite>
													<p class="singleblog_author">
														{reactCookie.load("languageCode") === "en"
															? this.props &&
															  this.props.quote &&
															  this.props.quote.quotes &&
															  this.props.quote.quotes[1] &&
															  this.props.quote.quotes[1].en &&
															  this.props.quote.quotes[1].en.source_of_quote
																? this.props.quote.quotes[1].en.source_of_quote
																: "Sorry, No data available"
															: this.props &&
															  this.props.quote &&
															  this.props.quote.quotes &&
															  this.props.quote.quotes[1] &&
															  this.props.quote.quotes[1].ru &&
															  this.props.quote.quotes[1].ru.source_of_quote
															? this.props.quote.quotes[1].ru.source_of_quote
															: "Sorry, No data available"}
													</p>
												</div>
											</div>
										</blockquote>
									</Link>
									<Link
										style={{ fontFamily: "Charter" }}
										className="button-winona post-modern-title readMoreFont"
										to={{
											pathname: "/quotes/Srila Prabhupada",
											state: "Srila Prabhupada"
										}}
									>
										<Translate>
											{({ translate }) => translate("FOOTER.readmore")}
										</Translate>
									</Link>
									{/* </Card> */}
								</div>
							</div>
						</div>
					</div>
				</section>
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
)(QuoteOfDay);

const titleCase = str => {
	str = str.toLowerCase().split(" ");
	for (var i = 0; i < str.length; i++) {
		str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
	}
	return str.join(" ");
};
