import React from 'react';
import { connect } from 'react-redux';
import Auth from '../../../utils/Auth';
import { Link } from 'react-router-dom';
import {
	getGalleries,
	getStaticGalleryList,
	getSubGalleryByGallery,
} from '../../../actions/gallery';
import { handleFilterGallery } from '../../../utils/custom';
import reactCookie from 'react-cookies';

export class Gallery extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			isUserLogin: false,
		};
	}
	componentDidMount () {
		const isUserLogin = Auth.isUserAuthenticated();
		this.setState({
			isUserLogin,
		});
		this.props.getStaticGalleryList();
	}

	render () {
		const { galleryReducer } = this.props;
		console.log('galleryReducer=====>>>.', galleryReducer);
		let { mainGallery } = galleryReducer;
		mainGallery = handleFilterGallery(mainGallery);
		return (
			<div>
				<section class="section-lg text-center bg-gray-100">
					<div class="container">
						<div class="row row-50 row-lg-70 offset-top-2">
							{mainGallery && mainGallery.length > 0
								? mainGallery.map(item => {
									return (
										<div class="col-sm-6 col-lg-3 wow-outer">
											<article
												class="tour-default wow slideInLeft"
												data-wow-delay=".1s"
											>
												<Link
													to={{ pathname: '/subGallery', state: item }}
													class="tour-default-figure"
												>
													<img
														src="https://nrs-site.s3.amazonaws.com/styles/gallery_images/s3/default_images/004.jpg?itok=xizRm1w6"
														alt=""
														width="270"
														height="200"
													/>
												</Link>
												<div class="tour-default-caption">
													<h5 class="tour-default-title">
														<Link
															to={{ pathname: '/subGallery', state: item }}
														>
															{reactCookie.load('languageCode') === 'en'
																? item.name_en
																: item.name_ru}
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
		galleryReducer: state.galleryReducer,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		getGalleries: () => {
			dispatch(getGalleries());
		},

		getStaticGalleryList: () => {
			dispatch(getStaticGalleryList());
		},

		getSubGalleryByGallery: () => {
			dispatch(getSubGalleryByGallery());
		},
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Gallery);
