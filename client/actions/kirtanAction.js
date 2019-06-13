import kirtanApi from '../utils/api/kirtan';
import * as types from '../constants/index';

export function searchKirtan (body) {
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

export function getKirtanByUuid (body) {
	return dispatch => {
		kirtanApi
			.fetchKirtan(body)
			.then(response => {
				dispatch(fetchKirtanByUuid(response));
			})
			.catch(err => {
				console.log(err);
			});
	};
}

export function searchKirtanAction (data) {
	return {
		type: types.SEARCH_KIRTAN,
		payload: data,
	};
}

export function fetchKirtanByUuid (data) {
	return {
		type: types.GET_KIRTAN_BY_UUID,
		payload: {
			kirtan: data.data.kirtan,
		},
	};
}

export function updateCounters (body) {
	return dispatch => {
		kirtanApi
			.updateCounters(body)
			.then(response => {
				dispatch(updateCountersAction(response));
			})
			.catch(err => {
				console.log(err);
			});
	};
}

export function updateCountersAction (data) {
	return {
		type: types.UPDATE_COUNTERS,
		payload: data,
	};
}

export function resetState () {
	return {
		type: 'RESET_STATE_KIRTAN',
	};
}
