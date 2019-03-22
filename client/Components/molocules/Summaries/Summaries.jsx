import React, { Component } from "react";
import Auth from "../../../utils/Auth";
import { connect } from "react-redux";
import { searchLecture } from "../../../actions/lectureActions";
import { Link } from "react-router-dom";
import renderHTML from "react-render-html";
import Pagination from "react-js-pagination";
import SearchFilter from "../SeachFilter/SearchFilter";
import {Collapse} from 'react-collapse';
import reactCookie from 'react-cookies';

export class Summaries extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isUserLogin: true,
			totalItem: null,
			currentPage: null,
			page: null,
			summaries: [],
			iconSearch: true,
			body: {
				page: 1, 
				summaries: true
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
			summaries: nextProps.lecturesDetails.lectures,
			currentPage: nextProps.lecturesDetails.currentPage,
			totalItem: nextProps.lecturesDetails.totalLectures
		});
	}
	searchData = body => {
		body.summaries = true;
		this.setState({ body }, () => {
			this.props.searchLecture(body);
		});
	};

	handlePageChange = pageNumber => {
		let body = Object.assign({}, this.state.body);
		body.page = pageNumber;
		this.props.searchLecture(body);
	};

	onClickIcon= (value) =>{
		this.setState({iconSearch : value});
	}

	render() {
		let class_icon_search = this.state.iconSearch? 'icon-search fa fa-search': 'display-none-icon';
		let class_icon_close = this.state.iconSearch? 'display-none-icon': 'icon-search fa fa-close';
		return (
			<div>
				<section className="bg-gray-100">
					<img src="https://ik.imagekit.io/gcwjdmqwwznjl/Booking_v2_HkCb1eBDV.png" />
				</section>
				{!this.state.isUserLogin ? (
					<div>
						<div style={{ textAlign: "center" }}>
							<p className="bookingForm">Summaries
								<i onClick={()=>this.onClickIcon(false)} className={class_icon_search}  aria-hidden="true"></i>
								<i onClick={()=>this.onClickIcon(true)} className={class_icon_close}  aria-hidden="true"></i>
							</p>
						</div>
						<Collapse isOpened={!this.state.iconSearch}>
						<SearchFilter searchData={this.searchData} />
                       </Collapse>
						<div className="container">
							<div className="table-responsive wow fadeIn">
								{this.state.summaries.length > 0 ? (
									<table className="table table-hover table-job-positions videoTable">
										 <thead>
                                            <tr>
                                                <th className="align">Title</th>
                                            </tr>
                                        </thead>
										<tbody>
											{this.state.summaries.map((item, key) => {
												return (
													<tr key={key}>
														<td className="titleColor dataRowAlign">
															{" "}
															<Link
																to={{ pathname: "/summariesDetails", state: item }}
															>
																{renderHTML(reactCookie.load('languageCode') === 'en' ? item.en.title :item.ru.title)}
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
						{
							this.state.summaries.length > 0 ? 
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
							: null
						}		
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
)(Summaries);
