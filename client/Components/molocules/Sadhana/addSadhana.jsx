import React from 'react';
import { Form, Input, Button, DatePicker, TimePicker } from 'antd';
import { Link } from 'react-router-dom';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Auth from '../../../utils/Auth';
import moment from 'moment';
import { createSadhana } from '../../../actions/sadhanaAction';
import { connect } from 'react-redux';
import { relative } from 'path';

const { TextArea } = Input;

class AddSadhana extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			language: true,
			firstName: '',
			lastName: '',
			email: '',
			userId: '',
			time_rising: '',
		};
		this.disabledDate = this.disabledDate.bind(this);
	}

	componentDidMount() {
		const isUserLogin = Auth.isUserAuthenticated();
		if (!isUserLogin) {
			const userDetails = JSON.parse(Auth.getUserDetails());
			this.setState({
				firstName: userDetails.firstName,
				lastName: userDetails.last,
				email: userDetails.email,
				userId: userDetails.user_id,
			});
		}
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.sadhana.isCreated) {
			// this.props.history.push('/sadhanaList');
			this.props.refreshPage();
		}
	}

	handleReset = () => {
		const { form } = this.props;
		form.resetFields();
	};

	uuidv4 = () => {
		// eslint-disable-next-line func-names
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
			// eslint-disable-next-line no-bitwise
			const r = (Math.random() * 16) | 0;

			// eslint-disable-next-line no-bitwise
			const v = c === 'x' ? r : (r & 0x3) | 0x8;
			return v.toString(16);
		});
	};
	disabledDate(current) {
		const notAllowedDates = this.props.notAllowedDates;
		let days = 2;
		if(process.env.sadhanaSheetAllowedDays){
		days = process.env.sadhanaSheetAllowedDays;
		}
		if(current > moment().endOf('day') || current < moment().subtract(days, 'days'))
			return true
		
		else{
			for(let i = 0; i< notAllowedDates.length; i++){
				if(moment(current).toDate().toISOString().substring(0,10) == notAllowedDates[i].toISOString().substring(0,10))
					return true
				else
					return false
			}
			
		}
		
	  }
	handleSubmit = event => {
		event.preventDefault();
		const { form } = this.props;
		const { time_rising, userId } = this.state;

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
						uuid: this.uuidv4(),
						firstName: values.firstname,
						lastName: values.lastname,
						email: values.email,
						creation_date_time: new Date(),
						date: values.date,
						time_rising: time_rising,
						rounds: values.rounds,
						reading: values.reading,
						association: values.association,
						comments: form.getFieldValue('comments'),
						lectures: form.getFieldValue('lectures'),
						additional_comments: form.getFieldValue('additional_comments'),
						userId,
					};
					this.props.createSadhana(body);
				}
			}
		);
	};

	onChange = (time, timeString) => {
		this.setState({
			time_rising: timeString,
		});
	};

	formatDate = date => {
		const dateString = new Date(
			date.getTime() - date.getTimezoneOffset() * 60000
		)
			.toISOString()
			.split('T')[0];

		return dateString;
	};

	render() {
		const { language, firstName, lastName, email } = this.state;
		const { form } = this.props;
		const dateFormat = 'YYYY-MM-DD';

		if (!this.state && !this.props) {
			return <div>Loading...</div>;
		}
		return (
			<React.Fragment>
				{/* <section
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
									<a className="textColor">Add Sadhana</a>
								</li>
							</ul>
						</div>
					</div>
				</section> */}
				<div className="row justify-content-center">
					<section className="card col-lg-8 sadhanaAdd">
					
						<div className="card-body">
						<Button type="danger" onClick={this.props.addSadhanaSheet}
				className="closeAddSadhanaCard">X</Button>
							<div>
								<Form className="mt-3">
								<div className="row">
								<div className="col-12 my-1 col-md-6">
								<Form.Item label={language ? 'First Name' : 'First Name'}>
											{form.getFieldDecorator('firstname', {
												initialValue: firstName,
												rules: [
													{
														required: true,
														message: 'This field is required',
													},
												],
											})(<Input disabled placeholder="Name" name="name" />)}
										</Form.Item>
								</div>
								<div className="col-12 my-1 col-md-6">
								<Form.Item label={language ? 'Last Name' : 'Last Name'}>
											{form.getFieldDecorator('lastname', {
												rules: [
													{
														required: true,
														message: 'This field is required',
													},
												],
												initialValue: lastName,
											})(<Input disabled placeholder="Name" name="name" />)}
										</Form.Item>
								</div>
								<div className="col-12 my-1 col-md-6">
								<Form.Item label={language ? 'Email' : 'Email'}>
											{form.getFieldDecorator('email', {
												rules: [
													{
														required: true,
														message: 'This field is required',
													},
												],
												initialValue: email,
											})(<Input disabled placeholder="Email" name="email" />)}
										</Form.Item>
								</div>
								<div className="col-12 my-1 col-md-6">
								<Form.Item label={language ? 'Date' : 'Date'}>
											{form.getFieldDecorator('date', {
												rules: [
													{
														required: true,
														message: 'This field is required',
													},
												],
											})(<DatePicker  disabledDate={this.disabledDate}/>)}
										</Form.Item>
								</div>
								<div className="col-12 my-1 col-md-6">
								<Form.Item label={language ? 'Time Rising' : 'Time Rising'}>
											{form.getFieldDecorator('time_rising', {
												rules: [
													{
														required: true,
														message: 'This field is required',
													},
												],
												initialValue: '',
											})(
												<TimePicker
													use12Hours
													format="h:mm a"
													onChange={this.onChange}
												/>
											)}
										</Form.Item>
								</div>
								<div className="col-12 my-1 col-md-6">
								<Form.Item label={language ? 'Rounds' : 'Rounds'}>
											{form.getFieldDecorator('rounds', {
												rules: [
													{
														required: true,
														message: 'This field is required',
													},
												],
												initialValue: '',
											})(
												<Input
													placeholder="Rounds"
													type="number"
													name="rounds"
												/>
											)}
										</Form.Item>
								</div>
								</div>
									{/* <div className="form-group inline-block-element inline-block-children">
										<Form.Item label={language ? 'First Name' : 'First Name'}>
											{form.getFieldDecorator('firstname', {
												initialValue: firstName,
												rules: [
													{
														required: true,
														message: 'This field is required',
													},
												],
											})(<Input disabled placeholder="Name" name="name" />)}
										</Form.Item>
									</div>
									<div className="form-group inline-block-element inline-block-element-right inline-block-children">
										<Form.Item label={language ? 'Last Name' : 'Last Name'}>
											{form.getFieldDecorator('lastname', {
												rules: [
													{
														required: true,
														message: 'This field is required',
													},
												],
												initialValue: lastName,
											})(<Input disabled placeholder="Name" name="name" />)}
										</Form.Item>
									</div>
									<div className="form-group inline-block-element inline-block-children">
										<Form.Item label={language ? 'Email' : 'Email'}>
											{form.getFieldDecorator('email', {
												rules: [
													{
														required: true,
														message: 'This field is required',
													},
												],
												initialValue: email,
											})(<Input disabled placeholder="Email" name="email" />)}
										</Form.Item>
									</div>
									<div className="form-group inline-block-element inline-block-element-right inline-block-children">
										<Form.Item label={language ? 'Date' : 'Date'}>
											{form.getFieldDecorator('date', {
												rules: [
													{
														required: true,
														message: 'This field is required',
													},
												],
												initialValue: moment(new Date(), dateFormat),
											})(<DatePicker  disabledDate={this.disabledDate}/>)}
										</Form.Item>
									</div> 
									
									<div className="form-group inline-block-element">
										<Form.Item label={language ? 'Time Rising' : 'Time Rising'}>
											{form.getFieldDecorator('time_rising', {
												rules: [
													{
														required: true,
														message: 'This field is required',
													},
												],
												initialValue: '',
											})(
												<TimePicker
													use12Hours
													format="h:mm a"
													onChange={this.onChange}
												/>
											)}
										</Form.Item>
									</div>
									<div className="form-group inline-block-element inline-block-element-right">
										<Form.Item label={language ? 'Rounds' : 'Rounds'}>
											{form.getFieldDecorator('rounds', {
												rules: [
													{
														required: true,
														message: 'This field is required',
													},
												],
												initialValue: '',
											})(
												<Input
													placeholder="Rounds"
													type="number"
													name="rounds"
												/>
											)}
										</Form.Item>
									</div> */}
									<div className="form-group">
										<Form.Item label={language ? 'Reading' : 'Reading'}>
											{form.getFieldDecorator('reading', {
												rules: [
													{
														required: true,
														message: 'This field is required',
													},
												],
												initialValue: '',
											})(
												<TextArea
													rows={4}
													placeholder="Reading"
													name="reading"
												/>
											)}
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
												initialValue: '',
											})(
												<TextArea
													rows={4}
													placeholder="Association"
													name="association"
												/>
											)}
										</Form.Item>
									</div>
									<div className="form-group">
										<Form.Item label={language ? 'Comments' : 'Comments'}>
											{form.getFieldDecorator('comments', {
												initialValue: '',
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
												initialValue: '',
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
												initialValue: '',
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
														className="sadhanaSubmitButton"
														onClick={event => {
															this.handleSubmit(event);
														}}
													>
														Submit
													</Button>
												</span>
												<Button type="danger" onClick={this.handleReset}>
													Discard
												</Button>
												<Button type="danger" onClick={this.props.addSadhanaSheet}
												style={{marginLeft:20}}>
													Close
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
		createSadhana: body => {
			dispatch(createSadhana(body));
		},
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Form.create()(AddSadhana));
