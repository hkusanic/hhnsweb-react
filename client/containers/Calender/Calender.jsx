import React, { Component } from 'react';
import * as DATA from '../../constants/credentials';
import calendarHeaderImage from '../../assets/images/calendar/calendar_header.png';
import Auth from "../../utils/Auth";

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
        let srcGoogle = 'https://calendar.google.com/calendar/embed?src=' + DATA.GOOGLE_CREDENTIALS.USER + '%40' + DATA.GOOGLE_CREDENTIALS.EMAIL_DOMAIN + '&ctz=Asia%2FKolkata';
        return (
            <div>
                <section className="breadcrumbs-custom bg-image context-dark" style={{ backgroundImage: "url(" + calendarHeaderImage + ")" }}>
                    <div className="breadcrumbs-custom-inner">
                        <div className="container breadcrumbs-custom-container">
                        </div>
                    </div>
                </section>
                {
                    !this.state.isUserLogin ?
                        <div className="align">
                            <iframe src={srcGoogle}
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
