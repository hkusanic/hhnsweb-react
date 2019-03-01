
import React, { Component } from 'react';
import { connect } from "react-redux";
import { loginUser, logoutUser, checkLogin, signupUser, forgotPassword } from '../../actions/loginActions';
import Auth from '../../utils/Auth';
import { Translate } from 'react-localize-redux';
import { Link } from 'react-router-dom';
import { isValidEmail, isNotEmpty, isMatch } from '../../utils/validation';
import LoginForm from '../../Components/organisms/Form/LoginFrom';
import IntlTelInput from 'react-intl-tel-input';

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
      countryCode: '',
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
        }, () => {
          location.reload();
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
    this.props.handleTabIndex(1);
    this.props.logoutUser();
    window.localStorage.clear();
    window.location.href = '/';
  }

  handleRemoveModal = () => {
    $('.login-modal-2').removeClass('active');
  }

  signUP = (event) => {
    event.preventDefault();
    if (!isNotEmpty(this.state.email_signup) || !isNotEmpty(this.state.password_signup) ||
      !isNotEmpty(this.state.firstName) || !isNotEmpty(this.state.lastName) ||
      !isNotEmpty(this.state.confirmPassword) || !isNotEmpty(this.state.mobileNumber)) {
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
        lastname: this.state.lastName,
        mobileNumber: this.state.mobileNumber,
        countryCode: this.state.countryCode
      }
      this.props.signup(body);
    }
  }

  handle = (validate, number, data) => {
    const countryCode = data.dialCode;
    const mobileNumber = number;

    if (!validate) {
      this.setState({ error: 'Please Enter Mobile Number Correctly' })
    } else {
      this.setState({
        mobileNumber,
        countryCode,
        error: '',
      })
    }
  }

  render() {
    let log_in = '';
    let forgot_password = '';
    let registration = '';
    let first_name = '';
    let last_name = '';
    let email = '';
    let password = '';
    let confirm_password = '';
    let create_an_account = '';
    let profile = '';
    let logout = '';
    let login_modal_1 = '';
    let login_modal_2 = '';
    let res_modal_1 = '';
    let res_modal_2 = '';
   
    if (!this.props.notActive) {
      login_modal_1 = "rd-navbar-popup-toggle login-modal-1";
      login_modal_2 = "rd-navbar-popup bg-gray-700 margin-left-login-modal  login-modal-2";
      res_modal_1 = 'rd-navbar-popup-toggle register-modal-1';
      res_modal_2 = 'rd-navbar-popup bg-gray-700 margin-left-register-modal register-modal-2';
       }
    else if (this.props.notActive) {
      login_modal_1 = "rd-navbar-popup-toggle login-modal-mb";
      login_modal_2 = "rd-navbar-popup bg-gray-700 margin-left-login-modal";
      res_modal_1 = 'rd-navbar-popup-toggle register-modal-1';
      res_modal_2 = 'rd-navbar-popup bg-gray-700 margin-left-register-modal';
        }

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
            password = translate('REGISTER_FORM.password')
            confirm_password = translate('REGISTER_FORM.confirm_password')
            create_an_account = translate('REGISTER_FORM.create_an_account')
            profile = translate('HOME.profile')
            logout = translate('HOME.log_out')
            return <div className="rd-navbar-block">
              {this.state.isUserLogin ?
                <ul className="list-inline-bordered" style={{color: '#122e44' }}>

                  <li>
                    <li className={login_modal_1} onClick={() => {this.props.handleLogin()}} data-rd-navbar-toggle="#rd-navbar-login-5">
                      {log_in}
                    </li>
                    <div className={login_modal_2} id="rd-navbar-login-5">
                      <h4>
                        {log_in}
                      </h4>
                      <LoginForm loginUser={this.props.loginUser} error={this.state.error} />
                      <p onClick={() => {this.handleRemoveModal()}}>
                          <Link to='/forgotPassword'> {forgot_password}</Link>
                      </p>
                    </div>
                  </li>
                  <li>
                    <li className={res_modal_1} onClick={() => {this.props.handleRedirect()}} data-rd-navbar-toggle="#rd-navbar-register-5" >
                      {registration}
                    </li>
                    <div className={res_modal_2} id="rd-navbar-register-5">
                      <h4> {registration}</h4>
                      <form className="rd-form rd-form-small">
                        <div className="form-wrap">
                          <input
                            className="form-input"
                            autoComplete="off"
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
                            autoComplete="off"
                            type="text"
                            name="lastname"
                            placeholder={last_name}
                            data-constraints="@Required"
                            onChange={() => { this.handleChange('lastName', event) }} />
                        </div>
                        <div className="form-wrap">
                          <input
                            className="form-input"
                            autoComplete="off"
                            type="email"
                            name="email"
                            placeholder={email}
                            data-constraints="@Email @Required"
                            onChange={() => { this.handleChange('email_signup', event) }} />
                        </div>
                        <div className="form-wrap">
                          <IntlTelInput
                            id="registation_mobile_flag"
                            containerClassName="intl-tel-input"
                            defaultValue={this.state.mobileNumber}
                            defaultCountry='india'
                            autoHideDialCode={true}
                            format={true}
                            separateDialCode={true}
                            inputClassName="form-control"
                            onPhoneNumberChange={(validate, number, data) => { this.handle(validate, number, data) }}
                          />
                        </div>
                        <div className="form-wrap">
                          <input
                            className="form-input"
                            autoComplete="off"
                            type="password"
                            name="password"
                            placeholder={password}
                            data-constraints="@Required"
                            onChange={() => { this.handleChange('password_signup', event) }} />
                        </div>
                        <div className="form-wrap">
                          <input
                            className="form-input"
                            autoComplete="off"
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
                : <ul className="list-inline-bordered" style={{color: '#122e44' }}>
                  <li><button className="rd-navbar-popup-toggle" data-rd-navbar-toggle="#rd-navbar-login-5" onClick={this.logoutSubmit}>{logout}</button></li>
                  <li>
                    <button className="rd-navbar-popup-toggle">
                      <Link to='/profile'>{profile}</Link>
                      </button>
                  </li>
                </ul>}
            </div>;
          }}
        </Translate>
      </div >
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