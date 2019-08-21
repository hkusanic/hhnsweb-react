import React, { Component } from "react";
import { Card } from "antd";
import renderHTML from "react-render-html";
import { Link } from "react-router-dom";

const { Meta } = Card;

export class SingleBlogHome extends Component {
	constructor(props) {
		super(props);
	}

	showing100Characters = sentence => {
		var result = sentence;
		var resultArray = result.split(" ");
		if (resultArray.length > 10) {
			resultArray = resultArray.slice(0, 10);
			result = resultArray.join(" ") + "...";
		}
		return result;
	};
	render() {
		return (
			<Link
				to={{
					pathname: `/blogDetails/${this.props.uuid}`,
					state: this.props.blog
				}}
			>
				<div class="col-md-12 col-lg-6 page1 col-12">
					<Card
						style={{
							borderRadius: "4px"
							// width: "37.62811127379209vw"
							// height: "30.441400304414003vh"
						}}
					>
						<div className="singleblog_title">{this.props.title}</div>
						<br />
						<div className="singleblog_description">
							{/* {props.description} */}
							{renderHTML(this.showing100Characters(this.props.description))}
						</div>
						<br />
						<hr />
						<br />
						<div className="singleblog_div">
							<div className="singleblog_author">
								{" "}
								{this.props.author}
								<br />
								<div className="singleblog_time">
									{new Date(this.props.date).toDateString()}
								</div>
							</div>
							<div>
								<button className="singleblog_button"> Devotee </button>
								<button className="singleblog_button">India</button>
								<button className="singleblog_button">Quote</button>
							</div>
						</div>
					</Card>
				</div>
			</Link>
		);
	}
}

export default SingleBlogHome;
