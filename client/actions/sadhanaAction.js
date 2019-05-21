import sadhanaApi from '../utils/api/sadhana';
import * as types from '../constants/index';

export function getSadhanaList (body) {
	return dispatch => {
		sadhanaApi
			.getSadhanaList(body)
			.then(response => {
				dispatch(getSadhanaListAction(response));
			})
			.catch(err => {
				console.error(err); s;
			});
	};
}

export function getSadhanaListAction (data) {
	return {
		type: types.GET_SADHANA_LIST,
		payload: data,
	};
}
