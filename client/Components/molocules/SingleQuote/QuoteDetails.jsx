/* eslint-disable no-unused-vars */
import React from 'react';
import renderHTML from 'react-render-html';
import reactCookie from 'react-cookies';
import Comments from '../Comments/Comments';
import { connect } from 'react-redux';
import { getQuoteByUuid } from '../../../actions/quoteActions';


export class QuoteDetails extends React.Component {
	constructor (props) {
		super(props);
	}

	componentDidMount () {
		const body = {
			uuid: this.props.match.params.uuid,
		};
		this.props.getQuoteByUuid(body);

	}

	render () {

		const { quoteDetails } = this.props;


		if (!this.props.quoteDetails) {
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
												? quoteDetails.en.title
												: quoteDetails.ru.title
													? quoteDetails.ru.title
													: quoteDetails.en.title
										)}
									</h3>
									<ul className="post-creative-meta">
										<li>
											<span className="icon mdi mdi-calendar-clock" />
											<time dateTime="2018">
												{quoteDetails
													&& new Date(quoteDetails.quote_date).toDateString()}
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
												<td className="padLeftRow">
													{renderHTML(
														reactCookie.load('languageCode') === 'en'
															? quoteDetails.en.body
															: quoteDetails.ru.body
																? quoteDetails.ru.body
																: quoteDetails.en.body
													)}
												</td>
											</tr>
										</tbody>
									</table>
									<div>
										<p className="bookingForm">Comments</p>
									</div>
									<Comments lecture_uuid={quoteDetails.uuid} />
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

const mapStateToProps = state => {
	return {
		quoteDetails: state.quoteReducer.quote,
	};
};
const mapDispatchToProps = dispatch => {
	return {
		getQuoteByUuid: body => {
			dispatch(getQuoteByUuid(body));
		},
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(QuoteDetails);
