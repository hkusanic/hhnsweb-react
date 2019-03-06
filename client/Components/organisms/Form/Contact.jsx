import React, { Component } from 'react';
import { Translate } from 'react-localize-redux';
import { isValidEmail, isNotEmpty } from '../../../utils/validation';
import { connect } from "react-redux";
import { contactUs } from '../../../actions/loginActions';

export class Contact extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            mobileNumber: '',
            message: '',
            error: '',
            sendMessageSuccessfull: ''
        }
    }

    componentWillReceiveProps(nextProps) {
        if(!this.props.isContactSubmitted && nextProps.isContactSubmitted){
            this.setState({
                firstName: '',
                lastName: '',
                email: '',
                mobileNumber: '',
                message: '',
                error: '',
                sendMessageSuccessfull: 'Your message has been sent successfully'
            })
        }
        if(nextProps.error){
            this.setState({
                error: nextProps.error,
                sendMessageSuccessfull: ''
            })
        }
    }
    handleChange = (type, event) => {
        const value = event.target.value;
        this.setState({
            ...this.state,
            error: '',
            sendMessageSuccessfull: '',
            [type]: value
        })
    }

    handelSaveMessage = (event) => {
        event.preventDefault();
        if (!isNotEmpty(this.state.firstName) || !isNotEmpty(this.state.lastName) ||
            !isNotEmpty(this.state.email) || !isNotEmpty(this.state.mobileNumber) ||
            !isNotEmpty(this.state.message)) {
            this.setState({ error: <Translate>{({ translate }) => translate('REGISTER_FORM.please_fill')}</Translate> })
        }
        else if (!isValidEmail(this.state.email)) {
            this.setState({ error: <Translate>{({ translate }) => translate('REGISTER_FORM.correct_email')}</Translate> })
        }
        else {
            const body = {
                email_ref: this.state.email,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                phone: this.state.mobileNumber,
                message: this.state.message,
            }
            this.props.contactUs(body);
        }
    }


    render() {
        return (
            <div>
                <section className="bg-gray-100">
                    <img src='https://ik.imagekit.io/gcwjdmqwwznjl/Booking_v3_HJGhLISIV.png' />
                    <div className="range justify-content-xl-between">
                        <div className="cell-xl-12 align-self-center container">
                            <div className="row">
                                <div className="col-lg-9 cell-inner">
                                    <div className="section-lg">
                                        <h3 className="wow-outer contactHeading">
                                            <span className="wow slideInDown">
                                                <Translate>{({ translate }) => translate('CONTACT.contact_us')}</Translate>
                                            </span>
                                        </h3>
                                        <form className="rd-form">
                                            <div className="row row-10">
                                                <div className="col-md-6 wow-outer">
                                                    <div className="form-wrap wow fadeSlideInUp">
                                                        <label className="form-label-outside" htmlFor="contact-first-name">
                                                            <Translate>{({ translate }) => translate('CONTACT.first_name')}</Translate>
                                                        </label>
                                                        <input
                                                            className="form-input"
                                                            type="text"
                                                            name="name"
                                                            value={this.state.firstName}
                                                            onChange={() => { this.handleChange('firstName', event) }} />
                                                    </div>
                                                </div>
                                                <div className="col-md-6 wow-outer">
                                                    <div className="form-wrap wow fadeSlideInUp">
                                                        <label className="form-label-outside" htmlFor="contact-last-name">
                                                            <Translate>{({ translate }) => translate('CONTACT.last_name')}</Translate>
                                                        </label>
                                                        <input
                                                            className="form-input"
                                                            type="text"
                                                            name="name"
                                                            value={this.state.lastName}
                                                            onChange={() => { this.handleChange('lastName', event) }} />
                                                    </div>
                                                </div>
                                                <div className="col-md-6 wow-outer">
                                                    <div className="form-wrap wow fadeSlideInUp">
                                                        <label className="form-label-outside" htmlFor="contact-email">
                                                            <Translate>{({ translate }) => translate('CONTACT.email')}</Translate>
                                                        </label>
                                                        <input
                                                            className="form-input"
                                                            type="email"
                                                            name="email"
                                                            value={this.state.email}
                                                            onChange={() => { this.handleChange('email', event) }} />
                                                    </div>
                                                </div>
                                                <div className="col-md-6 wow-outer">
                                                    <div className="form-wrap wow fadeSlideInUp">
                                                        <label className="form-label-outside" htmlFor="contact-phone">
                                                            <Translate>{({ translate }) => translate('CONTACT.mobile_number')}</Translate>
                                                        </label>
                                                        <input
                                                            className="form-input"
                                                            type="text"
                                                            name="phone"
                                                            value={this.state.mobileNumber}
                                                            onChange={() => { this.handleChange('mobileNumber', event) }} />
                                                    </div>
                                                </div>
                                                <div className="col-12 wow-outer">
                                                    <div className="form-wrap wow fadeSlideInUp">
                                                        <label className="form-label-outside" htmlFor="contact-message">
                                                            <Translate>{({ translate }) => translate('CONTACT.message')}</Translate>
                                                        </label>
                                                        <textarea
                                                            className="form-input"
                                                            name="message"
                                                            value={this.state.message}
                                                            onChange={() => { this.handleChange('message', event) }} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="group group-middle">
                                                <div className="wow-outer">
                                                    <button className="button button-primary button-winona" onClick={this.handelSaveMessage}>
                                                        <Translate>{({ translate }) => translate('CONTACT.send_message')}</Translate>
                                                    </button>
                                                </div>
                                            </div>
                                        </form>
                                        <p className="loginError">{this.state.error}</p>
                                        <p className="contactHeading" style={{fontSize: '24px'}}>{this.state.sendMessageSuccessfull}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        error: state.loginReducer.contactError,
        isContactSubmitted: state.loginReducer.isContactSubmitted
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        contactUs: (body) => {
            dispatch(contactUs(body));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Contact);

// export default Contact;