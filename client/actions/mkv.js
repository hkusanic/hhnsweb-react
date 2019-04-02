import mkvApi from '../utils/api/mkv';
import * as types from '../constants/index';

export function getMkv (body) {
	return dispatch => {
		mkvApi
			.getMkv(body)
			.then(response => {
				dispatch(getMkvAction(response));
			})
			.catch(err => {
				console.error(err);
			});
	};
}

export function getMkvAction (data) {
	return {
		type: types.GET_MKV,
		payload: data,
	};
}
