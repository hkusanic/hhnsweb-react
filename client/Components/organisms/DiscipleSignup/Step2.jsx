import React from "react";
import { DatePicker } from "antd";
import moment from "moment";

class Step2 extends React.Component {
	onDOBChange = (date, dateString) => {
		const data = {
			dob: dateString
		};
		this.props.updateFormData(data);
	};
	onFIChange = (date, dateString) => {
		const data = {
			disciple_profile: {
				first_initiation_date: dateString
			}
		};
		this.props.updateFormData(data);
	};
	onSIChange = (date, dateString) => {
		const data = {
			disciple_profile: {
				second_initiation_date: dateString
			}
		};
		this.props.updateFormData(data);
	};
	render() {
		return (
			<div>
				<form>
					<div>Date of First Initiation</div>
					<DatePicker
						name="first_initiation_date"
						placeholder="First Initiation"
						onChange={this.onFIChange}
						value={
							this.props.formData.disciple_profile.first_initiation_date
								? moment(
										this.props.formData.disciple_profile.first_initiation_date,
										"YYYY-MM-DD"
								  )
								: null
						}
					></DatePicker>
					<div>Date of Second Initiation</div>
					<DatePicker
						name="second_initiation_date"
						placeholder="Second Initiation"
						onChange={this.onSIChange}
						value={
							this.props.formData.disciple_profile.second_initiation_date
								? moment(
										this.props.formData.disciple_profile.second_initiation_date,
										"YYYY-MM-DD"
								  )
								: null
						}
					></DatePicker>
					<div>Date of Birth</div>
					<DatePicker
						name="dob"
						placeholder="Date of Birth"
						onChange={this.onDOBChange}
						value={
							this.props.formData.dob
								? moment(this.props.formData.dob, "YYYY-MM-DD")
								: null
						}
					></DatePicker>
				</form>
				<button onClick={this.props.prevPage}>Previous</button>
				<button onClick={this.props.nextPage}>Next</button>
			</div>
		);
	}
}

export default Step2;
