import React, { Component } from 'react';
import { isValidEmail, isNotEmpty, isMatch } from '../../../utils/validation';

export class RegistrationForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            email_signup: '',
            password_signup: '',
            confirmPassword: '',
            error: '',
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            error: nextProps.error
        })
    }

    handleChange = (type, event) => {
        const value = event.target.value;
        this.setState({
            ...this.state,
            error: '',
            [type]: value
        })
    }

    signUP = () => {
        if (!isNotEmpty(this.state.email_signup) || !isNotEmpty(this.state.password_signup) ||
            !isNotEmpty(this.state.firstName) || !isNotEmpty(this.state.lastName) ||
            !isNotEmpty(this.state.confirmPassword)) {
            this.setState({ error: '**Please fill all the fields' })
        }
        else if (!isValidEmail(this.state.email_signup)) {
            this.setState({ error: '**Please enter the correct email address' })
        }
        else if (!isMatch(this.state.password_signup, this.state.confirmPassword)) {
            this.setState({ error: '**Password and confirm password should match' })
        }
        else {
            const body = {
                email: this.state.email_signup,
                password: this.state.password_signup,
                firstname: this.state.firstName,
                lastname: this.state.lastName,
                name: {
                    first: this.state.firstName,
                    last: this.state.lastName
                }
            }
            this.props.signup(body);
        }
    }

    render() {
        return (
            <form className="rd-form rd-form-small">
                <div className="form-wrap">
                    <input
                        className="form-input"
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
                        type="text"
                        name="lastname"
                        placeholder="LastName"
                        data-constraints="@Required"
                        onChange={() => { this.handleChange('lastName', event) }} />
                </div>
                <div className="form-wrap">
                    <input
                        className="form-input"
                        type="email"
                        name="email"
                        placeholder="E-mail"
                        data-constraints="@Email @Required"
                        onChange={() => { this.handleChange('email_signup', event) }} />
                </div>
                <div className="form-wrap">
                    <input
                        className="form-input"
                        type="password"
                        name="password"
                        placeholder="Password"
                        data-constraints="@Required"
                        onChange={() => { this.handleChange('password_signup', event) }} />
                </div>
                <div className="form-wrap">
                    <input
                        className="form-input"
                        type="password"
                        name="password"
                        placeholder="Confirm Password"
                        data-constraints="@Required"
                        onChange={() => { this.handleChange('confirmPassword', event) }} />
                </div>
                <div className="form-wrap">
                    <button className="button button-block button-primary-lighten button-winona" onClick={this.signUP}>Create an Account</button>
                </div>
                <p className="loginError">{this.state.error}</p>
            </form>
        );
    }
}

export default RegistrationForm;