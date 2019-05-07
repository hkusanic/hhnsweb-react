import React, { Component } from 'react';
import { Table, Icon } from 'antd';
import Auth from '../../../utils/Auth';
import { connect } from 'react-redux';
import {
	searchLecture,
	searchLectureTranscriptions
} from '../../../actions/lectureActions';
import { Link } from 'react-router-dom';
import renderHTML from 'react-render-html';
import Pagination from 'react-js-pagination';
import reactCookie from 'react-cookies';
import SearchFilter from '../SeachFilter/SearchFilter';
import { Collapse } from 'react-collapse';
import { Translate } from 'react-localize-redux';

import Breadcrumb from 'react-bootstrap/Breadcrumb';

const columns = [
	{
		title: 'Title',
		dataIndex: renderHTML(
			reactCookie.load('languageCode') === 'en' ? 'en.title' : 'ru.title'
		),
		render: (text, record, index) => (
			<Link
				to={{
					pathname: `/transcriptionDetails/${record.uuid}`,
					state: record
				}}>
				{renderHTML(
					reactCookie.load('languageCode') === 'en'
						? record.en.title
						: record.ru.title
				)}
			</Link>
		)
	},
	{
		title: 'View',
		dataIndex: renderHTML(
			reactCookie.load('languageCode') === 'en'
				? 'counters.en_transcription_view'
				: 'counters.ru_transcription_view'
		)
	}
];

const defaultPageSize = 20;

export class Transcritpion extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isUserLogin: true,
			totalItem: null,
			currentPage: null,
			page: null,
			transcriptions: [],
			iconSearch: true,
			body: {
				page: 1,
				transcriptions: true
			},
			isSearch: false,
			data: [],
			pagination: {},
			loading: false
		};
	}

	handleTableChange = (pagination, filters, sorter) => {
		// console.log('pagination from htc: ', pagination);
		const pager = { ...this.state.pagination };
		pager.current = pagination.current;
		pager.total = this.props.lecturesDetails.totalLectures;
		this.setState({
			pagination: pager
		});

		let body = { ...this.state.body };
		body.page = pagination.current;
		// console.log('body from htc: ', body);
		this.props.searchLecture(body);
	};

	componentDidMount() {
		let body = { ...this.state.body };
		body.page = this.props.lecturesDetails.transcriptionsCurrentPage || 1;

    this.setState({ loading: true });
		const pagination = { ...this.state.pagination };
		pagination.total = this.props.lecturesDetails.totalLectures;
		pagination.defaultPageSize = defaultPageSize;
		pagination.current =
			this.props.lecturesDetails.transcriptionsCurrentPage || 1;

		const isUserLogin = Auth.isUserAuthenticated();
		this.setState({
			isUserLogin,
			loading: false,
			pagination
		});
		this.props.searchLecture(body);
	}

	componentWillReceiveProps(nextProps) {
		let body = { ...this.state.body };
		body.page = nextProps.lecturesDetails.transcriptionsCurrentPage;
		body.video = true;

		const pagination = { ...this.state.pagination };
		pagination.total = nextProps.lecturesDetails.totalLectures;
		pagination.defaultPageSize = defaultPageSize;
		pagination.current = nextProps.lecturesDetails.transcriptionsCurrentPage;

		this.setState({
			transcriptions: nextProps.lecturesDetails.lectures,
			currentPage: nextProps.lecturesDetails.transcriptionsCurrentPage,
			totalItem: nextProps.lecturesDetails.totalLectures,
			pagination
		});

		if (nextProps.lecturesDetails.Count) {
			this.props.searchLecture(body);
		}
	}

	// handlePageChange = (pageNumber) => {
	// 	let body = Object.assign({}, this.state.body);
	// 	body.page = pageNumber;
	// 	this.props.searchLecture(body);
	// };

	onClickIcon = (value) => {
		this.setState({ iconSearch: value });
	};

	searchData = (body) => {
		body.transcriptions = true;
		this.setState({ body, isSearch: true }, () => {
			this.props.searchLecture(body);
		});
	};

	render() {
		let class_icon_search = this.state.iconSearch
			? 'icon-search fa fa-search'
			: 'display-none-icon';
		let class_icon_close = this.state.iconSearch
			? 'display-none-icon'
			: 'icon-search fa fa-close';

		// console.log('trans ====> ', this.props.lecturesDetails.lectures);

		return (
			<div>
				<section className="bg-gray-100">
					<img src="https://ik.imagekit.io/gcwjdmqwwznjl/Booking_v2_HkCb1eBDV.png" />
				</section>
				{!this.state.isUserLogin ? (
					<div>
						<div style={{ textAlign: 'center' }}>
							<p className="bookingForm">
								<Translate>
									{({ translate }) => translate('HOME.Transcriptions')}
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

							<div className="row justify-content-center align-items-center">
								<div className="col-lg-10">
									<Breadcrumb>
										<Link to=" " onClick={() => this.props.history.push('/')}>
											<Breadcrumb.Item>Home</Breadcrumb.Item>
										</Link>
										<Icon type="double-right" style={{ alignSelf: 'center', paddingLeft: 5, paddingRight: 5 }} />
										<Breadcrumb.Item active>Transcriptions</Breadcrumb.Item>
									</Breadcrumb>
								</div>
							</div>

							<div className="row justify-content-center">
								<div className="col-lg-10">
									<div className="table-responsive wow fadeIn">
										{this.state.transcriptions.length > 0 ? (
											// <table className="table table-hover table-job-positions videoTable">
											// 	<thead>
											// 		<tr>
											// 			<th className="align">Title</th>
											// 			<th className="align">View</th>
											// 		</tr>
											// 	</thead>
											// 	<tbody>
											// 		{this.state.transcriptions.map((item, key) => {
											// 			return (
											// 				<tr key={key}>
											// 					<td className="titleColor dataRowAlign">
											// 						{' '}
											// 						<Link
											// 							to={{
											// 								pathname: '/transcriptionDetails',
											// 								state: item
											// 							}}>
											// 							{renderHTML(
											// 								reactCookie.load('languageCode') === 'en'
											// 									? item.en.title
											// 									: item.ru.title
											// 							)}
											// 						</Link>
											// 					</td>
											// 					<td>
											// 						{reactCookie.load('languageCode') === 'en'
											// 							? item.counters.en_transcription_view
											// 							: item.counters.ru_transcription_view}
											// 					</td>
											// 				</tr>
											// 			);
											// 		})}
											// 	</tbody>
                      // </table>
                      
                      <div>
												<Table
													columns={columns}
													rowKey={(record) => record.uuid}
													dataSource={this.props.lecturesDetails.lectures}
													pagination={this.state.pagination}
													loading={this.state.loading}
													onChange={this.handleTableChange}
												/>
											</div>
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
							</div>
						</div>
						{/* <div className="padLeft">
							{this.state.transcriptions.length > 0 ? (
								<Pagination
									className="paginationStyle"
									innerClass="pagination"
									activeClass="page-item active"
									itemClass="page-item"
									linkClass="page-link button-winona"
									activePage={
										this.props.lecturesDetails.transcriptionsCurrentPage
									}
									itemsCountPerPage={20}
									totalItemsCount={this.state.totalItem}
									pageRangeDisplayed={5}
									onChange={this.handlePageChange}
								/>
							) : null}
						</div> */}
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
			dispatch(searchLectureTranscriptions(body));
		}
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Transcritpion);
