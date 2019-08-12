import userApi from '../utils/api/user';
import * as types from '../constants/index';

export function getUserDetailsByUserId (body) {
	return (dispatch) => {
		userApi.getUserDetails(body)
			.then((response) => {
				console.log('response ====>>>', response);
				dispatch(getUserDetailsByUserIdAction(response));
			})
			.catch((err) => {
				console.log(err);
			});
	};
}

export function getUserDetailsByUserIdAction (data) {
	return {
		type: types.GET_USER_DETAILS_BY_USER_ID,
		payload: data,
	};
}
