import React, { Component } from 'react';
import renderHTML from 'react-render-html';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, Table, Icon } from 'antd';
import {
	searchLecture,
	searchLectureVideo,
} from '../../../actions/lectureActions';
import SearchFilter from '../SeachFilter/SearchFilter';
import { Collapse } from 'react-collapse';
import Auth from '../../../utils/Auth';
import reactCookie from 'react-cookies';
import Breadcrumb from 'react-bootstrap/Breadcrumb';

const defaultPageSize = 20;

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
				video: true,
			},
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
		const isUserLogin = Auth.isUserAuthenticated();
		this.setState({ loading: true });

		let body = { ...this.state.body };
		body.page = this.props.lecturesDetails.videoCurrentPage || 1;
		body.video = true;

		const pagination = { ...this.state.pagination };
		pagination.total = this.props.lecturesDetails.totalLectures;
		pagination.defaultPageSize = defaultPageSize;
		pagination.current = this.props.lecturesDetails.videoCurrentPage || 1;

		this.setState({
			videos: this.props.lecturesDetails.lectures,
			totalItem: this.props.lecturesDetails.totalLectures,
			isUserLogin,
			loading: false,
			pagination,
		});

		this.props.searchLecture(body);
	}

	componentWillReceiveProps(nextProps) {
		let body = { ...this.state.body };
		body.page = nextProps.lecturesDetails.videoCurrentPage;
		body.video = true;

		const pagination = { ...this.state.pagination };
		pagination.total = nextProps.lecturesDetails.totalLectures;
		pagination.defaultPageSize = defaultPageSize;
		pagination.current = nextProps.lecturesDetails.videoCurrentPage;

		this.setState({
			videos: nextProps.lecturesDetails.lectures,
			totalItem: nextProps.lecturesDetails.totalLectures,
			pagination,
		});

		if (nextProps.lecturesDetails.Count) {
			this.props.searchLecture(body);
		}
	}

	showing100Characters = sentence => {
		var result = sentence;
		var resultArray = result.split(' ');
		if (resultArray.length > 10) {
			resultArray = resultArray.slice(0, 10);
			result = resultArray.join(' ') + '...';
		}
		return result;
	};

	onClickIcon = value => {
		this.setState({ iconSearch: value });
	};

	searchData = body => {
		body.video = true;
		this.setState({ body, isSearch: false }, () => {
			this.props.searchLecture(body);
		});
	};

	render() {
		const columns = [
			{
				title: 'Title',
				dataIndex: renderHTML(
					reactCookie.load('languageCode') === 'en' ? 'en.title' : 'ru.title'
				),
				render: (text, record, index) => (
					<Link
						to={{
							pathname: `/videoDetails/${record.uuid}`,
							state: record,
						}}
					>
						{renderHTML(
							this.showing100Characters(
								reactCookie.load('languageCode') === 'en'
									? record.en.title
									: record.ru.title
							)
						)}
					</Link>
				),
			},
			{
				title: 'Views',
				dataIndex: 'counters.video_page_view',
				render: (text, record, index) => record.counters.video_page_view,
			},
		];

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
										<Breadcrumb.Item active>Video</Breadcrumb.Item>
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

							<div className="row">
								<div className="col-lg-12">
									<div className="table-responsive wow fadeIn videoTable">
										{this.state.videos.length > 0 ? (
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
			dispatch(searchLectureVideo(body));
		},
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(VideoList);
