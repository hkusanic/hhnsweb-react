import React, { Component } from 'react';
import * as DATA from '../../constants/credentials';
import Auth from "../../utils/Auth";
import { Translate } from 'react-localize-redux';

export class Calender extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isUserLogin: false
        }
    }

    componentDidMount() {
        const isUserLogin = Auth.isUserAuthenticated();
        this.setState({ isUserLogin })
    }

    render() {
		let srcGoogle = process.env.GOOGLE_PUBLIC_URL;
		let srcGoogleAvailability = process.env.GOOGLE_AVAILABILITY_URL;
        return (
            <div>
                <section className="bg-gray-100">
                    <img src="https://ik.imagekit.io/gcwjdmqwwznjl/Calendar_Page_copy_B1kq-PHUN.png" />
                </section>
                {
                    !this.state.isUserLogin ?
                        <div className="align">
                            <div style={{ textAlign: 'center' }}>
                                <p className="bookingForm">
                                    <Translate>{({ translate }) => translate('HOME.calendar')}</Translate>
                                </p>
                            </div>
                            <iframe src={srcGoogle}
                                style={{ frameBorder: "0", Scrolling: "no" }}
                                className="calenderStyle">
                            </iframe> 
                        </div>
                        : ''
				}
                {
                    !this.state.isUserLogin ?
                        <div className="align">
                            <div style={{ textAlign: 'center' }}>
                                <p className="bookingForm">
                                    <Translate>{({ translate }) => translate('HOME.availability')}</Translate>
                                </p>
                            </div>
                            <iframe src={srcGoogleAvailability}
                                style={{ frameBorder: "0", Scrolling: "no" }}
                                className="calenderStyle">
                            </iframe> 
                        </div>
                        : ''
                }

            </div>
        )
    }
}

export default Calender;
