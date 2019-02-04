
import React, { Component } from 'react';
import { connect } from "react-redux";
import { loginUser, logoutUser, checkLogin } from '../../actions/loginActions';

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      username: '',
      password: '',
      isLogin: false,
      userDetails : {}
    }
  }

  componentDidMount() {
    this.setState({
      isLogin: this.props.login.isLogin,
      userDetails: this.props.login.loginUser
    })
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.login !== this.props.login){
      this.setState({
        isLogin: nextProps.login.isLogin,
        userDetails: nextProps.login.loginUser
      })
    }
  }

  handleEmail = (event) => {
    this.setState({ username: event.target.value })
  }

  handlePassword = (event) => {
    this.setState({ password: event.target.value })
  }


  loginSubmit = () => {
    if (this.state.username && this.state.password) {
      const body = {
        "username": this.state.username,
        "password": this.state.password
      }
      this.props.loginUser(body);
    }
  }

  logoutSubmit = () =>{
    this.props.logoutUser();
  }


  render() {
    return (
      <div>
        <div className="rd-navbar-block">
        {!this.state.isLogin ? 
          <ul className="list-inline-bordered">
          
            <li>
              <button className="rd-navbar-popup-toggle" data-rd-navbar-toggle="#rd-navbar-login-5">LOGIN</button>
              <div className="rd-navbar-popup bg-gray-700 margin-left-login-modal" id="rd-navbar-login-5">
                <h4>Sign In</h4>
                <form id="loginForm" className="rd-form rd-form-small">
                  <div className="form-wrap">
                    <input
                      className="form-input"
                      id="login-email-5"
                      type="email"
                      name="email"
                      onChange={this.handleEmail}
                      data-constraints="@Email @Required" />
                    <label className="form-label" for="login-email-5">E-mail</label>
                  </div>
                  <div className="form-wrap">
                    <input
                      className="form-input"
                      id="login-password-5"
                      type="password"
                      name="password"
                      onChange={this.handlePassword}
                      data-constraints="@Required" />
                    <label className="form-label" for="login-password-5">Password</label>
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
                    <input className="form-input" id="register-name-5" type="text" name="username" data-constraints="@Required" />
                    <label className="form-label" for="register-name-5">Username</label>
                  </div>
                  <div className="form-wrap">
                    <input className="form-input" id="register-email-5" type="email" name="email" data-constraints="@Email @Required" />
                    <label className="form-label" for="register-email-5">E-mail</label>
                  </div>
                  <div className="form-wrap">
                    <input className="form-input" id="register-password-5" type="password" name="password" data-constraints="@Required" />
                    <label className="form-label" for="register-password-5">Password</label>
                  </div>
                  <div className="form-wrap">
                    <input className="form-input" id="register-password-confirm-5" type="password" name="password" data-constraints="@Required" />
                    <label className="form-label" for="register-password-confirm-5">Confirm Password</label>
                  </div>
                  <div className="form-wrap">
                    <button className="button button-block button-primary-lighten button-winona" type="submit">Create an Account</button>
                  </div>
                </form>
              </div>
            </li>
          </ul>
          : <ul className="list-inline-bordered">
            <li><button className="rd-navbar-popup-toggle" data-rd-navbar-toggle="#rd-navbar-login-5" onClick={this.logoutSubmit}>LOGOUT</button></li>
          </ul> }
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
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);