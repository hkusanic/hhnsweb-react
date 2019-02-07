import React, { Component } from 'react';
export class BookingForm extends Component {
    constructor(props) {
        super(props);
    }

    signUP = (event) => {
        event.preventDefault();
      const body = {
            "email":"hrvoje.kusanic@hotmail.com",
            "mobileNumber":8948594895,
            "disciple":"yes"
      }
      this.props.createAppointment(body);    
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
                            data-constraints="@Required" />
                    </div>
                    <div className="form-wrap">
                        <select className="form-input">
                            <option value="volvo">15 Minute</option>
                            <option value="saab">30 Minute</option>
                            <option value="opel">45 Minute</option>
                            <option value="audi">60 Minuts</option>
                        </select>
                    </div>
                    <div className="form-wrap">
                        <p className="radioDiv">Are you Niranjana Swami Disciple</p>
                        <div class="custom-control custom-radio">
                            <input type="radio" class="custom-control-input" id="no" name="no" />
                            <label class="custom-control-label" htmlFor="no">No</label>
                        </div>
                        <div class="custom-control custom-radio">
                            <input type="radio" class="custom-control-input" id="disciple" name="disciple" />
                            <label class="custom-control-label" htmlFor="disciple">Disciple</label>
                        </div>
                        <div class="custom-control custom-radio">
                            <input type="radio" class="custom-control-input" id="aspiring_disciple" name="aspiring_disciple" />
                            <label class="custom-control-label" htmlFor="aspiring_disciple">Aspiring Disciple</label>
                        </div>
                    </div>
                    <div className="form-wrap">
                        <button className="button button-block button-primary-lighten button-winona" onClick={this.signUP}>Submit</button>
                    </div>
                </form>
            </div>

        )
    }

}



export default BookingForm;