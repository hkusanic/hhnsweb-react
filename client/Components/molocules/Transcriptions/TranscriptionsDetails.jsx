import React from 'react';
import renderHTML from 'react-render-html';
import reactCookie from 'react-cookies';
import { connect } from 'react-redux';
import { updateCounters } from '../../../actions/lectureActions';
// eslint-disable-next-line no-unused-vars
import Comments from '../Comments/Comments';

export class TranscriptionDetails extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			text: '',
		};
	}

	componentDidMount () {
		let body = {
			uuid: this.props.location.state.uuid,
		};
		if (reactCookie.load('languageCode') === 'en') {
			body.en_transcription_view = true;
		} else {
			body.ru_transcription_view = true;
		}
		this.props.updateCounters(body);
  }
  goBack = () => {
		// console.log(this.props.history);
		this.props.history.goBack();
	};

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
              <button onClick={this.goBack}>Back</button>
								<article className="post-creative">
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
											<a>Transcription</a>
										</li>
									</ul>
									<div>
										{renderHTML(
											reactCookie.load('languageCode') === 'en'
												? this.props.location.state.en.transcription.text
												: this.props.location.state.en.transcription.text
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
													<audio controls>
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
														<span>Attachment</span> :
													</b>
												</td>
												<td className="padLeftRow">
													<a
														href={
															this.props.location.state.en.transcription
																.attachment_link
														}
														target="_blank"
													>
														<span>
															{
																this.props.location.state.en.transcription
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
														: this.props.location.state.en.location}
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
								<Comments lecture_uuid={this.props.location.state.uuid}/>
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
)(TranscriptionDetails);
