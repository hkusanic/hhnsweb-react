import * as types from '../../constants/index';
import Auth from '../../utils/Auth';

const initialState = {
    isLogin: false,
    isComplete: false,
    session: false,
    isAdmin: false,
    loginUser: {},
    checkedLogin: false,
    error: "",

}

const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.LOGIN:
            const user = action.payload;
            if (user.success) {
                Auth.authenticateUser(user.session);
                state = {
                    ...state,
                    isLogin: true,
                    isComplete: user.success,
                    loginUser: user.loginUser,
                    isAdmin: user.admin,
                    session: user.session
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

    }
    return state
}

export default loginReducer;
