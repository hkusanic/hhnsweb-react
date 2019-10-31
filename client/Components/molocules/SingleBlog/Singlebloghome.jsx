import React, { Component } from "react";
import { Card } from "antd";
import renderHTML from "react-render-html";
import { Link } from "react-router-dom";

const { Meta } = Card;

export class SingleBlogHome extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div className="col-md-6 page1">
				<Card
					hoverable
					style={{
						borderRadius: "4px",
						width: "100%"
					}}
				>
					<Link to={this.props.to}>
						<img
							style={{ height: "132px" }}
							alt="author photo"
							src={this.props.image}
						/>
						<div className="singleblog_title">{this.props.author}</div>
						<br />
						<div className="singleblog_description">
							{renderHTML(this.props.description)}
						</div>
						<br />
						<hr />
						<br />
						<div className="singleblog_div">
							<div className="singleblog_author">
								{" "}
								{this.props.source}
								<br />
								<div className="singleblog_time">
									{new Date(this.props.date).toDateString()}
								</div>
							</div>
						</div>
					</Link>
				</Card>
			</div>
		);
	}
}

export default SingleBlogHome;
