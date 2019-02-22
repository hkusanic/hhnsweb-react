import React, { Component } from 'react';
import banner from '../../assets/images/booking-v2.png';
import "react-step-progress-bar/styles.css";
import Progress from '../../Components/organisms/ProgressBar/ProgressBar';
import BookingForm from '../../Components/organisms/Form/BookingForm';
import Auth from '../../utils/Auth';
import { connect } from "react-redux";
import { createAppointment, getAppointment, resetState, getBookingStatus } from '../../actions/appointmentAction';
import {Image, Video, Transformation, CloudinaryContext} from 'cloudinary-react';
export class Booking extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: '',
            DarshanApproved: '',
            DarshanRequested: 'Darshan-15',
            isUserLogin: false
        }
        this.props.resetState();
    }
    componentDidMount() {
        const user = Auth.getUserDetails();
        const isUserLogin = Auth.isUserAuthenticated();
        if (user) {
            this.setState({
                user: JSON.parse(user),
                isUserLogin
            }, () => {
                this.props.getAppointment(this.state.user.email);
                this.props.getBookingStatus(this.state.user.email)
            })
        }
    }
    componentWillReceiveProps(nextProps) {
        const isUserLogin = Auth.isUserAuthenticated();
        if (this.props !== nextProps) {
            this.props = nextProps;
            if (this.props.appointment.appointmentData.Appointment) {
                this.handleDarshanApproved(this.props.appointment.appointmentData.Appointment);
            }
        }
        this.setState({isUserLogin})
    }

    handleDarshanApproved = (appointment) => {
        let approvedFor = '';
        let requestedFor = '';
        if (appointment.approved) {
            approvedFor = appointment.approvedFor;
            approvedFor = approvedFor.replace('-', '');
        }
        requestedFor = appointment.requestedFor;
        this.setState({
            DarshanApproved: approvedFor,
            DarshanRequested: requestedFor
        })

    }

    handleDarshanRequested = (event) => {
        this.setState({
            DarshanRequested: event.target.value
        })
    }

    ApprovedText = () => {
        return (
            <div>
                <p>Dear <span style={{ fontWeight: '400' }}>{this.state.user.firstName} {this.state.user.last}</span>,</p>
                <div>Please accept our humble obeisances,</div>
                <div>All glories to Srila Prabhupada!</div>
                <div>&nbsp;</div>
                <div>Your request for <span style={{ fontWeight: '400' }}>{this.state.DarshanRequested} minutes</span>  with His Holines Niranjana Swami is under review.&nbsp;</div>
                <div>Once its is approved you will receive an email with further instructions.</div>
                <div>&nbsp;</div>
                <div>Your servants,</div>
                <div>Site administrators</div>
            </div>
        )
    }
    render() {
        return (
            <div>
                <div>
                    <section className="breadcrumbs-custom bg-image context-dark">
                    <Image cloudName="dinagauranga" publicId='booking-v2'
                                      responsive
                                      width="auto"
                                    
                                     >
                                 
                    </Image>
                        <div className="breadcrumbs-custom-inner">
                            <div className="container breadcrumbs-custom-container">
                            </div>
                        </div>
                    </section>
                </div>
                {
                    !this.state.isUserLogin ?

                        (
                            this.props.appointment.isSubmitted ?
                                <div className="requestDiv">
                                    <p className="Bookingsubmit">
                                        {this.ApprovedText()}</p>
                                </div>
                                :
                                (!this.props.appointment.isSubmitted && !this.props.appointment.appointmentData && !this.props.appointment.appointmentData.Appointment) ?
                                    <div>
                                        {/* <div className="progressBarDiv">
                                <Progress percent={50} />
                            </div> */}
                                        <div className="bookingformDiv">
                                            <p className="bookingForm">Booking Form</p>
                                            <BookingForm
                                                user={this.state.user ? this.state.user : ''}
                                                createAppointment={this.props.createAppointment}
                                                handleDarshanRequested={this.handleDarshanRequested}
                                                error={this.props.appointment.error} />
                                        </div>
                                    </div>
                                    :
                                    (
                                        (this.props.appointment.appointmentData && this.props.appointment.appointmentData.Appointment && !this.props.appointment.appointmentData.Appointment.approved &&
                                            !this.props.isSubmitted) ?
                                            < div className="requestDiv">
                                                <p className="Bookingsubmit">
                                                    {this.ApprovedText()}
                                                </p>
                                            </div>
                                            :
                                            (!this.props.appointment.isbooked ?
                                            <iframe
                                                src={`https://nrs15.youcanbook.me/?service=${this.state.DarshanApproved}&skipHeaderFooter=true&noframe=true`}
                                                id="ycbmiframeniranjanaswami"
                                                className="bookingStyle"
                                                frameBorder="0"
                                                allowtransparency="true">
                                            </iframe> 
                                            :  <div class="section-sm section-first accesIdError">You have aleady booked meeting</div>)
                                    )
                        )
                        : ''
                }
            </div >
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
        },
        getBookingStatus: (email) => {
            dispatch(getBookingStatus(email));
        },
        resetState: () => {
            dispatch(resetState());
        }
    }

};


export default connect(mapStateToProps, mapDispatchToProps)(Booking);
