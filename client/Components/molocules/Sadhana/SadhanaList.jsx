import React from 'react';
import { Table, Icon, Button, DatePicker, notification, Collapse } from 'antd';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Auth from '../../../utils/Auth';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { getSadhanaList } from '../../../actions/sadhanaAction';
import { sortByDate } from '../../../utils/funct';
import AddSadhana from './addSadhana';
import Router from 'react-router-dom';

const defaultPageSize = 20;

export class SadhanaList extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			isUserLogin: true,
			userEmail: '',
			pagination: {},
			sadhanaList: [],
			showSadhanaForm: false,
			notAllowedDates: [],
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
					user_id: userDetails.user_id,
					isUserLogin,
					pagination
				},
				() => {
					const body = {
						pageNumber: 1,
						userId: this.state.user_id,
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
		let sadhanaList = nextProps.sadhana.sadhanaList.map((obj, index) => {
			let obj1 = {
				additional_comments:obj.additional_comments.substring(0, 200),
				approved: obj.approved,
				association: obj.association.substring(0, 200),
				comments: obj.comments.substring(0, 200),
				creation_date_time: obj.creation_date_time,
				date: obj.date,
				lectures: obj.lectures,
				reading: obj.reading.substring(0, 200),
				rounds: obj.rounds,
				slug: obj.slug,
				time_rising: obj.time_rising,
				uuid: obj.uuid,
				__v: obj.__v,
				_id: obj._id,
			}
			return obj1;
		});
		this.setState({
			pagination,
			sadhanaList : sadhanaList,
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
		body.userId = this.state.user_id,
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
			userId: this.state.user_id,
			date: dateString
		};
		this.props.getSadhanaList(body, 'list');
	}

	checkTodaySadhanaSubmitted = () => {
		let days = 2;
		if(process.env.sadhanaSheetAllowedDays)
			days = process.env.sadhanaSheetAllowedDays;
		const { sadhana } = this.props;
		const { sadhanaList } = sadhana;
		let arDate = [];
		let ctr =0;
		for(let i = 0; i < days; i++){
			let oldDate = new Date(); 
			oldDate.setDate(oldDate.getDate()-i);
			arDate.push(oldDate);
		}
		let notAllowedDates = [];
		for(let i=0; i<sadhanaList.length; i++){
			for(let j = 0; j< arDate.length; j++){
				if(sadhanaList[i].date.substring(0,10) === this.formatDate(arDate[j]).substring(0,10)){
					ctr++;
					notAllowedDates.push(arDate[j]);
				}
			}
		}
		this.setState({notAllowedDates: notAllowedDates});
		if(ctr === arDate.length)
			return true
		else
			return false;
	}

	addSadhanaSheet = () => {
		const { history } = this.props;
		let val = this.state.showSadhanaForm;
		if(!this.checkTodaySadhanaSubmitted()){
			this.setState({showSadhanaForm: !val});
		} else {
			notification.error({
				message: 'Error',
				description: `You have already Submitted the sadhana sheet for the allowed days.`,
				style: {
					marginTop: 50,
				  },
			})
		}
		
		
		
	}
	refreshPage = () => {
		location.reload();
	}
	render () {
		console.log("whole reducer -====>>>>", this.props.redu)
		const columns = [
			{
				title: 'Date',
				dataIndex: 'date',
				key: 'date',
				render: date => <div><div className="sadhnaTable_headers">Date</div><div className="sadhnaTable_columns">{`${new Date(date).toDateString()}`}</div></div>,
			},
			{
				title: 'Time Rising',
				dataIndex: 'time_rising',
				key: 'time_rising',
				render: time_rising => <div><div className="sadhnaTable_headers">Time Rising</div><div className="sadhnaTable_columns">{time_rising}</div></div>
			},
			{
				title: 'Rounds',
				dataIndex: 'rounds',
				key: 'rounds',
				render: rounds => <div><div className="sadhnaTable_headers">Rounds</div><div className="sadhnaTable_columns">{rounds}</div></div>
			},
			{
				title: 'Reading',
				dataIndex: 'reading',
				key: 'reading',
				render: reading => <div><div className="sadhnaTable_headers">Reading</div><div>{reading}</div></div>
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
					<div className="breadcrumbs-custom-inner headingImage">
						<div className="container breadcrumbs-custom-container">
							<ul className="breadcrumbs-custom-path">
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
								{!this.state.showSadhanaForm?<div className="col-lg-12">
									<div className="centerAlign">
										{/* <DatePicker onChange={this.handleDateChange} className="datePickerFilter" /> */}
										<Button
											type="primary"
											className="sadhanaButton"
											onClick={this.addSadhanaSheet}
										>
										Add Sadhana Sheet
										</Button>
									</div>
								</div>:null}
							</div>
							
							{this.state.showSadhanaForm? <div>
								<AddSadhana addSadhanaSheet={this.addSadhanaSheet} refreshPage={this.refreshPage} notAllowedDates={this.state.notAllowedDates} />
							</div>: null}	
							
							<div className="row justify-content-center">
								<div className="col-lg-12">
									<div className="table-responsive wow fadeIn">
										{this.props.sadhana.sadhanaList.length > 0 ? (
											<div>
												<Table
													columns={columns}
													rowKey={record => record.uuid}
													dataSource={sortByDate(
														this.state.sadhanaList,
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
													rowClassName={(record, index) => {
													return index%2===0?"tableRow grey":"tableRow white" }}
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
		redu: state,
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
