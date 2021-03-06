import React, { Component } from 'react';
import { Button, Table } from 'antd';
import { Link } from 'react-router-dom';
import renderHTML from 'react-render-html';
import { connect } from 'react-redux';
import { searchKirtan, resetState } from '../../../actions/kirtanAction';
import Auth from '../../../utils/Auth';
import SearchFilter from '../SeachFilter/SearchFilter';
import { Collapse } from 'react-collapse';
import reactCookie from 'react-cookies';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import QuoteOfDay from '../../molocules/SingleQuote/QuotesOfDay';

const defaultPageSize = 20;

export class Kirtan extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isUserLogin: true,
			totalItem: null,
			currentPage: null,
			page: null,
			kirtans: [],
			body: {},
			iconSearch: true,
			isSearch: false,
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
		body.page = this.props.kirtanDetails.currentPage || 1;
		const pagination = { ...this.state.pagination };
		pagination.total = this.props.kirtanDetails.totalKirtans;
		pagination.defaultPageSize = defaultPageSize;
		pagination.current = this.props.kirtanDetails.currentPage || 1;

		this.setState({
			kirtans: this.props.kirtanDetails.kirtans,
			currentPage: this.props.kirtanDetails.currentPage,
			totalItem: this.props.kirtanDetails.totalKirtans,
			isUserLogin,
			loading: false,
			pagination,
		});
		this.props.searchKirtan(body);
	}

	componentWillReceiveProps(nextProps) {
		let body = { ...this.state.body };
		body.page = nextProps.kirtanDetails.currentPage;
		const pagination = { ...this.state.pagination };
		pagination.total = nextProps.kirtanDetails.totalKirtans;
		pagination.defaultPageSize = 20;
		pagination.current = nextProps.kirtanDetails.currentPage;

		this.setState({
			kirtans: nextProps.kirtanDetails.kirtans,
			currentPage: nextProps.kirtanDetails.currentPage,
			totalItem: nextProps.kirtanDetails.totalKirtans,
			pagination,
		});
	}

	handleTableChange = (pagination, filters, sorter) => {
		const pager = { ...this.state.pagination };
		pager.current = pagination.current;
		pager.total = this.props.kirtanDetails.totalKirtans;
		this.setState({
			pagination: pager,
		});

		let body = Object.assign({}, this.state.body);
		body.page = pagination.current;
		this.props.searchKirtan(body);
	};

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
		const columns = [
			{
				title: 'Title',
				dataIndex: renderHTML(
					reactCookie.load('languageCode') === 'en'
						? 'en' && 'en.title'
							? 'en.title'
							: 'ru' && 'ru.title'
							? 'ru.title'
							: ''
						: 'ru' && 'ru.title'
						? 'ru.title'
						: 'en' && 'en.title'
						? 'en.title'
						: ''
				),
				render: (text, record, index) => (
					<Link
						to={{
							pathname: `/kirtanDetails/${record.uuid}`,
							state: record,
						}}
					>
						{renderHTML(
							reactCookie.load('languageCode') === 'en'
								? record.en && record.en.title
									? record.en.title
									: record.ru && record.ru.title
									? record.ru.title
									: ''
								: record.ru && record.ru.title
								? record.ru.title
								: record.en && record.en.title
								? record.en.title
								: ''
						)}
					</Link>
				),
			},
			{
				title: 'Views',
				dataIndex: 'downloads',
				key: 'downloads',
			},
		];

		if (!this.props.kirtanDetails.kirtans.length > 0) {
			return (
				<div style={{ textAlign: 'center' }}>
					<p className="bookingForm">Hare Krishna...</p>
				</div>
			);
		}
		return (
			<div>
				<section
					className="bg-gray-100"
					style={{
						backgroundImage: 'url(https://ik.imagekit.io/gcwjdmqwwznjl/Booking_v2_HkCb1eBDV.png)',
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
									<a className="textColor">Kirtan</a>
								</li>
							</ul>
						</div>
					</div>
				</section>
				{!this.state.isUserLogin ? (
					<div className="PadTop">
						<div className="container mt-5">
							<div className="row justify-content-center" style={{ marginTop: '0', marginBottom: '0' }}>
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
								<div className="row justify-content-center" style={{ marginTop: '0' }}>
									<div className="col-lg-12">
										<Collapse isOpened={!this.state.iconSearch}>
											<SearchFilter
												searchData={this.searchData}
												cantoSearch={true}
												chapterSearch={true}
												verseSearch={true}
												translationSearch={true}
												yearSearch={true}
												locationSearch={true}
												topicSearch={true}
												eventSearch={true}
												isUpparRowSearch={true}
											/>
										</Collapse>
									</div>
								</div>
							)}
							<div className="table-responsive wow">
								{this.props.kirtanDetails.kirtans.length > 0 ? (
									<div>
										<Table
											columns={columns}
											rowKey={record => record.uuid}
											dataSource={this.props.kirtanDetails.kirtans}
											pagination={this.state.pagination}
											loading={this.state.loading}
											onChange={this.handleTableChange}
											rowClassName="tableRow"
										/>
									</div>
								) : (
									<div style={{ textAlign: 'center' }}>
										<p className="bookingForm">{this.state.isSearch ? 'No Record Found' : 'Hare Krishna...'}</p>
									</div>
								)}
							</div>
						</div>
					</div>
				) : (
					<QuoteOfDay />
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
		resetState: () => {
			dispatch(resetState());
		},
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Kirtan);
