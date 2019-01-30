import loginApi from '../utils/api/login';
import * as types from '../constants/index';

export function loginUser(credential) {

    return {
        type: types.LOGIN,
        payload: loginApi.login(credential)
            .then((response) => {
                response.data.status = response.status;
                return response.data;
            })
    };

}

export function logoutUser() {
    return {
        type: types.LOGOUT
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

