import React, { Component } from 'react';
import { Radio } from 'antd';

export class BookingForm extends Component {
    constructor(props) {
        super(props);
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
                            value={this.props.user.firstName}
                            data-constraints="@Required" />
                    </div>
                    <div className="form-wrap">
                        <input
                            className="form-input"
                            id="register-lastName-5"
                            type="text"
                            name="lastName"
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