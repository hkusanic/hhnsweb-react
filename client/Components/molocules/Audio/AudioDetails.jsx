import React, { Component } from 'react';
import renderHTML from 'react-render-html';
import reactCookie from 'react-cookies';
import { connect } from 'react-redux';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
// import { Breadcrumb, BreadcrumbItem } from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom';
import { updateCounters } from '../../../actions/lectureActions';
import Comments from '../Comments/Comments';

export class AudioDetails extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		const body = {
			uuid: this.props.location.state.uuid,
			audio_page_view: true
		};
		this.props.updateCounters(body);
	}

	updateAudioCount = () => {
		const body = {
			uuid: this.props.location.state.uuid,
			audio_play_count: true
		};
		this.props.updateCounters(body);
	};

	handleUpdate = (uuid) => {
		const body = {
			uuid: uuid,
			downloads: true
		};
		this.props.updateCounters(body);
	};

	goBack = () => {
		// console.log(this.props.history);
		this.props.history.goBack();
	};

	render() {
		if (!this.props.location.state) {
			return <div>Error Occured..........</div>;
		}

		console.log(this.props.history);

		return (
			<div>
				<section className="section section-lg">
					<div className="container">
						
						{/* <Breadcrumb tag="nav" listTag="div">
							<Link to={this.props.history.location.pathname}>
								<BreadcrumbItem tag="a" href="">
									Audio
								</BreadcrumbItem>
                <BreadcrumbItem tag="a" href="">
									Audio
								</BreadcrumbItem>
							</Link>
						</Breadcrumb> */}

            <div style={{ paddingLeft: '15%' }} className="row row-100">
            <button onClick={this.goBack}>Back</button>
							<div className="col-lg-12">
								<article className="post-creative">
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
											<a>Lecture</a>
										</li>
									</ul>
								</article>
								<div className="audioStyle">
									<audio
										controls
										controlsList="nodownload"
										onPlay={() => {
											this.updateAudioCount();
										}}>
										<source
											src={renderHTML(this.props.location.state.audio_link)}
											type="audio/mpeg"
										/>
									</audio>

									<a
										href={this.props.location.state.audio_link}
										onClick={() => {
											this.handleUpdate(this.props.location.state.uuid);
										}}
										download="download">
										<i
											style={{ cursor: 'pointer', fontSize: '28px' }}
											class="fa fa-download"
											aria-hidden="true"
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

const mapStateToProps = (state) => {
	return {
		Count: state.lectureReducer.Count
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		updateCounters: (body) => {
			dispatch(updateCounters(body));
		}
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(AudioDetails);
