// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Icon } from 'antd';
import renderHTML from 'react-render-html';
import reactCookie from 'react-cookies';
import { Link } from 'react-router-dom';
import Comments from '../Comments/Comments';
import Breadcrumb from 'react-bootstrap/Breadcrumb';

export class BlogDetails extends React.Component {
	constructor(props) {
		super(props);
	}

	goBack = () => {
		this.props.history.goBack();
	};

	render() {
		if (!this.props.location.state) {
			return <div>Error Occured..........</div>;
		}
		return (
			<div>
				<section className="section section-lg">
					<div className="container padLeftBlog">
						<div className="row">
							<div className="col-lg-12">
								<Breadcrumb>
									<Link to=" " onClick={() => this.props.history.push('/')}>
										<Breadcrumb.Item>Home</Breadcrumb.Item>
									</Link>
									<Icon
										type="double-right"
										style={{
											alignSelf: 'center',
											paddingLeft: 5,
											paddingRight: 5,
										}}
									/>
									<Link to=" " onClick={() => this.props.history.goBack()}>
										<Breadcrumb.Item>Blog</Breadcrumb.Item>
									</Link>
									<Icon
										type="double-right"
										style={{
											alignSelf: 'center',
											paddingLeft: 5,
											paddingRight: 5,
										}}
									/>
									<Breadcrumb.Item active>
										{renderHTML(
											reactCookie.load('languageCode') === 'en'
												? this.props.location.state.title_en
												: this.props.location.state.title_ru
										)}
									</Breadcrumb.Item>
								</Breadcrumb>
							</div>
						</div>
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
									<ul className="post-creative-meta">
										<li>
											<span className="icon mdi mdi-calendar-clock" />
											<time dateTime="2018">
												{new Date(
													this.props.location.state.date
												).toDateString()}
											</time>
										</li>
										<li>
											<span className="icon mdi mdi-tag-multiple" />
											<a>Blog</a>
										</li>
									</ul>
									{renderHTML(
										reactCookie.load('languageCode') === 'en'
											? this.props.location.state.body_en
											: this.props.location.state.body_ru
									)}
								</article>
							</div>
							<div>
								<p className="bookingForm">Comments</p>
							</div>
							<Comments lecture_uuid={this.props.location.state.uuid} />
							<div className="col-lg-4" />
						</div>
					</div>
				</section>
			</div>
		);
	}
}

export default BlogDetails;
