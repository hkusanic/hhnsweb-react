import loginApi from '../utils/api/login';
import * as types from '../constants/index';
import { EventLayer } from './event-layer'

const Analytics = new EventLayer();

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
	Analytics.identify(data.loginUser.user_id,{
		id : data.loginUser.user_id,
		email : data.loginUser.email,
		created_at : Math.round(data.loginUser.created_at/1000),
	});
	// Analytics.track("User Sign up",{
	// 	id : data.loginUser.user_id,
	// 	email : data.loginUser.email,
	// 	firstName : data.loginUser.firstName,
	// 	lastName : data.loginUser.last
	// });
	return {
		type: types.SIGNUP,
		payload: data,
	// 	meta: {
    //   analytics: [
    //   {
    //     eventType: EventTypes.track,
    //     eventPayload: {
    //       event: "User signup",
    //       properties: {
    //         data:data,
    //         userId: data.loginUser.user_id,

    //       }
    //     }
    //   },
    //   {
    //   	eventType: EventTypes.identify,
    //   	eventPayload: {
        
    //   	userId: data.loginUser.user_id,
      
    //   }
    //   },
    //   {
    //   	eventType: EventTypes.track,
    //     eventPayload: {
    //       event: "User Login",
    //       properties: {
    //         data,
    //         userId: data.loginUser.user_id,
    //       }
    //     }
    //   }
    //   ]
    // },
	};
}

export function logoutAction (data) {
	return {
		type: types.LOGOUT,
		payload: data,
	// 	meta: {
    //   analytics: 
    //   {
    //     eventType: EventTypes.track,
    //     eventPayload: {
    //       event: "logout",
    //       properties: {
    //         data
    //       }
    //     }
    //   }
    // },
	};
}

export function loginAction (data) {
	return dispatch => {
		Analytics.identify(data.loginUser.user_id,{
			id : data.loginUser.user_id,
			email : data.loginUser.email,
			created_at : Math.round(data.loginUser.created_at/1000),
		}).then((res) => {
			Analytics.page("Landing Page", "HomePage",{
				id : data.loginUser.user_id,
			}).then((res1) => {
				dispatch(dispatchLogin(data));
			})
		}).catch((err) => {
			console.log(err);
		});
	};
	
	
}

export function dispatchLogin(data){
	return {	
		type: types.LOGIN,
		payload: data,	
	};
}

export function forgotPasswordAction (data) {
	return {
		type: types.FORGOT_PASSWORD,
		payload: data,
	// 	meta: {
    //   analytics: 
    //   {
    //     eventType: EventTypes.track,
    //     eventPayload: {
    //       event: "forgot password",
    //       properties: {
    //         data
    //       }
    //     }
    //   }
    // },
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
