import React, { Component } from 'react';
import renderHTML from 'react-render-html';
import reactCookie from 'react-cookies';
import { connect } from 'react-redux';

import Breadcrumb from 'react-bootstrap/Breadcrumb';

import { Link } from 'react-router-dom';
import { Icon } from 'antd';
import { updateCounters } from '../../../actions/lectureActions';
import Comments from '../Comments/Comments';

export class AudioDetails extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		const body = {
			uuid: this.props.location.state.uuid,
			audio_page_view: true,
		};
		this.props.updateCounters(body);
	}

	updateAudioCount = () => {
		const body = {
			uuid: this.props.location.state.uuid,
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
		if (!this.props.location.state) {
			return <div>Error Occured..........</div>;
		}

		return (
			<div>
				<section className="section section-lg">
					<div className="container padTop">
						<div style={{ paddingLeft: '15%' }} className="row row-100">
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
											<Breadcrumb.Item>Audio</Breadcrumb.Item>
										</Link>
										<Icon
											type="double-right"
											style={{
												alignSelf: 'center',
												paddingLeft: 5,
												paddingRight: 5,
											}}
										/>
										<Breadcrumb.Item active>{renderHTML(
											reactCookie.load('languageCode') === 'en'
												? this.props.location.state.en.title
												: this.props.location.state.ru.title
										)}</Breadcrumb.Item>
									</Breadcrumb>

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
													this.props.location.state.created_date
												).toDateString()}
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
										style={{height: '30px'}}
										className="audioPlayer"
										controls
										controlsList="nodownload"
										onPlay={() => {
											this.updateAudioCount();
										}}
									>
										<source
											src={renderHTML(this.props.location.state.audio_link)}
											type="audio/mpeg"
										/>
									</audio>

									<a
										className="downloadIcon"
										href={this.props.location.state.audio_link}
										onClick={() => {
											this.handleUpdate(this.props.location.state.uuid);
										}}
										download="download"
									>
										<Icon
											type="download"
											style={{ fontSize: '1.5rem' }}
										/>
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
														? this.props.location.state.en.event
														: this.props.location.state.ru.event}
												</td>
											</tr>
											{this.props.location.state.part ? (
												<tr>
													<td>
														<b>
															<span>Part</span> :
														</b>
													</td>
													<td className="padLeftRow">
														{this.props.location.state.part}
													</td>
												</tr>
											) : null}
											{this.props.location.state.chapter ? (
												<tr>
													<td>
														<b>
															<span>Chapter</span> :
														</b>
													</td>
													<td className="padLeftRow">
														{this.props.location.state.chapter}
													</td>
												</tr>
											) : null}
											{this.props.location.state.verse ? (
												<tr>
													<td>
														<b>
															<span>Verse</span> :
														</b>
													</td>
													<td className="padLeftRow">
														{this.props.location.state.verse}
													</td>
												</tr>
											) : null}
											{this.props.location.state.author ? (
												<tr>
													<td>
														<b>
															<span>Author</span> :
														</b>
													</td>
													<td className="padLeftRow">
														{this.props.location.state.author}
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
													{this.props.location.state.duration}
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
														? this.props.location.state.en.location
														: this.props.location.state.ru.location}
												</td>
											</tr>
											<tr>
												<td>
													<b>
														<span>Downloads</span> :
													</b>
												</td>
												<td className="padLeftRow">
													{this.props.location.state.counters.downloads}
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
														? this.props.location.state.en.topic
														: this.props.location.state.ru.topic}
												</td>
											</tr>
										</tbody>
									</table>
								</div>
								<div>
									<p className="bookingForm">Comments</p>
								</div>
								<Comments lecture_uuid={this.props.location.state.uuid} />
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
	};
};
const mapDispatchToProps = dispatch => {
	return {
		updateCounters: body => {
			dispatch(updateCounters(body));
		},
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(AudioDetails);
