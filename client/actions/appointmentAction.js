import appointmentApi from '../utils/api/appointment';
import * as types from '../constants/index';

export function createAppointment(body) {
    return (dispatch) => {
        appointmentApi.createAppointment(body)
           .then((response) => {
               dispatch(createAction(response.data))
           })
           .catch((err) => {
               console.log("error =====>>>>", err);
           })
    }
}

export function createAction(data) {
    return {
        type: types.CREATE_APPOINTMENT,
        payload: data
    }
}