import userApi from '../utils/api/user';
import * as types from '../constants/index';

export function getUserDetailsByUserId (body) {
	alert('hello2323');
	return (dispatch) => {
		userApi.getUserDetails(body)
			.then((response) => {
				alert('sahu1');
				console.log('response ====>>>', response);
				dispatch(getUserDetailsByUserIdAction(response));
			})
			.catch((err) => {
				alert('sahu2');
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
