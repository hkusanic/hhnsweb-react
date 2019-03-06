import * as types from '../../constants/index';

const initialState = {
    userList: [],
    appointmentList: [],
    loading: false,
    error: ''
}

const appointmentListingReducer = (state = initialState, action) => {
    console.log("actioon =====>>>>>", action);
    switch (action.type) {
        case types.GET_USER_LIST:
            state = {
                ...state,
                userList: action.payload.data.users
            }
            break;

        case types.GET_APPOINTMENT_LIST:
            state = {
                ...state,
                appointmentList: action.payload.data.appointments
            }
            break;

        case "RESET_STATE":
            state = {
                ...state,
                userList: [],
                appointmentList: [],
                loading: false,
                error: ''
            }
    }
    return state
}

export default appointmentListingReducer;