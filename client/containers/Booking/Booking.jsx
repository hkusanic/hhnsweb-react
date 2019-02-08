import React, { Component } from 'react';
import banner from '../../assets/images/booking_banner.jpg';
import "react-step-progress-bar/styles.css";
import Progress from '../../Components/organisms/ProgressBar/ProgressBar';
import BookingForm from '../../Components/organisms/Form/BookingForm';
import Auth from '../../utils/Auth';
import { connect } from "react-redux";
import { createAppointment, getAppointment } from '../../actions/appointmentAction';

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
        this.props.getAppointment('bhvbfhvbfhbh@bfhdf.df');
        if (user && isLogin) {
            this.setState({
                user: JSON.parse(user),
                isLogin
            })
        }
    }
    componentWillReceiveProps(nextProps) {
        if (this.props !== nextProps) {
            this.props = nextProps;
        }
    }
    render() {
        const parameter = 'Darshan30'
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
                {
                    this.props.appointment.isSubmitted ?
                        <div className="requestDiv">
                            <p className="requestText">Your Request has been submitted successfully for Approval</p>
                        </div>
                        : ''
                }
                 {
                    this.props.appointment.error ?
                        <div className="requestDiv">
                            <p className="requestText">Booking is already under Approval process</p>
                        </div>
                        : ''
                }
                {
                    this.state.user && this.state.isLogin && !this.props.appointment.isSubmitted && !this.props.appointment.error ?
                        <div>
                            <div className="progressBarDiv">
                                <Progress percent={50} />
                            </div>
                            <div className="bookingformDiv">
                                <BookingForm
                                    user={this.state.user ? this.state.user : ''}
                                    createAppointment={this.props.createAppointment} />
                            </div>
                        </div>
                        : 
                       ''
                }
                {/* <iframe
                    src={`https://nrs15.youcanbook.me/?service=${parameter}&skipHeaderFooter=true&noframe=true`}
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
        },
        getAppointment: (email) => {
                    dispatch(getAppointment(email));
                }
            }
        
    };


export default connect(mapStateToProps, mapDispatchToProps)(Booking);
