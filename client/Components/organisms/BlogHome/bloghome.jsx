import React, { Component } from "react";
import { Link } from "react-router-dom";
import script from "../../../assets/script";
import { Pagination, Icon, Button } from "antd";
import renderHTML from "react-render-html";
import SingleBlogHome from "../../molocules/SingleBlog/Singlebloghome";
import { connect } from "react-redux";
import { getBlogs, getBlog } from "../../../actions/blogActions";
import Auth from "../../../utils/Auth";
import { Translate } from "react-localize-redux";
import QuoteOfDay from "../../molocules/SingleQuote/QuotesOfDay";
import { Redirect } from "react-router-dom";
// import { connect } from "react-redux";
import { quoteOfDay } from "../../../actions/quoteActions";

export class Blogs extends Component {
	constructor(props) {
		super(props);
		this.state = {
			quotes: []
		};
	}

	// componentDidMount() {
	// 	this.setState({
	// 		totalItem: this.props.blogsDetails.totalBlogs,
	// 		blogs: this.props.blogsDetails.blogs
	// 	});
	// 	this.props.getBlogs(1);
	// }

	componentDidMount() {
		script();
		let authorList = ["Niranjana Swami", "Srila Prabhupada"];
		this.props.quoteOfDay(authorList);
		this.setState({
			quotes: this.props.quote.quotes
		});
	}

	// componentWillReceiveProps(nextprops) {
	// 	script();
	// 	console.log(nextprops);
	// 	console.log(this.props);
	// 	let authorList = ["Niranjana Swami", "Srila Prabhupada"];
	// 	this.props.quoteOfDay(authorList);
	// }

	// componentDidUpdate() {
	// 	// script();
	// 	// let authorList = ["Niranjana Swami", "Srila Prabhupada"];
	// 	// this.props.quoteOfDay(authorList);
	// 	this.setState({
	// 		quotes: this.props.quote.quotes
	// 	});
	// }

	render() {
		if (!this.props.quote) {
			<div> Loading... </div>;
		}
		return (
			<div>
				{console.log(this.props.quote)}
				{console.log(this.state.quotes)}
				<section>
					<div style={{ textAlign: "center" }}>
						<h3 style={{ marginTop: "25px" }}> Quotes of the day </h3>
						{/* <h4> Lorem ipsum dolor sit amet, consectetur adipiscing elit </h4> */}
						<br />
						<br />
					</div>
					{this.props.quote.quotes.length > 0 ? (
						<div className="container centerAlign">
							<div className="row row-50 row-xxl-70">
								<SingleBlogHome
									author={this.props.quote.quotes[0].author}
									source={this.props.quote.quotes[0].en.source_of_quote}
									date={this.props.quote.quotes[0].published_date}
									description={this.props.quote.quotes[0].en.body}
									to={{
										pathname: "/quotes/Niranjana Swami",
										state: "Niranjana Swami"
									}}
									image="images/person1.jpg"
								/>

								<SingleBlogHome
									author={this.props.quote.quotes[1].author}
									source={this.props.quote.quotes[1].en.source_of_quote}
									date={this.props.quote.quotes[1].published_date}
									description={this.props.quote.quotes[1].en.body}
									to={{
										pathname: "/quotes/Srila Prabhupada",
										state: "Srila Prabhupada"
									}}
									image="images/person2.jpg"
								/>
							</div>
						</div>
					) : null}
					<br />
					<br />
					{/* <div style={{ textAlign: "center" }}>
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
					</div> */}
				</section>
			</div>
		);
	}
}

// const mapStateToProps = state => {
// 	return {
// 		blogsDetails: state.blogReducer
// 	};
// };

// const mapDispatchToProps = dispatch => {
// 	return {
// 		getBlogs: page => {
// 			dispatch(getBlogs(page));
// 		},
// 		getBlog: body => {
// 			dispatch(getBlog(body));
// 		}
// 	};
// };

// export default connect(
// 	mapStateToProps,
// 	mapDispatchToProps
// )(Blogs);

const mapStateToProps = state => {
	return {
		quote: state.quoteReducer
	};
};

const mapDispatchToProps = dispatch => {
	return {
		quoteOfDay: authorList => {
			dispatch(quoteOfDay(authorList));
		}
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Blogs);
