import * as types from '../../constants/index';

const initialState = {
    appointmentData : '',
    loading: true,
    error: ''
}

const appointmentReducer = (state = initialState, action) => {
    console.log("action ====>>>", action);
    switch (action.type) {
        case types.CREATE_APPOINTMENT:
            const data = action.payload.Appointment;
            state = {
                ...state,
                loading: false,
                appointmentData: data
            }
            break;
    }
    return state
}

export default appointmentReducer;
