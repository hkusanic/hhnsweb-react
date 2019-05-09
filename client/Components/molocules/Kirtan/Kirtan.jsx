import React, { Component } from 'react';
import { Button, Icon } from 'antd';
import { Link } from 'react-router-dom';
import renderHTML from 'react-render-html';
import Pagination from 'react-js-pagination';
import { connect } from 'react-redux';
import { searchKirtan } from '../../../actions/kirtanAction';
import Auth from '../../../utils/Auth';
import SearchFilter from '../SeachFilter/SearchFilter';
import { Collapse } from 'react-collapse';
import reactCookie from 'react-cookies';
import Breadcrumb from 'react-bootstrap/Breadcrumb';

export class Kirtan extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isUserLogin: true,
			totalItem: null,
			currentPage: null,
			page: null,
			kirtans: [],
			body: {
				page: 1,
			},
			iconSearch: true,
			isSearch: false,
		};
	}

	componentDidMount() {
		const isUserLogin = Auth.isUserAuthenticated();
		this.setState({
			kirtans: this.props.kirtanDetails.kirtans,
			currentPage: this.props.kirtanDetails.currentPage,
			totalItem: this.props.kirtanDetails.totalKirtans,
			isUserLogin,
		});
		this.props.searchKirtan({ page: 1 });
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			kirtans: nextProps.kirtanDetails.kirtans,
			currentPage: nextProps.kirtanDetails.currentPage,
			totalItem: nextProps.kirtanDetails.totalKirtans,
		});
	}

	handlePageChange = pageNumber => {
		let body = Object.assign({}, this.state.body);
		body.page = pageNumber;
		this.props.searchKirtan(body);
	};

	onClickIcon = value => {
		this.setState({ iconSearch: value });
	};

	searchData = body => {
		body.transcriptions = true;
		this.setState({ body, isSearch: true }, () => {
			this.props.searchKirtan(body);
		});
	};

	render() {
			<div>
				<section className="bg-gray-100">
					<img src="https://ik.imagekit.io/gcwjdmqwwznjl/Booking_v2_HkCb1eBDV.png" />
				</section>
				{!this.state.isUserLogin ? (
					<div>
						<div className="container mt-5">
							<div className="row justify-content-center align-items-center">
								<div className="col-lg-10">
									<Breadcrumb>
										<Link to=" " onClick={() => this.props.history.push('/')}>
											<Breadcrumb.Item>Home</Breadcrumb.Item>
										</Link>
										<Icon
											type="double-right"
											style={{
												alignSelf: 'center',
												paddingLeft: 5,
												paddingRight: 5,
											}}
										/>
										<Breadcrumb.Item active>Kirtan</Breadcrumb.Item>
									</Breadcrumb>
								</div>
							</div>
							<div
								className="row justify-content-center"
								style={{ marginTop: '0', marginBottom: '0' }}
							>
								<div className="col-lg-10">
									<div style={{ textAlign: 'center' }}>
										<Button
											type="primary"
											icon="search"
											shape="circle"
											onClick={() => this.onClickIcon(!this.state.iconSearch)}
										/>
									</div>
								</div>
							</div>
							{!this.state.iconSearch && (
								<div
									className="row justify-content-center"
									style={{ marginTop: '0' }}
								>
									<div className="col-lg-10">
										<Collapse isOpened={!this.state.iconSearch}>
											<SearchFilter searchData={this.searchData} />
										</Collapse>
									</div>
								</div>
							)}
							<div className="table-responsive wow fadeIn">
								{this.state.kirtans.length > 0 ? (
									<table className="table table-hover table-job-positions kirtanTable">
										<thead>
											<tr>
												<th className="align">Title</th>
												<th className="align">Views</th>
											</tr>
										</thead>
										<tbody>
											{this.state.kirtans.map((item, key) => {
												return (
													<tr key={key}>
														<td className="titleColor dataRowAlign">
															<Link
																to={{
																	pathname: `/kirtanDetails/${item.uuid}`,
																	state: item,
																}}
															>
																{renderHTML(
																	reactCookie.load('languageCode') === 'en'
																		? item.en.title
																		: item.ru.title
																)}
															</Link>
														</td>
														<td className="dataRowAlign">{item.downloads}</td>
													</tr>
												);
											})}
										</tbody>
									</table>
								) : (
									<div style={{ textAlign: 'center' }}>
										<p className="bookingForm">
											{this.state.isSearch
												? 'No Record Found'
												: 'Hare Krishna...'}
										</p>
									</div>
								)}
							</div>
						</div>
						<div className="padkirtanLeft">
							{this.state.kirtans.length > 0 ? (
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

const mapStateToProps = state => {
	return {
		kirtanDetails: state.kirtanReducer,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		searchKirtan: body => {
			dispatch(searchKirtan(body));
		},
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Kirtan);
