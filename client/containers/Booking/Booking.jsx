import React, { Component } from 'react';
import banner from '../../assets/images/booking_banner.jpg';
import "react-step-progress-bar/styles.css";
import Progress from '../../Components/organisms/ProgressBar/ProgressBar';
import BookingForm from '../../Components/organisms/Form/BookingForm';
import Auth from '../../utils/Auth';

export class Booking extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: '',
            isLogin: false
        }
    }
    componentDidMount() {
        const user = Auth.getUserDetails();
        const isLogin = Auth.getUserSeesion();
        if(user && isLogin) {
            console.log("user details =====>>>", JSON.parse(user));
            this.setState({
                user: JSON.parse(user),
                isLogin
            })
        }
    }
    render() {
        if (!(this.state && this.state.user)) {
            return <div>Loading.......</div>
        }
        return (
            <div>
                <div>
                    <section className="breadcrumbs-custom bg-image context-dark" style={{ backgroundImage: "url(" + banner + ")" }}>
                        <div className="breadcrumbs-custom-inner">
                            <div className="container breadcrumbs-custom-container">
                            </div>
                        </div>
                    </section>
                </div>
                {this.state.user && this.state.isLogin ?
                    <div>
                        <div className="progressBarDiv">
                            <Progress percent={50} />
                        </div>
                        <div className="bookingformDiv">
                            <BookingForm user={this.state.user ? this.state.user : ''} />
                        </div>
                    </div> : <p>hello</p>}
                {/* <iframe
                    src="https://niranjanaswami.youcanbook.me/?noframe=true&skipHeaderFooter=true"
                    id="ycbmiframeniranjanaswami"
                    className="bookingStyle"
                    frameBorder="0"
                    allowtransparency="true">
                </iframe> */}
            </div>
        )
    }
}

export default Booking;