import React from 'react';
import { Skeleton, Card, Icon } from 'antd';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getSubGalleryByGallery } from '../../../actions/gallery';
import reactCookie from 'react-cookies';
import Breadcrumb from 'react-bootstrap/Breadcrumb';

const { Meta } = Card;

export class SubGallery extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	componentDidMount() {
		const body = {
			gallery:
				reactCookie.load('languageCode') === 'en'
					? this.props.location.state.name_en
					: this.props.location.state.name_ru,
		};
		this.props.getSubGalleryByGallery(body);
	}

	render() {
		if (!sessionStorage.getItem('user')) {
			return (
				<div style={{ textAlign: 'center' }}>
					<p className="bookingForm">Please Log in to continue</p>
				</div>
			);
		}

		return (
			<div>
				<section class="section-lg text-center bg-gray-100">
					<div class="container">
						<Breadcrumb>
							<Link to=" " onClick={() => this.props.history.push('/')}>
								<Breadcrumb.Item>Home</Breadcrumb.Item>
							</Link>
							<Icon type="double-right" style={{ alignSelf: 'center', paddingLeft: 5, paddingRight: 5 }} />
							<Link to=" " onClick={() => this.props.history.goBack()}>
								<Breadcrumb.Item>Gallery</Breadcrumb.Item>
							</Link>
							<Icon type="double-right" style={{ alignSelf: 'center', paddingLeft: 5, paddingRight: 5 }} />
							<Breadcrumb.Item active>
								{reactCookie.load('languageCode') === 'en'
									? this.props.location.state.name_en
									: this.props.location.state.name_ru}
							</Breadcrumb.Item>
						</Breadcrumb>
						<div class="row row-50 row-lg-70 offset-top-2">
							{this.props.subGalleries && this.props.subGalleries.length > 0
								? this.props.subGalleries.map(item => {
									let background = item.photos && item.photos? item.photos[0]: 'images/tour-5-270x200.jpg'
									return (
										<div class="col-sm-6 col-lg-3 wow-outer">
											<article
												class="tour-default wow fadeInUpSmall"
												data-wow-delay=".1s"
											>
												<Link to={{ pathname: '/photos', state: item }}>
													<Card
														hoverable
														style={{ width: 240, margin: 'auto' }}
														loading={false}
														cover={
															<div className="subGalleryImg"
																style={{
																	backgroundImage: `url('${background}')`
																}}></div>
															// <img
															// 	src={
															// 		item.photos && item.photos
															// 			? item.photos[0]
															// 			: 'images/tour-5-270x200.jpg'
															// 	}
															// 	alt=""
															// 	className="subGalleryImg"
															// />
														}
													>
														{/* <Skeleton> */}
														<Meta
															title={
																reactCookie.load('languageCode') === 'en'
																	? item.title_en
																	: item.title_ru
															}
														/>
														{/* </Skeleton> */}
													</Card>
												</Link>
											</article>
										</div>
									);
								})
								: null}
						</div>
					</div>
				</section>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		subGalleries: state.galleryReducer.subGalleries,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		getSubGalleryByGallery: body => {
			dispatch(getSubGalleryByGallery(body));
		},
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SubGallery);
