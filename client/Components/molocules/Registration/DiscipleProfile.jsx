import React from 'react';
import { Form, Input, Button, DatePicker } from 'antd';

const FormItem = Form.Item;

export class DiscipleProfile extends React.Component {
	constructor (props) {
		super(props);
		this.state = {};
	}

	render () {
		const { form } = this.props;
		const { getFieldDecorator } = form;

		return (
			<div>
				<Form layout="vertical">
					<div className="container">
						<div className="row">
							<div className="col-lg-6">
								<FormItem label="Disciple Name">
									<Input />
								</FormItem>
							</div>

							<div className="col-lg-6">
								<FormItem label="Temple Name">
									<Input />
								</FormItem>
							</div>
						</div>

						<div className="row">
							<div className="col-lg-6">
								<FormItem label="First Initiation Date">
									<DatePicker name="firstDate" />
								</FormItem>
							</div>

							<div className="col-lg-6">
								<FormItem label="Second Initiation Date">
									<DatePicker name="secondDate" />
								</FormItem>
							</div>
						</div>

						<div className="row">
							<div className="col-lg-6">
								<FormItem label="Marital Status">
									<Input />
								</FormItem>
							</div>

							<div className="col-lg-6">
								<FormItem label="Verifier">
									<Input />
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
