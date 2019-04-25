import React from 'react';
import renderHTML from 'react-render-html';
import reactCookie from 'react-cookies';
import { Translate } from 'react-localize-redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { updateCounters } from '../../../actions/lectureActions';
// eslint-disable-next-line no-unused-vars
import Comments from '../Comments/Comments';
import Breadcrumb from 'react-bootstrap/Breadcrumb';

export class VideoDetails extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		const body = {
			uuid: this.props.location.state.uuid,
			video_page_view: true
		};
		this.props.updateCounters(body);
	}

	goBack = () => {
		// console.log(this.props.history);
		this.props.history.goBack();
	};

	render() {
		if (!this.props.location.state) {
			return <div>Error Occured..........</div>;
		}
		return (
			<div>
				<section class="section section-lg">
					<div class="container padTop">
						<div style={{ paddingLeft: '15%' }} className="row row-100">
							<div class="col-lg-12">
								<article class="post-creative">
									<Breadcrumb>
										<Link to=" " onClick={() => this.props.history.push('/')}>
											<Breadcrumb.Item>Home</Breadcrumb.Item>
										</Link>
										&nbsp;/&nbsp;
										<Link to=" " onClick={() => this.props.history.goBack()}>
											<Breadcrumb.Item>Video</Breadcrumb.Item>
										</Link>
										&nbsp;/&nbsp;<Breadcrumb.Item active>Video Details</Breadcrumb.Item>
									</Breadcrumb>

									<h3 class="post-creative-title">
										{renderHTML(
											reactCookie.load('languageCode') === 'en'
												? this.props.location.state.en.title
												: this.props.location.state.ru.title
										)}
									</h3>
									<ul class="post-creative-meta">
										<li>
											<span class="icon mdi mdi-calendar-clock" />
											<time datetime="2018">
												{new Date(
													this.props.location.state.created_date
												).toDateString()}
											</time>
										</li>
										<li>
											<span class="icon mdi mdi-tag-multiple" />
											<a>
												<Translate>
													{({ translate }) => translate('HOME.video')}
												</Translate>
											</a>
										</li>
									</ul>
								</article>
								<div>
									<div className="row row-50 row-xxl-70 padTop flexDiv padLeftRow">
										{this.props.location.state.youtube
											? this.props.location.state.youtube.map((item, key) => {
													return (
														<div key={key} className="flexRow">
															<iframe className="iframeStyle" src={item} />
														</div>
													);
											  })
											: null}
									</div>
									{/* <div className="row row-50 row-xxl-70">
                                    </div> */}
								</div>
								<div>
									<p className="bookingForm">Comments</p>
								</div>
								<Comments lecture_uuid={this.props.location.state.uuid} />
							</div>
							<div class="col-lg-4" />
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
)(VideoDetails);
