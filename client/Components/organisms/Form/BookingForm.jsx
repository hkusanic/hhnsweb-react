import React, { Component } from 'react';
import { isValidPhone, onlyIntegers, isNotEmpty } from '../../../utils/validation';


export class BookingForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mobileNumber: '',
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
        if (!isNotEmpty(this.props.user.email) || !isNotEmpty(this.state.mobileNumber)
            || !isNotEmpty(this.state.disciple) || !isNotEmpty(this.state.requestFor)) {
            this.setState({ error: '**Please fill all the fields' })
        }
        else if (!onlyIntegers(this.state.mobileNumber) || !isValidPhone(this.state.mobileNumber)) {
            this.setState({ error: 'Please Enter Mobile Number Correctly' })
        }
        else {
            const body = {
                "email": this.props.user.email,
                "mobileNumber": this.state.mobileNumber,
                "disciple": this.state.disciple,
                "requestedFor": this.state.requestFor
            }
            this.props.createAppointment(body);
        }
    }

    handleChange = (type, event) => {
        const value = event.target.value;
        if(type === 'requestFor'){
            this.props.handleDarshanRequested(event);
        }
        this.setState({
            ...this.state,
            error: '',
            [type]: value
        })
    }


    render() {
        return (
            <div id="rd-navbar-register-5">
                <form id="bookingForm" className="rd-form rd-form-small">
                    <div className="form-wrap">
                        <input
                            className="form-input"
                            type="text"
                            placeholder="First Name"
                            readOnly="readonly"
                            value={this.props.user.firstName} />
                    </div>
                    <div className="form-wrap">
                        <input
                            className="form-input"
                            type="text"
                            readOnly="readonly"
                            placeholder="Last Name"
                            value={this.props.user.last} />
                    </div>
                    <div className="form-wrap">
                        <input
                            className="form-input"
                            type="email"
                            readOnly="readonly"
                            placeholder="E-mail"
                            value={this.props.user.email} />
                    </div>
                    <div className="form-wrap">
                        <input
                            className="form-input"
                            type="text"
                            placeholder="Mobile Number"
                            data-constraints="@Required"
                            onChange={() => { this.handleChange('mobileNumber', event) }} />
                    </div>
                    <div className="form-wrap">
                        <select className="form-input" onChange={() => { this.handleChange('requestFor', event) }} value={this.state.requestTime} placeholder="Please select Darshan Duration">
                            <option value="Darshan-15">15 Minute</option>
                            <option value="Darshan-30">30 Minute</option>
                            <option value="Darshan-45">45 Minute</option>
                            <option value="Darshan-60">60 Minuts</option>
                        </select>
                    </div>
                    <div className="form-wrap">
                        <p className="radioDiv">Are you Niranjana Swami Disciple</p>
                        <div className="custom-control custom-radio">
                            <input
                                type="radio"
                                className="custom-control-input"
                                id="no"
                                value="no"
                                checked={this.state.disciple === 'no'}
                                onChange={() => { this.handleChange('disciple', event) }} />
                            <label className="custom-control-label" htmlFor="no">No</label>
                        </div>
                        <div className="custom-control custom-radio">
                            <input
                                type="radio"
                                className="custom-control-input"
                                id="disciple"
                                value="disciple"
                                checked={this.state.disciple === 'disciple'}
                                onChange={() => { this.handleChange('disciple', event) }} />
                            <label className="custom-control-label" htmlFor="disciple">Disciple</label>
                        </div>
                        <div className="custom-control custom-radio">
                            <input
                                type="radio"
                                className="custom-control-input"
                                id="aspiring_disciple"
                                value="aspiring_disciple"
                                checked={this.state.disciple === 'aspiring_disciple'}
                                onChange={() => { this.handleChange('disciple', event) }} />
                            <label className="custom-control-label" htmlFor="aspiring_disciple">Aspiring Disciple</label>
                        </div>
                    </div>
                    <div className="form-wrap">
                        <button className="button button-block button-primary-lighten button-winona" onClick={this.handleSubmit}>Submit</button>
                    </div>
                    <p className="loginError">{this.state.error}</p>
                </form>
            </div>

        )
    }

}



export default BookingForm;