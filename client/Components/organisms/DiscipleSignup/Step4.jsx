import React from "react";

class Step4 extends React.Component {
	handleChange = event => {
		const data = {
			parents: {
				father_name:
					event.target.name === "father_name" ? event.target.value : null,
				father_address:
					event.target.name === "father_address" ? event.target.value : null,
				father_number:
					event.target.name === "father_number" ? event.target.value : null,
				mother_name:
					event.target.name === "mother_name" ? event.target.value : null,
				mother_address:
					event.target.name === "mother_address" ? event.target.value : null,
				mother_number:
					event.target.name === "mother_number" ? event.target.value : null
			},
			disciple_profile: {
				spouse_name:
					event.target.name === "spouse_name" ? event.target.value : null,
				spouse_marriedYear:
					event.target.name === "spouse_marriedYear" ? event.target.value : null
			}
		};
		this.props.updateFormData(data);
	};
	render() {
		console.log(this.props.formData);
		return (
			<div>
				<form>
					<div>Spouse Name and Years Married</div>
					<input
						placeholder="Name"
						name="spouse_name"
						onChange={this.handleChange}
						value={this.props.formData.disciple_profile.spouse_name}
					></input>
					<input
						type="number"
						placeholder="Years Married"
						name="spouse_marriedYear"
						onChange={this.handleChange}
						value={this.props.formData.disciple_profile.spouse_marriedYear}
					></input>
					<div>Parents</div>
					<input
						placeholder="Father's Name"
						name="father_name"
						onChange={this.handleChange}
						value={this.props.formData.parents.father_name}
					></input>
					<textarea
						placeholder="Father's Address"
						name="father_address"
						onChange={this.handleChange}
						value={this.props.formData.parents.father_address}
					></textarea>
					<input
						placeholder="Father's Phone Number"
						name="father_number"
						onChange={this.handleChange}
						value={this.props.formData.parents.father_number}
					></input>
					<input
						placeholder="Mother's Name"
						name="mother_name"
						onChange={this.handleChange}
						value={this.props.formData.parents.mother_name}
					></input>
					<textarea
						placeholder="Mother's Address"
						name="mother_address"
						onChange={this.handleChange}
						value={this.props.formData.parents.mother_address}
					></textarea>
					<input
						placeholder="Mothers's Phone Number"
						name="mother_number"
						onChange={this.handleChange}
						value={this.props.formData.parents.mother_number}
					></input>
				</form>
				<button onClick={this.props.prevPage}>Previous</button>
				<button onClick={this.props.nextPage}>Next</button>
			</div>
		);
	}
}

export default Step4;
