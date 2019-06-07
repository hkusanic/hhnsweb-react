import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { quoteOfDay } from '../../../actions/quoteActions'
import renderHTML from 'react-render-html';
import reactCookie from 'react-cookies';


export class QuoteOfDay extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			quotes: []
		}
	}
	componentDidMount() {
		let authorList = ["Nirajanana Swami", "Srila Prabhupada"]
		this.props.quoteOfDay(authorList)
		this.setState({
			quotes: this.props.quoteOfDay.quotes
		})
	}

	render() {
		return (
			<div>
				<section class="section section-lg text-center">
					<div class="container">
						<h3>Quotes of The day</h3>
						<div
							class="owl-carousel"
							data-items="1"
							data-md-items="2"
							data-dots="true"
							data-nav="false"
							data-loop="true"
							data-margin="30"
							data-stage-padding="0"
							data-mouse-drag="false"
						>
							<div class="wow-outer websiteFontFamily">
								<Link
									to={{
										pathname: `/quotes/Niranjana Swami`,
										state: 'Niranjana Swami',
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
											<p className="quotesFont">
												{renderHTML(
													reactCookie.load('languageCode') === 'en' ?
														this.props && this.props.quote && this.props.quote.quotes && this.props.quote.quotes[0] && this.props.quote.quotes[0].en && this.props.quote.quotes[0].en.body ? this.props.quote.quotes[0].en.body : "<p>...</p>"
														:
														this.props && this.props.quote && this.props.quote.quotes && this.props.quote.quotes[0] && this.props.quote.quotes[0].ru && this.props.quote.quotes[0].ru.body ? this.props.quote.quotes[0].ru.body : "<p>...</p>"

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
												<cite class="quote-modern-cite">{this.props && this.props.quote && this.props.quote.quotes[0] && titleCase(this.props.quote.quotes[0].author)}</cite>
												<p class="quote-modern-caption">
													{reactCookie.load('languageCode') === 'en' ?
														this.props && this.props.quote && this.props.quote.quotes && this.props.quote.quotes[0] && this.props.quote.quotes[0].en && this.props.quote.quotes[0].en.title ? `${this.props.quote.quotes[0].en.title} Published On ${new Date(this.props && this.props.quote && this.props.quote.quotes[0] && this.props.quote.quotes[0].date).toLocaleString("en-IN")}` : "<p>...</p>"
														:
														this.props && this.props.quote && this.props.quote.quotes && this.props.quote.quotes[0] && this.props.quote.quotes[0].ru && this.props.quote.quotes[0].ru.title ? `${this.props.quote.quotes[0].ru.title} Published On ${new Date(this.props && this.props.quote && this.props.quote.quotes[0] && this.props.quote.quotes[0].date).toLocaleString("en-IN")}` : "<p>...</p>"
													}
												</p>
											</div>
										</div>
									</blockquote>
								</Link>
								<Link
									className="button-winona post-modern-title readMoreFont"
									to={{
										pathname: `/quotes/Niranjana Swami`,
										state: 'Niranjana Swami',
									}}
								>
									Read More...
								</Link>
							</div>
							<div class="wow-outer websiteFontFamily">
								<Link
									to={{
										pathname: '/quotes/Srila Prabhupada',
										state: 'Srila Prabhupada',
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
											<p className="quotesFont">
												{renderHTML(
													reactCookie.load('languageCode') === 'en' ?
														this.props && this.props.quote && this.props.quote.quotes && this.props.quote.quotes[1] && this.props.quote.quotes[1].en && this.props.quote.quotes[1].en.body ? this.props.quote.quotes[1].en.body : "<p>...</p>"
														:
														this.props && this.props.quote && this.props.quote.quotes && this.props.quote.quotes[1] && this.props.quote.quotes[1].ru && this.props.quote.quotes[1].ru.body ? this.props.quote.quotes[1].ru.body : "<p>...</p>"

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
												<cite class="quote-modern-cite">{this.props && this.props.quote && this.props.quote.quotes[1] && titleCase(this.props.quote.quotes[1].author)}</cite>
												<p class="quote-modern-caption">
													{reactCookie.load('languageCode') === 'en' ?
														this.props && this.props.quote && this.props.quote.quotes && this.props.quote.quotes[1] && this.props.quote.quotes[1].en && this.props.quote.quotes[1].en.title ? `${this.props.quote.quotes[1].en.title} Published On ${new Date(this.props && this.props.quote && this.props.quote.quotes[1] && this.props.quote.quotes[1].date).toLocaleString("en-IN")}` : "<p>...</p>"
														:
														this.props && this.props.quote && this.props.quote.quotes && this.props.quote.quotes[1] && this.props.quote.quotes[1].ru && this.props.quote.quotes[1].ru.title ? `${this.props.quote.quotes[1].ru.title} Published On ${new Date(this.props && this.props.quote && this.props.quote.quotes[1] && this.props.quote.quotes[1].date).toLocaleString("en-IN")}` : "<p>...</p>"
													}
												</p>
											</div>
										</div>
									</blockquote>

								</Link>
								<Link
									className="button-winona post-modern-title readMoreFont"
									to={{
										pathname: '/quotes/Srila Prabhupada',
										state: 'Srila Prabhupada',
									}}
								>
									Read More...
								</Link>
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
		quoteOfDay: (authorList) => {
			dispatch(quoteOfDay(authorList));
		}
	};
};


export default connect(
	mapStateToProps,
	mapDispatchToProps
)(QuoteOfDay);


const titleCase = (str) => {
	str = str.toLowerCase().split(' ');
	for (var i = 0; i < str.length; i++) {
		str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
	}
	return str.join(' ');
}