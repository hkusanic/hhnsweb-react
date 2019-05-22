import React from 'react';
import { Form, Input, Button, DatePicker } from 'antd';
import { Link } from 'react-router-dom';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Auth from '../../../utils/Auth';
import moment from 'moment'
import { connect } from 'react-redux';

const { TextArea } = Input;

class AddSadhana extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			language: true,
			firstName: '',
			lastName: '',
			email: '',
		};
	}

	componentDidMount() {
		const isUserLogin = Auth.isUserAuthenticated();
		if(!isUserLogin){
			const userDetails = JSON.parse(Auth.getUserDetails());
			this.setState({
				firstName: userDetails.firstName,
				lastName: userDetails.last,
				email: userDetails.email,
			})
		}
	}

	handleReset = () => {
		const { form } = this.props;
		form.resetFields();
	}

	handleSubmit = () => {
		const { form } = this.props;

		form.validateFields([
			'firstname',
			'lastname',
			'emai',
			'date',
			'time_rising',
			'rounds',
			'reading',
			'association'
		], (err, values) => {
			if (!err) {
			 console.info("form values ====>>>>", values)
			}
		  });
	}

	render () {
		const { language, firstName, lastName, email } = this.state;
		const { form } = this.props;
		const dateFormat = 'YYYY/MM/DD'

		if(!this.state && !this.props) {
			return <div>Loading...</div>
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
									<Link to="" onClick={() => this.props.history.push('/sadhanaList')}>
										<Breadcrumb.Item>Sadhana List</Breadcrumb.Item>
									</Link>
								</li>
								<li>
									<a className="textColor">Add Sadhana</a>
								</li>
							</ul>
						</div>
					</div>
				</section>
				<div className="row justify-content-center">
					<section className="card col-lg-8 sadhanaAdd">
						<div className="card-body">
							<div>
								<Form className="mt-3">
									<div className="form-group">
										<Form.Item label={language ? 'First Name' : 'First Name'}>
											{form.getFieldDecorator('firstname', {
												initialValue: firstName,
												rules: [
													{
													  required: true,
													  message: 'This field is required'
													}
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
													  message: 'This field is required'
													}
												  ],
												initialValue: lastName,
											})(<Input disabled placeholder="Name" name="name" />)}
										</Form.Item>
									</div>
									<div className="form-group">
										<Form.Item label={language ? 'Email' : 'Email'}>
											{form.getFieldDecorator('emai;', {
												rules: [
													{
													  required: true,
													  message: 'This field is required'
													}
												  ],
												initialValue: email,
											})(<Input disabled placeholder="Email" name="email" />)}
										</Form.Item>
									</div>
									<div className="form-group">
										<Form.Item label={language ? 'Date' : 'Date'}>
											{form.getFieldDecorator('date', {
												rules: [
													{
													  required: true,
													  message: 'This field is required'
													}
												  ],
												initialValue: moment(new Date(), dateFormat),
											})(<DatePicker disabled />)}
										</Form.Item>
									</div>
									<div className="form-group">
										<Form.Item label={language ? 'Time Rising' : 'Time Rising'}>
											{form.getFieldDecorator('time_rising', {
												rules: [
													{
													  required: true,
													  message: 'This field is required'
													}
												  ],
												initialValue: '',
											})(<Input placeholder="Time Rising" name="time_rising" />)}
										</Form.Item>
									</div>
									<div className="form-group">
										<Form.Item label={language ? 'Rounds' : 'Rounds'}>
											{form.getFieldDecorator('rounds', {
												rules: [
													{
													  required: true,
													  message: 'This field is required'
													}
												  ],
												initialValue: '',
											})(<Input placeholder="Rounds" type="number" name="rounds" />)}
										</Form.Item>
									</div>
									<div className="form-group">
										<Form.Item label={language ? 'Reading' : 'Reading'}>
											{form.getFieldDecorator('reading', {
												rules: [
													{
													  required: true,
													  message: 'This field is required'
													}
												  ],
												initialValue: '',
											})(<Input placeholder="Reading" name="reading" />)}
										</Form.Item>
									</div>
									<div className="form-group">
										<Form.Item label={language ? 'Association' : 'Association'}>
											{form.getFieldDecorator('association', {
												rules: [
													{
													  required: true,
													  message: 'This field is required'
													}
												  ],
												initialValue: '',
											})(<Input placeholder="Association" name="association" />)}
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
													<Button type="primary" className="sadhanaButton" onClick={this.handleSubmit}>
														Submit
													</Button>
												</span>
												<Button type="danger" onClick={this.handleReset}>
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
	return {};
};

const mapDispatchToProps = dispatch => {
	return {};
};

export default  connect(mapStateToProps, mapDispatchToProps)(Form.create()(AddSadhana));
