import React from 'react';
import { Form, Input, DatePicker, Button } from 'antd';
import { Link } from 'react-router-dom';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import moment from 'moment';

const { TextArea } = Input;


export class SadhanaDetails extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			language: true,
			sadhanaDetails: '',
		};
	}

	componentDidMount () {
		const details = this.props.location.state;
		this.setState({
			sadhanaDetails: details,
		});
	}

	render () {
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
				{/* <div className="container  mt-5">
					<div
						className="row justify-content-center"
						style={{ marginTop: '0', marginBottom: '0' }}
					>
						<div className="col-lg-8">
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
				</div> */}
				<div className="row justify-content-center">
					<section className="card col-lg-8 sadhanaAdd">
						<div className="card-body">
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
												initialValue: '',
											})(
												<Input
													disabled
													placeholder="Time Rising"
													name="time_rising"
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
													disabled
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
											})(
												<Input placeholder="Reading" disabled name="reading" />
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
												initialValue: sadhanaDetails.association,
											})(
												<Input
													placeholder="Association"
													disabled
													name="association"
												/>
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
													disabled
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
													disabled
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
													disabled
													placeholder="Additional Comments"
													name="additional_comments"
												/>
											)}
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

export default Form.create()(SadhanaDetails);
