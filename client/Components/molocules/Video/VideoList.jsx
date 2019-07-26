import React, { Component } from 'react';
import renderHTML from 'react-render-html';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, Table, Icon } from 'antd';
import {
	getVideoList,
	resetState,
} from '../../../actions/video';
import SearchFilter from '../SeachFilter/SearchFilter';
import { Collapse } from 'react-collapse';
import Auth from '../../../utils/Auth';
import reactCookie from 'react-cookies';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import QuoteOfDay from '../../molocules/SingleQuote/QuotesOfDay';

const defaultPageSize = 20;

export class VideoList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isUserLogin: true,
			page: null,
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
		const { resetState } = this.props;
		resetState();
	}

	componentDidMount() {
		const isUserLogin = Auth.isUserAuthenticated();
		this.setState({ loading: true });

		let body = { ...this.state.body };
		body.page = this.props.VideoData.currentPage || 1;

		const pagination = { ...this.state.pagination };
		pagination.total = this.props.VideoData.totalVideos;
		pagination.defaultPageSize = defaultPageSize;
		pagination.current = this.props.VideoData.currentPage || 1;

		this.setState({
			videos: this.props.VideoData.videoList,
			isUserLogin,
			loading: false,
			pagination,
		});

		this.props.getVideoList(body);
	}

	componentWillReceiveProps(nextProps) {
		let body = { ...this.state.body };
		body.page = nextProps.VideoData.currentPage;

		const pagination = { ...this.state.pagination };
		pagination.total = nextProps.VideoData.totalVideos;
		pagination.defaultPageSize = defaultPageSize;
		pagination.current = nextProps.VideoData.currentPage;

		this.setState({
			pagination,
		});

		if (nextProps.VideoData.Count) {
			this.props.getVideoList(body);
		}
	}

	handleTableChange = (pagination, filters, sorter) => {
		const pager = { ...this.state.pagination };
		pager.current = pagination.current;
		pager.total = this.props.VideoData.totalVideos;
		this.setState({
			pagination: pager,
		});

		let body = { ...this.state.body };
		body.page = pagination.current;
		this.props.getVideoList(body);
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

	onClickIcon = value => {
		this.setState({ iconSearch: value });
	};

	searchData = body => {
		this.setState({ body, isSearch: false }, () => {
			this.props.getVideoList(body);
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
									: ( record.ru.title ? record.ru.title : record.en.title )
							)
						)}
					</Link>
				),
			},
			{
				title: 'Views',
				dataIndex: 'counters.video_page_view',
				render: (text, record, index) =>  record && record.video_page_view ? record.video_page_view : 0 ,
			},
		];

		return (
			<div>
				<section
					className="bg-gray-100"
					style={{
						backgroundImage:
							'url(https://ik.imagekit.io/gcwjdmqwwznjl/Booking_v2_HkCb1eBDV.png)',
					}}
				>
					<div class="breadcrumbs-custom-inner headingImage">
						<div class="container breadcrumbs-custom-container">
							<ul class="breadcrumbs-custom-path">
								<li>
									<Link to="" onClick={() => this.props.history.push('/')}>
										<Breadcrumb.Item>Home</Breadcrumb.Item>
									</Link>
								</li>
								<li>
									<a className="textColor">Video</a>
								</li>
							</ul>
						</div>
					</div>
				</section>
				{!this.state.isUserLogin ? (
					<div className="PadTop">
						<div className="container mt-5">
							<div
								className="row justify-content-center"
								style={{ marginTop: '0', marginBottom: '0' }}
							>
								<div className="col-lg-12">
									<div style={{ textAlign: 'center' }}>
										<Button
											className="searchButtonColor searchIconBorder"
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
									<div className="col-lg-12">
										<Collapse isOpened={!this.state.iconSearch}>
											<SearchFilter searchData={this.searchData} />
										</Collapse>
									</div>
								</div>
							)}

							<div className="row  justify-content-center">
								<div className="col-lg-12">
									<div className="table-responsive wow fadeIn">
										{this.props.VideoData.videoList.length > 0 ? (
											<div>
												<Table
													columns={columns}
													rowKey={record => record.uuid}
													dataSource={this.props.VideoData.videoList}
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
				) : <QuoteOfDay />}
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		VideoData: state.videoReducer,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		getVideoList: body => {
			dispatch(getVideoList(body));
		},
		resetState: () => {
			dispatch(resetState());
		},
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(VideoList);
