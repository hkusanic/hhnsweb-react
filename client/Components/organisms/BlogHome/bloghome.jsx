import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Pagination, Icon, Button } from "antd";
import renderHTML from "react-render-html";
import SingleBlogHome from "../../molocules/SingleBlog/Singlebloghome";
import { connect } from "react-redux";
import { getBlogs, getBlog } from "../../../actions/blogActions";
import Auth from "../../../utils/Auth";
import { Translate } from "react-localize-redux";
import QuoteOfDay from "../../molocules/SingleQuote/QuotesOfDay";
import { Redirect } from "react-router-dom";

const defaultPageSize = 20;

export class Blogs extends Component {
	constructor(props) {
		super(props);
		this.state = {
			totalItem: null,
			blogs: []
		};
	}

	componentDidMount() {
		this.setState({
			totalItem: this.props.blogsDetails.totalBlogs,
			blogs: this.props.blogsDetails.blogs
		});
		this.props.getBlogs(1);
	}

	componentWillReceiveProps(nextprops) {
		this.setState({
			totalItem: nextprops.blogsDetails.totalBlogs,
			blogs: nextprops.blogsDetails.blogs
		});
	}

	render() {
		console.log(this.state.blogs);
		console.log(this.state.totalItem);
		return (
			<div>
				<section>
					<div style={{ textAlign: "center" }}>
						<h3 style={{ marginTop: "25px" }}> BLOGS </h3>
						<h4> Lorem ipsum dolor sit amet, consectetur adipiscing elit </h4>
						<br />
						<br />
					</div>
					{this.state.totalItem ? (
						<div className="container centerAlign">
							<div className="row row-50 row-xxl-70">
								<SingleBlogHome
									handleNavigationClick={this.handleNavigationClick}
									author={this.state.blogs[0].author}
									title={this.state.blogs[0].en.title}
									date={this.state.blogs[0].publish_date}
									description={this.state.blogs[0].en.body}
									uuid={this.state.blogs[0].uuid}
									link="/"
								/>

								<SingleBlogHome
									handleNavigationClick={this.handleNavigationClick}
									author={this.state.blogs[1].author}
									title={this.state.blogs[1].en.title}
									date={this.state.blogs[1].publish_date}
									description={this.state.blogs[1].en.body}
									uuid={this.state.blogs[1].uuid}
									link="/"
								/>
								<SingleBlogHome
									handleNavigationClick={this.handleNavigationClick}
									author={this.state.blogs[2].author}
									title={this.state.blogs[2].en.title}
									date={this.state.blogs[2].publish_date}
									description={this.state.blogs[2].en.body}
									uuid={this.state.blogs[2].uuid}
									link="/"
								/>
								<SingleBlogHome
									handleNavigationClick={this.handleNavigationClick}
									author={this.state.blogs[3].author}
									title={this.state.blogs[3].en.title}
									date={this.state.blogs[3].publish_date}
									description={this.state.blogs[3].en.body}
									uuid={this.state.blogs[3].uuid}
									link="/"
								/>
							</div>
						</div>
					) : null}
					<br />
					<br />
					<div style={{ textAlign: "center" }}>
						{" "}
						<Link
							to={{
								pathname: "/blog"
							}}
						>
							<button className="bloghome_button">Read More...</button>
						</Link>
						<br />
						<br />
					</div>
				</section>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		blogsDetails: state.blogReducer
	};
};

const mapDispatchToProps = dispatch => {
	return {
		getBlogs: page => {
			dispatch(getBlogs(page));
		},
		getBlog: body => {
			dispatch(getBlog(body));
		}
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Blogs);
