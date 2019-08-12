import * as queryString from 'query-string';
import React, { Component } from 'react';
import { isMatch, isNotEmpty } from '../../../utils/validation';
import { connect } from 'react-redux';
import {
	getUserByAccessId,
	updatePassword,
} from '../../../actions/loginActions';
import { Translate } from 'react-localize-redux';
import { Modal } from 'antd';

let routeRender = false;

export class UpdatePassword extends Component {
	constructor (props) {
		super(props);
		this.state = {
			password: '',
			confirmPassword: '',
			error: '',
			accessid: '',
			showUpdateModal: false,
		};
	}

	componentDidMount () {
		if (!routeRender) {
			const values = queryString.parse(location.search);
			if (values.accessid) {
				this.setState(
					{
						accessid: values.accessid,
					},
					() => {
						const body = {
							accessid: this.state.accessid,
						};
						this.props.getUserByAccessId(body);
						routeRender = true;
					}
				);
			}
		}
	}

	

	componentWillReceiveProps (nextProps) {
		const { isPasswordChanged } = this.props;

		if (!isPasswordChanged && nextProps.isPasswordChanged) {
			this.handleRedirectOnPasswordChange(nextProps.loginUser);
		}
	}

	handleRedirectOnPasswordChange = userDetails => {
		if (userDetails.disciple === 'No') {
			this.props.history.push('/');
		} else {
			this.setState({
				showUpdateModal: true,
			});
		}
	};

	handleChange = (type, event) => {
		const value = event.target.value;
		this.setState({
			...this.state,
			error: '',
			[type]: value,
		});
	};

	handleSavePassword = event => {
		event.preventDefault();
		if (
			!isNotEmpty(this.state.password) ||
			!isNotEmpty(this.state.confirmPassword)
		) {
			this.setState({ error: '**Please fill all the details' });
		} else if (!isMatch(this.state.password, this.state.confirmPassword)) {
			this.setState({ error: 'Password and confirm password should match' });
		} else {
			const body = {
				email: this.props.AccessUser.email,
				password: this.state.password,
				accessid: this.state.accessid,
			};
			this.props.updatePassword(body);
		}
	};

	handleRedirectToUpdateProfile = () => {
		this.props.history.push('/updateProfile');
	};

	render() {
		let link_expired = '';
		let reset_password = '';
		let password = '';
		let confirm_password = '';
		let save_password = '';
		let please_fill = '';
		let password_confirm = '';
		let password_reset = '';

		const { showUpdateModal } = this.state;

		const okButtonProps = {
			disabled: true,
		}

		if (!this.state && this.props) {
			return <div style={{ textAlign: 'center' }}>Loading...</div>;
		}
		return (
			<div>
				<Translate>
					{({ translate }) => {
						link_expired = translate('RESET_PASSWORD.link_expired');
						reset_password = translate('RESET_PASSWORD.reset_password');
						password = translate('RESET_PASSWORD.password');
						confirm_password = translate('RESET_PASSWORD.confirm_password');
						save_password = translate('RESET_PASSWORD.save_password');
						please_fill = 'RESET_PASSWORD.please_fill';
						password_confirm = translate('RESET_PASSWORD.password_confirm');
						password_reset = translate('RESET_PASSWORD.password_reset');

						return (
							<div>
								{Object.keys(this.props.AccessUser).length === 0 &&
								this.props.resetError ? (
									<div class="section-sm section-first accesIdError">
										{link_expired}
									</div>
								) : !this.props.isPasswordupdated ? (
									<section class="section section-lg bg-gray-100">
										<div class="container">
											<div class="row justify-content-center">
												<div class="col-sm-10 col-md-8 col-lg-7 col-xl-6">
													<h3 class="wow-outer text-center">
														<span class="wow slideInUp">Update Password</span>
													</h3>
													<div class="container" style={{ paddingTop: '5%' }}>
														<div class="box-1" style={{ maxWidth: '70%' }}>
															<form class="rd-form rd-form-small">
																<div
																	class="form-wrap"
																	style={{
																		paddingTop: '3%',
																		paddingBottom: '3%',
																	}}
																>
																	<input
																		class="form-input"
																		autoComplete="off"
																		type="password"
																		name="password"
																		placeholder={password}
																		onChange={() => {
																			this.handleChange('password', event);
																		}}
																	/>
																</div>
																<div
																	class="form-wrap"
																	style={{
																		paddingTop: '3%',
																		paddingBottom: '3%',
																	}}
																>
																	<input
																		class="form-input"
																		autoComplete="off"
																		type="password"
																		name="ConfirmPassword"
																		placeholder={confirm_password}
																		onChange={() => {
																			this.handleChange(
																				'confirmPassword',
																				event
																			);
																		}}
																	/>
																</div>
																<div class="form-wrap">
																	<button
																		class="button button-primary button-winona"
																		onClick={this.handleSavePassword}
																	>
																		{save_password}
																	</button>
																</div>
																<p className="loginError">
																	{this.state.error ===
																	'**Please fill all the details'
																		? please_fill
																		: password_confirm}
																</p>
																<p className="loginError">
																	{this.props.UpdatedError}
																</p>
															</form>
														</div>
													</div>
												</div>
											</div>
										</div>
									</section>
								) : (
									<div className="accesIdError">{password_reset}</div>
								)}
							</div>
						);
					}}
				</Translate>
				{showUpdateModal ? (
					<Modal
						title="Update Details"
						visible={showUpdateModal}
						closable={false}
						destroyOnClose={true}
						cancelText={null}
						onOk={this.handleRedirectToUpdateProfile}
						cancelButtonProps={okButtonProps}
					>
						<p>Please update your details</p>
					</Modal>
				) : null}
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		AccessUser: state.loginReducer.AccessUser,
		loginUser: state.loginReducer.loginUser,
		isPasswordChanged: state.loginReducer.isPasswordChanged,
		regError: state.loginReducer.regError,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		getUserByAccessId: body => {
			dispatch(getUserByAccessId(body));
		},
		updatePassword: body => {
			dispatch(updatePassword(body));
		},
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(UpdatePassword);
