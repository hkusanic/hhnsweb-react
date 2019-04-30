import React, { Component } from 'react';
import renderHTML from 'react-render-html';
import reactCookie from 'react-cookies';

export class BiographyDetails extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		window.scrollTo(0, 0);
	}

	render() {
		// if (!this.props.location.state) {
		// 	return <div>Error Occured..........</div>;
		// }
		// console.log('from details: ', this.props.history);
		return (
			<div>
				<section className="section section-lg">
					<div className="container padLeftBlog">
						<div className="row row-50">
							<div className="col-lg-12">
								<article className="post-creative">
									<h3 className="post-creative-title alignment padLeft">
										{renderHTML(
											reactCookie.load('languageCode') === 'en'
												? this.props.location.state.title_en
												: this.props.location.state.title_ru
										)}
									</h3>
									<img src={this.props.location.state.img} />
									{renderHTML(
										reactCookie.load('languageCode') === 'en'
											? this.props.location.state.content_en
											: this.props.location.state.content_ru
									)}
								</article>
							</div>
							<div className="col-lg-4" />
						</div>
					</div>
				</section>
			</div>
		);
	}
}

export default BiographyDetails;
