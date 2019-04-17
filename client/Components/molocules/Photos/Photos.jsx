import React, { Component } from 'react';

export class Photos extends Component {
	constructor (props) {
		super(props);
		this.state = {
			photoObject: this.props.location.state,
		};
	}

	render () {
		return (
			<div>
				<section className="oh text-center text-sm-left padBottom">
					<div style={{ textAlign: 'center' }}>
						<p className="bookingForm">Photos</p>
					</div>
					<div className="container">
						<div className="isotope isotope-responsive row">
							{this.state
							&& this.state.photoObject
							&& this.state.photoObject.photos
								? this.state.photoObject.photos.map(item => {
									return (
										<div className="col-sm-6 col-lg-4 isotope-item">
											<a
												className="thumbnail-corporate thumbnail-corporate-light"
												href={item}
												data-lightgallery="item"
											>
												<img
													className="thumbnail-corporate-image"
													src={item}
													alt=""
													width="370"
													height="256"
												/>
												<div className="thumbnail-corporate-caption">
													<p className="thumbnail-corporate-title">2019</p>
												</div>
												<div className="thumbnail-corporate-dummy"> </div>
											</a>
										</div>
									);
								  })
								: null}
							<div className="col-sm-6 col-lg-4 isotope-item">
								<a
									className="thumbnail-corporate thumbnail-corporate-light"
									href="images/gallery-original-9.jpg"
									data-lightgallery="item"
								>
									<img
										className="thumbnail-corporate-image"
										src="images/grid-layout-9-370x256.jpg"
										alt=""
										width="370"
										height="256"
									/>
									<div className="thumbnail-corporate-caption">
										<p className="thumbnail-corporate-title">2017</p>
									</div>
									<div className="thumbnail-corporate-dummy"> </div>
								</a>
							</div>
						</div>
					</div>
				</section>
			</div>
		);
	}
}

export default Photos;
