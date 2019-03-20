import React, { Component } from "react";
import Auth from "../../../utils/Auth";
import { connect } from "react-redux";
import { searchLecture } from "../../../actions/lectureActions";
import { Link } from "react-router-dom";
import renderHTML from "react-render-html";
import Pagination from "react-js-pagination";
import reactCookie from 'react-cookies';

export class Transcritpion extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isUserLogin: true,
			totalItem: null,
			currentPage: null,
			page: null,
			transcriptions: [],
			body: {
				page: 1, 
				transcriptions: true
			}
		};
	}

	componentDidMount() {
		const isUserLogin = Auth.isUserAuthenticated();
		this.setState({
			isUserLogin
		});
		this.props.searchLecture(this.state.body);
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			transcriptions: nextProps.lecturesDetails.lectures,
			currentPage: nextProps.lecturesDetails.currentPage,
			totalItem: nextProps.lecturesDetails.totalLectures
		});
	}

	handlePageChange = pageNumber => {
		let body = Object.assign({}, this.state.body);
		body.page = pageNumber;
		this.props.searchLecture(body);
	};

	render() {
		return (
			<div>
				<section className="bg-gray-100">
					<img src="https://ik.imagekit.io/gcwjdmqwwznjl/Booking_v2_HkCb1eBDV.png" />
				</section>
				{!this.state.isUserLogin ? (
					<div>
						<div style={{ textAlign: "center" }}>
							<p className="bookingForm">Transcriptions</p>
						</div>
						<div className="container">
							<div className="table-responsive wow fadeIn">
								{this.state.transcriptions.length > 0 ? (
									<table className="table table-hover table-job-positions dataDiv">
										<tbody>
											{this.state.transcriptions.map((item, key) => {
												return (
													<tr key={key}>
														<td className="titleColor" style={{textAlign: 'left', paddingLeft: '0% !important'}}>
															{" "}
															<Link
																to={{ pathname: "/transcriptionDetails", state: item }}
															>
																{renderHTML(reactCookie.load('languageCode') === 'en' ? item.en.title : item.ru.title)}
															</Link>
														</td>
													</tr>
												);
											})}
										</tbody>
									</table>
								) : (
									<div style={{ textAlign: "center" }}>
										<p className="bookingForm">No Records Found</p>
									</div>
								)}
							</div>
						</div>
						<div className="padLeft">
							<Pagination
								className="paginationStyle"
								innerClass="pagination"
								activeClass="page-item active"
								itemClass="page-item"
								linkClass="page-link button-winona"
								activePage={this.state.currentPage}
								itemsCountPerPage={20}
								totalItemsCount={this.state.totalItem}
								pageRangeDisplayed={5}
								onChange={this.handlePageChange}
							/>
						</div>
					</div>
				) : null}
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		lecturesDetails: state.lectureReducer
	};
};

const mapDispatchToProps = dispatch => {
	return {
		searchLecture: body => {
			dispatch(searchLecture(body));
		}
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Transcritpion);
