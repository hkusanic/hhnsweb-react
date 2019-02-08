import appointmentApi from '../utils/api/appointment';
import * as types from '../constants/index';

export function createAppointment(body) {
    return (dispatch) => {
        appointmentApi.createAppointment(body)
           .then((response) => {
               dispatch(createAction(response.data))
           })
           .catch((err) => {
            dispatch(createError(err))
           })
    }
}

export function createAction(data) {
    return {
        type: types.CREATE_APPOINTMENT,
        payload: data
    }
}

export function createError(data) {
    return {
        type: types.CREATE_APPOINTMENT_ERROR,
        payload: data
    }
}

export function getAppointment (parameter) {
    return (dispatch) => {
        appointmentApi.getAppointment(parameter)
        .then((response) => {
            dispatch(getAppointmentAction(response.data))
        })
        .catch((err) => {
            console.log(err);
        })
    }
}



export function getAppointmentAction (data) {
    return {
        type: types.GET_APPOINTMENT,
        payload: data
    }
}