import React from "react";
import { Steps, Divider, Popover, Row, Col } from "antd";
import "./discipleSignup.css";
import Step1 from "../../Components/organisms/DiscipleSignup/Step1";
import Step2 from "../../Components/organisms/DiscipleSignup/Step2";
import Step3 from "../../Components/organisms/DiscipleSignup/Step3";
import Step4 from "../../Components/organisms/DiscipleSignup/Step4";
import Step5 from "../../Components/organisms/DiscipleSignup/Step5";
import Step6 from "../../Components/organisms/DiscipleSignup/Step6";
import Step7 from "../../Components/organisms/DiscipleSignup/Step7";
const { Step } = Steps;
import uuid from "uuidv4";
import utils from "../../utils/api/discipleSignup";

class DiscipleSignup extends React.Component {
	state = {
		current: 0,
		isSubmitted: false,
		formData: {
			user_id: uuid(),
			name: {
				first: "",
				last: ""
			},
			dob: null,
			email: "",
			profile_pic: "",
			mobileNumber: {
				code: "",
				number: ""
			},
			homeNumber: {
				code: "",
				number: ""
			},
			parents: {
				father_name: "",
				father_address: "",
				father_number: "",
				mother_name: "",
				mother_address: "",
				mother_number: ""
			},
			children: [],
			disciple_profile: {
				first_initiation_date: null,
				second_initiation_date: null,
				spiritual_name: {
					first: "",
					last: ""
				},
				temple: "",
				education: "",
				skills: "",
				service: "",
				counselor_name: "",
				spouse_name: "",
				spouse_marriedYear: ""
			},
			address: ""
		}
	};

	onChange = current => {
		console.log("onChange:", current);
		this.setState({ current });
	};
	nextPage = () => {
		const current = this.state.current;
		if (current < 6) {
			this.setState({ current: current + 1 });
		}
	};
	prevPage = () => {
		const current = this.state.current;
		if (current > 0) {
			this.setState({ current: current - 1 });
		}
	};

	updateFormData = data => {
		const formData = this.state.formData;
		if (data.name) {
			if (data.name.first) {
				formData.name.first = data.name.first;
			}
			if (data.name.last) {
				formData.name.last = data.name.last;
			}
		}
		if (data.disciple_profile) {
			if (
				data.disciple_profile.spiritual_name &&
				data.disciple_profile.spiritual_name.first
			) {
				formData.disciple_profile.spiritual_name.first =
					data.disciple_profile.spiritual_name.first;
			}
			if (
				data.disciple_profile.spiritual_name &&
				data.disciple_profile.spiritual_name.last
			) {
				formData.disciple_profile.spiritual_name.last =
					data.disciple_profile.spiritual_name.last;
			}
			if (data.disciple_profile.temple) {
				formData.disciple_profile.temple = data.disciple_profile.temple;
			}
			if (data.disciple_profile.first_initiation_date) {
				formData.disciple_profile.first_initiation_date =
					data.disciple_profile.first_initiation_date;
			}
			if (data.disciple_profile.second_initiation_date) {
				formData.disciple_profile.second_initiation_date =
					data.disciple_profile.second_initiation_date;
			}
			if (data.disciple_profile.spouse_name) {
				formData.disciple_profile.spouse_name =
					data.disciple_profile.spouse_name;
			}
			if (data.disciple_profile.spouse_marriedYear) {
				formData.disciple_profile.spouse_marriedYear =
					data.disciple_profile.spouse_marriedYear;
			}
			if (data.disciple_profile.education) {
				formData.disciple_profile.education = data.disciple_profile.education;
			}
			if (data.disciple_profile.skills) {
				formData.disciple_profile.skills = data.disciple_profile.skills;
			}
			if (data.disciple_profile.service) {
				formData.disciple_profile.service = data.disciple_profile.service;
			}
			if (data.disciple_profile.counselor_name) {
				formData.disciple_profile.counselor_name =
					data.disciple_profile.counselor_name;
			}
		}
		if (data.dob) {
			formData.dob = data.dob;
		}
		if (data.address) {
			formData.address = data.address;
		}
		if (data.email) {
			formData.email = data.email;
		}
		if (data.homeNumber) {
			if (data.homeNumber.code) {
				formData.homeNumber.code = data.homeNumber.code;
			}
			if (data.homeNumber.number) {
				formData.homeNumber.number = data.homeNumber.number;
			}
		}
		if (data.mobileNumber) {
			if (data.mobileNumber.code) {
				formData.mobileNumber.code = data.mobileNumber.code;
			}
			if (data.mobileNumber.number) {
				formData.mobileNumber.number = data.mobileNumber.number;
			}
		}
		if (data.parents) {
			if (data.parents.father_name) {
				formData.parents.father_name = data.parents.father_name;
			}
			if (data.parents.father_address) {
				formData.parents.father_address = data.parents.father_address;
			}
			if (data.parents.father_number) {
				formData.parents.father_number = data.parents.father_number;
			}
			if (data.parents.mother_name) {
				formData.parents.mother_name = data.parents.mother_name;
			}
			if (data.parents.mother_address) {
				formData.parents.mother_address = data.parents.mother_address;
			}
			if (data.parents.mother_number) {
				formData.parents.mother_number = data.parents.mother_number;
			}
		}
		if (data.children) {
			formData.children = data.children;
		}
		this.setState({ formData });
	};

	pushComponentsToArray() {
		let ar = [];
		ar.push(
			<Step1
				nextPage={this.nextPage}
				prevPage={this.prevPage}
				updateFormData={this.updateFormData}
				formData={this.state.formData}
			/>
		);
		ar.push(
			<Step2
				nextPage={this.nextPage}
				prevPage={this.prevPage}
				updateFormData={this.updateFormData}
				formData={this.state.formData}
			/>
		);
		ar.push(
			<Step3
				nextPage={this.nextPage}
				prevPage={this.prevPage}
				updateFormData={this.updateFormData}
				formData={this.state.formData}
			/>
		);
		ar.push(
			<Step4
				nextPage={this.nextPage}
				prevPage={this.prevPage}
				updateFormData={this.updateFormData}
				formData={this.state.formData}
			/>
		);
		ar.push(
			<Step5
				nextPage={this.nextPage}
				prevPage={this.prevPage}
				updateFormData={this.updateFormData}
				formData={this.state.formData}
			/>
		);
		ar.push(
			<Step6
				nextPage={this.nextPage}
				prevPage={this.prevPage}
				updateFormData={this.updateFormData}
				formData={this.state.formData}
			/>
		);
		ar.push(
			<Step7
				nextPage={this.nextPage}
				prevPage={this.prevPage}
				submitForm={this.submitForm}
				updateFormData={this.updateFormData}
				formData={this.state.formData}
			/>
		);
		return ar;
	}
	submitForm = () => {
		this.setState({ isSubmitted: true });
		// utils.discipleSignup(this.state.formData);
	};
	render() {
		const { current } = this.state;
		let array = this.pushComponentsToArray();
		const customDot = (dot, { status, index }) => (
			<Popover content={<span>Step {index + 1}</span>}>{dot}</Popover>
		);
		return (
			<React.Fragment>
				{!this.state.isSubmitted ? (
					<React.Fragment>
						<Row>
							<Col span={24}>
								<Steps
									size="small"
									current={current}
									onChange={this.onChange}
									labelPlacement="vertical"
									progressDot={customDot}
								>
									<Step />
									<Step />
									<Step />
									<Step />
									<Step />
									<Step />
									<Step />
								</Steps>
							</Col>
						</Row>
						<Row>
							<Col span={12} offset={6}>
								<div>Form will be displayed below this</div>
								{array[current]}
							</Col>
						</Row>
					</React.Fragment>
				) : (
					<Row>
						<Col span={24}>Form Submitted!</Col>
					</Row>
				)}
			</React.Fragment>
		);
	}
}

export default DiscipleSignup;
