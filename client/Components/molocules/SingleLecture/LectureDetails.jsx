/* eslint-disable no-unused-vars */
import React from 'react';
import { Icon } from 'antd';
import { Link } from 'react-router-dom';
import renderHTML from 'react-render-html';
import reactCookie from 'react-cookies';
import Comments from '../Comments/Comments';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { connect } from 'react-redux';
import { getLectureByUuid } from '../../../actions/lectureActions';
export class LectureDetails extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			lectureDetails: null,
		};
	}

	componentDidMount () {
		const body = {
			uuid: this.props.match.params.uuid,
			video_page_view: true,
		};

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
										<Breadcrumb.Item>Lecture</Breadcrumb.Item>
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
					<div className="container padTop">
						{/* <Breadcrumb>
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
								<Breadcrumb.Item>Lecture</Breadcrumb.Item>
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
						</Breadcrumb> */}
						<div className="row row-100">
							<div style={{ paddingLeft: '15%' }} className="col-lg-12">
								<article className="post-creative">
									<h3 className="post-creative-title">
										{renderHTML(
											reactCookie.load('languageCode') === 'en'
												? lectureDetails.en.title
												: lectureDetails.ru.title
										)}
									</h3>
									<ul className="post-creative-meta">
										<li>
											<span className="icon mdi mdi-calendar-clock" />
											<time dateTime="2018">
												{new Date(lectureDetails.created_date).toDateString()}
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
														: lectureDetails.ru.location}
												</td>
											</tr>
											<tr>
												<td>
													<b>
														<span>Downloads</span> :
													</b>
												</td>
												<td className="padLeftRow">
													{lectureDetails.downloads}
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
									<div className="padTop">
										<table>
											<tbody>
												{lectureDetails.youtube.map((item, key) => {
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
									<Comments lecture_uuid={lectureDetails.uuid} />
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

const mapStateToProps = state => {
	return {
		lectureDetails: state.lectureReducer.lecture,
	};
};
const mapDispatchToProps = dispatch => {
	return {
		getLectureByUuid: body => {
			dispatch(getLectureByUuid(body));
		},
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(LectureDetails);
