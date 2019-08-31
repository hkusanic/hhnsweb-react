import appointmentListingApi from '../utils/api/appointmentList';
import * as types from '../constants/index';
import { EventTypes } from 'redux-segment';

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
        payload: data,
    //     meta: {
    //   analytics: 
    //   {
    //     eventType: EventTypes.track,
    //     eventPayload: {
    //       event: "appointment user list",
    //       properties: {
    //         data:data,
    //         user: JSON.parse(localStorage.getItem("user")),


    //       }
    //     }
    //   }
    // },
    }
}

export function getAppointmentListAction(data) {
    return {
        type: types.GET_APPOINTMENT_LIST,
        payload: data,
    //     meta: {
    //   analytics: 
    //   {
    //     eventType: EventTypes.track,
    //     eventPayload: {
    //       event: "get appointment list",
    //       properties: {
    //         data:data,
    //         user: JSON.parse(localStorage.getItem("user")),


    //       }
    //     }
    //   }
    // },
    }
}

export function updateAppointmentAction(data){
    return {
        type: types.UPDATE_APPOINTMENT,
        payload: data,
    //     meta: {
    //   analytics: 
    //   {
    //     eventType: EventTypes.track,
    //     eventPayload: {
    //       event: "update appointment",
    //       properties: {
    //         data
    //       }
    //     }
    //   }
    // },
    }
}

export function resetState() {
    return {
        type: "RESET_STATE"
    }
}