import React from 'react';
import { connect } from 'react-redux';
import Auth from '../../../utils/Auth';
// import reactCookie from 'react-cookies';
import { getGalleries } from '../../../actions/gallery';

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
		this.props.getGalleries();
	}

	render () {
		return (
			<div>
				<section class="section-lg text-center bg-gray-100">
					<div class="container">
						<div class="row row-50 row-lg-70 offset-top-2">
							<div class="col-sm-6 col-lg-3 wow-outer">
								<article
									class="tour-default wow slideInLeft"
									data-wow-delay=".1s"
								>
									<img
										src="https://nrs-site.s3.amazonaws.com/styles/gallery_images/s3/default_images/004.jpg?itok=xizRm1w6"
										alt=""
										width="200"
										height="200"
									/>
									<div class="tour-default-caption">
										<h5 class="tour-default-title">Title</h5>
									</div>
								</article>
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
		galleryReducer: state.galleryReducer,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		getGalleries: () => {
			dispatch(getGalleries());
		},
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Gallery);
