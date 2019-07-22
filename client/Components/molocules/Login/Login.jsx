import React, { Component } from 'react';
import { Translate } from 'react-localize-redux';
import Auth from '../../../utils/Auth';
import { isValidEmail, isNotEmpty } from '../../../utils/validation';
import {
	loginUser,
	logoutUser,
	checkLogin,
} from '../../../actions/loginActions';
import { connect } from 'react-redux';
import reactCookie from 'react-cookies';
import ModalNotification from '../../organisms/ModalNotification/ModalNotifiction';

export class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user: '',
			username: '',
			password: '',
			error: null,
			isUserLogin: false,
		};
	}

	componentDidMount() {
		const isUserLogin = Auth.isUserAuthenticated();
		this.setState({
			isUserLogin,
			error: '',
		});
		if (!isUserLogin) {
			const userDetails = JSON.parse(Auth.getUserDetails());
			const name = `${userDetails.firstName} ${userDetails.last}`;
			this.setState({ fullName: name });
		}
	}

	componentWillReceiveProps(nextProps) {
		if (
			nextProps.login !== this.props.login &&
			nextProps.login.isLogin &&
			!this.props.login.isLogin
		) {
			const isUserLogin = Auth.isUserAuthenticated();
			if (!isUserLogin) {
				this.setState(
					{
						error: nextProps.login.error,
						isUserLogin,
					},
					() => {
						this.props.history.push('/');
					}
				);
			} else {
				this.setState({
					error: nextProps.login.error,
					isUserLogin,
				});
			}
        }
        this.setState({
            error: nextProps.login.error
        });
	}

	handleChange = (type, event) => {
		const value = event.target.value;
		this.setState({
			...this.state,
			error: '',
			[type]: value,
		});
	};

	loginSubmit = event => {
		event.preventDefault();
		if (!isNotEmpty(this.state.username) || !isNotEmpty(this.state.password)) {
			this.setState({
				error: (
					<Translate>
						{({ translate }) => translate('REGISTER_FORM.please_fill')}
					</Translate>
				),
			});
		} else if (!isValidEmail(this.state.username)) {
			this.setState({
				error: (
					<Translate>
						{({ translate }) => translate('REGISTER_FORM.correct_email')}
					</Translate>
				),
			});
		} else if (this.state.username && this.state.password) {
			const body = {
				username: this.state.username,
				password: this.state.password,
			};
			this.props.loginUser(body);
		}
	};

	handleModalClose = () => {
		this.setState({
			error: '',
		});
	};

	render() {
		return (
			<div>
				<section className="bg-gray-100">
					<img
						className="img-banner-width"
						src="https://ik.imagekit.io/gcwjdmqwwznjl/Booking_v3_HJGhLISIV.png"
					/>
					<div
						style={{
							textAlign: 'center',
							paddingBottom: '30px',
							paddingTop: '30px',
						}}
					>
						<div
							class="rd-navbar-popup bg-gray-700 loginForm toggle-original-elements active"
							id="rd-navbar-login-5"
						>
							<h4>LOG IN</h4>
							<form class="rd-form rd-form-small">
								<div class="form-wrap">
									<input
										class="form-input"
										autocomplete="off"
										type="email"
										name="email"
										placeholder="E-mail"
										onChange={() => {
											this.handleChange('username', event);
										}}
									/>
								</div>
								<div class="form-wrap">
									<input
										class="form-input"
										autocomplete="off"
										type="password"
										name="password"
										placeholder="Password"
										onChange={() => {
											this.handleChange('password', event);
										}}
									/>
								</div>
								<div class="form-wrap">
									<button
										class="button button-primary button-winona"
										onClick={this.loginSubmit}
									>
										LOG IN
									</button>
								</div>
							</form>
						</div>
						{this.state.error !== '' ? (
							<ModalNotification
								notificationTitle="Error"
								notificationBody={this.state.error}
								shownotificationModal
								handleModalClose={this.handleModalClose}
								cancelButtonTitle="NO"
								okButtonTitle="YES"
								isConfirm
							/>
						) : null}
					</div>
				</section>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		login: state.loginReducer,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		loginUser: userDetails => {
			dispatch(loginUser(userDetails));
		},
		logoutUser: () => {
			dispatch(logoutUser());
		},
		checkLogin: () => {
			dispatch(checkLogin());
		},
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Login);
