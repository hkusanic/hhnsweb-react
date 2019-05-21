import React from 'react';
import {
	Form,
	Input,
} from 'antd';
import { connect } from 'react-redux';

const FormItem = Form.Item;

const { TextArea } = Input;

// @Form.create()

class AddSadhana extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			language: true,
		};
	}

	render () {
		const { language } = this.state;
		return (
			<React.Fragment>
				<div>
					<section className="card">
						<div className="card-body">
							<div className={styles.addPost}>
								<Form className="mt-3">
									<div className="form-group">
										<FormItem label={language ? 'Name' : 'Name'}>
											<Input
												disabled
												// value={language ? titleEn : titleRu}
												placeholder="Name"
												name="name"
											/>
										</FormItem>
									</div>
									<div className="form-group">
										<FormItem label={language ? 'Email' : 'Email'}>
											<Input
												disabled
												// value={language ? titleEn : titleRu}
												placeholder="Email"
												name="email"
											/>
										</FormItem>
									</div>
									<div className="form-group">
										<FormItem label={language ? 'Date' : 'Date'}>
											<Input
												disabled
												// value={language ? titleEn : titleRu}
												placeholder="Date"
												name="date"
											/>
										</FormItem>
									</div>
									<div className="form-group">
										<FormItem label={language ? 'Time Rising' : 'Time Rising'}>
											<Input
												disabled
												// value={language ? titleEn : titleRu}
												placeholder="Time Rising"
												name="time_rising"
											/>
										</FormItem>
									</div>
									<div className="form-group">
										<FormItem label={language ? 'Rounds' : 'Rounds'}>
											<Input
												disabled
												// value={language ? titleEn : titleRu}
												placeholder="Rounds"
												name="rounds"
											/>
										</FormItem>
									</div>
									<div className="form-group">
										<FormItem label={language ? 'Reading' : 'Reading'}>
											<Input
												disabled
												// value={language ? titleEn : titleRu}
												placeholder="Reading"
												name="reading"
											/>
										</FormItem>
									</div>
									<div className="form-group">
										<FormItem label={language ? 'Association' : 'Association'}>
											<Input
												disabled
												// value={language ? titleEn : titleRu}
												placeholder="Association"
												name="association"
											/>
										</FormItem>
									</div>
									<div className="form-group">
										<FormItem label={language ? 'Comments' : 'Comments'}>
											<TextArea
												rows={4}
												disabled
												// value={language ? titleEn : titleRu}
												placeholder="Comments"
												name="comments"
											/>
										</FormItem>
									</div>
									<div className="form-group">
										<FormItem label={language ? 'Lectures' : 'Lectures'}>
											<TextArea
												rows={4}
												disabled
												// value={language ? titleEn : titleRu}
												placeholder="Lectures"
												name="lectures"
											/>
										</FormItem>
									</div>
									<div className="form-group">
										<FormItem label={language ? 'Additional Comments' : 'Additional Comments'}>
											<TextArea
												rows={4}
												disabled
												// value={language ? titleEn : titleRu}
												placeholder="Additional Comments"
												name="additional_comments"
											/>
										</FormItem>
									</div>
								</Form>
							</div>
						</div>
					</section>
				</div>
			</React.Fragment>
		);
	}
}


// const mapStateToProps = state => {
// 	return {};
// };

// const mapDispatchToProps = dispatch => {
// 	return {};
// };

export default Form.create(AddSadhana);
