import React, { Component } from 'react';
import renderHTML from 'react-render-html';
import Pagination from 'react-js-pagination';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { searchLecture } from '../../../actions/lectureActions';
import { Translate } from 'react-localize-redux';
import SearchFilter from '../SeachFilter/SearchFilter';
import { Collapse } from 'react-collapse';
import Auth from '../../../utils/Auth';
import reactCookie from 'react-cookies';

export class VideoList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isUserLogin: true,
			totalItem: null,
			currentPage: null,
			page: null,
			videos: [],
			iconSearch: true,
			isSearch: false,
			body: {
				page: 1,
				video: true
			}
		};
	}

	componentDidMount() {
		const isUserLogin = Auth.isUserAuthenticated();
		this.setState({
			videos: this.props.lecturesDetails.lectures,
			currentPage: this.props.lecturesDetails.currentPage,
			totalItem: this.props.lecturesDetails.totalLectures,
			isUserLogin
    });
    
		this.state.body.page = this.props.lecturesDetails.currentPage || 1;

		this.props.searchLecture(this.state.body);
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			videos: nextProps.lecturesDetails.lectures,
			currentPage: nextProps.lecturesDetails.currentPage,
			totalItem: nextProps.lecturesDetails.totalLectures
    });
    if (nextProps.lecturesDetails.Count) {
			this.state.body.page = sessionStorage.getItem('lecture_page') || 1;
			this.props.searchLecture(this.state.body);
		}
	}

	handlePageChange = (pageNumber) => {
    sessionStorage.setItem('lecture_page', pageNumber);
		let body = Object.assign({}, this.state.body);
		body.page = pageNumber;
		this.props.searchLecture(body);
	};

	showing100Characters = (sentence) => {
		var result = sentence;
		var resultArray = result.split(' ');
		if (resultArray.length > 10) {
			resultArray = resultArray.slice(0, 10);
			result = resultArray.join(' ') + '...';
		}
		return result;
	};

	onClickIcon = (value) => {
		this.setState({ iconSearch: value });
	};

	searchData = (body) => {
		body.video = true;
		this.setState({ body, isSearch: false }, () => {
			this.props.searchLecture(body);
		});
  };
  
  goHome = () => {
		this.props.history.push('/');
		// this.props.location.state.handleNavigationClick(1);
		// window.sessionStorage.setItem('tabIndex', 1);
	};

	render() {
		let class_icon_search = this.state.iconSearch
			? 'icon-search fa fa-search'
			: 'display-none-icon';
		let class_icon_close = this.state.iconSearch
			? 'display-none-icon'
			: 'icon-search fa fa-close';

		return (
			<div>
				<section className="bg-gray-100">
					<img
						className="img-banner-width"
						src="https://ik.imagekit.io/gcwjdmqwwznjl/Booking_v2_HkCb1eBDV.png"
					/>
				</section>
				{!this.state.isUserLogin ? (
					<div>
						<div style={{ textAlign: 'center' }}>
							<p className="bookingForm">
								<Translate>
									{({ translate }) => translate('HOME.video')}
								</Translate>
								<i
									onClick={() => this.onClickIcon(false)}
									className={class_icon_search}
									aria-hidden="true"
								/>
								<i
									onClick={() => this.onClickIcon(true)}
									className={class_icon_close}
									aria-hidden="true"
								/>
							</p>
						</div>
						<div className="container">
							<Collapse isOpened={!this.state.iconSearch}>
								<SearchFilter searchData={this.searchData} />
              </Collapse>
              
              <button onClick={this.goHome}>Home</button>

							<div className="table-responsive wow fadeIn videoTable">
								{this.state.videos.length > 0 ? (
									<table className="table table-hover table-job-positions">
										<thead>
											<tr>
												<th className="align">Title</th>
												<th className="align">View</th>
											</tr>
										</thead>
										<tbody>
											{this.state.videos.map((item, key) => {
												return (
													<tr key={key}>
														<td className="titleColor dataRowAlign">
															<Link
																to={{ pathname: '/videoDetails', state: item }}>
																{renderHTML(
																	reactCookie.load('languageCode') === 'en'
																		? item.en.title
																		: item.ru.title
																)}
															</Link>
														</td>
														<td>{item.counters.video_page_view}</td>
													</tr>
												);
											})}
										</tbody>
									</table>
								) : (
									<div style={{ textAlign: 'center' }}>
										<p className="bookingForm">No Records Found</p>
										<p className="bookingForm">
											{this.state.isSearch
												? 'No Record Found'
												: 'Hare Krishna...'}
										</p>
									</div>
								)}
							</div>
						</div>
						<div className="padLeft">
							{this.state.videos.length > 0 ? (
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
							) : null}
						</div>
					</div>
				) : (
					<div style={{ textAlign: 'center' }}>
						<p className="bookingForm">Please Log in to continue</p>
					</div>
				)}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		lecturesDetails: state.lectureReducer
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		searchLecture: (body) => {
			dispatch(searchLecture(body));
		}
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(VideoList);
