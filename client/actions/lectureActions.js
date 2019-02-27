import lectureApi from '../utils/api/lecture';
import * as types from '../constants/index';

export function getLectures (page) {
	return (dispatch) => {
		lectureApi.getlectures(page)
			.then((response) => {
				dispatch(getLecturesAction(response.data));
			})
			.catch((err) => {
				console.error(err);
			});
	};
}

export function getLecturesAction (data) {
	return {
		type: types.GET_LECTURES,
		payload: data,
	};
}
