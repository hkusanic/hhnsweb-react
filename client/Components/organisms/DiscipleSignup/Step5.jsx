import React from "react";
import { Form, Input, Icon, Button, DatePicker } from "antd";
let id = 0;
class Step5 extends React.Component {
	state = {
		name: [],
		dob: []
	};
	remove = k => {
		const { form } = this.props;
		const keys = form.getFieldValue("keys");
		if (keys.length === 1) {
			return;
		}
		form.setFieldsValue({
			keys: keys.filter(key => key !== k)
		});
	};

	add = () => {
		const { form } = this.props;
		const keys = form.getFieldValue("keys");
		const nextKeys = keys.concat(id++);
		form.setFieldsValue({
			keys: nextKeys
		});
	};

	handleSubmit = e => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				const { keys, name, dob } = values;
				let ar = [];
				keys.map(k => {
					let obj = {
						name: name[k],
						dob: dob[k]
					};
					ar.push(obj);
				});
				const data = {
					children: ar
				};
				this.props.updateFormData(data);
			}
		});
	};
	componentDidMount() {
		if (
			this.props.formData &&
			this.props.formData.children &&
			this.props.formData.children.length > 0
		) {
			let name = [];
			let dob = [];
			let ar = [];
			id = this.props.formData.children.length;
			this.props.formData.children.map((child, index) => {
				ar.push(index);
				name.push(child.name);
				dob.push(child.dob);
			});
			this.props.form.setFieldsValue({
				keys: ar
			});
			this.setState({
				name: name,
				dob: dob
			});
		}
	}
	render() {
		const { getFieldDecorator, getFieldValue } = this.props.form;
		const formItemLayout = {
			labelCol: {
				xs: { span: 24 },
				sm: { span: 4 }
			},
			wrapperCol: {
				xs: { span: 24 },
				sm: { span: 20 }
			}
		};
		const formItemLayoutWithOutLabel = {
			wrapperCol: {
				xs: { span: 24, offset: 0 },
				sm: { span: 20, offset: 4 }
			}
		};
		getFieldDecorator("keys", { initialValue: [] });
		const keys = getFieldValue("keys");
		const formItems = keys.map((k, index) => (
			<Form.Item
				{...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
				label={index === 0 ? "Child's Name and Date of Birth" : ""}
				required={false}
				key={k}
			>
				<React.Fragment>
					{getFieldDecorator(`name[${k}]`, {
						validateTrigger: ["onChange", "onBlur"],
						rules: [],
						initialValue: this.state.name[k]
					})(
						<Input
							placeholder="Name"
							style={{ width: "60%", marginRight: 8 }}
						/>
					)}
					{getFieldDecorator(`dob[${k}]`, {
						validateTrigger: ["onChange", "onBlur"],
						rules: [],
						initialValue: this.state.dob[k]
					})(<DatePicker placeholder="Date of Birth" />)}
					{keys.length > 1 ? (
						<Icon
							className="dynamic-delete-button"
							type="minus-circle-o"
							onClick={() => this.remove(k)}
						/>
					) : null}
				</React.Fragment>
			</Form.Item>
		));
		return (
			<div>
				<Form onSubmit={this.handleSubmit}>
					{formItems}
					<Form.Item {...formItemLayoutWithOutLabel}>
						<Button type="dashed" onClick={this.add} style={{ width: "60%" }}>
							<Icon type="plus" /> Add Child
						</Button>
					</Form.Item>
					<Form.Item {...formItemLayoutWithOutLabel}>
						<Button type="primary" htmlType="submit">
							Submit
						</Button>
					</Form.Item>
				</Form>
				<button onClick={this.props.prevPage}>Previous</button>
				<button onClick={this.props.nextPage}>Next</button>
			</div>
		);
	}
}
const WrappedDynamicFieldSet = Form.create({ name: "dynamic_form_item" })(
	Step5
);
export default WrappedDynamicFieldSet;
