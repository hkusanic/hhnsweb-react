import React, { Component } from 'react';
import { Icon } from 'antd';
import { Link } from 'react-router-dom';
import renderHTML from 'react-render-html';
import reactCookie from 'react-cookies';
import Breadcrumb from 'react-bootstrap/Breadcrumb';

export class KirtanDetails extends Component {
	constructor (props) {
		super(props);
	}

	render () {
		return (
			<div>
				<section className="section section-lg">
					<div className="container">
						<div className="BreadCrumDiv">
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
									<Breadcrumb.Item>Kirtan</Breadcrumb.Item>
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
						</div>
						<div className="row row-100">
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
											<a>Kirtan</a>
										</li>
									</ul>
								</article>
								<div className="audioStyle">
									<audio style={{ height: '30px' }} controls>
										<source
											src={renderHTML(this.props.location.state.audio_link)}
											type="audio/mpeg"
										/>
									</audio>
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
								</div>
							</div>
						</div>
					</div>
				</section>
			</div>
		);
	}
}

export default KirtanDetails;
