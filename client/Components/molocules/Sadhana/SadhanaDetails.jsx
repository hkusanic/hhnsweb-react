import React from 'react';
import { Form, Input, DatePicker, Button, TimePicker, Icon } from 'antd';
import { Link } from 'react-router-dom';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import moment from 'moment';
import { updateSadhana, getSadhanaById, getSadhanaList } from '../../../actions/sadhanaAction';
import { connect } from 'react-redux';
import Auth from '../../../utils/Auth';

const { TextArea } = Input;

export class SadhanaDetails extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			language: true,
			sadhanaDetails: '',
			time_rising: '',
			userId: '',
			email: '',
		};
	}

	componentDidMount() {
		const isUserLogin = Auth.isUserAuthenticated();
		if (!isUserLogin) {
			const userDetails = JSON.parse(Auth.getUserDetails());
			this.setState({
				userId: userDetails.id,
				email: userDetails.email,
			});
		}

		const body = {
			uuid: this.props.match.params.uuid,
		};
		this.props.getSadhanaById(body);
	}

	componentWillReceiveProps(nextProps) {
		const { userId } = this.state;
		if (nextProps.sadhana.singleSadhanaSheet) {
			if(nextProps.sadhana.singleSadhanaSheet.userId === userId) {
				this.setState({
					sadhanaDetails: nextProps.sadhana.singleSadhanaSheet,
				});
			} else {
				this.props.history.push('/sadhanaList')
			}
		}
	}

	handleReset = () => {
		const { form } = this.props;
		form.resetFields();
	};

	formatDate = date => {
		const dateString = new Date(
			date.getTime() - date.getTimezoneOffset() * 60000
		)
			.toISOString()
			.split('T')[0];

		return dateString;
	};

	getPreviousDate = date => {
		const previous = new Date();
		previous.setDate(date.getDate() - 1);
		const previousDate = this.formatDate(previous);
		return previousDate;
	};

	getNextDate = date => {
		const next = new Date();
		next.setDate(date.getDate() + 1);
		const nextDate = this.formatDate(next);
		return nextDate;
	};

	onChange = (time, timeString) => {
		console.log(time, timeString);
		this.setState({
			time_rising: timeString,
		});
	};

	handleUpdate = event => {
		event.preventDefault();
		const { form } = this.props;
		const { time_rising, userId, sadhanaDetails } = this.state;

		form.validateFields(
			[
				'firstname',
				'lastname',
				'email',
				'date',
				'time_rising',
				'rounds',
				'reading',
				'association',
			],
			(err, values) => {
				if (!err) {
					const body = {
						uuid: sadhanaDetails.uuid,
						firstname: values.firstname,
						lastName: values.lastname,
						email: values.email,
						date: sadhanaDetails.date,
						time_rising: time_rising ? time_rising : sadhanaDetails.time_rising,
						rounds: values.rounds,
						reading: values.reading,
						association: values.association,
						comments: form.getFieldValue('comments'),
						lectures: form.getFieldValue('lectures'),
						additional_comments: form.getFieldValue('additional_comments'),
						userId,
					};
					this.props.updateSadhana(sadhanaDetails.uuid, body);
				}
			}
		);
	};

	getNextDaySadhanaSheet = () => {
		const { sadhanaDetails } = this.state;

		const nextDate = this.getNextDate(new Date(sadhanaDetails.date));
		const body = {
			date: nextDate,
			email: sadhanaDetails.email,
		};

		this.props.getSadhanaList(body, 'single');
	};

	getPrevDaySadhanaSheet = () => {
		const { sadhanaDetails } = this.state;

		const previousDate = this.getPreviousDate(new Date(sadhanaDetails.date));
		const body = {
			date: previousDate,
			email: sadhanaDetails.email,
		};

		this.props.getSadhanaList(body, 'single');
	};

	render() {
		const { sadhanaDetails, language } = this.state;
		const { form } = this.props;
		const dateFormat = 'YYYY/MM/DD';

		if (!sadhanaDetails) {
			return <div>Loading...</div>;
		}
		return (
			<React.Fragment>
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
									<Link
										to=""
										onClick={() => this.props.history.push('/sadhanaList')}
									>
										<Breadcrumb.Item>Sadhana List</Breadcrumb.Item>
									</Link>
								</li>
								<li>
									<a className="textColor">{sadhanaDetails.date}</a>
								</li>
							</ul>
						</div>
					</div>
				</section>
				<div className="row justify-content-center">
					<section className="card col-lg-8 sadhanaAdd">
						<div className="card-body">
							<div
								className="leftArrowDiv col-lg-1 justify-content-center align-self-center"
								// style={customStyleLeft}
							>
								<Icon
									className="leftArrow"
									type="left"
									onClick={this.getPrevDaySadhanaSheet}
								/>
							</div>

							<div
								className="rightArrowDiv col-lg-1 justify-content-center align-self-center"
								// style={customStyleRight}
							>
								<Icon
									className="rightArrow"
									type="right"
									onClick={this.getNextDaySadhanaSheet}

								/>
							</div>
							<div>
								<Form className="mt-3">
									<div className="form-group">
										<Form.Item label={language ? 'First Name' : 'First Name'}>
											{form.getFieldDecorator('firstname', {
												initialValue: sadhanaDetails.firstName,
												rules: [
													{
														required: true,
														message: 'This field is required',
													},
												],
											})(<Input disabled placeholder="Name" name="name" />)}
										</Form.Item>
									</div>
									<div className="form-group">
										<Form.Item label={language ? 'Last Name' : 'Last Name'}>
											{form.getFieldDecorator('lastname', {
												rules: [
													{
														required: true,
														message: 'This field is required',
													},
												],
												initialValue: sadhanaDetails.lastName,
											})(<Input disabled placeholder="Name" name="name" />)}
										</Form.Item>
									</div>
									<div className="form-group">
										<Form.Item label={language ? 'Email' : 'Email'}>
											{form.getFieldDecorator('emai;', {
												rules: [
													{
														required: true,
														message: 'This field is required',
													},
												],
												initialValue: sadhanaDetails.email,
											})(<Input disabled placeholder="Email" name="email" />)}
										</Form.Item>
									</div>
									<div className="form-group">
										<Form.Item label={language ? 'Date' : 'Date'}>
											{form.getFieldDecorator('date', {
												rules: [
													{
														required: true,
														message: 'This field is required',
													},
												],
												initialValue: moment(sadhanaDetails.date, dateFormat),
											})(<DatePicker disabled />)}
										</Form.Item>
									</div>
									<div className="form-group">
										<Form.Item label={language ? 'Time Rising' : 'Time Rising'}>
											{form.getFieldDecorator('time_rising', {
												rules: [
													{
														required: true,
														message: 'This field is required',
													},
												],
												initialValue: moment(
													sadhanaDetails.time_rising,
													'h:mm a'
												),
											})(
												<TimePicker
													use12Hours
													format="h:mm a"
													onChange={this.onChange}
												/>
											)}
										</Form.Item>
									</div>
									<div className="form-group">
										<Form.Item label={language ? 'Rounds' : 'Rounds'}>
											{form.getFieldDecorator('rounds', {
												rules: [
													{
														required: true,
														message: 'This field is required',
													},
												],
												initialValue: sadhanaDetails.rounds,
											})(
												<Input
													placeholder="Rounds"
													type="number"
													name="rounds"
												/>
											)}
										</Form.Item>
									</div>
									<div className="form-group">
										<Form.Item label={language ? 'Reading' : 'Reading'}>
											{form.getFieldDecorator('reading', {
												rules: [
													{
														required: true,
														message: 'This field is required',
													},
												],
												initialValue: sadhanaDetails.reading,
											})(<Input placeholder="Reading" name="reading" />)}
										</Form.Item>
									</div>
									<div className="form-group">
										<Form.Item label={language ? 'Association' : 'Association'}>
											{form.getFieldDecorator('association', {
												rules: [
													{
														required: true,
														message: 'This field is required',
													},
												],
												initialValue: sadhanaDetails.association,
											})(
												<Input placeholder="Association" name="association" />
											)}
										</Form.Item>
									</div>
									<div className="form-group">
										<Form.Item label={language ? 'Comments' : 'Comments'}>
											{form.getFieldDecorator('comments', {
												initialValue: sadhanaDetails.comments,
											})(
												<TextArea
													rows={4}
													placeholder="Comments"
													name="comments"
												/>
											)}
										</Form.Item>
									</div>
									<div className="form-group">
										<Form.Item label={language ? 'Lectures' : 'Lectures'}>
											{form.getFieldDecorator('lectures', {
												initialValue: sadhanaDetails.lectures,
											})(
												<TextArea
													rows={4}
													placeholder="Lectures"
													name="lectures"
												/>
											)}
										</Form.Item>
									</div>
									<div className="form-group">
										<Form.Item
											label={
												language ? 'Additional Comments' : 'Additional Comments'
											}
										>
											{form.getFieldDecorator('additional_comments', {
												initialValue: sadhanaDetails.additional_comments,
											})(
												<TextArea
													rows={4}
													placeholder="Additional Comments"
													name="additional_comments"
												/>
											)}
										</Form.Item>
									</div>
									<div>
										<Form.Item>
											<div>
												<span className="mr-3">
													<Button
														type="primary"
														className="sadhanaButton"
														onClick={event => {
															this.handleUpdate(event);
														}}
													>
														Update
													</Button>
												</span>
												<Button type="danger" onClick={this.handlereset}>
													Discard
												</Button>
											</div>
										</Form.Item>
									</div>
								</Form>
							</div>
						</div>
					</section>
				</div>
			</React.Fragment>
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
		updateSadhana: (uuid, body) => {
			dispatch(updateSadhana(uuid, body));
		},
		getSadhanaById: body => {
			dispatch(getSadhanaById(body));
		},
		getSadhanaList: (body, type) => {
			dispatch(getSadhanaList(body, type))
		}
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Form.create()(SadhanaDetails));
