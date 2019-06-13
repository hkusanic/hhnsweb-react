import React from 'react';
import renderHTML from 'react-render-html';
import reactCookie from 'react-cookies';
import moment from 'moment';

export class SingleQuote extends React.Component {
	constructor (props) {
		super(props);
		this.state = {};
	}

	render () {
		return (
			<div className="col-md-6 scaleFadeInWrap websiteFontFamily quotePad">
				<div class="wow-outer">
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
							<div class="quote-modern-info">
								<cite class="quote-modern-cite">
									{moment(this.props.quote.date, 'YYYYMMDDTHHmmssZ').format(
										'MMM Do'
									)}
								</cite>
							</div>
							<p className="quotesFont">
								{renderHTML(
									reactCookie.load('languageCode') === 'en'
										? this.props.quote.en.body
										: this.props.quote.ru.body
								)}
							</p>
						</div>
						<div class="quote-modern-meta">
							<div class="quote-modern-info">
								<cite style={{ fontSize: 16 }} class="quote-modern-text">
									{this.props.quote.en.source_of_quote}
								</cite>
							</div>
						</div>
					</blockquote>
				</div>
			</div>
		);
	}
}
export default SingleQuote;
