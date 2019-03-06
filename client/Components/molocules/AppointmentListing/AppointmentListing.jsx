import React from 'react';
import { connect } from "react-redux";
import { getUserList, getAppointmentList, resetState } from '../../../actions/appointmentListAction';


export class AppointmentListing extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    componentDidMount() {
        this.props.resetState();
        this.props.getUserList();
        this.props.getAppointmentList();
    }
    render() {
        console.log("this.props ====>>>>", this.props.appointmentList);
        return (
            <div>
                Appointment Listing Component;
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        appointmentList: state.appointmentListingReducer,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getUserList: () => {
            dispatch(getUserList());
        },
        getAppointmentList: () => {
            dispatch(getAppointmentList());
        },
        resetState: () => {
            dispatch(resetState())
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppointmentListing);