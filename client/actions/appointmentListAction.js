import appointmentListingApi from '../utils/api/appointmentList';
import * as types from '../constants/index';

export function getUserList() {
    return (dispatch) => {
        appointmentListingApi.getUserList()
            .then((response) => {
                dispatch(getUserListAction(response));
            })
            .catch((err) => {
                console.log(err)
            })
    }
}

export function getAppointmentList() {
    return (dispatch) => {
        appointmentListingApi.getAppointmentList()
            .then((response) => {
                dispatch(getAppointmentListAction(response));
            })
            .catch((err) => {
                console.log(err);
            })
    }
}

export function updateAppointment(email, body) {
    return (dispatch) => {
        appointmentListingApi.updateAppointment(email, body)
            .then((response) => {
                dispatch(updateAppointmentAction(response))
            })
            .catch((err) => {
                console.log(err);
            })
    }
}

export function getUserListAction(data) {
    return {
        type: types.GET_USER_LIST,
        payload: data
    }
}

export function getAppointmentListAction(data) {
    return {
        type: types.GET_APPOINTMENT_LIST,
        payload: data
    }
}

export function updateAppointmentAction(data){
    return {
        type: types.UPDATE_APPOINTMENT,
        payload: data
    }
}

export function resetState() {
    return {
        type: "RESET_STATE"
    }
}