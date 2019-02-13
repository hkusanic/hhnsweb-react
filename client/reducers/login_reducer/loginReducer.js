import * as types from '../../constants/index';
import Auth from '../../utils/Auth';

const initialState = {
    isLogin: false,
    isComplete: false,
    session: false,
    isAdmin: false,
    loginUser: {},
    checkedLogin: false,
    forgotPasswordSentEmail: false,
    error: "",
    regError: ''

}

const loginReducer = (state = initialState, action) => {
    console.log("action ===>>>", action);
    switch (action.type) {
        case types.LOGIN:
            const user = action.payload;
            if (user.success && user.session) {
                Auth.authenticateUser(user.session, user.loginUser);
                state = {
                    ...state,
                    isLogin: true,
                    isComplete: user.success,
                    loginUser: user.loginUser,
                    isAdmin: user.admin,
                    session: user.session,
                    error: ''
                }
            }
            else if (!user.session) {
                state = {
                    ...state,
                    error: user.message,
                    isLogin: false,
                    isComplete: false
                }
            }
            break;

        case types.LOGOUT:
            Auth.deauthenticateUser();
            state = {
                ...state,
                isLogin: false,
                isComplete: false,
                loginUser: {}
            }
            break;

        case types.SIGNUP:
            const signedUser = action.payload;
            if (signedUser.session && signedUser.loginUser) {
                Auth.authenticateUser(signedUser.session, signedUser.loginUser);
                state = {
                    ...state,
                    isLogin: true,
                    isComplete: signedUser.success,
                    loginUser: signedUser.loginUser,
                    isAdmin: signedUser.admin,
                    session: signedUser.session,
                    regError: ''
                }
            }
            else if(signedUser.error){
                Auth.deauthenticateUser();
                state = {
                    ...state,
                    regError: signedUser.error.title,
                    isLogin: false,
                    session: false,
                    loginUser: {}
                }
            }

        case types.FORGOT_PASSWORD:
            const response = action.payload;
            state = {
                ...state,
                forgotPasswordSentEmail: true,
                error: ''
            }
            break;

    }
    return state
}

export default loginReducer;
