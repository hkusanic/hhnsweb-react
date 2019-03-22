import kirtanApi from "../utils/api/kirtan";
import * as types from "../constants/index";

export function searchKirtan(body) {
	return dispatch => {
		kirtanApi
			.searchKirtan(body)
			.then(response => {
				dispatch(searchKirtanAction(response));
			})
			.catch(err => {
				console.error(err);
			});
	};
}

export function searchKirtanAction(data) {
	return {
		type: types.SEARCH_KIRTAN,
		payload: data
	};
}
