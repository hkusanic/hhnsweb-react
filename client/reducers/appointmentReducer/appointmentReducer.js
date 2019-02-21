import * as types from '../../constants/index';

const initialState = {
    appointmentData: '',
    loading: true,
    isSubmitted: false,
    error: '',
    success: false,
    isbooked: false
}

const appointmentReducer = (state = initialState, action) => {
    console.log("action ====>>>", action);
    switch (action.type) {
        case types.CREATE_APPOINTMENT:
            const data = action.payload.Appointment;
            state = {
                ...state,
                loading: false,
                appointmentData: data,
                isSubmitted: true,
                error: ''
            }
            break;
        case types.CREATE_APPOINTMENT_ERROR:
            const error = action.payload.response.data.detail.detail.errmsg;
            state = {
                ...state,
                error: error ? error : 'Error Occured, Please try again',
                loading: false,
                isSubmitted: false,
                appointmentData: ''
            }
            break;
        case types.GET_APPOINTMENT:
            const appointment = action.payload;
            state = {
                ...state,
                appointmentData: appointment,
                success: true
            }
            break;
        case types.GET_BOOKING_STATUS:
            const bookingStatus = action.payload.data;
            if(bookingStatus.error){
                state = {
                    ...state,
                    isbooked: false
                }
            }else if(bookingStatus.Booking) {
                state = {
                    ...state,
                    isbooked: true
                }
            }
            break;

        case "RESET_STATE":
            state = {
                ...state,
                appointmentData: '',
                loading: true,
                isSubmitted: false,
                error: '',
                success: false,
            }

    }
    return state
}

export default appointmentReducer;
