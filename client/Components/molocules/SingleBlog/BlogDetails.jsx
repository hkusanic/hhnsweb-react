import React, { Component } from "react";
import { Icon } from "antd";
import renderHTML from "react-render-html";
import reactCookie from "react-cookies";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Comments from "../Comments/Comments";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { getBlogByUuid } from "../../../actions/blogActions";

export class BlogDetails extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	componentDidMount() {
		const body = {
			uuid: this.props.match.params.uuid
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

		if (!localStorage.getItem("user")) {
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
							"url(https://ik.imagekit.io/gcwjdmqwwznjl/blog_header_BJ1M6bS8E.png)"
					}}
				>
					<div class="breadcrumbs-custom-inner headingImage">
						<div class="container breadcrumbs-custom-container">
							<ul class="breadcrumbs-custom-path">
								<li>
									<Link to="" onClick={() => this.props.history.push("/")}>
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
											reactCookie.load("languageCode") === "en"
												? blogDetails.en.title
													? blogDetails.en.title
													: blogDetails.ru.title
													? blogDetails.ru.title
													: ""
												: blogDetails.ru.title
												? tblogDetails.ru.title
												: blogDetails.en.title
												? blogDetails.en.title
												: ""
										)}
									</a>
								</li>
							</ul>
						</div>
					</div>
				</section>
				<section className="section section-lg">
					<div className="container padTop">
						<div className="row row-100">
							<div className="col-lg-12">
								<article className="post-creative">
									<h3 className="post-creative-title">
										{blogDetails &&
											renderHTML(
												reactCookie.load("languageCode") === "en"
													? blogDetails.en.title
													: blogDetails.ru.title
													? blogDetails.ru.title
													: blogDetails.en.title
											)}
									</h3>
									<ul className="post-creative-meta">
										<li>
											<span className="icon mdi mdi-calendar-clock" />
											<time dateTime="2018">
												{blogDetails &&
													new Date(
														blogDetails.created_date_time
													).toDateString()}
											</time>
										</li>
										<li>
											<span className="icon mdi mdi-tag-multiple" />
											<a>Blog</a>
										</li>
									</ul>
									<div style={{ paddingTop: "15px" }} className="textContent">
										{blogDetails &&
											renderHTML(
												reactCookie.load("languageCode") === "en"
													? blogDetails.en.body
													: blogDetails.ru.body
													? blogDetails.ru.body
													: blogDetails.en.body
											)}
									</div>
									<div>
										<p className="bookingForm">Comments</p>
									</div>
									<Comments lecture_uuid={blogDetails.uuid} />
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
		blogDetails: state.blogReducer.blog
	};
};
const mapDispatchToProps = dispatch => {
	return {
		updateCounters: body => {
			dispatch(updateCounters(body));
		},
		getBlogByUuid: body => dispatch(getBlogByUuid(body))
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(BlogDetails);
