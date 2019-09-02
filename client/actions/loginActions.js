import loginApi from '../utils/api/login';
import * as types from '../constants/index';
import { EventLayer } from './event-layer'

const Analytics = new EventLayer();

export function loginUser (credential) {
	return (dispatch) => {
		loginApi.login(credential)
			.then((response) => {
				dispatch(dispatchLogin(response.data));
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
				alert('call');
				dispatch(dispatchLogout(response.data));
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
				dispatch(dispatchSignup(response.data));
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
				dispatch(dispatchContactUs(response));
			})
			.catch((err) => {
				console.log(err);
			});
	};
}

export function dispatchSignup (data) {
	return dispatch => {
		Analytics.identify(data.loginUser.user_id,{
			id : data.loginUser.user_id,
			email : data.loginUser.email,
			created_at : Math.round(data.loginUser.created_at/1000),

		}).then((res) => {

			Analytics.page("Landing Page", "HomePage",{
				id : data.loginUser.user_id,

			}).then((res1) => {
				Analytics.track(data.loginUser.user_id, {
					id : data.loginUser.user_id,
					name : "User Signup",
					data : data,

				}).then((res2) => {

					dispatch(signupAction(data));

				}).catch( err => console.log(err));

			}).catch( err => console.log(err))
		}).catch((err) => {
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

export function dispatchLogout (data) {
	alert('logout');
	return dispatch => {
		Analytics.track(data.loginUser.user_id, {
			id : data.loginUser.user_id,
			name : "User Logout",
			data : data,

		}).then((res2) => {
			alert('action');
			dispatch(logoutAction(data));

		}).catch( err => console.log(err));
	};
	
	
}

export function logoutAction (data) {
	alert('direct');
	return {
		type: types.LOGOUT,
		payload: data,
	};
}

export function dispatchLogin (data) {
	return dispatch => {
		Analytics.identify(data.loginUser.user_id,{
			id : data.loginUser.user_id,
			email : data.loginUser.email,
			created_at : Math.round(data.loginUser.created_at/1000),

		}).then((res) => {
			//alert('track');
			Analytics.page("Landing Page", "HomePage",{
				id : data.loginUser.user_id,

			}).then((res1) => {
				Analytics.track(data.loginUser.user_id, {
					id : data.loginUser.user_id,
					name : "User Signin",
					data : data,

				}).then((res2) => {

					dispatch(loginAction(data));

				}).catch( err => console.log(err));

			}).catch( err => console.log(err))
		}).catch((err) => {
			console.log(err);
		});
	};
	
	
}

export function loginAction(data){
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
	// 	meta: {
    //   analytics: 
    //   {
    //     eventType: EventTypes.track,
    //     eventPayload: {
    //       event: "Get user by id",
    //       properties: {
    //         data,
    //         userId:JSON.parse(localStorage.getItem("user")).user_id,
    //       }
    //     }
    //   }
    // },
	};
}

export function resetPasswordAction (data) {
	return {
		type: types.RESET_PASSWORD,
		payload: data,
	// 	meta: {
    //   analytics: 
    //   {
    //     eventType: EventTypes.track,
    //     eventPayload: {
    //       event: "reset password",
    //       properties: {
    //         data
    //       }
    //     }
    //   }
    // },
	};
}

export function editProfileAction (data) {
	return {
		type: types.EDIT_PROFILE,
		payload: data,
// 		meta: {
//       analytics: 
//       {
//         eventType: EventTypes.track,
//         eventPayload: {
//           event: "edit profile",
//           properties: {
//             data,
//   userId:JSON.parse(localStorage.getItem("user")).user_id,          }
//         }
//       }
//     },
	};
}

export function dispatchContactUs (data) {
	alert('logout');
	return dispatch => {
		Analytics.track(data.loginUser.user_id, {
			id : data.loginUser.user_id,
			name : "User Logout",
			data : data,

		}).then((res2) => {
			alert('action');
			dispatch(contactUsAction(data));

		}).catch( err => console.log(err));
	};
	
	
}

export function contactUsAction (data) {
	return {
		type: types.CONTACT_US,
		payload: data,
	// 	meta: {
    //   analytics: 
    //   {
    //     eventType: EventTypes.track,
    //     eventPayload: {
    //       event: "contact us",
    //       properties: {
    //         data,
    //         userId:JSON.parse(localStorage.getItem("user")).user_id,
    //       }
    //     }
    //   }
    // },
	};
}

export function updatePasswordAction (data) {
	return {
		type: types.UPDATE_PASSWORD,
		payload: data,
// 		meta: {
//       analytics: 
//       {
//         eventType: EventTypes.track,
//         eventPayload: {
//           event: "update password",
//           properties: {
//             data,
// userId:JSON.parse(localStorage.getItem("user")).user_id,          }
//         }
//       }
//     },
	};
}

export function checkLogin () {
	return {
		type: types.CHECK_IS_LOGIN,
		payload: loginApi.check()
			.then((response) => {
				return response.data;
			}),
	// 	meta: {
    //   analytics: 
    //   {
    //     eventType: EventTypes.track,
    //     eventPayload: {
    //       event: "check login",
          
          
    //     }
    //   }
      
      
    // },	
	};

}
