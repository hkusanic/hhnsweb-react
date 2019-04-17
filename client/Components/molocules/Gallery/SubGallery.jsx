import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getSubGalleryByGallery } from '../../../actions/gallery';

export class SubGallery extends React.Component {
	constructor (props) {
		super(props);
		this.state = {};
	}
	componentDidMount () {
		const body = {
			gallery: this.props.location.state,
		};
		console.log('uudi ====>>>', this.props.location.state);
		this.props.getSubGalleryByGallery(body);
	}

	render () {
		return (
			<div>
				<section class="section-lg text-center bg-gray-100">
					<div class="container">
						<div class="row row-50 row-lg-70 offset-top-2">
							{this.props.subGalleries && this.props.subGalleries.length > 0
								? this.props.subGalleries.map(item => {
									return (
										<div class="col-sm-6 col-lg-3 wow-outer">
											<article
												class="tour-default wow slideInLeft"
												data-wow-delay=".1s"
											>
												<Link
													to={{ pathname: '/photos', state: item }}
													class="tour-default-figure"
												>
													<img
														src={
															item.photos && item.photos
																? item.photos[0]
																: 'images/tour-5-270x200.jpg'
														}
														alt=""
														width="270"
														height="200"
													/>
												</Link>
												<div class="tour-default-caption">
													<h5 class="tour-default-title">
														<Link to={{ pathname: '/photos', state: item }}>
															{item.title}
														</Link>
													</h5>
												</div>
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
