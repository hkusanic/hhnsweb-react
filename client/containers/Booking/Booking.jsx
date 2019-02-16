import React, { Component } from 'react';
import banner from '../../assets/images/booking_banner.jpg';
import "react-step-progress-bar/styles.css";
import Progress from '../../Components/organisms/ProgressBar/ProgressBar';
import BookingForm from '../../Components/organisms/Form/BookingForm';
import Auth from '../../utils/Auth';
import { connect } from "react-redux";
import { createAppointment, getAppointment, resetState } from '../../actions/appointmentAction';

export class Booking extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: '',
            DarshanApproved: ''
        }
        this.props.resetState();
    }
    componentDidMount() {
        const user = Auth.getUserDetails();
        if (user) {
            this.setState({
                user: JSON.parse(user),
            }, () => {
                this.props.getAppointment(this.state.user.email);
            })
        }
    }
    componentWillReceiveProps(nextProps) {
        if (this.props !== nextProps) {
            this.props = nextProps;
            if (this.props.appointment.appointmentData.Appointment) {
                this.handleDarshanApproved(this.props.appointment.appointmentData.Appointment);
            }
        }
    }

    handleDarshanApproved = (appointment) => {
        if (appointment.approved) {
            let approvedFor = appointment.approvedFor;
            approvedFor = approvedFor.replace('-', '');
            this.setState({
                DarshanApproved: approvedFor
            })
        }
    }

    ApprovedText = () => {
        return (
            <div>
                <p>Dear <span style={{ fontWeight: '400' }}>{this.state.user.firstName} {this.state.user.last}</span>,</p>
                <div>Please accept our humble obeisances,</div>
                <div>All glories to Srila Prabhupada!</div>
                <div>&nbsp;</div>
                <div>Your request is under a review.&nbsp;</div>
                <div>Once its is approved you will receive an email with further instructions.</div>
                <div>&nbsp;</div>
                <div>Your servants,</div>
                <div>web-site administrators</div>
            </div>
        )
    }
    render() {
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
                                        createAppointment={this.props.createAppointment} />
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
                                    <iframe
                                        src={`https://nrs15.youcanbook.me/?service=${this.state.DarshanApproved}&skipHeaderFooter=true&noframe=true`}
                                        id="ycbmiframeniranjanaswami"
                                        className="bookingStyle"
                                        frameBorder="0"
                                        allowtransparency="true">
                                    </iframe>
                            )
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
        resetState: () => {
            dispatch(resetState());
        }
    }

};


export default connect(mapStateToProps, mapDispatchToProps)(Booking);
