import React from 'react';
import { Icon } from 'antd';
import renderHTML from 'react-render-html';
import reactCookie from 'react-cookies';
import { connect } from 'react-redux';
import { updateCounters } from '../../../actions/lectureActions';
// eslint-disable-next-line no-unused-vars
import Comments from '../Comments/Comments';

import Breadcrumb from 'react-bootstrap/Breadcrumb';

import { Link } from 'react-router-dom';

export class SummariesDetails extends React.Component {
	constructor (props) {
		super(props);
	}
	componentDidMount () {
		let body = {
			uuid: this.props.location.state.uuid,
		};
		if (reactCookie.load('languageCode') === 'en') {
			body.en_summary_view = true;
		} else {
			body.ru_summary_view = true;
		}
		this.props.updateCounters(body);
	}

	render () {
		if (!this.props.location.state) {
			return <div>Error Occured..........</div>;
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
											<Breadcrumb.Item>Summaries</Breadcrumb.Item>
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
													? this.props.location.state.en.title
													: this.props.location.state.ru.title
											)}
										</Breadcrumb.Item>
									</Breadcrumb>

									<h3 className="post-creative-title dataTitle">
										{renderHTML(
											reactCookie.load('languageCode') === 'en'
												? this.props.location.state.en.title
												: this.props.location.state.ru.title
										)}
									</h3>
									<ul className="post-creative-meta dataUL">
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
											<a>Summary</a>
										</li>
									</ul>
									<div>
										{renderHTML(
											reactCookie.load('languageCode') === 'en'
												? this.props.location.state.ru.summary.text
												: this.props.location.state.ru.summary.text
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
																this.props.location.state.audio_link
															)}
															type="audio/mpeg"
														/>
													</audio>
												</td>
											</tr>
											<tr>
												<td>
													<b>
														<span>Event</span> :
													</b>
												</td>
												<td className="padLeftRow">
													{this.props.location.state.ru.event}
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
													{this.props.location.state.ru.location}
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
													{this.props.location.state.ru.topic}
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
)(SummariesDetails);
