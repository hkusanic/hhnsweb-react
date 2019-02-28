import React, { Component } from 'react';
import { Translate } from 'react-localize-redux';

export class Registration extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    componentDidMount() {
        $('.register-modal-2').addClass('active');
    }

    render() {
        return (
            <div>
                <section  className="bg-gray-100">
                <img src='https://ik.imagekit.io/gcwjdmqwwznjl/Booking_v3_HJGhLISIV.png' />
                  <div style={{textAlign: 'center'}}>
                    <p className="bookingForm">
                    <Translate>{({ translate }) => translate('HOME.Register')}</Translate>
                    </p>
                </div>  
                </section>
            </div>
        )
    }
}

export default Registration;
