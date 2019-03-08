import * as types from '../../constants/index';

const initialState = {
    userList: [],
    appointmentList: [],
    loading: false,
    isUpdated: false,
    error: ''
}

const appointmentListingReducer = (state = initialState, action) => {
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
        
        case types.UPDATE_APPOINTMENT:
        const result = action.payload.data.Appointment;
            if(result){
                state = {
                    ...state,
                    isUpdated: true
                }    
            }
            else {
                state = {
                    ...state,
                    isUpdated: false
                }       
            }
            break;

        case "RESET_STATE":
            state = {
                ...state,
                userList: [],
                appointmentList: [],
                loading: false,
                isUpdated: false,
                error: ''
            }
    }
    return state
}

export default appointmentListingReducer;