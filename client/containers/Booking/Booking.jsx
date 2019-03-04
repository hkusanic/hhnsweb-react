import React, { Component } from 'react';
import "react-step-progress-bar/styles.css";
import Progress from '../../Components/organisms/ProgressBar/ProgressBar';
import BookingForm from '../../Components/organisms/Form/BookingForm';
import Auth from '../../utils/Auth';
import { connect } from "react-redux";
import { createAppointment, getAppointment, resetState, getBookingStatus } from '../../actions/appointmentAction';
import reactCookie from 'react-cookies';
import { Translate } from 'react-localize-redux';
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
        window.scrollTo(0,0);
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
        this.setState({ isUserLogin })
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
        if (reactCookie.load('languageCode') === 'en') {
            return (
                <div>
                    <p>Dear <span style={{ fontWeight: '400' }}>{this.state.user.firstName} {this.state.user.last}</span>,</p>
                    <div><br/>Please accept our humble obeisances,</div>
                    <div><br/>All glories to Srila Prabhupada!</div>
                    <div>&nbsp;</div>
                    <div>Your request for <span style={{ fontWeight: '400' }}>{this.state.DarshanRequested} minutes</span>  with His Holiness Niranjana Swami is under review.&nbsp;</div>
                    <div>Once it is approved you will receive an email with further instructions.</div>
                    <div>&nbsp;</div>
                    <div>Your servants,</div>
                    <div>Site administrators</div>
                </div>
            )
        }
        else {
            return (
                <div>
                    <p>Дорогой <span style={{ fontWeight: '400' }}>{this.state.user.firstName} {this.state.user.last}</span>,</p>
                    <div><br/>Пожалуйста, примите наши смиренные поклоны,</div>
                    <div><br/>Вся слава Шриле Прабхупаде!</div>
                    <div>&nbsp;</div>
                    <div>Ваш запрос на <span style={{ fontWeight: '400' }}>{this.state.DarshanRequested} Даршан</span> с Его Святейшеством Ниранджаной Свами находится на рассмотрении.&nbsp;</div>
                    <div>Как только он будет одобрен, вы получите письмо с дальнейшими инструкциями.</div>
                    <div>&nbsp;</div>
                    <div>Ваши слуги,</div>
                    <div>Администраторы сайта</div>
                </div>
            )

        }
    }
   
    alreadyBookedText = () => {
        if (reactCookie.load('languageCode') === 'en') {
            return (
                <div>
                <p>Hare Krishna</p>

                <p>We see that you have a confirmed request for Darshan with H.H. Niranjana Swami.</p>
                
                <p>At this time we are not allowing multiple bookings.</p>
                
                <p>Thank you.</p>
                
                <p>Your servants,</p>
                
                <p>Site Administrators</p>
                </div>
            )
        }
        else {
            return (
                <div>
                <p>Харе Кришна</p>

                <p>Мы видим, что у вас есть подтвержденный запрос на даршан с Его Святейшеством Ниранджаной Свами.</p>
                
                <p>В настоящее время не возможо сделать несколько бронирований.</p>
                
                <p>Спасибо.</p>
                
                <p>Ваши слуги,</p>
                
                <p>Администраторы сайта</p>
                </div>
            )

        }
    }

    loadingIframeCompleted = ()=>{
        window.scrollTo(0,0);
    }


    render() {
        return (
            <div>
                <div>
                    <section className="bg-gray-100">
                        <img src="https://ik.imagekit.io/gcwjdmqwwznjl/Booking_v1_BJC5u2LU4.png" />
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
                                        {
                                            /* <div className="progressBarDiv">
                                                   <Progress percent={50} />
                                                 </div> 
                                            */
                                        }
                                        <div className="bookingformDiv">
                                            <p className="bookingForm"><Translate>
                                                {({ translate }) => translate('BOOKING.booking_form')}
                                            </Translate></p>
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
                                                    src={`${this.state.user.youbookme_url}${this.state.DarshanApproved}&skipHeaderFooter=true&noframe=true`}
                                                    id="ycbmiframeniranjanaswami"
                                                    onLoad={()=>this.loadingIframeCompleted()}
                                                    className="bookingStyle"
                                                    frameBorder="0"
                                                    allowtransparency="true">
                                                </iframe>
                                                : <div class="section-sm section-first accesIdError"> {this.alreadyBookedText()}</div>)
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
