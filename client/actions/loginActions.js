import loginApi from '../utils/api/login';
import * as types from '../constants/index';

export function loginUser(credential) {
    return (dispatch) => {
        loginApi.login(credential)
            .then((response) => {
                dispatch(loginAction(response.data))
            })
            .catch((err) => {
                console.log("error ====>>>", err);
            })
    }
}

export function logoutUser() {
    return (dispatch) => {
        loginApi.logout()
            .then((response) => {
                dispatch(logoutAction(response.data))
            })
            .catch((err) => {
                console.log("error =====>>>", err);
            })
    }
}

export function signupUser(body) {
    return (dispatch) => {
        loginApi.signup(body)
           .then((response) => {
               dispatch(signupAction(response.data))
           })
           .catch((err) => {
               console.log("error =====>>>>", err);
           })
    }
}

export function signupAction(data) {
    return {
        type: types.SIGNUP,
        payload: data
    }
}

export function logoutAction(data) {
    return {
        type: types.LOGOUT,
        payload: data
    }
}

export function loginAction(data) {
    return {
        type: types.LOGIN,
        payload: data
    }
}

export function checkLogin() {
    return {
        type: types.CHECK_IS_LOGIN,
        payload: loginApi.check()
            .then((response) => {
                return response.data;
            })
    };

}

