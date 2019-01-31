import * as types from '../../constants/index';
import Auth from '../../utils/Auth';


const initialState = {
    isLogin: false,
    isComplete: false,
    token: "",
    loginUser: {},
    checkedLogin: false,
    error: "",

}

const loginReducer = (state = initialState, action) => {
    switch (action.type) {

        case types.CHECK_IS_LOGIN + "_FULFILLED":
            console.log("payload-->", action.payload);
            var response = action.payload;
            if (response.isLogin) {
                Auth.authenticateUser(response.token);
                state = {
                    ...state,
                    isLogin: true,
                    isComplete: response.isComplete,
                    token: response.token,
                    loginUser: user,
                    checkedLogin: true
                }
            }
            else {
                state = {
                    ...state,
                    checkedLogin: true,
                    error: ""
                }
            }

            break;

        case types.CHECK_IS_LOGIN + "_PENDING":

            break;

        case types.RES_PENDING:
            state = {
                ...state,
                checkedLogin: action.payload
            }
            break;


        case types.CHECK_IS_LOGIN + "_REJECTED":
            var response = action.payload.response;
            Auth.deauthenticateUser()
            state = {
                ...state,
                isLogin: false,
                isComplete: false,
                token: "",
                loginUser: {},
                checkedLogin: true
            }
            break;

        case types.LOGIN + "_FULFILLED":
            var response = action.payload;
            var user = response.user;
            if (response.isLogin) {
                Auth.authenticateUser(response.token);
                state = {
                    ...state,
                    isLogin: true,
                    isComplete: response.isComplete,
                    token: response.token,
                    loginUser: user,
                    error: ""
                }
            }
            break;

        case types.LOGIN + "_PENDING":
            state = {
                ...state,
                verifyingCredentials: true
            }
            break;


        case types.LOGIN + "_REJECTED":
            let response = action.payload.response;
            var error = response.data.message
            var status = response.status.message
            state = {
                ...state,
                error,
                errorModal: "",
            }
            break;
        case types.LOGOUT:
            Auth.deauthenticateUser();
            state = {
                ...state,
                isLogin: false,
                isComplete: false,
                token: "",
                loginUser: {}
            }
            break;
           
    }
    return state
}

export default loginReducer;
