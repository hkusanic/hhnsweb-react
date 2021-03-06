import React, { Component } from 'react';
import { connect } from 'react-redux';
import { forgotPassword } from '../../../actions/loginActions';
import { isValidEmail, isNotEmpty } from '../../../utils/validation';
import { Translate } from 'react-localize-redux';
export class ForgotPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            submitting: false,
            error: ''
        }
    }

    componentWillReceiveProps(nextProps) {
        if (!this.props.forgotPasswordSentEmail && nextProps.forgotPasswordSentEmail) {
            this.setState({
                submitting: !this.state.submitting,
                error: ''
            })
        }
        if (nextProps.forgotError && !nextProps.forgotPasswordSentEmail) {
            this.setState({
                error: nextProps.forgotError,
                submitting: false
            })
        }
    }

    handleEmail = (event) => {
        this.setState({
            email: event.target.value,
            error: ''
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        if (!isNotEmpty(this.state.email)) {
            this.setState({ error: "**Please enter the email" })
        }
        else if (!isValidEmail(this.state.email)) {
            this.setState({ error: "**Please enter correct email address" })
        }
        else {
            const body = {
                'email': this.state.email
            }
            this.props.forgotPassword(body);
        }
    }
    render() {
        let your_email = '';
        return (<div>
            <Translate>
                {({ translate }) => {
                    your_email = translate('FORGOT_PASSWORD.your_email')
                    return <div>
                        <section class="bg-gray-100">
                            <img src='https://ik.imagekit.io/gcwjdmqwwznjl/Booking_v3_HJGhLISIV.png' />
                            <div class="container" style={{paddingTop:'2em'}}>
                                <div class="row justify-content-center">
                                    <div class="col-sm-10 col-md-8 col-lg-7 col-xl-6">
                                        <h3 class="wow-outer text-center"><span class="wow slideInUp"><Translate>
                                            {({ translate }) => translate('FORGOT_PASSWORD.forgot_password')}
                                        </Translate></span></h3>
                                        {!this.state.submitting ? <p class="wow-outer"><span class="wow fadeInUpSmall"><Translate>
                                            {({ translate }) => translate('FORGOT_PASSWORD.enter_the_email')}
                                        </Translate></span></p> : ''}
                                        {!this.state.submitting ?
                                            <form class="rd-form form-inline wow fadeIn" data-wow-delay=".2s" data-form-output="form-output-global" data-form-type="subscribe">
                                                <div class="form-wrap">
                                                    <input class="form-input" autoComplete="off" type="email" name="email" onChange={() => { this.handleEmail(event) }} placeholder={your_email} data-constraints="@Email @Required" />
                                                </div>
                                                <div class="form-button">
                                                    <button class="button button-primary button-winona" onClick={this.handleSubmit}><Translate>
                                                        {({ translate }) => translate('FORGOT_PASSWORD.submit')}
                                                    </Translate></button>
                                                </div>
                                            </form>
                                            : ""}
                                        {this.state.submitting ? <p class="wow-outer ForgotPasText"><span class="wow fadeInUpSmall"><Translate>
                                            {({ translate }) => translate('FORGOT_PASSWORD.please_check_email')}
                                        </Translate></span></p> : ''}
                                        <p className="loginError">
                                            {this.state.error === '**Please enter the email' ?
                                                <Translate>
                                                    {({ translate }) => translate('FORGOT_PASSWORD.please_enter_email')}
                                                </Translate> :
                                                (this.state.error === '**Please enter correct email address' ?
                                                    <Translate>
                                                        {({ translate }) => translate('FORGOT_PASSWORD.please_enter_correct_address')}
                                                    </Translate> : null)}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                }
                }


            </Translate>
        </div>);

    }
}

const mapStateToProps = (state) => {
    return {
        forgotPasswordSentEmail: state.loginReducer.forgotPasswordSentEmail,
        forgotError: state.loginReducer.forgotError
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