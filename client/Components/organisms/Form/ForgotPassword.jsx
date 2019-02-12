import React, { Component } from 'react';
import { connect } from 'react-redux';
import { forgotPassword } from '../../../actions/loginActions';
import { isValidEmail } from '../../../utils/validation';
export class ForgotPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            submitting: false
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.forgotPasswordSentEmail !== nextProps.forgotPasswordSentEmail) {
            this.setState({
                submitting: !this.state.submitting
            })
        }
    }

    handleEmail = (event) => {
        this.setState({
            email: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        if (isValidEmail(this.state.email)) {
            const body = {
                'email': this.state.email
            }
            this.props.forgotPassword(body);
        } else {
            console.log("email is not valid");
        }
    }
    render() {
        return (<div>
            <div class="section-sm section-first">
                <section class="section section-lg bg-gray-100">
                    <div class="container">
                        <div class="row justify-content-center">
                            <div class="col-sm-10 col-md-8 col-lg-7 col-xl-6">
                                <h3 class="wow-outer text-center"><span class="wow slideInUp">FORGOT PASSWORD</span></h3>
                                {!this.state.submitting ? <p class="wow-outer"><span class="wow slideInLeft">Enter your e-mail to get the the Password.</span></p> : ''}
                                {!this.state.submitting ?
                                    <form class="rd-form form-inline wow fadeIn" data-wow-delay=".2s" data-form-output="form-output-global" data-form-type="subscribe">
                                        <div class="form-wrap">
                                            <input class="form-input" id="subscribe-form-1-email" type="email" name="email" onChange={() => { this.handleEmail(event) }} placeholder="Your e-mail" data-constraints="@Email @Required" />
                                        </div>
                                        <div class="form-button">
                                            <button class="button button-primary button-winona" onClick={this.handleSubmit}>Submit</button>
                                        </div>
                                    </form>
                                    : ""}
                                {this.state.submitting ? <p class="wow-outer ForgotPasText"><span class="wow slideInLeft">Please check your email</span></p> : ''}
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>);

    }
}

const mapStateToProps = (state) => {
    return {
        forgotPasswordSentEmail: state.loginReducer.forgotPasswordSentEmail,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        forgotPassword: (email) => {
            dispatch(forgotPassword(email))
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);