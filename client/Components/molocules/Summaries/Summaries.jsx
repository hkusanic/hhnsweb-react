import React, { Component } from 'react';
import { Button, Table, Icon } from 'antd';
import Auth from '../../../utils/Auth';
import { connect } from 'react-redux';
import {
	searchLecture,
	searchLectureSummaries,
} from '../../../actions/lectureActions';
import { Link } from 'react-router-dom';
import renderHTML from 'react-render-html';
import SearchFilter from '../SeachFilter/SearchFilter';
import { Collapse } from 'react-collapse';
import reactCookie from 'react-cookies';
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
					pathname: `/summariesDetails/${record.uuid}`,
					state: record,
				}}
			>
				{renderHTML(
					reactCookie.load('languageCode') === 'en'
						? record.en.title
						: record.ru.title
				)}
			</Link>
		),
	},
	{
		title: 'View',
		dataIndex: renderHTML(
			reactCookie.load('languageCode') === 'en'
				? 'counters.en_summary_view'
				: 'counters.ru_summary_view'
		),
	},
];

const defaultPageSize = 20;

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
				summaries: true,
			},
			isSearch: false,
			data: [],
			pagination: {},
			loading: false,
		};
	}

	handleTableChange = (pagination, filters, sorter) => {
		const pager = { ...this.state.pagination };
		pager.current = pagination.current;
		pager.total = this.props.lecturesDetails.totalLectures;
		this.setState({
			pagination: pager,
		});

		let body = { ...this.state.body };
		body.page = pagination.current;
		this.props.searchLecture(body);
	};

	componentDidMount() {
		let body = { ...this.state.body };
		body.page = this.props.lecturesDetails.summariesCurrentPage || 1;

		this.setState({ loading: true });
		const pagination = { ...this.state.pagination };
		pagination.total = this.props.lecturesDetails.totalLectures;
		pagination.defaultPageSize = defaultPageSize;
		pagination.current = this.props.lecturesDetails.summariesCurrentPage || 1;

		const isUserLogin = Auth.isUserAuthenticated();
		this.setState({
			isUserLogin,
			loading: false,
			pagination,
		});
		this.props.searchLecture(body);
	}
	componentWillReceiveProps(nextProps) {
		let body = { ...this.state.body };
		body.page = nextProps.lecturesDetails.summariesCurrentPage;
		body.video = true;

		const pagination = { ...this.state.pagination };
		pagination.total = nextProps.lecturesDetails.totalLectures;
		pagination.defaultPageSize = defaultPageSize;
		pagination.current = nextProps.lecturesDetails.summariesCurrentPage;

		this.setState({
			summaries: nextProps.lecturesDetails.lectures,
			currentPage: nextProps.lecturesDetails.summariesCurrentPage,
			totalItem: nextProps.lecturesDetails.totalLectures,
		});

		if (nextProps.lecturesDetails.Count) {
			this.props.searchLecture(body);
		}
	}
	searchData = body => {
		body.summaries = true;
		this.setState({ body, isSearch: true }, () => {
			this.props.searchLecture(body);
		});
	};

	onClickIcon = value => {
		this.setState({ iconSearch: value });
	};

	render() {
		return (
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
										<Breadcrumb.Item active>Summaries</Breadcrumb.Item>
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
							<div className="row justify-content-center">
								<div className="col-lg-10">
									<div className="table-responsive wow fadeIn">
										{this.state.summaries.length > 0 ? (
											<div>
												<Table
													columns={columns}
													rowKey={record => record.uuid}
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
		lecturesDetails: state.lectureReducer,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		searchLecture: body => {
			dispatch(searchLectureSummaries(body));
		},
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Summaries);
