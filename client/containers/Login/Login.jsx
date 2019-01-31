
import { Modal, Button, OverlayTrigger } from 'react-bootstrap';
import React, { Component } from 'react';
import { connect } from "react-redux";
import {loginUser,logoutUser, checkLogin} from '../../actions/loginActions';
// import 'antd/dist/antd.css';

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    }
    this.showModal = this.showModal.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleOk = this.handleOk.bind(this);
  }

  componentDidMount(){
    console.log("this.props=======>>>>>", this.props);
  }
  
  showModal() {
    this.setState({
      visible: true,
    });
  }

  handleOk(e) {
    console.log(e);
    this.setState({
      visible: false,
    });
  }

  handleCancel(e) {
    console.log(e);
    this.setState({
      visible: false,
    });
  }

  render() {
    return (
      <div>
      <div class="rd-navbar-block">
      <ul class="list-inline-bordered">
        <li>
          <button class="rd-navbar-popup-toggle" data-rd-navbar-toggle="#rd-navbar-login-5">Login</button>
          <div class="rd-navbar-popup bg-gray-700" id="rd-navbar-login-5">
            <h4>Sign In</h4>
            <form class="rd-form rd-form-small">
              <div class="form-wrap">
                <input class="form-input" id="login-email-5" type="email" name="email" data-constraints="@Email @Required"/>
                <label class="form-label" for="login-email-5">E-mail</label>
              </div>
              <div class="form-wrap">
                <input class="form-input" id="login-password-5" type="password" name="password" data-constraints="@Required"/>
                <label class="form-label" for="login-password-5">Password</label>
              </div>
              <div class="form-wrap">
                <button class="button button-primary-lighten button-winona" type="submit">Sign in</button>
              </div>
            </form>
          </div>
        </li>
        <li>
          <button class="rd-navbar-popup-toggle" data-rd-navbar-toggle="#rd-navbar-register-5">Registration</button>
          <div class="rd-navbar-popup bg-gray-700" id="rd-navbar-register-5">
            <h4>Registration</h4>
            <form class="rd-form rd-form-small">
              <div class="form-wrap">
                <input class="form-input" id="register-name-5" type="text" name="username" data-constraints="@Required"/>
                <label class="form-label" for="register-name-5">Username</label>
              </div>
              <div class="form-wrap">
                <input class="form-input" id="register-email-5" type="email" name="email" data-constraints="@Email @Required"/>
                <label class="form-label" for="register-email-5">E-mail</label>
              </div>
              <div class="form-wrap">
                <input class="form-input" id="register-password-5" type="password" name="password" data-constraints="@Required"/>
                <label class="form-label" for="register-password-5">Password</label>
              </div>
              <div class="form-wrap">
                <input class="form-input" id="register-password-confirm-5" type="password" name="password" data-constraints="@Required"/>
                <label class="form-label" for="register-password-confirm-5">Confirm Password</label>
              </div>
              <div class="form-wrap">
                <button class="button button-block button-primary-lighten button-winona" type="submit">Create an Account</button>
              </div>
              <div class="form-wrap">
                <div class="text-decoration-lines"><span class="text-decoration-lines-content">or enter with</span></div>
              </div>
              <div class="form-wrap">
                <div class="button-group"> <a class="button button-facebook button-icon button-icon-only button-winona" href="#" aria-label="Facebook"><span class="icon mdi mdi mdi-facebook"></span></a><a class="button button-twitter button-icon button-icon-only button-winona" href="#" aria-label="Twitter"><span class="icon mdi mdi-twitter"></span></a><a class="button button-google button-icon button-icon-only button-winona" href="#" aria-label="Google+"><span class="icon mdi mdi-google"></span></a></div>
              </div>
            </form>
          </div>
        </li>
      </ul>
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

const mapDispatchToProps= (dispatch) => {
	return{
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