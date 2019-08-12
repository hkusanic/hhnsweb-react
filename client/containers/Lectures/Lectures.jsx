import React, { Component } from 'react';
import { Pagination } from 'antd';
import { Link } from 'react-router-dom';
import SingleLecture from '../../Components/molocules/SingleLecture/SingleLecture';
import { connect } from 'react-redux';
import { searchLecture, updateCounters } from '../../actions/lectureActions';
import Auth from '../../utils/Auth';
import { Translate } from 'react-localize-redux';
import Breadcrumb from 'react-bootstrap/Breadcrumb';

export class Lectures extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isUserLogin: true,
			totalItem: null,
			currentPage: null,
			page: null,
			lectures: [],
		};
	}
	componentDidMount() {
		const isUserLogin = Auth.isUserAuthenticated();
		this.setState({
			lectures: this.props.lecturesDetails.lectures,
			currentPage: this.props.lecturesDetails.currentPage,
			totalItem: this.props.lecturesDetails.totalLectures,
			isUserLogin,
		});
		this.props.searchLecture({ page: 1 });
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			lectures: nextProps.lecturesDetails.lectures,
			currentPage: nextProps.lecturesDetails.currentPage,
			totalItem: nextProps.lecturesDetails.totalLectures,
		});
	}

	handlePageChange = pageNumber => {
		this.props.searchLecture({ page: pageNumber });
	};

	showing100Characters = sentence => {
		var result = sentence;
		var resultArray = result.split(' ');
		if (resultArray.length > 10) {
			resultArray = resultArray.slice(0, 10);
			result = resultArray.join(' ') + '...';
		}
		return result;
	};

	render() {
		return (
			<div>
				<section
					className="bg-gray-100"
					style={{
						backgroundImage:
							'url(https://ik.imagekit.io/gcwjdmqwwznjl/Booking_v2_HkCb1eBDV.png)',
					}}
				>
					{!this.state.isUserLogin ? (
						<div class="breadcrumbs-custom-inner headingImage">
							<div class="container breadcrumbs-custom-container">
								<ul class="breadcrumbs-custom-path">
									<li>
										<Link to="" onClick={() => this.props.history.push('/')}>
											<Breadcrumb.Item>Home</Breadcrumb.Item>
										</Link>
									</li>
									<li>
										<a className="textColor">Lecture</a>
									</li>
								</ul>
							</div>
						</div>
					) : null}
				</section>
				{!this.state.isUserLogin ? (
					<div className="container">
						<div style={{ textAlign: 'center' }}>
							<p className="bookingForm">
								<Translate>
									{({ translate }) => translate('lecturesTitle')}
								</Translate>
							</p>
						</div>
						<div className="row row-50 row-xxl-70">
							{this.state.lectures.map((item, key) => {
								return <SingleLecture lecture={item} key={key} />;
							})}
						</div>
						<Pagination
							className="paginationStyle antPage"
							innerClass="pagination"
							activeClass="page-item active"
							itemClass="page-item"
							linkClass="page-link button-winona"
							activePage={this.state.currentPage}
							pageSize={20}
							total={this.state.totalItem}
							pageRangeDisplayed={5}
							onChange={this.handlePageChange}
						/>
					</div>
				) : (
					<div className="loginText">
						<p className="bookingForm">Please log in to continue</p>
					</div>
				)}
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		lecturesDetails: state.lectureReducer,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		searchLecture: page => {
			dispatch(searchLecture(page));
		},
		updateCounters: body => {
			dispatch(updateCounters(body));
		},
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Lectures);
