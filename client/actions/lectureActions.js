import lectureApi from '../utils/api/lecture';
import * as types from '../constants/index';

export function searchLecture(body) {
	return (dispatch) => {
		lectureApi
			.searchLecture(body)
			.then((response) => {
				// response.data.lecture.currentPage = body.page;
				dispatch(searchLectureAction(response));
			})
			.catch((err) => {
				console.error(err);
			});
	};
}
export function searchLectureVideo(body) {
	return (dispatch) => {
		lectureApi
			.searchLecture(body)
			.then((response) => {
				// response.data.lecture.currentPage = body.page;
				dispatch(searchLectureActionVideo(response));
			})
			.catch((err) => {
				console.error(err);
			});
	};
}

export function searchLectureTranscriptions(body) {
	return (dispatch) => {
		lectureApi
			.searchLecture(body)
			.then((response) => {
				// response.data.lecture.currentPage = body.page;
				dispatch(searchLectureActionTranscriptions(response));
			})
			.catch((err) => {
				console.error(err);
			});
	};
}

export function searchLectureSummaries(body) {
	return (dispatch) => {
		lectureApi
			.searchLecture(body)
			.then((response) => {
				// response.data.lecture.currentPage = body.page;
				dispatch(searchLectureActionSummaries(response));
			})
			.catch((err) => {
				console.error(err);
			});
	};
}

export function updateCounters(body) {
	return (dispatch) => {
		lectureApi
			.updateCounters(body)
			.then((response) => {
				dispatch(updateCountersAction(response));
			})
			.catch((err) => {
				console.log(err);
			});
	};
}

export function searchLectureAction(data) {
	return {
		type: types.SEARCH_LECTURE,
		payload: data
	};
}
export function searchLectureActionVideo(data) {
	return {
		type: types.SEARCH_LECTURE_VIDEO,
		payload: data
	};
}

export function searchLectureActionTranscriptions(data) {
	return {
		type: types.SEARCH_LECTURE_TRANSCRIPTIONS,
		payload: data
	};
}

export function searchLectureActionSummaries(data) {
	return {
		type: types.SEARCH_LECTURE_SUMMARIES,
		payload: data
	};
}

export function updateCountersAction(data) {
	return {
		type: types.UPDATE_COUNTERS,
		payload: data
	};
}
