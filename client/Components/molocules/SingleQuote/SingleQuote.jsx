import React, { Component } from 'react';
import renderHTML from 'react-render-html';
import { Link } from 'react-router-dom';
import reactCookie from 'react-cookies';

export class SingleQuote extends Component {
	constructor (props) {
		super(props);
		this.state = {};
	}

	render () {
		return (
			<div className="col-md-6 scaleFadeInWrap">
				<div class="wow-outer">
					<blockquote class="quote-modern quote-modern-big wow slideInLeft">
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
				        <p class="quote-modern-caption">{new Date(this.props.quote.published_date).toDateString()}</p>
							<p>
								{renderHTML(reactCookie.load('languageCode') === 'en'
									? this.props.quote.en.body
									: this.props.quote.ru.body)}
							</p>
						</div>
						<div class="quote-modern-meta">
							{/* <div class="quote-modern-avatar">
								<img
									src="https://ik.imagekit.io/gcwjdmqwwznjl/NRSBio_HkSdTWBLE.png"
									alt=""
									width="96"
									height="96"
								/>
							</div> */}
							<div class="quote-modern-info">
								{/* <cite class="quote-modern-cite">{this.props.quote.en.author}</cite> */}
								{/* <p class="quote-modern-caption">Regular Client</p> */}
							</div>
						</div>
					</blockquote>
				</div>
				{/* <div className="wow scaleFadeIn" data-wow-delay=".1s">
					<article className="post-modern">
						<h4 className="post-modern-title">
							<Link to={{ pathname: '/quoteDetails', state: this.props.quote }}>
								{renderHTML(this.props.quote.en.title)}
							</Link>
						</h4>
						<ul className="post-modern-meta">
							<li>
								{reactCookie.load('languageCode') === 'en'
									? this.props.quote.en.body
									: this.props.quote.ru.body}
							</li>
							<li>
								{this.props.quote.date
									? new Date(this.props.quote.date).toDateString()
									: ''}
							</li>
						</ul>
					</article>
				</div> */}
			</div>
		);
	}
}
export default SingleQuote;
