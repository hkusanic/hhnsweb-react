import React, { Component } from "react";
import reactCookie from "react-cookies";
import { connect } from "react-redux";
import { Card } from "antd";
import { getContents } from "../../actions/contentAction";
import { Link } from "react-router-dom";

class ContentDetails extends Component {
	constructor(props) {
		super(props);
		this.state = {
			content: []
		};
	}

	componentDidMount() {
		this.setState({
			content: this.props.contentDetails.content
		});
		this.props.getContents({ page: 1 });
	}

	render() {
		return (
			<div className="centerAlign recentActivityCard">
				<br />
				<h3 style={{ fontFamily: "Charter" }}> Lecture Dubbed in Russian </h3>
				<br />
				<hr />
				<br />
				<br />
				{this.props.contentDetails &&
					this.props.contentDetails.content &&
					this.props.contentDetails.content.map(eachContent => {
						return (
							<div
								style={{ paddingBottom: "3%", textAlign: "left" }}
								key={eachContent.content_uuid}
							>
								<Link
									style={{ fontFamily: "Charter" }}
									key={eachContent.content_uuid}
									to={`/${eachContent.content_type.toLowerCase()}Details/${
										eachContent.content_uuid
									}`}
								>
									{`New**     ${eachContent.content_type}`}
								</Link>
								<div className="recentContent_title">
									{reactCookie.load("languageCode") === "en"
										? eachContent.content_title_en
											? eachContent.content_title_en
											: eachContent.content_title_ru
											? eachContent.content_title_ru
											: "NA"
										: eachContent.content_title_ru
										? eachContent.content_title_ru
										: eachContent.content_title_en
										? eachContent.content_title_en
										: "NA"}
								</div>
								<p
									style={{ marginTop: "0px", fontFamily: "Charter" }}
									key={eachContent.content_id}
								>{`Posted On     ${new Date(
									eachContent.created_date_time
								).toLocaleString("en-GB")}`}</p>
							</div>
						);
					})}
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		contentDetails: state.contentReducer
	};
};

const mapDispatchToProps = dispatch => {
	return {
		getContents: page => {
			dispatch(getContents(page));
		}
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ContentDetails);
