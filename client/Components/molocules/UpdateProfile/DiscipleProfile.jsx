import React from 'react';
import { Form, Input, Button, DatePicker } from 'antd';
import moment from 'moment';

const FormItem = Form.Item;

export class DiscipleProfile extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	handleFirstInitiationDate = (date, dateString) => {
		this.props.handleDiscipleDate('first_initiation_date', dateString);
	};

	handleSecondInitiationDate = (date, dateString) => {
		this.props.handleDiscipleDate('second_initiation_date', dateString);
	};

	render() {
		const { form, userDetails } = this.props;
		const { getFieldDecorator } = form;
		const dateFormat = 'YYYY-MM-DD';

		return (
			<div>
				<Form layout="vertical">
					<div className="container">
						<div className="row">
							<div className="col-lg-6">
								<FormItem label="Disciple Name">
									{getFieldDecorator('spiritual_name', {
										initialValue:
											userDetails && userDetails.disciple_profile
												? userDetails.disciple_profile.spiritual_name
												: '',
									})(
										<Input
											onChange={event => {
												this.props.handleDiscipleDetails(
													'spiritual_name',
													event
												);
											}}
											autoComplete="off"
											type="text"
										/>
									)}
								</FormItem>
							</div>

							<div className="col-lg-6">
								<FormItem label="Temple">
									{getFieldDecorator('spiritual_name', {
										initialValue:
											userDetails && userDetails.disciple_profile
												? userDetails.disciple_profile.temple
												: '',
									})(
										<Input
											onChange={event => {
												this.props.handleDiscipleDetails('temple', event);
											}}
											autoComplete="off"
											type="text"
										/>
									)}
								</FormItem>
							</div>
						</div>

						<div className="row">
							<div className="col-lg-6">
								<FormItem label="First Initiation Date">
									{getFieldDecorator('first_initiation_date', {
										rules: [
											{
												required: true,
												message: 'First Initiation Date is required',
											},
										],
										initialValue:
														userDetails && userDetails.disciple_profile
                                  ? moment(new Date(userDetails.disciple_profile.first_initiation_date), dateFormat)
                                  : moment(new Date(), dateFormat),
									})(
										<DatePicker
											onChange={this.handleFirstInitiationDate}
											name="firstDate"
										/>
									)}
								</FormItem>
							</div>

							<div className="col-lg-6">
								<FormItem label="Second Initiation Date">
									{getFieldDecorator('second_initiation_date', {
										rules: [
											{
												required: true,
												message: 'Second Initiation Date is required',
											},
										],
										initialValue:
														userDetails && userDetails.disciple_profile
                                  ? moment(new Date(userDetails.disciple_profile.second_initiation_date), dateFormat)
                                  : moment(new Date(), dateFormat),
									})(
										<DatePicker
											onChange={this.handleSecondInitiationDate}
											name="firstDate"
										/>
									)}
								</FormItem>
							</div>
						</div>

						<div className="row">
							<div className="col-lg-6">
								<FormItem label="Marital Status">
									{getFieldDecorator('marital_status', {
										initialValue:
											userDetails && userDetails.disciple_profile
												? userDetails.disciple_profile.marital_status
												: '',
									})(
										<Input
											onChange={event => {
												this.props.handleDiscipleDetails(
													'marital_status',
													event
												);
											}}
											autoComplete="off"
											type="text"
										/>
									)}
								</FormItem>
							</div>

							<div className="col-lg-6">
								<FormItem label="Verifier">
									{getFieldDecorator('verifier', {
										initialValue:
											userDetails && userDetails.disciple_profile
												? userDetails.disciple_profile.verifier
												: '',
									})(
										<Input
											onChange={event => {
												this.props.handleDiscipleDetails('verifier', event);
											}}
											autoComplete="off"
											type="text"
										/>
									)}
								</FormItem>
							</div>
						</div>
					</div>
				</Form>
			</div>
		);
	}
}

export default Form.create()(DiscipleProfile);
