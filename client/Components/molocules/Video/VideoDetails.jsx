import React from 'react';
import renderHTML from 'react-render-html';
import reactCookie from 'react-cookies';
import { Translate } from 'react-localize-redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
	getVideoById,
	resetState,
} from '../../../actions/video';
import Comments from '../Comments/Comments';
import Breadcrumb from 'react-bootstrap/Breadcrumb';

export class VideoDetails extends React.Component {
	constructor(props) {
		super(props);
		const { resetState } = this.props;
		resetState();
	}

	componentDidMount() {
		const body = {
			uuid: this.props.match.params.uuid,
			video_page_view: true,
		};
		this.props.getVideoById(body);
	}

	goBack = () => {
		this.props.history.goBack();
	};

	render() {
		const { singleVideo } = this.props;


		if (!singleVideo) {
			return (
				<div style={{ textAlign: 'center' }}>
					<p className="bookingForm">
						 Hare Krishna...
					</p>
				</div>
			);
		}

		if (!localStorage.getItem('user')) {
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
										<Breadcrumb.Item>Video</Breadcrumb.Item>
									</Link>
								</li>
								<li>
									<a className="textColor">
										{renderHTML(
											reactCookie.load('languageCode') === 'en'
												? singleVideo.en.title
												: (singleVideo.ru.title ? singleVideo.ru.title : singleVideo.en.title)
										)}
									</a>
								</li>
							</ul>
						</div>
					</div>
				</section>
				<section class="section section-lg">
					<div class="container padTop">
						<div className="row">
							<div class="col-lg-12">
								<article class="post-creative">
									<h3 class="post-creative-title">
										{renderHTML(
											reactCookie.load('languageCode') === 'en'
												? singleVideo.en.title
												: (singleVideo.ru.title ? singleVideo.ru.title : singleVideo.en.title)
										)}
									</h3>
									<ul class="post-creative-meta">
										<li>
											<span class="icon mdi mdi-calendar-clock" />
											<time datetime="2018">
												{new Date(singleVideo.video_date).toDateString()}
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
										{singleVideo.urls
											? singleVideo.urls.map((item, key) => {
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
								<Comments lecture_uuid={singleVideo.uuid} />
							</div>
							<div class="col-lg-4" />
						</div>
					</div>
				</section>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		singleVideo: state.videoReducer.singleVideo,
	};
};
const mapDispatchToProps = dispatch => {
	return {
		getVideoById: body => {
			dispatch(getVideoById(body));
		},
		resetState: () => {
			dispatch(resetState());
		},
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(VideoDetails);
