/* eslint-disable no-unused-vars */
import React from 'react';
import renderHTML from 'react-render-html';
import reactCookie from 'react-cookies';
import Comments from '../Comments/Comments';

export class QuoteDetails extends React.Component {
	constructor (props) {
		super(props);
	}

	render () {
		if (!this.props.location.state) {
			return <div>Error Occured..........</div>;
		}
		return (
			<div>
				<section className="section section-lg">
					<div className="container">
						<div className="row row-50">
							<div className="col-lg-8">
								<article className="post-creative">
									<h3 className="post-creative-title">
										{renderHTML(
											reactCookie.load('languageCode') === 'en'
												? this.props.location.state.en.title
												: this.props.location.state.ru.title
										)}
									</h3>
									<ul className="post-creative-meta">
										<li>
											<span className="icon mdi mdi-calendar-clock" />
											<time dateTime="2018">
												{new Date(
													this.props.location.state.date
												).toDateString()}
											</time>
										</li>
										<li>
											<span className="icon mdi mdi-tag-multiple" />
											<a>Quote</a>
										</li>
									</ul>
								</article>
								<div>
									<table className="maintable">
										<tbody>
											<tr>
												<td>
													<b>
														<span>Body</span> :
													</b>
												</td>
												<td className="padLeftRow">
													{reactCookie.load('languageCode') === 'en'
														? this.props.location.state.en.body
														: this.props.location.state.ru.body}
												</td>
											</tr>
										</tbody>
									</table>
									<div>
										<p className="bookingForm">Comments</p>
									</div>
									<Comments lecture_uuid={this.props.location.state.uuid} />
								</div>
							</div>
							<div className="col-lg-4" />
						</div>
					</div>
				</section>
			</div>
		);
	}
}

export default QuoteDetails;
