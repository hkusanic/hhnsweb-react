import React, { Component } from 'react';
import { Icon } from 'antd';
import { Link } from 'react-router-dom';
import renderHTML from 'react-render-html';
import reactCookie from 'react-cookies';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { connect } from 'react-redux';
import { getKirtanByUuid } from '../../../actions/kirtanAction';

export class KirtanDetails extends Component {
	constructor (props) {
		super(props);
		this.state = {
			kirtanDetails: null,
		};
	}

	componentDidMount () {
		const body = {
			uuid: this.props.match.params.uuid,
		};

		this.props.getKirtanByUuid(body);

		if (this.props.kirtanDetails) {
			this.setState({ kirtanDetails: this.props.kirtanDetails });
		}
	}

	static getDerivedStateFromProps (nextProps, prevState) {
		if (nextProps.kirtanDetails !== prevState.kirtanDetails) {
			return { kirtanDetails: nextProps.kirtanDetails };
		} else return null;
	}

	render () {
		const { kirtanDetails } = this.state;

		if (!kirtanDetails) {
			return <div>Error Occured..........</div>;
		}

		if (!localStorage.getItem('user')) {
			return (
				<div style={{ textAlign: 'center' }}>
					<p className="bookingForm">Please Log in to continue</p>
				</div>
			);
		}

		return (
			<div>
				<section
					className="bg-gray-100"
					style={{
						backgroundImage:
							'url(https://ik.imagekit.io/gcwjdmqwwznjl/blog_header_BJ1M6bS8E.png)',
					}}
				>
					<div class="breadcrumbs-custom-inner headingImage">
						<div class="container breadcrumbs-custom-container">
							<ul class="breadcrumbs-custom-path">
								<li>
									<Link to="" onClick={() => this.props.history.push('/')}>
										<Breadcrumb.Item>Home</Breadcrumb.Item>
									</Link>
								</li>
								<li>
									<Link to=" " onClick={() => this.props.history.goBack()}>
										<Breadcrumb.Item>Kirtan</Breadcrumb.Item>
									</Link>
								</li>
								<li>
									<a className="textColor">
										{renderHTML(
											reactCookie.load('languageCode') === 'en'
												? kirtanDetails.en.title
												: kirtanDetails.ru.title
										)}
									</a>
								</li>
							</ul>
						</div>
					</div>
				</section>
				<section className="section section-lg">
					<div className="container">
						<div style={{ paddingLeft: '15%' }} className="row row-100">
							<div className="col-lg-12">
								<article className="post-creative">
									<h3 className="post-creative-title">
										{renderHTML(
											reactCookie.load('languageCode') === 'en'
												? kirtanDetails.en.title
												: kirtanDetails.ru.title
										)}
									</h3>
									<ul className="post-creative-meta">
										<li>
											<span className="icon mdi mdi-calendar-clock" />
											<time dateTime="2018">
												{new Date(kirtanDetails.created_date).toDateString()}
											</time>
										</li>
										<li>
											<span className="icon mdi mdi-tag-multiple" />
											<a>Kirtan</a>
										</li>
									</ul>
								</article>
								<div className="audioStyle">
									<audio style={{ height: '30px' }} controls>
										<source
											src={renderHTML(kirtanDetails.audio_link)}
											type="audio/mpeg"
										/>
									</audio>
								</div>
								<div>
									<table className="maintable">
										<tbody>
											<tr>
												<td>
													<b>
														<span>Event</span> :
													</b>
												</td>
												<td className="padLeftRow">
													{reactCookie.load('languageCode') === 'en'
														? kirtanDetails.en.event
														: kirtanDetails.ru.event}
												</td>
											</tr>
											{kirtanDetails.author ? (
												<tr>
													<td>
														<b>
															<span>Author</span> :
														</b>
													</td>
													<td className="padLeftRow">{kirtanDetails.author}</td>
												</tr>
											) : null}
											<tr>
												<td>
													<b>
														<span>Durations</span> :
													</b>
												</td>
												<td className="padLeftRow">{kirtanDetails.duration}</td>
											</tr>
											<tr>
												<td>
													<b>
														<span>Location</span> :
													</b>
												</td>
												<td className="padLeftRow">
													{reactCookie.load('languageCode') === 'en'
														? kirtanDetails.en.location
														: kirtanDetails.ru.location}
												</td>
											</tr>
											<tr>
												<td>
													<b>
														<span>Downloads</span> :
													</b>
												</td>
												<td className="padLeftRow">
													{kirtanDetails.downloads}
												</td>
											</tr>
											{reactCookie.load('languageCode') === 'en'
												? kirtanDetails.en.topic
												: kirtanDetails.ru.topic
													? (
														<tr>
															<td>
																<b>
																	<span>Topic</span> :
																</b>
															</td>
															<td className="padLeftRow">
																{reactCookie.load('languageCode') === 'en'
																	? kirtanDetails.en.topic
																	: kirtanDetails.ru.topic}
															</td>
														</tr>
													) : null }
										</tbody>
									</table>
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
		kirtanDetails: state.kirtanReducer.kirtan,
	};
};
const mapDispatchToProps = dispatch => {
	return {
		getKirtanByUuid: body => {
			dispatch(getKirtanByUuid(body));
		},
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(KirtanDetails);
