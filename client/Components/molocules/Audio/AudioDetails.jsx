import React, { Component } from 'react';
import renderHTML from 'react-render-html';
import reactCookie from 'react-cookies';
import { connect } from 'react-redux';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { Link, withRouter } from 'react-router-dom';
import { Icon } from 'antd';
import Comments from '../Comments/Comments';
import {
	updateCounters,
	getLectureByUuid,
	resetState,
} from '../../../actions/lectureActions';

export class AudioDetails extends Component {
	constructor(props) {
		super(props);
		const { resetState } = this.props;
		resetState();
	}

	componentDidMount() {
		const body = {
			uuid: this.props.match.params.uuid,
			audio_page_view: true,
		};
		this.props.updateCounters(body);
		this.props.getLectureByUuid(body);
	}

	updateAudioCount = () => {
		const body = {
			uuid: this.props.match.params.uuid,
			audio_play_count: true,
		};
		this.props.updateCounters(body);
	};

	handleUpdate = uuid => {
		const body = {
			uuid: uuid,
			downloads: true,
		};
		this.props.updateCounters(body);
	};

	render() {
		const { lectureDetails } = this.props;
		const mobileBrkPnt = 767;
		const maxWidth = window.screen.width;
		if (!lectureDetails) {
			return (
				<div style={{ textAlign: 'center' }}>
					<p className="bookingForm">Hare Krishna...</p>
				</div>
			);
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
										<Breadcrumb.Item>Audio</Breadcrumb.Item>
									</Link>
								</li>
								<li>
									<a className="textColor">
										{renderHTML(
											reactCookie.load('languageCode') === 'en'
												? lectureDetails.en.title
												: lectureDetails.ru.title
												? lectureDetails.ru.title
												: lectureDetails.en.title
										)}
									</a>
								</li>
							</ul>
						</div>
					</div>
				</section>
				<section className="section section-lg">
					<div className="container padTop">
						<div className="row row-100">
							<div className="col-lg-12">
								<article className="post-creative">
									<h3 className="post-creative-title">
										{renderHTML(
											reactCookie.load('languageCode') === 'en'
												? lectureDetails.en.title
												: lectureDetails.ru.title
												? lectureDetails.ru.title
												: lectureDetails.en.title
										)}
									</h3>
									<ul className="post-creative-meta">
										<li>
											<span className="icon mdi mdi-calendar-clock" />
											<time dateTime="2018">
												{new Date(lectureDetails.created_date_time).toDateString()}
											</time>
										</li>
										<li>
											<span className="icon mdi mdi-tag-multiple" />
											<a>Audio Details</a>
										</li>
									</ul>
								</article>
								<div className="audioStyle">
									<audio
										style={{ height: '30px' }}
										className="audioPlayer"
										controls
										controlsList="nodownload"
										onPlay={() => {
											this.updateAudioCount();
										}}
									>
										<source
											src={renderHTML(lectureDetails.audio_link)}
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
										{maxWidth <= mobileBrkPnt ? ' Download' : null}
									</a>
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
														? lectureDetails.en.event
														: lectureDetails.ru.event
														? lectureDetails.ru.event
														: lectureDetails.en.event}
												</td>
											</tr>
											{lectureDetails.part ? (
												<tr>
													<td>
														<b>
															<span>Part</span> :
														</b>
													</td>
													<td className="padLeftRow">{lectureDetails.part}</td>
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
													<td className="padLeftRow">{lectureDetails.verse}</td>
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
											{lectureDetails.duration ? (
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
											) : null}
											<tr>
												<td>
													<b>
														<span>Location</span> :
													</b>
												</td>
												<td className="padLeftRow">
													{reactCookie.load('languageCode') === 'en'
														? lectureDetails.en.location
														: lectureDetails.ru.event
														? lectureDetails.ru.event
														: lectureDetails.en.event}
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
														: lectureDetails.ru.topic
														? lectureDetails.ru.topic
														: lectureDetails.en.topic}
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
		resetState: () => {
			dispatch(resetState());
		},
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withRouter(AudioDetails));
