
import React, { Component } from 'react';
import { connect } from "react-redux";
import { loginUser, logoutUser, checkLogin, signupUser, forgotPassword } from '../../actions/loginActions';
import Auth from '../../utils/Auth';
import { Translate } from 'react-localize-redux';
import { Link } from 'react-router-dom';
import { isValidEmail, isNotEmpty, isMatch, isValidPhone, onlyIntegers } from '../../utils/validation';
import LoginForm from '../../Components/organisms/Form/LoginFrom';

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      isUserLogin: false,
      firstName: '',
      lastName: '',
      email_signup: '',
      mobileNumber: '',
      password_signup: '',
      confirmPassword: '',
      error: '',
      regError: ''

    }
  }

  componentDidMount() {
    const isUserLogin = Auth.isUserAuthenticated();
    this.setState({
      isUserLogin,
      error: '',
      regError: '',
    })
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.login !== this.props.login) {
      const isUserLogin = Auth.isUserAuthenticated();
      if (!isUserLogin) {
        this.setState({
          error: nextProps.login.error,
          regError: nextProps.login.regError,
          isUserLogin
        })

      } else {
        this.setState({
          error: nextProps.login.error,
          regError: nextProps.login.regError,
          isUserLogin
        })
      }
    }

  }

  handleChange = (type, event) => {
    const value = event.target.value;
    this.setState({
      ...this.state,
      error: '',
      regError: '',
      [type]: value
    })
  }

  logoutSubmit = () => {
    this.props.logoutUser();
    window.localStorage.clear();
    window.location.href = '/';
  }

  signUP = (event) => {
    event.preventDefault();
    if (!isNotEmpty(this.state.email_signup) || !isNotEmpty(this.state.password_signup) ||
      !isNotEmpty(this.state.firstName) || !isNotEmpty(this.state.lastName) ||
      !isNotEmpty(this.state.confirmPassword) || !isNotEmpty(this.state.mobileNumber) ) {
      this.setState({ regError: '**Please fill all the fields' })
    }
    else if (!isValidEmail(this.state.email_signup)) {
      this.setState({ regError: '**Please enter the correct email address' })
    }
    else if (!isMatch(this.state.password_signup, this.state.confirmPassword)) {
      this.setState({ regError: '**Password and confirm password should match' })
    }
    else if (!onlyIntegers(this.state.mobileNumber) || !isValidPhone(this.state.mobileNumber)) {
      this.setState({ error: 'Please Enter Mobile Number Correctly' })
  }
    else {
      const body = {
        email: this.state.email_signup,
        password: this.state.password_signup,
        firstname: this.state.firstName,
        lastname: this.state.lastName,
        mobileNumber: this.state.mobileNumber
      }
      this.props.signup(body);
    }
  }


  render() {
    return (
      <div>
        <div className="rd-navbar-block">
          {this.state.isUserLogin ?
            <ul className="list-inline-bordered">

              <li>
                <li className="rd-navbar-popup-toggle login-modal-1" data-rd-navbar-toggle="#rd-navbar-login-5">
                  <Translate>
                    {({ translate }) => translate('loginLabel')}
                  </Translate></li>
                <div className="rd-navbar-popup bg-gray-700 margin-left-login-modal login-modal-2" id="rd-navbar-login-5">
                  <h4>Log In</h4>
                  <LoginForm loginUser={this.props.loginUser} error={this.state.error} />
                  <p><Link to='/forgotPassword'>Forgot Password</Link></p>
                </div>
              </li>
              <li>
                <li className="rd-navbar-popup-toggle register-modal-1" data-rd-navbar-toggle="#rd-navbar-register-5">REGISTRATION</li>
                <div className="rd-navbar-popup bg-gray-700 margin-left-register-modal register-modal-2" id="rd-navbar-register-5">
                  <h4>Registration</h4>
                  <form className="rd-form rd-form-small">
                    <div className="form-wrap">
                      <input
                        className="form-input"
                        id="register-firstName-5"
                        type="text"
                        name="firstname"
                        placeholder="FirstName"
                        data-constraints="@Required"
                        onChange={() => { this.handleChange('firstName', event) }}
                      />
                    </div>
                    <div className="form-wrap">
                      <input
                        className="form-input"
                        id="register-lastName-5"
                        type="text"
                        name="lastname"
                        placeholder="LastName"
                        data-constraints="@Required"
                        onChange={() => { this.handleChange('lastName', event) }} />
                    </div>
                    <div className="form-wrap">
                      <input
                        className="form-input"
                        id="register-email-5"
                        type="email"
                        name="email"
                        placeholder="E-mail"
                        data-constraints="@Email @Required"
                        onChange={() => { this.handleChange('email_signup', event) }} />
                    </div>
                    <div className="form-wrap">
                      <input
                        className="form-input"
                        id="register-email-5"
                        type="text"
                        name="mobileNumber"
                        placeholder="Mobile Number"
                        onChange={() => { this.handleChange('mobileNumber', event) }} />
                    </div>
                    <div className="form-wrap">
                      <input
                        className="form-input"
                        id="register-password-5"
                        type="password"
                        name="password"
                        placeholder="Password"
                        data-constraints="@Required"
                        onChange={() => { this.handleChange('password_signup', event) }} />
                    </div>
                    <div className="form-wrap">
                      <input
                        className="form-input"
                        id="register-password-confirm-5"
                        type="password"
                        name="password"
                        placeholder="Confirm Password"
                        data-constraints="@Required"
                        onChange={() => { this.handleChange('confirmPassword', event) }} />
                    </div>
                    <div className="form-wrap">
                      <button className="button button-block button-primary-lighten button-winona" onClick={this.signUP}>Create an Account</button>
                    </div>
                  </form>
                  <p className="loginError">{this.state.regError}</p>
                </div>
              </li>
            </ul>
            : <ul className="list-inline-bordered">
              <li><button className="rd-navbar-popup-toggle" data-rd-navbar-toggle="#rd-navbar-login-5" onClick={this.logoutSubmit}>LOGOUT</button></li>
              <li><button className="rd-navbar-popup-toggle"><Link to='/profile'>PROFILE</Link></button></li>
            </ul>}
        </div>
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    login: state.loginReducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loginUser: (userDetails) => {
      dispatch(loginUser(userDetails));
    },
    logoutUser: () => {
      dispatch(logoutUser());
    },
    checkLogin: () => {
      dispatch(checkLogin())
    },
    signup: (body) => {
      dispatch(signupUser(body))
    },
    forgotPassword: (email) => {
      dispatch(forgotPassword(email))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);