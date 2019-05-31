import React from 'react';
import { Link } from 'react-router-dom';

export class QuoteOfDay extends React.Component {
	constructor (props) {
		super(props);
	}

	render () {
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
											<path d="M27.461,10.206h7.5v15h-15v-15L25,0.127h7.5L27.461,10.206z M7.539,10.206h7.5v15h-15v-15L4.961,0.127h7.5                L7.539,10.206z" />
										</svg>
										<div class="quote-modern-text">
											<p className="quotesFont">
												We should want to establish and maintain our eternal
												relationship with the Lord. Unfortunately, we have
												forgotten that relationship. At the time of initiation,
												the spiritual master helps us awaken our remembrance by
												giving us the holy name—the means to remember Him—and
												instructing us to chant the holy name with great faith.
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
												<cite class="quote-modern-cite">Nirajanana Swami</cite>
												<p class="quote-modern-caption">
													Lecture on Bhagavad-gita 12.13-14, Bombay, May 12,
													1974
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
												God must be equal to everyone. He is neither envious to
												anyone nor friendly to anyone. This is general. But
												there is special significance. Ye tu bhajanti mam
												bhaktya: "Persons who are engaged in devotional service
												with love and faith," tesu te mayi [BG 9.29], "I have
												got a special intimate relation with him."
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
												<cite class="quote-modern-cite">Swami Prabhupada</cite>
												<p class="quote-modern-caption">
													Lectures from a disciple, Vol 1, p. 159, Kiev,
													11.15.2001
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

export default QuoteOfDay;
