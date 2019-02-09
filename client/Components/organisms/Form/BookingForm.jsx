import React, { Component } from 'react';
export class BookingForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mobileNumber: '',
            disciple: '',
            requestFor: ''
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const body = {
            "email": this.props.user.email,
            "mobileNumber": this.state.mobileNumber,
            "disciple": this.state.disciple,
            "requestedFor": this.state.requestFor
        }
        console.log("body ====>>>>", body);
        this.props.createAppointment(body);
    }

    handleChangeMobile = (event) => {
        this.setState({
            mobileNumber: event.target.value
        })
    }
    handleChangeDarshan = (event) => {
        console.log("requestFor ===>>", event.target.value);
        this.setState({
            requestFor: event.target.value
        }, () => {
            console.log("requestFor======>>>>", this.state.requestFor);
        })
    }
    handleDiscipleChange = (event) => {
        this.setState({
            disciple: event.target.value
        })
    }

    render() {
        return (
            <div id="rd-navbar-register-5">
                <form className="rd-form rd-form-small">
                    <div className="form-wrap">
                        <input
                            className="form-input"
                            id="register-firstName-5"
                            type="text"
                            name="firstname"
                            placeholder="First Name"
                            readonly="readonly"
                            value={this.props.user.firstName}
                            data-constraints="@Required" />
                    </div>
                    <div className="form-wrap">
                        <input
                            className="form-input"
                            id="register-lastName-5"
                            type="text"
                            name="lastName"
                            readonly="readonly"
                            placeholder="Last Name"
                            value={this.props.user.last}
                            data-constraints="@Required" />
                    </div>
                    <div className="form-wrap">
                        <input
                            className="form-input"
                            id="register-email-5"
                            type="email"
                            name="email"
                            readonly="readonly"
                            placeholder="E-mail"
                            value={this.props.user.email}
                            data-constraints="@Email @Required" />
                    </div>
                    <div className="form-wrap">
                        <input
                            className="form-input"
                            id="register-mobile-5"
                            type="number"
                            name="number"
                            placeholder="Mobile Number"
                            data-constraints="@Required"
                            onChange={this.handleChangeMobile} />
                    </div>
                    <div className="form-wrap">
                        <select className="form-input" onChange={this.handleChangeDarshan} value={this.state.requestTime} placeholder="Please select Darshan Duration">
                            <option value="Darshan-15">15 Minute</option>
                            <option value="Darshan-30">30 Minute</option>
                            <option value="Darshan-45">45 Minute</option>
                            <option value="Darshan-60">60 Minuts</option>
                        </select>
                    </div>
                    <div className="form-wrap">
                        <p className="radioDiv">Are you Niranjana Swami Disciple</p>
                        <div class="custom-control custom-radio">
                            <input
                                type="radio"
                                class="custom-control-input"
                                id="no"
                                value="no"
                                checked={this.state.disciple === 'no'}
                                onChange={this.handleDiscipleChange} />
                            <label class="custom-control-label" htmlFor="no">No</label>
                        </div>
                        <div class="custom-control custom-radio">
                            <input
                                type="radio"
                                class="custom-control-input"
                                id="disciple"
                                value="disciple"
                                checked={this.state.disciple === 'disciple'}
                                onChange={this.handleDiscipleChange} />
                            <label class="custom-control-label" htmlFor="disciple">Disciple</label>
                        </div>
                        <div class="custom-control custom-radio">
                            <input
                                type="radio"
                                class="custom-control-input"
                                id="aspiring_disciple"
                                value="aspiring_disciple"
                                checked={this.state.disciple === 'aspiring_disciple'}
                                onChange={this.handleDiscipleChange} />
                            <label class="custom-control-label" htmlFor="aspiring_disciple">Aspiring Disciple</label>
                        </div>
                    </div>
                    <div className="form-wrap">
                        <button className="button button-block button-primary-lighten button-winona" onClick={this.handleSubmit}>Submit</button>
                    </div>
                </form>
            </div>

        )
    }

}



export default BookingForm;