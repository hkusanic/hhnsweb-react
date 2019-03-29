import React, { Component } from "react";
import renderHTML from "react-render-html";
import Pagination from "react-js-pagination";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { searchLecture } from "../../../actions/lectureActions";
import Auth from "../../../utils/Auth";
import { Translate } from "react-localize-redux";
import SearchFilter from "../SeachFilter/SearchFilter";
import {Collapse} from 'react-collapse';
import reactCookie from 'react-cookies';

export class AudioList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isUserLogin: true,
			totalItem: null,
			currentPage: null,
			page: null,
			lectures: [],
			body: {},
			iconSearch: true,
			isSearch: false,
		};
	}

	componentDidMount() {
		const isUserLogin = Auth.isUserAuthenticated();
		this.setState({
			lectures: this.props.lecturesDetails.lectures,
			currentPage: this.props.lecturesDetails.currentPage,
			totalItem: this.props.lecturesDetails.totalLectures,
			isUserLogin
		});
		this.props.searchLecture({ page: 1 });
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			lectures: nextProps.lecturesDetails.lectures,
			currentPage: nextProps.lecturesDetails.currentPage,
			totalItem: nextProps.lecturesDetails.totalLectures
		});
	}

	handlePageChange = pageNumber => {
		let body = Object.assign({}, this.state.body);
		body.page = pageNumber;
		this.props.searchLecture(body);
	};

	showing100Characters = sentence => {
		var result = sentence;
		var resultArray = result.split(" ");
		if (resultArray.length > 10) {
			resultArray = resultArray.slice(0, 10);
			result = resultArray.join(" ") + "...";
		}
		return result;
	};

	searchData = body => {
		this.setState({ body, isSearch: true
		}, () => {
			this.props.searchLecture(body);
		});
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
					<img  className="img-banner-width" src="https://ik.imagekit.io/gcwjdmqwwznjl/Booking_v2_HkCb1eBDV.png" />
				</section>
				{!this.state.isUserLogin ? (
					<div>
						<div style={{ textAlign: "center" }}>
							<p className="bookingForm">
								<Translate>
									{({ translate }) => translate("HOME.audio")}
								</Translate>
								<i onClick={()=>this.onClickIcon(false)} className={class_icon_search}  aria-hidden="true"></i>
								<i onClick={()=>this.onClickIcon(true)} className={class_icon_close}  aria-hidden="true"></i>
					 
					  </p>
						</div>
						<div className="container">
							<Collapse isOpened={!this.state.iconSearch}>
								<SearchFilter searchData={this.searchData} />
                    	    </Collapse>
							<div className="table-responsive wow fadeIn">
								{this.state.lectures.length > 0 ? (
									<table className="table table-hover table-job-positions videoTable">
										<thead>
											<tr>
												<th className="align">Title</th>
												<th className="align">Downloads</th>
											</tr>
										</thead>
										<tbody>
											{this.state.lectures.map((item, key) => {
												return (
													<tr key={key}>
														<td className="titleColor">
															{" "}
															<Link
																to={{ pathname: "/audioDetails", state: item }}
															>
																{renderHTML(reactCookie.load('languageCode') === 'en' ? item.en.title : item.ru.title)}
															</Link>
															<br/>
															<br/>
															<audio controls controlsList="nodownload">
																<source
																	src={renderHTML(item.audio_link)}
																	type="audio/mpeg"
																/>
															</audio>
															
														</td>
														
													
														<td>{item.downloads}      <a href={item.audio_link} download="download"><i style={{"cursor":"pointer"}}  class="fa fa-download" aria-hidden="true"></i></a>											
					</td>
													</tr>
												);
											})}
										</tbody>
									</table>
								) : (
									<div style={{ textAlign: "center" }}>
										<p className="bookingForm">
										  {this.state.isSearch ? 'No Record Found' : 'Hare Krishna...'}
										</p>
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
				) : 
				<div style={{ textAlign: "center" }}>
					<p className="bookingForm">Please Log in to continue</p>
				</div>
				}
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
)(AudioList);
