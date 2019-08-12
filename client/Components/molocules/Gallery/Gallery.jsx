import React from 'react';
import { Card, Icon } from 'antd';
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
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import QuoteOfDay from '../../molocules/SingleQuote/QuotesOfDay';
import script from '../../../assets/script.js';

const { Meta } = Card;

export class Gallery extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			isUserLogin: false,
		};
	}
	componentDidMount () {
		script();
		const isUserLogin = Auth.isUserAuthenticated();
		this.setState({
			isUserLogin,
		});
		this.props.getStaticGalleryList();
	}

	render () {
		const { galleryReducer } = this.props;
		let { mainGallery } = galleryReducer;
		mainGallery = handleFilterGallery(mainGallery);

		if (!localStorage.getItem('user')) {
			return <QuoteOfDay />;
		}

		return (
			<div>
				<section
					className="bg-gray-100"
					style={{
						backgroundImage:
							'url(https://ik.imagekit.io/gcwjdmqwwznjl/Booking_v2_HkCb1eBDV.png)',
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
									<a className="textColor">Gallery</a>
								</li>
							</ul>
						</div>
					</div>
				</section>
				{!this.state.isUserLogin ? (
					<section class="section-lg text-center bg-gray-100">
						<div class="container">
							<div class="row row-50 row-lg-70 offset-top-2">
								{mainGallery && mainGallery.length > 0
									? mainGallery.map(item => {
										return (
											<div class="col-sm-6 col-lg-3 wow-outer">
												{/* <article
												class="tour-default wow fadeInUpSmall"
												data-wow-delay=".1s"
											> */}
												<Link to={{ pathname: '/subGallery', state: item }}>
													<Card hoverable>
														<Meta
															title={
																reactCookie.load('languageCode') === 'en'
																	? item.name_en
																	: item.name_ru
															}
														/>
													</Card>
												</Link>
											</div>
										);
									  })
									: null}
							</div>
						</div>
					</section>
				) : (
					<QuoteOfDay />
				)}
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
