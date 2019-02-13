
import React, { Component } from 'react';
import { connect } from "react-redux";
import { loginUser, logoutUser, checkLogin, signupUser, forgotPassword } from '../../actions/loginActions';
import Auth from '../../utils/Auth';
import { Translate } from 'react-localize-redux';
import {
  Link
} from 'react-router-dom';
import { isValidEmail, isNotEmpty, isMatch } from '../../utils/validation';
export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      username: '',
      userpassword: '',
      password: '',
      isLogin: false,
      userDetails: {},
      isUserLogin: false,
      firstName: '',
      lastName: '',
      email_signup: '',
      password_signup: '',
      confirmPassword: '',
      error: '',
      regError: ''

    }
  }

  componentDidMount() {
    const isUserLogin = Auth.isUserAuthenticated();
    this.setState({
      isLogin: this.props.login.isLogin,
      userDetails: this.props.login.loginUser,
      isUserLogin,
      error: '',
      regError: '',
      username: '',
      userpassword: '',
    })
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.login !== this.props.login) {
      const isUserLogin = Auth.isUserAuthenticated();
      this.setState({
        isLogin: nextProps.login.isLogin,
        userDetails: nextProps.login.loginUser,
        error: nextProps.login.error,
        regError: nextProps.login.regError,
        isUserLogin
      })
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

  loginSubmit = () => {
    if (!isNotEmpty(this.state.username) || !isNotEmpty(this.state.userpassword)) {
      this.setState({ error: '**Please fill all the fields' })
    }
    else if (!isValidEmail(this.state.username)) {
      this.setState({ error: '**Please enter the correct email address' })
    }
    else if (this.state.username && this.state.userpassword) {
      const body = {
        "username": this.state.username,
        "password": this.state.userpassword
      }
      this.props.loginUser(body);
    }
  }

  logoutSubmit = () => {
    this.props.logoutUser();
    location.reload();
  }

  signUP = () => {
    if (!isNotEmpty(this.state.email_signup) || !isNotEmpty(this.state.password_signup) ||
      !isNotEmpty(this.state.firstName) || !isNotEmpty(this.state.lastName) ||
      !isNotEmpty(this.state.confirmPassword)) {
      this.setState({ regError: '**Please fill all the fields' })
    }
    else if (!isValidEmail(this.state.email_signup)) {
      this.setState({ regError: '**Please enter the correct email address' })
    }
    else if (!isMatch(this.state.password_signup, this.state.confirmPassword)) {
      this.setState({ regError: '**Password and confirm password should match' })
    }
    else {
      const body = {
        email: this.state.email_signup,
        password: this.state.password_signup,
        firstname: this.state.firstName,
        lastname: this.state.lastName
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
                <li className="rd-navbar-popup-toggle" data-rd-navbar-toggle="#rd-navbar-login-5">
                  <Translate>
                    {({ translate }) => translate('loginLabel')}
                  </Translate></li>
                <div className="rd-navbar-popup bg-gray-700 margin-left-login-modal" id="rd-navbar-login-5">
                  <h4>Sign In</h4>
                  <form id="loginForm" className="rd-form rd-form-small" autoComplete="false">
                    <div className="form-wrap">
                      <input
                        className="form-input"
                        autoComplete="off"
                        id="login-email-5"
                        type="email"
                        name="email"
                        placeholder="E-mail"
                        onChange={() => { this.handleChange('username', event) }}
                        data-constraints="@Email @Required" />
                    </div>
                    <div className="form-wrap">
                      <input
                        className="form-input"
                        autoComplete="off"
                        id="login-password-5"
                        type="password"
                        name="password"
                        placeholder="Password"
                        onChange={() => { this.handleChange('userpassword', event) }}
                        data-constraints="@Required" />
                    </div>
                    <div className="form-wrap">
                      <button className="button button-primary-lighten button-winona" onClick={this.loginSubmit} type="submit">Sign in</button>
                      <p><Link to='/forgotPassword'>Forgot Password</Link></p>
                    </div>
                    <p className="loginError">{this.state.error}</p>
                  </form>
                </div>
              </li>
              <li>
                <button className="rd-navbar-popup-toggle" data-rd-navbar-toggle="#rd-navbar-register-5">REGISTRATION</button>
                <div className="rd-navbar-popup bg-gray-700 margin-left-register-modal" id="rd-navbar-register-5">
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