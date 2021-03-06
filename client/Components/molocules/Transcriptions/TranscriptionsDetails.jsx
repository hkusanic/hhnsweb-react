import React from "react";
import { Icon, Collapse } from "antd";
import renderHTML from "react-render-html";
import reactCookie from "react-cookies";
import { connect } from "react-redux";
import {
	updateCounters,
	getLectureByUuid,
	resetState
} from "../../../actions/lectureActions";
import Comments from "../Comments/Comments";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { Link } from "react-router-dom";
const Panel = Collapse.Panel;
const customPanelStyle = {
	fontSize: "25px",
	color: "#eb7217",
	borderTop: "1px solid #e8e8e8",
	borderBottom: "1px solid #e8e8e8"
};
export class TranscriptionDetails extends React.Component {
	constructor(props) {
		super(props);
		const { resetState } = this.props;
		resetState();
	}

	componentDidMount() {
		let body = {
			uuid: this.props.match.params.uuid
		};
		if (reactCookie.load("languageCode") === "en") {
			body.en_transcription_view = true;
		} else {
			body.ru_transcription_view = true;
		}
		this.props.updateCounters(body);
		this.props.getLectureByUuid(body);
	}
	handleUpdate = uuid => {
		const body = {
			uuid: uuid,
			downloads: true
		};
		this.props.updateCounters(body);
	};

	handleUpdate = uuid => {
		const body = {
			uuid: uuid,
			downloads: true
		};
		this.props.updateCounters(body);
	};

	render() {
		const { lectureDetails } = this.props;
		const mobileBrkPnt = 767;
		const maxWidth = window.screen.width;
		console.log(lectureDetails);

		if (!lectureDetails) {
			return (
				<div style={{ textAlign: "center" }}>
					<p className="bookingForm">Hare Krishna...</p>
				</div>
			);
		}

		if (!localStorage.getItem("user")) {
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
							"url(https://ik.imagekit.io/gcwjdmqwwznjl/blog_header_BJ1M6bS8E.png)"
					}}
				>
					<div class="breadcrumbs-custom-inner headingImage">
						<div class="container breadcrumbs-custom-container">
							<ul class="breadcrumbs-custom-path">
								<li>
									<Link to="" onClick={() => this.props.history.push("/")}>
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
											reactCookie.load("languageCode") === "en"
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
					<div className="container">
						<div className="row row-50">
							<div className="col-lg-12">
								<article className="post-creative">
									<h3 className="post-creative-title dataTitle">
										{renderHTML(
											reactCookie.load("languageCode") === "en"
												? lectureDetails.en.title
												: lectureDetails.ru.title
										)}
									</h3>
									<ul className="post-creative-meta dataUL">
										<li>
											<span className="icon mdi mdi-calendar-clock" />
											<time dateTime="2018">
												{new Date(
													lectureDetails.created_date_time
												).toDateString()}
											</time>
										</li>
										<li>
											<span className="icon mdi mdi-tag-multiple" />
											<a>Transcription</a>
										</li>
									</ul>
									<div className="row">
										<div className="col textContent">
											{renderHTML(
												reactCookie.load("languageCode") === "en"
													? lectureDetails.en.transcription.text
													: lectureDetails.ru.transcription.text
													? lectureDetails.ru.transcription.text
													: lectureDetails.en.transcription.text
											)}
										</div>
									</div>
								</article>
								<Collapse
									expandIcon={({ isActive }) => (
										<Icon type="caret-right" style={{ display: "none" }} />
									)}
									bordered={false}
									style={{ marginTop: "10px" }}
								>
									<Panel
										header="Audio Details"
										key="1"
										style={{
											borderTop: "1px solid #e8e8e8",
											borderBottom: "1px solid #e8e8e8",
											fontSize: "25px"
										}}
									>
										<div style={{ paddingTop: "20px", fontSize: "14px" }}>
											<table className="maintable">
												<tbody>
													<tr>
														<td>
															<b>
																<span>Audio</span>&nbsp;
																{maxWidth > mobileBrkPnt ? ":" : null}
															</b>
														</td>
														<td className="padLeftRow">
															<audio style={{ height: "30px" }} controls>
																<source
																	src={renderHTML(lectureDetails.audio_link)}
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
														<td className="padLeftRow text-truncate">
															<a
																href={
																	reactCookie.load("languageCode") === "en"
																		? lectureDetails.en.transcription
																				.attachment_link
																		: lectureDetails.ru.transcription
																				.attachment_link
																		? lectureDetails.ru.transcription
																				.attachment_link
																		: lectureDetails.en.transcription
																				.attachment_link
																}
																target="_blank"
															>
																<span>
																	{reactCookie.load("languageCode") === "en"
																		? lectureDetails.en.transcription
																				.attachment_name
																		: lectureDetails.ru.transcription
																				.attachment_name
																		? lectureDetails.ru.transcription
																				.attachment_name
																		: lectureDetails.en.transcription
																				.attachment_name}
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
															{reactCookie.load("languageCode") === "en"
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
															{reactCookie.load("languageCode") === "en"
																? lectureDetails.en.location
																: lectureDetails.ru.location
																? lectureDetails.ru.location
																: lectureDetails.en.location}
														</td>
													</tr>
													{lectureDetails.counters &&
													lectureDetails.counters.downloads ? (
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
													) : null}
													<tr>
														<td>
															<b>
																<span>Topic</span> :
															</b>
														</td>
														<td className="padLeftRow">
															{reactCookie.load("languageCode") === "en"
																? lectureDetails.en.topic
																: lectureDetails.ru.topic
																? lectureDetails.ru.topic
																: lectureDetails.en.topic}
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
		lectureDetails: state.lectureReducer.lecture
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
		}
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(TranscriptionDetails);
