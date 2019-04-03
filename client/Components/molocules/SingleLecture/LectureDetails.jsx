/* eslint-disable no-unused-vars */
import React from 'react';
import renderHTML from 'react-render-html';
import reactCookie from 'react-cookies';
import Comments from '../Comments/Comments';

export class LectureDetails extends React.Component {
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
												? this.props.location.state.en.event
												: this.props.location.state.ru.event
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
											<a>Lecture</a>
										</li>
									</ul>
								</article>
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
													{this.props.location.state.downloads}
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
									<div className="padTop">
										<table>
											<tbody>
												{this.props.location.state.youtube.map((item, key) => {
													return (
														<tr key={key}>
															<td>
																<iframe className="iframeStyle" src={item} />
															</td>
														</tr>
													);
												})}
											</tbody>
										</table>
									</div>
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

export default LectureDetails;
