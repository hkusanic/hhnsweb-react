import React, { Component } from 'react';
import banner from '../../assets/images/booking_banner.jpg';
import "react-step-progress-bar/styles.css";
import Progress from '../../Components/organisms/ProgressBar/ProgressBar';
import BookingForm from '../../Components/organisms/Form/BookingForm';
import Auth from '../../utils/Auth';
import { connect } from "react-redux";
import { createAppointment } from '../../actions/appointmentAction';

export class Booking extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: '',
            isLogin: false
        }
    }
    componentDidMount() {
        console.log("this.props=====>>", this.props);
        const user = Auth.getUserDetails();
        const isLogin = Auth.getUserSeesion();
        if (user && isLogin) {
            this.setState({
                user: JSON.parse(user),
                isLogin
            })
        }
    }
    render() {
        // if (!(this.state && this.state.user)) {
        //     return <div>Loading.......</div>
        // }
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
                            <BookingForm 
                             user={this.state.user ? this.state.user : ''}
                             createAppointment={this.props.createAppointment} />
                        </div>
                    </div> : <div>
                        <iframe src="https://app.acuityscheduling.com/schedule.php?owner=17198595&appointmentType=9132869" width="100%" height="800" frameBorder="0"></iframe>
                        <script src="https://d3gxy7nm8y4yjr.cloudfront.net/js/embed.js" type="text/javascript"></script>
                    </div>}
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


const mapStateToProps = (state) => {
    return {
        appointment: state.appointmentReducer,
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
        createAppointment: (body) => {
        dispatch(createAppointment(body));
      }
    };
  };

  export default connect(mapStateToProps, mapDispatchToProps)(Booking);
// export default Booking;