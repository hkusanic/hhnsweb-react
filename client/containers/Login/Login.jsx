
import React, { Component } from 'react';
import { connect } from "react-redux";
import { loginUser, logoutUser, checkLogin, signupUser } from '../../actions/loginActions';
import Auth from '../../utils/Auth';
import { Translate } from 'react-localize-redux';

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
      confirmPassword: ''
    }
  }

  componentDidMount() {
    const isUserLogin = Auth.isUserAuthenticated();
    this.setState({
      isLogin: this.props.login.isLogin,
      userDetails: this.props.login.loginUser,
      isUserLogin
    })
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.login !== this.props.login) {
      const isUserLogin = Auth.isUserAuthenticated();
      this.setState({
        isLogin: nextProps.login.isLogin,
        userDetails: nextProps.login.loginUser,
        isUserLogin
      })
    }
  }

  handleUsername = (event) => {
    this.setState({ username: event.target.value })
  }

  handleUserpassword = (event) => {
    this.setState({ userpassword: event.target.value })
  }

  handlefirstName = (event) => {
    this.setState({ firstName: event.target.value })
  }

  handlelastName = (event) => {
    this.setState({ lastName: event.target.value })
  }

  handleEmail = (event) => {
    this.setState({ email_signup: event.target.value })
  }

  handlePassword = (event) => {
    this.setState({ password_signup: event.target.value })
  }

  handleConfirmPassword = (event) => {
    this.setState({ confirmPassword: event.target.value })
  }

  loginSubmit = () => {
    if (this.state.username && this.state.userpassword) {
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
    if (this.state.password_signup === this.state.confirmPassword) {
      const body = {
        email : this.state.email_signup,
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
                        onChange={this.handleUsername}
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
                        onChange={this.handleUserpassword}
                        data-constraints="@Required" />
                    </div>
                    <div className="form-wrap">
                      <button className="button button-primary-lighten button-winona" onClick={this.loginSubmit} type="submit">Sign in</button>
                    </div>
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
                        onChange={this.handlefirstName} />
                    </div>
                    <div className="form-wrap">
                      <input
                        className="form-input"
                        id="register-lastName-5"
                        type="text"
                        name="lastname"
                        placeholder="LastName"
                        data-constraints="@Required"
                        onChange={this.handlelastName} />
                    </div>
                    <div className="form-wrap">
                      <input
                        className="form-input"
                        id="register-email-5"
                        type="email"
                        name="email"
                        placeholder="E-mail"
                        data-constraints="@Email @Required"
                        onChange={this.handleEmail} />
                    </div>
                    <div className="form-wrap">
                      <input
                        className="form-input"
                        id="register-password-5"
                        type="password"
                        name="password"
                        placeholder="Password"
                        data-constraints="@Required"
                        onChange={this.handlePassword} />
                    </div>
                    <div className="form-wrap">
                      <input
                        className="form-input"
                        id="register-password-confirm-5"
                        type="password"
                        name="password"
                        placeholder="Confirm Password"
                        data-constraints="@Required"
                        onChange={this.handleConfirmPassword} />
                    </div>
                    <div className="form-wrap">
                      <button className="button button-block button-primary-lighten button-winona" onClick={this.signUP}>Create an Account</button>
                    </div>
                  </form>
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
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);