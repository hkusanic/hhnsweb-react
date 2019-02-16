import React, { Component } from 'react';
import { isValidEmail, isNotEmpty } from '../../../utils/validation';

export class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            error: ''
        }
    }

    componentWillReceiveProps(nextProps){
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

    loginSubmit = (event) => {
        event.preventDefault();
        if (!isNotEmpty(this.state.username) || !isNotEmpty(this.state.password)) {
            this.setState({ error: '**Please fill all the fields' })
        }
        else if (!isValidEmail(this.state.username)) {
            this.setState({ error: '**Please enter the correct email address' })
        }
        else if (this.state.username && this.state.password) {
            const body = {
                "username": this.state.username,
                "password": this.state.password
            }
            this.props.loginUser(body);
        }
    }

    render() {
        return (
            <form className="rd-form rd-form-small">
                <div className="form-wrap">
                    <input
                        className="form-input"
                        type="email"
                        name="email"
                        data-constraints="@Email @Required"
                        onChange={() => { this.handleChange('username', event) }}
                        placeholder="E-mail" />
                </div>
                <div className="form-wrap">
                    <input
                        className="form-input"
                        type="password"
                        name="password"
                        data-constraints="@Required"
                        onChange={() => { this.handleChange('password', event) }}
                        placeholder="Password" />
                </div>
                <div className="form-wrap">
                    <button className="button button-primary button-winona" onClick={this.loginSubmit}>Log in</button>
                </div>
                <p className="loginError">{this.state.error}</p>
            </form>
        );
    }
}

export default LoginForm;