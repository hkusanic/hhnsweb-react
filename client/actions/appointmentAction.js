import appointmentApi from '../utils/api/appointment';
import * as types from '../constants/index';

export function createAppointment (body) {
	return (dispatch) => {
		appointmentApi.createAppointment(body)
			.then((response) => {
				dispatch(createAction(response.data));
			})
			.catch((err) => {
				console.error(err);
			});
	};
}

export function createAction (data) {
	return {
		type: types.CREATE_APPOINTMENT,
		payload: data,
	};
}

export function createError (data) {
	return {
		type: types.CREATE_APPOINTMENT_ERROR,
		payload: data,
	};
}

export function getAppointment (parameter) {
	return (dispatch) => {
		appointmentApi.getAppointment(parameter)
			.then((response) => {
				dispatch(getAppointmentAction(response.data));
			})
			.catch((err) => {
				console.error(err);
			});
	};
}

export function getBookingStatus (email) {
	return (dispatch) => {
		appointmentApi.getBookingStatus(email)
			.then((response) => {
				dispatch(getBookingStatusAction(response));
			})
			.catch((err) => {
				console.error(err);
			});
	};
}

export function getBookingStatusAction (data) {
	return {
		type: types.GET_BOOKING_STATUS,
		payload: data,
	};
}

export function getAppointmentAction (data) {
	return {
		type: types.GET_APPOINTMENT,
		payload: data,
	};
}

export function resetState () {
	return {
		type: 'RESET_STATE',
	};
}
