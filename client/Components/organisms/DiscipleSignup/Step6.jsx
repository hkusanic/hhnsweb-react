import React from "react";

class Step6 extends React.Component {
	handleChange = event => {
		const data = {
			disciple_profile: {
				education:
					event.target.name === "education" ? event.target.value : null,
				skills: event.target.name === "skills" ? event.target.value : null,
				service: event.target.name === "service" ? event.target.value : null,
				counselor_name:
					event.target.name === "counselor_name" ? event.target.value : null
			}
		};
		this.props.updateFormData(data);
	};
	render() {
		return (
			<div>
				<form>
					<div>Counselor's Name</div>
					<input
						name="counselor_name"
						onChange={this.handleChange}
						value={this.props.formData.disciple_profile.counselor_name}
					></input>
					<div>Education</div>
					<textarea
						name="education"
						onChange={this.handleChange}
						value={this.props.formData.disciple_profile.education}
					></textarea>
					<div>Skills</div>
					<textarea
						name="skills"
						onChange={this.handleChange}
						value={this.props.formData.disciple_profile.skills}
					></textarea>
					<div>Service</div>
					<textarea
						name="service"
						onChange={this.handleChange}
						value={this.props.formData.disciple_profile.service}
					></textarea>
				</form>
				<button onClick={this.props.prevPage}>Previous</button>
				<button onClick={this.props.nextPage}>Next</button>
			</div>
		);
	}
}

export default Step6;
