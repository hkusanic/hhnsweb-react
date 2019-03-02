import React, { Component } from 'react';
import { Translate } from 'react-localize-redux';
import Auth from '../../../utils/Auth';

export class Registration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: '',
            isUserLogin: false
        }
    }
    componentDidMount() {
        $('.register-modal-2').addClass('active');
      
        const user = Auth.getUserDetails();
        if(user)
        this.setState({ user: JSON.parse(user) });
       
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
                    {this.state.user?<p>
                        <Translate>{({ translate }) => translate('REGISTER_FORM.hare_krishna')}</Translate> <b>{this.state.user.firstName} {this.state.user.last}</b>.
                        &nbsp;<Translate>{({ translate }) => translate('REGISTER_FORM.your_profile')}</Translate>.  
                    </p>:null}
                </div>  
                </section>
            </div>
        )
    }
}

export default Registration;
