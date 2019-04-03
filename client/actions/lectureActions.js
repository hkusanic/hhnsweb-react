import lectureApi from '../utils/api/lecture';
import * as types from '../constants/index';

export function searchLecture (body) {
	return dispatch => {
		lectureApi
			.searchLecture(body)
			.then(response => {
				dispatch(searchLectureAction(response));
			})
			.catch(err => {
				console.error(err);
			});
	};
}

export function updateCounters (body) {
	return dispatch => {
		lectureApi
			.updateCounters(body)
			.then(response => {
				dispatch(updateCountersAction(response));
			})
			.catch(err => {
				console.log(err);
			});
	};
}

export function searchLectureAction (data) {
	return {
		type: types.SEARCH_LECTURE,
		payload: data,
	};
}

export function updateCountersAction (data) {
	return {
		type: types.UPDATE_COUNTERS,
		payload: data,
	};
}
