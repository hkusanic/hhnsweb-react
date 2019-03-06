import React, { Component } from 'react';
import { onlyIntegers, isNotEmpty } from '../../../utils/validation';
import { Translate } from 'react-localize-redux';
export class BookingForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            disciple: '',
            requestFor: 'Darshan-15',
            error: ''
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            error: nextProps.error
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        if (!isNotEmpty(this.props.user.email)
            || !isNotEmpty(this.state.disciple) || !isNotEmpty(this.state.requestFor)) {
            this.setState({ error: '**Please fill all the fields' })
        }
        else {
            const mobileNumber = this.props.user.countryCode + this.props.user.mobileNumber
            let without_words_Numbers = null;
            if(mobileNumber){
                without_words_Numbers = mobileNumber.replace(/\D/g, '');                
                without_words_Numbers = parseInt(without_words_Numbers, 10);
            }
            const body = {
                "email": this.props.user.email,
                "mobileNumber": without_words_Numbers,
                "disciple": this.state.disciple,
                "requestedFor": this.state.requestFor
            }
            this.props.createAppointment(body);
        }
    }

    handleChange = (type, event) => {
        const value = event.target.value;
        if (type === 'requestFor') {
            this.props.handleDarshanRequested(event);
        }
        this.setState({
            ...this.state,
            error: '',
            [type]: value
        })
    }



    render() {
        let first_name = '';
        let last_name = '';
        let email = '';
        let mobile_number = '';
        let min_15 = '';
        let min_30 = '';
        let min_45 = '';
        let min_60 = '';
        let are_you_disciple = '';
        let no = '';
        let disciple = '';
        let aspiring_disciple = '';
        let submit = '';

        if (!this.props.user) {
            return <div style={{ textAlign: 'center' }}>Loading...</div>
        }
        return (
            <div id="rd-navbar-register-5">
                <Translate>
                    {({ translate }) => {
                        first_name = translate('BOOKING.first_name')
                        last_name = translate('BOOKING.last_name')
                        email = translate('BOOKING.email')
                        mobile_number = translate('BOOKING.mobile_number')
                        min_15 = translate('BOOKING.min_15')
                        min_30 = translate('BOOKING.min_30')
                        min_45 = translate('BOOKING.min_45')
                        min_60 = translate('BOOKING.min_60')
                        are_you_disciple = translate('BOOKING.are_you_disciple')
                        no = translate('BOOKING.no')
                        disciple = translate('BOOKING.disciple')
                        aspiring_disciple = translate('BOOKING.aspiring_disciple')
                        submit = translate('BOOKING.submit')


                        return <form id="bookingForm" className="rd-form rd-form-small">
                            <div className="form-wrap">
                                <input
                                    className="form-input"
                                    autoComplete="off"
                                    type="text"
                                    placeholder={first_name}
                                    readOnly="readonly"
                                    value={this.props.user.firstName} />
                            </div>
                            <div className="form-wrap">
                                <input
                                    className="form-input"
                                    autoComplete="off"
                                    type="text"
                                    readOnly="readonly"
                                    placeholder={last_name}
                                    value={this.props.user.last} />
                            </div>
                            <div className="form-wrap">
                                <input
                                    className="form-input"
                                    autoComplete="off"
                                    type="email"
                                    readOnly="readonly"
                                    placeholder="E-mail"
                                    value={this.props.user.email} />
                            </div>
                            <div className="form-wrap">
                                <div className="displayDiv">
                                    <div className="mobCodeDiv"><input
                                        className="form-input"
                                        autoComplete="off"
                                        type="text"
                                        placeholder={mobile_number}
                                        data-constraints="@Required"
                                        readOnly="readonly"
                                        value={this.props.user.countryCode} />
                                    </div>
                                    <div className="mobNoDiv"><input
                                        className="form-input"
                                        autoComplete="off"
                                        type="text"
                                        placeholder={mobile_number}
                                        data-constraints="@Required"
                                        readOnly="readonly"
                                        value={this.props.user.mobileNumber} />
                                    </div>
                                </div>
                            </div>
                            <div className="form-wrap">
                                <select className="form-input" onChange={() => { this.handleChange('requestFor', event) }} value={this.state.requestTime} placeholder="Please select Darshan Duration">
                                    <option value="Darshan-15">{min_15}</option>
                                    <option value="Darshan-30">{min_30}</option>
                                    <option value="Darshan-45">{min_45}</option>
                                    <option value="Darshan-60">{min_60}</option>
                                </select>
                            </div>
                            <div className="form-wrap">
                                <p className="radioDiv">{are_you_disciple}</p>
                                <div className="custom-control custom-radio">
                                    <input
                                        type="radio"
                                        className="custom-control-input"
                                        id="no"
                                        value="no"
                                        checked={this.state.disciple === 'no'}
                                        onChange={() => { this.handleChange('disciple', event) }} />
                                    <label className="custom-control-label" htmlFor="no">{no}</label>
                                </div>
                                <div className="custom-control custom-radio">
                                    <input
                                        type="radio"
                                        className="custom-control-input"
                                        id="disciple"
                                        value="disciple"
                                        checked={this.state.disciple === 'disciple'}
                                        onChange={() => { this.handleChange('disciple', event) }} />
                                    <label className="custom-control-label" htmlFor="disciple">{disciple}</label>
                                </div>
                                <div className="custom-control custom-radio">
                                    <input
                                        type="radio"
                                        className="custom-control-input"
                                        id="aspiring_disciple"
                                        value="aspiring_disciple"
                                        checked={this.state.disciple === 'aspiring_disciple'}
                                        onChange={() => { this.handleChange('disciple', event) }} />
                                    <label className="custom-control-label" htmlFor="aspiring_disciple">{aspiring_disciple}</label>
                                </div>
                            </div>
                            <div className="form-wrap">
                                <button className="button button-block button-primary-lighten button-winona" onClick={this.handleSubmit}>{submit}</button>
                            </div>
                            <p className="loginError">{this.state.error}</p>
                        </form>
                    }
                    }
                </Translate>
            </div>

        )
    }

}



export default BookingForm;