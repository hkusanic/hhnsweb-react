import loginApi from '../utils/api/login';
import * as types from '../constants/index';

export function loginUser (credential) {
	return (dispatch) => {
		loginApi.login(credential)
			.then((response) => {
				dispatch(loginAction(response.data));
			})
			.catch((err) => {
				console.error(err);
			});
	};
}

export function logoutUser () {
	return (dispatch) => {
		loginApi.logout()
			.then((response) => {
				dispatch(logoutAction(response.data));
			})
			.catch((err) => {
				console.error(err);
			});
	};
}

export function signupUser (body) {
	return (dispatch) => {
		loginApi.signup(body)
			.then((response) => {
				dispatch(signupAction(response.data));
			})
			.catch((err) => {
				console.error(err);
			});
	};
}

export function forgotPassword (body) {
	return (dispatch) => {
		loginApi.forgotPassword(body)
			.then((response) => {
				dispatch(forgotPasswordAction(response.data));
			})
			.catch((err) => {
				console.error(err);
			});
	};
}

export function getUserByAccessId (body) {
	return (dispatch) => {
		loginApi.getUserByAccessId(body)
			.then((response) => {
				dispatch(getUserByAccessIdAction(response));
			})
			.catch((err) => {
				console.error(err);
			});
	};
}

export function resetPassword (body) {
	return (dispatch) => {
		loginApi.resetPassword(body)
			.then((response) => {
				dispatch(resetPasswordAction(response));
			})
			.catch((err) => {
				console.error(err);
			});
	};
}

export function updatePassword (body) {
	return (dispatch) => {
		loginApi.updatePassword(body)
			.then((response) => {
				dispatch(updatePasswordAction(response));
			})
			.catch((err) => {
				console.error(err);
			});
	};
}

export function editProfile (body) {
	return (dispatch) => {
		loginApi.editProfile(body)
			.then((response) => {
				dispatch(editProfileAction(response));
			})
			.catch((err) => {
				console.error(err);
			});
	};
}

export function contactUs (body) {
	return dispatch => {
		loginApi.contactUs(body)
			.then((response) => {
				dispatch(contactUsAction(response));
			})
			.catch((err) => {
				console.log(err);
			});
	};
}


export function signupAction (data) {
	return {
		type: types.SIGNUP,
		payload: data,
	};
}

export function logoutAction (data) {
	return {
		type: types.LOGOUT,
		payload: data,
	};
}

export function loginAction (data) {
	return {
		type: types.LOGIN,
		payload: data,
	};
}

export function forgotPasswordAction (data) {
	return {
		type: types.FORGOT_PASSWORD,
		payload: data,
	};
}

export function getUserByAccessIdAction (data) {
	return {
		type: types.GET_USER_BY_ACCESS_ID,
		payload: data,
	};
}

export function resetPasswordAction (data) {
	return {
		type: types.RESET_PASSWORD,
		payload: data,
	};
}

export function editProfileAction (data) {
	return {
		type: types.EDIT_PROFILE,
		payload: data,
	};
}

export function contactUsAction (data) {
	return {
		type: types.CONTACT_US,
		payload: data,
	};
}

export function updatePasswordAction (data) {
	return {
		type: types.UPDATE_PASSWORD,
		payload: data,
	};
}

export function checkLogin () {
	return {
		type: types.CHECK_IS_LOGIN,
		payload: loginApi.check()
			.then((response) => {
				return response.data;
			}),
	};

}
