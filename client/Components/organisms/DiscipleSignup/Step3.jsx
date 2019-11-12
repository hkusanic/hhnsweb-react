import React from "react";

class Step3 extends React.Component {
	handleChange = event => {
		const data = {
			email: event.target.name === "email" ? event.target.value : null,
			mobileNumber: {
				code: event.target.name === "code-mobile" ? event.target.value : null,
				number:
					event.target.name === "number-mobile" ? event.target.value : null
			},
			homeNumber: {
				code: event.target.name === "code-home" ? event.target.value : null,
				number: event.target.name === "number-home" ? event.target.value : null
			},
			address: event.target.name === "address" ? event.target.value : null
		};
		this.props.updateFormData(data);
	};
	render() {
		return (
			<div>
				<form>
					<div>Email Address</div>
					<input
						placeholder="example@example.com"
						name="email"
						onChange={this.handleChange}
						value={this.props.formData.email}
					></input>
					<div>Home Phone Number</div>
					<input
						placeholder="Area Code"
						name="code-home"
						onChange={this.handleChange}
						value={this.props.formData.homeNumber.code}
					></input>
					<input
						placeholder="Phone Number"
						name="number-home"
						onChange={this.handleChange}
						value={this.props.formData.homeNumber.number}
					></input>
					<div>Mobile Phone Number</div>
					<input
						placeholder="Area Code"
						name="code-mobile"
						onChange={this.handleChange}
						value={this.props.formData.mobileNumber.code}
					></input>
					<input
						placeholder="Phone Number"
						name="number-mobile"
						onChange={this.handleChange}
						value={this.props.formData.mobileNumber.number}
					></input>
					<div>Home Address</div>
					<textarea
						placeholder="Address"
						name="address"
						onChange={this.handleChange}
						value={this.props.formData.address}
					></textarea>
				</form>
				<button onClick={this.props.prevPage}>Previous</button>
				<button onClick={this.props.nextPage}>Next</button>
			</div>
		);
	}
}

export default Step3;
