import React from 'react';
import { Table, Icon, Button, DatePicker } from 'antd';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Auth from '../../../utils/Auth';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { getSadhanaList } from '../../../actions/sadhanaAction';
import { sortByDate } from '../../../utils/funct';

export class SadhanaList extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			isUserLogin: true,
			userEmail: '',
		};
	}

	componentDidMount () {
		const isUserLogin = Auth.isUserAuthenticated();
		if (!isUserLogin) {
			const userDetails = JSON.parse(Auth.getUserDetails());
			this.setState(
				{
					userEmail: userDetails.email,
					isUserLogin,
				},
				() => {
					const body = {
						pageNumber: 1,
						email: this.state.userEmail,
					};
					this.props.getSadhanaList(body);
				}
			);
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
										<DatePicker className="datePickerFilter" />
										<Button
											type="primary"
											className="sadhanaButton"
											onClick={() => this.props.history.push('/addSadhana')}
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
													onChange={this.handleTableChange}
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
		getSadhanaList: body => {
			dispatch(getSadhanaList(body));
		},
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SadhanaList);
