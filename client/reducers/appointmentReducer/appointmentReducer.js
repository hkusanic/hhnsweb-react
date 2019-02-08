import * as types from '../../constants/index';

const initialState = {
    appointmentData: '',
    loading: true,
    isSubmitted: false,
    error: '',
    success: false,
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
            state ={
                ...state,
                error: error ? error : 'Error Occured',
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
    }
    return state
}

export default appointmentReducer;
