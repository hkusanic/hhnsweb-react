// eslint-disable-next-line no-unused-vars
import React, { Component } from 'react';
import { Icon } from 'antd';
import renderHTML from 'react-render-html';
import reactCookie from 'react-cookies';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Comments from '../Comments/Comments';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { getBlogByUuid } from '../../../actions/blogActions';

export class BlogDetails extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	componentDidMount() {
		const body = {
			uuid: this.props.match.params.uuid,
		};

		this.props.getBlogByUuid(body);

		if (this.props.blogDetails) {
			this.setState({ blogDetails: this.props.blogDetails });
		}
	}

	goBack = () => {
		this.props.history.goBack();
	};

	static getDerivedStateFromProps(nextProps, prevState) {
		if (nextProps.blogDetails !== prevState.blogDetails) {
			return { blogDetails: nextProps.blogDetails };
		} else return null;
	}

	render() {
		const { blogDetails } = this.state;

		if (!blogDetails) {
			return <div>Error Occured..........</div>;
		}
		
		if (!localStorage.getItem('user')) {
			return (
				<div className="loginText">
					<p className="bookingForm">Please log in to continue</p>
				</div>
			);
		}

		return (
			<div>
				<section
					className="bg-gray-100"
					style={{
						backgroundImage:
							'url(https://ik.imagekit.io/gcwjdmqwwznjl/blog_header_BJ1M6bS8E.png)',
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
									<Link to=" " onClick={() => this.props.history.goBack()}>
										<Breadcrumb.Item>Blog</Breadcrumb.Item>
									</Link>
								</li>
								<li>
									<a className="textColor">
									{renderHTML(
											reactCookie.load('languageCode') === 'en'
												? this.props.location.state.title_en
												: this.props.location.state.title_ru
										)}
									</a>
								</li>
							</ul>
						</div>
					</div>
				</section>
				<section className="section section-lg">
					<div className="container padTop">
						{/* <div style={{ paddingLeft: '15%' }} className="row row-100">
							<div className="col-lg-12"> */}
								{/* <Breadcrumb>
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
								</Breadcrumb> */}
							{/* </div>
						</div> */}
						<div className="row row-100">
							<div className="col-lg-12">
								<article className="post-creative">
									<h3 className="post-creative-title">
										{blogDetails &&
											renderHTML(
												reactCookie.load('languageCode') === 'en'
													? blogDetails.title_en
													: blogDetails.title_ru
											)}
									</h3>
									<ul className="post-creative-meta">
										<li>
											<span className="icon mdi mdi-calendar-clock" />
											<time dateTime="2018">
												{blogDetails &&
													new Date(blogDetails.date).toDateString()}
											</time>
										</li>
										<li>
											<span className="icon mdi mdi-tag-multiple" />
											<a>Blog</a>
										</li>
									</ul>
									{blogDetails &&
										renderHTML(
											reactCookie.load('languageCode') === 'en'
												? blogDetails.body_en
												: blogDetails.body_ru
										)}
							<div>
								<p className="bookingForm">Comments</p>
							</div>
							<Comments lecture_uuid={this.props.location.state.uuid} />
								</article>
							</div>
							{/* <div className="col-lg-4" /> */}
						</div>
					</div>
				</section>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		blogDetails: state.blogReducer.blog,
	};
};
const mapDispatchToProps = dispatch => {
	return {
		updateCounters: body => {
			dispatch(updateCounters(body));
		},
		getBlogByUuid: body => dispatch(getBlogByUuid(body)),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(BlogDetails);

// export default BlogDetails;
