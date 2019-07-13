import React from 'react';
import { Form, Input, Button, DatePicker } from 'antd';
import moment from 'moment'

const FormItem = Form.Item;

export class DiscipleProfile extends React.Component {
	constructor (props) {
		super(props);
		this.state = {};
	}

	handleFirstInitiationDate = (date, dateString) => {
		this.props.handleDiscipleDate('first_initiation_date', dateString);
	}

	handleSecondInitiationDate = (date, dateString) => {
		this.props.handleDiscipleDate('second_initiation_date', dateString);
	}

	render () {
		const { form } = this.props;
		const { getFieldDecorator } = form;
		const dateFormat = 'YYYY-MM-DD'


		return (
			<div>
				<Form layout="vertical">
					<div className="container">
						<div className="row">
							<div className="col-lg-6">
								<FormItem label="Disciple Name">
									<Input
										onChange={(event) => { this.props.handleDiscipleDetails('spiritual_name', event); }}
										autoComplete="off"
										type="text"
									/>
								</FormItem>
							</div>

							<div className="col-lg-6">
								<FormItem label="Temple">
									<Input
										onChange={(event) => { this.props.handleDiscipleDetails('temple', event); }}
										autoComplete="off"
										type="text"
									/>
								</FormItem>
							</div>
						</div>

						<div className="row">
							<div className="col-lg-6">
								<FormItem label="First Initiation Date">
								{getFieldDecorator('publish_date', {
									rules: [
										{
										required: true,
										message: 'Publish Date is required',
										},
									],
                              		initialValue: moment(new Date(), dateFormat),
                            	})(<DatePicker onChange={this.handleFirstInitiationDate} name="firstDate" />)}
								</FormItem>
							</div>

							<div className="col-lg-6">
								<FormItem label="Second Initiation Date">
									<DatePicker onChange={this.handleSecondInitiationDate} name="secondDate" />
								</FormItem>
							</div>
						</div>

						<div className="row">
							<div className="col-lg-6">
								<FormItem label="Marital Status">
									<Input
										onChange={(event) => { this.props.handleDiscipleDetails('marital_status', event); }}
										autoComplete="off"
										type="text"
									/>
								</FormItem>
							</div>

							<div className="col-lg-6">
								<FormItem label="Verifier">
									<Input
										onChange={(event) => { this.props.handleDiscipleDetails('verifier', event); }}
										autoComplete="off"
										type="text"
									/>
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
