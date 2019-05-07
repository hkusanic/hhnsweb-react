import React, { Component } from 'react';
import { Icon } from 'antd';
import { Link } from 'react-router-dom';
import renderHTML from 'react-render-html';
import reactCookie from 'react-cookies';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { connect } from 'react-redux';
import { getKirtanByUuid } from '../../../actions/kirtanAction';

export class KirtanDetails extends Component {
	constructor (props) {
		super(props);
		this.state = {
			kirtanDetails: null,
		};
	}

	componentDidMount () {
		const body = {
			uuid: this.props.match.params.uuid,
		};

		this.props.getKirtanByUuid(body);

		if (this.props.kirtanDetails) {
			this.setState({ kirtanDetails: this.props.kirtanDetails });
		}
	}

	static getDerivedStateFromProps (nextProps, prevState) {
		if (nextProps.kirtanDetails !== prevState.kirtanDetails) {
			return { kirtanDetails: nextProps.kirtanDetails };
		} else return null;
	}

	render () {
		const { kirtanDetails } = this.state;

		if (!kirtanDetails) {
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
											? kirtanDetails.en.title
											: kirtanDetails.ru.title
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
												? kirtanDetails.en.title
												: kirtanDetails.ru.title
										)}
									</h3>
									<ul className="post-creative-meta">
										<li>
											<span className="icon mdi mdi-calendar-clock" />
											<time dateTime="2018">
												{new Date(kirtanDetails.created_date).toDateString()}
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
											src={renderHTML(kirtanDetails.audio_link)}
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
														? kirtanDetails.en.event
														: kirtanDetails.ru.event}
												</td>
											</tr>
											{kirtanDetails.author ? (
												<tr>
													<td>
														<b>
															<span>Author</span> :
														</b>
													</td>
													<td className="padLeftRow">{kirtanDetails.author}</td>
												</tr>
											) : null}
											<tr>
												<td>
													<b>
														<span>Durations</span> :
													</b>
												</td>
												<td className="padLeftRow">{kirtanDetails.duration}</td>
											</tr>
											<tr>
												<td>
													<b>
														<span>Location</span> :
													</b>
												</td>
												<td className="padLeftRow">
													{reactCookie.load('languageCode') === 'en'
														? kirtanDetails.en.location
														: kirtanDetails.ru.location}
												</td>
											</tr>
											<tr>
												<td>
													<b>
														<span>Downloads</span> :
													</b>
												</td>
												<td className="padLeftRow">
													{kirtanDetails.downloads}
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
														? kirtanDetails.en.topic
														: kirtanDetails.ru.topic}
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

const mapStateToProps = state => {
	return {
		kirtanDetails: state.kirtanReducer.kirtan,
	};
};
const mapDispatchToProps = dispatch => {
	return {
		getKirtanByUuid: body => {
			dispatch(getKirtanByUuid(body));
		},
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(KirtanDetails);
