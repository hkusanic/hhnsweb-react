import React from 'react';
import { Table, Icon, Button, DatePicker, notification } from 'antd';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Auth from '../../../utils/Auth';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { getSadhanaList } from '../../../actions/sadhanaAction';
import { sortByDate } from '../../../utils/funct';

const defaultPageSize = 20;

export class SadhanaList extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			isUserLogin: true,
			userEmail: '',
			pagination: {},
		};
	}

	componentDidMount () {
		const isUserLogin = Auth.isUserAuthenticated();
		if (!isUserLogin) {
			const userDetails = JSON.parse(Auth.getUserDetails());
			const pagination = { ...this.state.pagination };
			pagination.total = this.props.sadhana.totalSadhanaSheet;
			pagination.defaultPageSize = defaultPageSize;
			pagination.current = this.props.sadhana.currentPage || 1;

			this.setState(
				{
					userEmail: userDetails.email,
					isUserLogin,
					pagination
				},
				() => {
					const body = {
						pageNumber: 1,
						email: this.state.userEmail,
					};
					this.props.getSadhanaList(body, 'list');
				}
			);
		}
	}

	componentWillReceiveProps(nextProps){
		const pagination = { ...this.state.pagination };
		pagination.total = nextProps.sadhana.totalSadhanaSheet;
		pagination.defaultPageSize = defaultPageSize;
		pagination.current = nextProps.sadhana.currentPage;

		this.setState({
			pagination,
		});
	}

	handlePagination = (pagination, filters, sorter) => {
		const pager = { ...this.state.pagination };
		pager.current = pagination.current;
		pager.total = this.props.sadhana.totalSadhanaSheet;
		this.setState({
			pagination: pager,
		});

		let body = Object.assign({}, this.state.body);
		body.pageNumber = pagination.current;
		body.email = this.state.userEmail,
		this.props.getSadhanaList(body, 'list');
	};

	formatDate = date => {
		const dateString = new Date(
			date.getTime() - date.getTimezoneOffset() * 60000
		)
			.toISOString()
			.split('T')[0];

		return dateString;
	};

	handleDateChange = (date, dateString) => {
		const body = {
			pageNumber: 1,
			email: this.state.userEmail,
			date: dateString
		};
		this.props.getSadhanaList(body, 'list');
	}

	checkTodaySadhanaSubmitted = () => {
		const { sadhana } = this.props;
		const { sadhanaList } = sadhana;

		for(let i=0; i<sadhanaList.length; i++){
			if(sadhanaList[i].date === this.formatDate(new Date())){
				return true;
			}
		}
		return false;
	}

	addSadhanaSheet = () => {
		const { history } = this.props;
		if(!this.checkTodaySadhanaSubmitted()){
			history.push('/addSadhana')
		} else {
			notification.error({
				message: 'Error',
				description: `You have already Submitted the sadhana sheet for the day.`,
				style: {
					marginTop: 50,
				  },
			})
		}
	}

	render () {
		const columns = [
			{
				title: 'Date',
				dataIndex: 'date',
				key: 'date',
				render: date => <span>{`${new Date(date).toDateString()}`}</span>,
			},
			{
				title: 'Time Rising',
				dataIndex: 'time_rising',
				key: 'time_rising',
			},
			{
				title: 'Rounds',
				dataIndex: 'rounds',
				key: 'rounds',
			},
			{
				title: 'Reading',
				dataIndex: 'reading',
				key: 'reading',
			},
			{
				title: 'Association',
				dataIndex: 'association',
				key: 'association',
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
									<a className="textColor">Sadhana</a>
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
									<div>
										<DatePicker onChange={this.handleDateChange} className="datePickerFilter" />
										<Button
											type="primary"
											className="sadhanaButton"
											onClick={this.addSadhanaSheet}
										>
											Add Sadhana Sheet
										</Button>
									</div>
								</div>
							</div>
							<div className="row justify-content-center">
								<div className="col-lg-12">
									<div className="table-responsive wow fadeIn">
										{this.props.sadhana.sadhanaList.length > 0 ? (
											<div>
												<Table
													columns={columns}
													rowKey={record => record.uuid}
													dataSource={sortByDate(
														this.props.sadhana.sadhanaList,
														'date'
													)}
													onRow={(record, index) => {
														return {
															onClick: event => { this.props.history.push(
																{
																	pathname: `/sadhanaDetails/${record.uuid}`,
																	state: record,
																}
															); },
														}; }
													}
													pagination={this.state.pagination}
													loading={this.state.loading}
													onChange={this.handlePagination}
													rowClassName="tableRow"
												/>
											</div>
										) : (
											<div style={{ textAlign: 'center' }}>
												<p className="bookingForm">No Sadhana Sheet Found</p>
											</div>
										)}
									</div>
								</div>
							</div>
						</div>
					</div>
				) : null}
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		sadhana: state.sadhanaReducer,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		getSadhanaList: (body, type) => {
			dispatch(getSadhanaList(body, type));
		},
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SadhanaList);
