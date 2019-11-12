import React from "react";

class Step1 extends React.Component {
	handleChange = event => {
		const data = {
			name: {
				first:
					event.target.name === "legal_firstName" ? event.target.value : null,
				last: event.target.name === "legal_lastName" ? event.target.value : null
			},
			disciple_profile: {
				spiritual_name: {
					first:
						event.target.name === "spiritual_firstName"
							? event.target.value
							: null,
					last:
						event.target.name === "spiritual_lastName"
							? event.target.value
							: null
				},
				temple: event.target.name === "temple" ? event.target.value : null
			}
		};
		this.props.updateFormData(data);
	};
	render() {
		return (
			<div>
				<form>
					<div>Spiritual Name</div>
					<input
						name="spiritual_firstName"
						placeholder="First Name"
						onChange={this.handleChange}
						value={this.props.formData.disciple_profile.spiritual_name.first}
					></input>
					<input
						name="spiritual_lastName"
						placeholder="Last Name"
						onChange={this.handleChange}
						value={this.props.formData.disciple_profile.spiritual_name.last}
					></input>
					<div>Legal Name</div>
					<input
						name="legal_firstName"
						placeholder="First Name"
						onChange={this.handleChange}
						value={this.props.formData.name.first}
					></input>
					<input
						name="legal_lastName"
						placeholder="Last Name"
						onChange={this.handleChange}
						value={this.props.formData.name.last}
					></input>
					<div>Temple Associated With:</div>
					<input
						name="temple"
						placeholder="Temple"
						onChange={this.handleChange}
						value={this.props.formData.disciple_profile.temple}
					></input>
				</form>
				{/* <button onClick={this.props.prevPage}>Previous</button> */}
				<button onClick={this.props.nextPage}>Next</button>
			</div>
		);
	}
}

export default Step1;
