import React from 'react';
import renderHTML from 'react-render-html';
import reactCookie from 'react-cookies';

export class BiographyDetails extends React.Component {
	constructor (props) {
		super(props);
	}

	componentDidMount () {
		window.scrollTo(0, 0);
	}

	render () {
		if (!this.props.location.state) {
			return <div>Error Occured..........</div>;
		}
		return (
			<div>
				<section className="section section-lg">
					<article className="post-creative">
						<div className="container">
							<div className="row">
								<div className="col-12">
									<h3
										className="post-creative-title centerAlign alignment"
										style={{ marginTop: '-7px' }}
									>
										{renderHTML(
											reactCookie.load('languageCode') === 'en'
												? this.props.location.state.title_en
												: this.props.location.state.title_ru
										)}
									</h3>
								</div>
							</div>
							<div className="row">
								<div className="col">
									<div className="floated">
										<img
											style={{ objectFit: 'cover' }}
											src={this.props.location.state.img}
										/>
									</div>
									<div className="textContent">
										{renderHTML(
											reactCookie.load('languageCode') === 'en'
												? this.props.location.state.content_en
												: this.props.location.state.content_ru
										)}
									</div>
								</div>
							</div>
						</div>
					</article>
				</section>
			</div>
		);
	}
}

export default BiographyDetails;
