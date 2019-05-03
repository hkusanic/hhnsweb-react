import React, { Component } from 'react';
import { Icon } from 'antd';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { Link } from 'react-router-dom';
import script from '../../../assets/script.js';

export class Photos extends Component {
	constructor (props) {
		super(props);
		this.state = {
			photoObject: this.props.location.state,
		};
	}

	componentDidMount () {
		script();
	}

	render () {
		return (
			<div>
				<section className="oh text-center text-sm-left padBottom">
					<div style={{ textAlign: 'center' }}>
						<p className="bookingForm">Photos</p>
					</div>
					<div className="container">
						<Breadcrumb>
							<Link to=" " onClick={() => this.props.history.push('/')}>
								<Breadcrumb.Item>Home</Breadcrumb.Item>
							</Link>
							<Icon type="double-right" style={{ alignSelf: 'center', paddingLeft: 5, paddingRight: 5 }} />
							<Link to=" " onClick={() => this.props.history.push('/gallery')}>
								<Breadcrumb.Item>Gallery</Breadcrumb.Item>
							</Link>
							<Icon type="double-right" style={{ alignSelf: 'center', paddingLeft: 5, paddingRight: 5 }} />
							<Link to=" " onClick={() => this.props.history.goBack()}>
								<Breadcrumb.Item>{this.props.location.state.gallery}</Breadcrumb.Item>
							</Link>
							<Icon type="double-right" style={{ alignSelf: 'center', paddingLeft: 5, paddingRight: 5 }} />
							<Breadcrumb.Item active>{this.props.location.state.title_en}</Breadcrumb.Item>
						</Breadcrumb>
						<div
							className="isotope isotope-responsive row"
							data-isotope-layout="masonry"
							data-isotope-group="gallery"
							data-lightgallery="group"
						>
							{this.state
							&& this.state.photoObject
							&& this.state.photoObject.photos
								? this.state.photoObject.photos.map(item => {
									return (
										<div className="col-sm-6 col-lg-4 isotope-item">
											<a
												className="thumbnail-corporate thumbnail-corporate-light"
												href={item}
												target="_blank"
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
													<p className="thumbnail-corporate-title">{this.props.location.state.gallery}</p>
												</div>
												<div className="thumbnail-corporate-dummy"> </div>
											</a>
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

export default Photos;
