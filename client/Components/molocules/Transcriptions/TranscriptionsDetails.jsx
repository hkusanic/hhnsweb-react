import React from 'react';
import { Icon, Collapse } from 'antd';
import renderHTML from 'react-render-html';
import reactCookie from 'react-cookies';
import { connect } from 'react-redux';
import { updateCounters, getLectureByUuid } from '../../../actions/lectureActions';
// eslint-disable-next-line no-unused-vars
import Comments from '../Comments/Comments';

import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { Link } from 'react-router-dom';
const Panel = Collapse.Panel;
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
	handleUpdate = uuid => {
		const body = {
			uuid: uuid,
			downloads: true,
		};
		this.props.updateCounters(body);
	};

	static getDerivedStateFromProps(nextProps, prevState) {
		if (nextProps.lectureDetails !== prevState.lectureDetails) {
			return { lectureDetails: nextProps.lectureDetails };
		} else return null;
	}

	render () {
		const { lectureDetails } = this.state;
		const mobileBrkPnt = 767;
		const maxWidth = window.screen.width;
		if (!lectureDetails) {
			return <div>Error Occured..........</div>;
		}

		if (!localStorage.getItem('user')) {
			return (
				<div className="loginText">
					<p className="bookingForm">Please log in to continue</p>
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
										<Breadcrumb.Item>Transcriptions</Breadcrumb.Item>
									</Link>
								</li>
								<li>
									<a className="textColor">
										{renderHTML(
											reactCookie.load('languageCode') === 'en'
												? lectureDetails.en.title
												: lectureDetails.ru.title
										)}
									</a>
								</li>
							</ul>
						</div>
					</div>
				</section>
				<section className="section section-lg">
					<div className="container">
						<div className="row row-50">
							<div className="col-lg-12">
								<article className="post-creative">
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
									<div className="row">
										<div className="col mx-3 textContent">
											{renderHTML(
												reactCookie.load('languageCode') === 'en'
													? lectureDetails.en.transcription.text
													: lectureDetails.en.transcription.text
											)}
										</div>
									</div>
								</article>
								<Collapse bordered={false} style={{ marginTop: '10px' }}>
									<Panel header="Audio Details" key="1" style={{ borderTop: '1px solid #e8e8e8', borderBottom: 'none' }}>
										<div style={{ paddingTop: '20px' }}>
											<table className="maintable">
												<tbody>
													<tr className="">
														<td>
															<b>
																<span>Audio</span> {maxWidth > mobileBrkPnt ? ':' : null}
															</b>
														</td>
														<td className="padLeftRow downloadDiv">
															<audio style={{ height: '30px' }} controls controlsList="nodownload">
																<source
																	src={renderHTML(
																		lectureDetails.audio_link
																	)}
																	type="audio/mpeg"
																/>
															</audio>
															<a
																className="downloadIcon"
																href={lectureDetails.audio_link}
																onClick={() => {
																	this.handleUpdate(lectureDetails.uuid);
																}}
																download="download"
															>
																<Icon type="download" style={{ fontSize: '1.5rem' }} />
															</a>
														</td>
													</tr>
													<tr>
														<td>
															<b>
																<span>Attachment</span> :
															</b>
														</td>
														<td className="padLeftRow text-truncate">
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
													{lectureDetails.duration ? <tr>
														<td>
															<b>
																<span>Durations</span> :
													</b>
														</td>
														<td className="padLeftRow">
															{lectureDetails.duration}
														</td>
													</tr> : null}
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
									</Panel>
								</Collapse>

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
