import React from 'react';
import { Icon } from 'antd';
import renderHTML from 'react-render-html';
import reactCookie from 'react-cookies';
import { connect } from 'react-redux';
import { updateCounters, getLectureByUuid } from '../../../actions/lectureActions';
// eslint-disable-next-line no-unused-vars
import Comments from '../Comments/Comments';

import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { Link } from 'react-router-dom';

export class TranscriptionDetails extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			text: '',
			lectureDetails: null,
		};
	}

	componentDidMount () {
		let body = {
			uuid: this.props.match.params.uuid,
		};
		if (reactCookie.load('languageCode') === 'en') {
			body.en_transcription_view = true;
		} else {
			body.ru_transcription_view = true;
		}
		this.props.updateCounters(body);
		this.props.getLectureByUuid(body);
		if (this.props.lectureDetails) {
			this.setState({ lectureDetails: this.props.lectureDetails });
		}
	}

	static getDerivedStateFromProps (nextProps, prevState) {
		if (nextProps.lectureDetails !== prevState.lectureDetails) {
			return { lectureDetails: nextProps.lectureDetails };
		} else return null;
	}

	render () {
		const { lectureDetails } = this.state;

		if (!lectureDetails) {
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
				<section className="section section-lg">
					<div className="container padLeftBlog">
						<div className="row row-50">
							<div className="col-lg-12">
								<article className="post-creative">
									<Breadcrumb>
										<Link to=" " onClick={() => this.props.history.push('/')}>
											<Breadcrumb.Item>Home</Breadcrumb.Item>
										</Link>
										<Icon
											type="double-right"
											style={{
												alignSelf: 'center',
												paddingLeft: 5,
												paddingRight: 5,
											}}
										/>
										<Link to=" " onClick={() => this.props.history.goBack()}>
											<Breadcrumb.Item>Transcriptions</Breadcrumb.Item>
										</Link>
										<Icon
											type="double-right"
											style={{
												alignSelf: 'center',
												paddingLeft: 5,
												paddingRight: 5,
											}}
										/>
										<Breadcrumb.Item active>
											{renderHTML(
												reactCookie.load('languageCode') === 'en'
													? lectureDetails.en.title
													: lectureDetails.ru.title
											)}
										</Breadcrumb.Item>
									</Breadcrumb>

									<h3 className="post-creative-title dataTitle">
										{renderHTML(
											reactCookie.load('languageCode') === 'en'
												? lectureDetails.en.title
												: lectureDetails.ru.title
										)}
									</h3>
									<ul className="post-creative-meta dataUL">
										<li>
											<span className="icon mdi mdi-calendar-clock" />
											<time dateTime="2018">
												{new Date(
													lectureDetails.created_date
												).toDateString()}
											</time>
										</li>
										<li>
											<span className="icon mdi mdi-tag-multiple" />
											<a>Transcription</a>
										</li>
									</ul>
									<div>
										{renderHTML(
											reactCookie.load('languageCode') === 'en'
												? lectureDetails.en.transcription.text
												: lectureDetails.en.transcription.text
										)}
									</div>
								</article>
								<div>
									<table className="datatable">
										<tbody>
											<tr>
												<td>
													<b>
														<span>Audio</span> :
													</b>
												</td>
												<td className="padLeftRow">
													<audio style={{ height: '30px' }} controls>
														<source
															src={renderHTML(
																lectureDetails.audio_link
															)}
															type="audio/mpeg"
														/>
													</audio>
												</td>
											</tr>
											<tr>
												<td>
													<b>
														<span>Attachment</span> :
													</b>
												</td>
												<td className="padLeftRow">
													<a
														href={
															lectureDetails.en.transcription
																.attachment_link
														}
														target="_blank"
													>
														<span>
															{
																lectureDetails.en.transcription
																	.attachment_name
															}
														</span>
													</a>
												</td>
											</tr>
											<tr>
												<td>
													<b>
														<span>Event</span> :
													</b>
												</td>
												<td className="padLeftRow">
													{reactCookie.load('languageCode') === 'en'
														? lectureDetails.en.event
														: lectureDetails.ru.event}
												</td>
											</tr>
											{lectureDetails.part ? (
												<tr>
													<td>
														<b>
															<span>Part</span> :
														</b>
													</td>
													<td className="padLeftRow">
														{lectureDetails.part}
													</td>
												</tr>
											) : null}
											{lectureDetails.chapter ? (
												<tr>
													<td>
														<b>
															<span>Chapter</span> :
														</b>
													</td>
													<td className="padLeftRow">
														{lectureDetails.chapter}
													</td>
												</tr>
											) : null}
											{lectureDetails.verse ? (
												<tr>
													<td>
														<b>
															<span>Verse</span> :
														</b>
													</td>
													<td className="padLeftRow">
														{lectureDetails.verse}
													</td>
												</tr>
											) : null}
											{lectureDetails.author ? (
												<tr>
													<td>
														<b>
															<span>Author</span> :
														</b>
													</td>
													<td className="padLeftRow">
														{lectureDetails.author}
													</td>
												</tr>
											) : null}
											<tr>
												<td>
													<b>
														<span>Durations</span> :
													</b>
												</td>
												<td className="padLeftRow">
													{lectureDetails.duration}
												</td>
											</tr>
											<tr>
												<td>
													<b>
														<span>Location</span> :
													</b>
												</td>
												<td className="padLeftRow">
													{reactCookie.load('languageCode') === 'en'
														? lectureDetails.en.location
														: lectureDetails.en.location}
												</td>
											</tr>
											<tr>
												<td>
													<b>
														<span>Downloads</span> :
													</b>
												</td>
												<td className="padLeftRow">
													{lectureDetails.counters.downloads}
												</td>
											</tr>
											<tr>
												<td>
													<b>
														<span>Topic</span> :
													</b>
												</td>
												<td className="padLeftRow">
													{reactCookie.load('languageCode') === 'en'
														? lectureDetails.en.topic
														: lectureDetails.ru.topic}
												</td>
											</tr>
										</tbody>
									</table>
								</div>
								<div>
									<p className="bookingForm">Comments</p>
								</div>
								<Comments lecture_uuid={lectureDetails.uuid} />
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
		Count: state.lectureReducer.Count,
		lectureDetails: state.lectureReducer.lecture,
	};
};
const mapDispatchToProps = dispatch => {
	return {
		updateCounters: body => {
			dispatch(updateCounters(body));
		},
		getLectureByUuid: body => {
			dispatch(getLectureByUuid(body));
		},
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(TranscriptionDetails);
