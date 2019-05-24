import * as types from '../../constants/index';
import Auth from '../../utils/Auth';

const initialState = {
	isLogin: false,
	isComplete: false,
	session: false,
	isAdmin: false,
	loginUser: '',
	checkedLogin: false,
	forgotPasswordSentEmail: false,
	isPasswordupdated: false,
	error: '',
	regError: '',
	forgotError: '',
	resetError: '',
	UpdatedError: '',
	AccessUser: {},
	contactError: '',
	isContactSubmitted: false,
	isProfileEdited: false,
};

const loginReducer = (state = initialState, action) => {
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
					error: '',
				};
			}
			else if (!user.session) {
				state = {
					...state,
					error: user.message,
					isLogin: false,
					isComplete: false,
				};
			}
			break;

		case types.LOGOUT:
			Auth.deauthenticateUser();
			state = {
				...state,
				isLogin: false,
				isComplete: false,
				loginUser: {},
			};
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
					regError: '',
				};
			}
			else if (signedUser.error) {
				Auth.deauthenticateUser();
				state = {
					...state,
					regError: signedUser.error.title,
					isLogin: false,
					session: false,
					loginUser: {},
				};
			}
			break;

		case types.FORGOT_PASSWORD:
			const response = action.payload;
			if (response.success) {
				state = {
					...state,
					forgotPasswordSentEmail: true,
					forgotError: '',
				};
			}
			else if (response.error) {
				state = {
					...state,
					forgotError: response.error.title,
					forgotPasswordSentEmail: false,
				};
			}
			break;

		case types.GET_USER_BY_ACCESS_ID:
			const reset_user = action.payload;
			if (reset_user.data.error) {
				state = {
					...state,
					resetError: reset_user.data.error.title,
					AccessUser: {},
					isPasswordupdated: false,
				};
			} else {
				state = {
					...state,
					AccessUser: reset_user.data,
					resetError: '',
					isPasswordupdated: false,
				};
			}
			break;

		case types.RESET_PASSWORD:
			const data = action.payload.data;
			if (data.error) {
				state = {
					...state,
					isPasswordupdated: false,
					UpdatedError: data.error.title,
				};
			} else {
				state = {
					...state,
					isPasswordupdated: data.success,
				};
			}
			break;

		case types.EDIT_PROFILE:
			const profileRespon = action.payload.data;
			if (profileRespon.success) {
				Auth.authenticateUser(profileRespon.success, profileRespon.loginUser);
				{
					state = {
						...state,
						isProfileEdited: true,
						error: '',
					};
				}
			} else if (profileRespon.error) {
				state = {
					...state,
					error: profileRespon.error.detail,
					isProfileEdited: false,
				};
			}
			break;

		case types.CONTACT_US:
			const contactPayload = action.payload.data;
			if (contactPayload.contactus) {
				state = {
					...state,
					isContactSubmitted: true,
				};
			}
			else {
				state = {
					...state,
					isContactSubmitted: false,
					error: 'Some Error Occured',
				};
			}
			break;

	}
	return state;
};

export default loginReducer;
