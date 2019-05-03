import React, { Component } from 'react';
import renderHTML from 'react-render-html';
// import Pagination from 'react-js-pagination';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Table, Icon, Button } from 'antd';

import { searchLecture, updateCounters } from '../../../actions/lectureActions';
import Auth from '../../../utils/Auth';
import { Translate } from 'react-localize-redux';
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
					pathname: '/audioDetails',
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
		title: 'Audio',
		dataIndex: 'audio_link',
		render: (text, record, index) => (
			<audio
				controls
				controlsList="nodownload"
				onPlay={() => {
					this.updateAudioPlayCount(record.uuid);
				}}>
				<source src={renderHTML(record.audio_link)} type="audio/mpeg" />
			</audio>
		)
	},
	{
		title: 'Downloads',
		dataIndex: 'counters.downloads',
		render: (text, record, index) => (
			<React.Fragment>
				<span className="downloadDetails">{record.counters.downloads}</span>
        <a
          className="downloadIcon"
					href={record.audio_link}
					onClick={() => {
						this.handleUpdate(record);
					}}
					download="download">
					<Icon type="download" style={{ fontSize: '1.5rem' }} />
				</a>
			</React.Fragment>
		)
	}
];

const defaultPageSize = 20;

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
			data: [],
			pagination: {},
			loading: false
		};
	}

	handleTableChange = (pagination, filters, sorter) => {
		// console.log('pagination from audio: ', pagination);
		const pager = { ...this.state.pagination };
		pager.current = pagination.current;
		pager.total = this.props.lecturesDetails.totalLectures;
		this.setState({
			pagination: pager
		});

		let body = Object.assign({}, this.state.body);
		body.page = pagination.current;
		// console.log('body from htc: ', body);
		this.props.searchLecture(body);
	};

	componentDidMount() {
		const isUserLogin = Auth.isUserAuthenticated();
		this.setState({ loading: true });

		let body = { ...this.state.body };
		body.page = this.props.lecturesDetails.currentPage || 1;
		// console.log('body from cdm: ', body);

		const pagination = { ...this.state.pagination };
		pagination.total = this.props.lecturesDetails.totalLectures;
		pagination.defaultPageSize = defaultPageSize;
		pagination.current = this.props.lecturesDetails.currentPage || 1;
		// console.log('pagination from cdm: ', pagination);

		this.setState({
			lectures: this.props.lecturesDetails.lectures,
			currentPage: this.props.lecturesDetails.currentPage,
			totalItem: this.props.lecturesDetails.totalLectures,
			isUserLogin,
			loading: false,
			pagination
		});

		this.props.searchLecture(body);
	}

	componentWillReceiveProps(nextProps) {
		let body = { ...this.state.body };
		body.page = nextProps.lecturesDetails.currentPage;

		const pagination = { ...this.state.pagination };
		pagination.total = nextProps.lecturesDetails.totalLectures;
		pagination.defaultPageSize = 20;
		pagination.current = nextProps.lecturesDetails.currentPage;
		// console.log('pagination from cwrp: ', pagination);

		this.setState({
			lectures: nextProps.lecturesDetails.lectures,
			currentPage: nextProps.lecturesDetails.currentPage,
			totalItem: nextProps.lecturesDetails.totalLectures,
			pagination
		});

		if (nextProps.lecturesDetails.Count) {
			this.props.searchLecture(body);
		}
	}

	showing100Characters = (sentence) => {
		var result = sentence;
		var resultArray = result.split(' ');
		if (resultArray.length > 10) {
			resultArray = resultArray.slice(0, 10);
			result = resultArray.join(' ') + '...';
		}
		return result;
	};

	searchData = (body) => {
		this.setState({ body, isSearch: true }, () => {
			this.props.searchLecture(body);
		});
	};

	onClickIcon = (value) => {
		this.setState({ iconSearch: value });
	};

	handleUpdate = (item) => {
		const body = {
			uuid: item.uuid,
			downloads: true
		};
		this.props.updateCounters(body);
	};

	updateAudioPlayCount = (uuid) => {
		const body = {
			uuid: uuid,
			audio_play_count: true
		};
		this.props.updateCounters(body);
	};

	render() {
		// this.props.lecturesDetails.lectures

		this.props.history.location.currentPage = this.state.currentPage;
		let class_icon_search = this.state.iconSearch
			? 'icon-search fa fa-search'
			: 'display-none-icon';
		let class_icon_close = this.state.iconSearch
			? 'display-none-icon'
			: 'icon-search fa fa-close';

		// console.log('lectures from state: ', this.state.lectures);

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
								<div className="col-lg-12">
									<Breadcrumb>
										<Link to=" " onClick={() => this.props.history.push('/')}>
											<Breadcrumb.Item>Home</Breadcrumb.Item>
										</Link>
										&nbsp;/&nbsp;<Breadcrumb.Item active>Audio</Breadcrumb.Item>
									</Breadcrumb>
								</div>
							</div>

							<div
								className="row justify-content-center"
								style={{ marginTop: '0', marginBottom: '0' }}>
								<div className="col-lg-12">
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
									style={{ marginTop: '0' }}>
									<div className="col-lg-12">
										<Collapse isOpened={!this.state.iconSearch}>
											<SearchFilter searchData={this.searchData} />
										</Collapse>
									</div>
								</div>
							)}

							<div className="row justify-content-center">
								<div className="col-lg-12">
									<div className="table-responsive wow fadeIn">
										{this.state.lectures.length > 0 ? (
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
		},
		updateCounters: (body) => {
			dispatch(updateCounters(body));
		}
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(AudioList);
