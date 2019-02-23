
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
    let log_in ='';
    let forgot_password = '';
    let registration ='';
    let first_name = '';
    let last_name = '';
    let email = '';
    let mobile_number = '';
    let password = '';
    let confirm_password = '';
    let create_an_account = '';


    return (
      
      <div>
        <Translate>
                    {({ translate }) => {
                       log_in = translate('LOGIN_FORM.log_in')
                       forgot_password = translate('LOGIN_FORM.forgot_password')
                       registration = translate('REGISTER_FORM.registration')
                       first_name = translate('REGISTER_FORM.first_name')
                       last_name = translate('REGISTER_FORM.last_name')
                       email = translate('REGISTER_FORM.email')
                       mobile_number = translate('REGISTER_FORM.mobile_number')
                       password = translate('REGISTER_FORM.password')
                       confirm_password = translate('REGISTER_FORM.confirm_password')
                       create_an_account = translate('REGISTER_FORM.create_an_account')
                      return  <div className="rd-navbar-block">
                      {this.state.isUserLogin ?
                        <ul className="list-inline-bordered">
            
                          <li>
                            <li className="rd-navbar-popup-toggle login-modal-1" data-rd-navbar-toggle="#rd-navbar-login-5">
                              
                              {log_in}
                              </li>
                            <div className="rd-navbar-popup bg-gray-700 margin-left-login-modal login-modal-2" id="rd-navbar-login-5">
                              <h4> 
                              {log_in}
                              </h4>
                              <LoginForm loginUser={this.props.loginUser} error={this.state.error} />
                              <p><Link to='/forgotPassword'> {forgot_password}</Link></p>
                            </div>
                          </li>
                          <li>
                            <li className="rd-navbar-popup-toggle register-modal-1" data-rd-navbar-toggle="#rd-navbar-register-5">  
                            {registration}
                            </li>
                            <div className="rd-navbar-popup bg-gray-700 margin-left-register-modal register-modal-2" id="rd-navbar-register-5">
                              <h4> {registration}</h4>
                              <form className="rd-form rd-form-small">
                                <div className="form-wrap">
                                  <input
                                    className="form-input"
                                    id="register-firstName-5"
                                    type="text"
                                    name="firstname"
                                    placeholder={first_name}
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
                                    placeholder={last_name}
                                    data-constraints="@Required"
                                    onChange={() => { this.handleChange('lastName', event) }} />
                                </div>
                                <div className="form-wrap">
                                  <input
                                    className="form-input"
                                    id="register-email-5"
                                    type="email"
                                    name="email"
                                    placeholder= {email}
                                    data-constraints="@Email @Required"
                                    onChange={() => { this.handleChange('email_signup', event) }} />
                                </div>
                                <div className="form-wrap">
                                  <input
                                    className="form-input"
                                    id="register-email-5"
                                    type="text"
                                    name="mobileNumber"
                                    placeholder={mobile_number}
                                    onChange={() => { this.handleChange('mobileNumber', event) }} />
                                </div>
                                <div className="form-wrap">
                                  <input
                                    className="form-input"
                                    id="register-password-5"
                                    type="password"
                                    name="password"
                                    placeholder={password}
                                    data-constraints="@Required"
                                    onChange={() => { this.handleChange('password_signup', event) }} />
                                </div>
                                <div className="form-wrap">
                                  <input
                                    className="form-input"
                                    id="register-password-confirm-5"
                                    type="password"
                                    name="password"
                                    placeholder={confirm_password}
                                    data-constraints="@Required"
                                    onChange={() => { this.handleChange('confirmPassword', event) }} />
                                </div>
                                <div className="form-wrap">
                                  <button className="button button-block button-primary-lighten button-winona" onClick={this.signUP}>{create_an_account}</button>
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
                    </div>;
                      }}
        </Translate>
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