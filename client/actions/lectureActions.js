import lectureApi from '../utils/api/lecture';
import * as types from '../constants/index';
import { EventTypes } from 'redux-segment';


export function searchLecture (body) {
	return dispatch => {
		lectureApi
			.searchLecture(body)
			.then(response => {
				// response.data.lecture.currentPage = body.page;
				dispatch(searchLectureAction(response));
			})
			.catch(err => {
				console.error(err);
			});
	};
}

export function searchLectureVideo (body) {
	return dispatch => {
		lectureApi
			.searchLecture(body)
			.then(response => {
				// response.data.lecture.currentPage = body.page;
				dispatch(searchLectureActionVideo(response));
			})
			.catch(err => {
				console.error(err);
			});
	};
}

export function searchLectureTranscriptions (body) {
	return dispatch => {
		lectureApi
			.searchLecture(body)
			.then(response => {
				// response.data.lecture.currentPage = body.page;
				dispatch(searchLectureActionTranscriptions(response));
			})
			.catch(err => {
				console.error(err);
			});
	};
}

export function searchLectureSummaries (body) {
	return dispatch => {
		lectureApi
			.searchLecture(body)
			.then(response => {
				// response.data.lecture.currentPage = body.page;
				dispatch(searchLectureActionSummaries(response));
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

export function getLectureByUuid (body) {
	return dispatch => {
		lectureApi
			.fetchLecture(body)
			.then(response => {
				dispatch(fetchLectureByUuid(response));
			})
			.catch(err => {
				console.log(err);
			});
	};
}

export function getRussianDubbedLecture (body) {
	return dispatch => {
		lectureApi
			.searchLecture(body)
			.then(response => {
				dispatch(searchLectureAction(response));
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
		meta: {
      analytics: 
      {
        eventType: EventTypes.track,
        eventPayload: {
          event: "Audios list",
          properties: {
            data:data,
            user: JSON.parse(localStorage.getItem("user")),


          }
        }
      }
    },
	};
}
export function searchLectureActionVideo (data) {
	return {
		type: types.SEARCH_LECTURE_VIDEO,
		payload: data,
		meta: {
      analytics: 
      {
        eventType: EventTypes.track,
        eventPayload: {
          event: "searching lecture video",
          properties: {
            data:data,
            user: JSON.parse(localStorage.getItem("user")),


          }
        }
      }
    },
	};
}

export function searchLectureActionTranscriptions (data) {
	return {
		type: types.SEARCH_LECTURE_TRANSCRIPTIONS,
		payload: data,
		meta: {
      analytics: 
      {
        eventType: EventTypes.track,
        eventPayload: {
          event: "searching lecture transcriptions",
          properties: {
            data
          }
        }
      }
    },
	};
}

export function searchLectureActionSummaries (data) {
	return {
		type: types.SEARCH_LECTURE_SUMMARIES,
		payload: data,
		meta: {
      analytics: 
      {
        eventType: EventTypes.track,
        eventPayload: {
          event: "searching lecture summaries",
          properties: {
            data
          }
        }
      }
    },
	};
}

export function updateCountersAction (data) {
	return {
		type: types.UPDATE_COUNTERS,
		payload: data,
		meta: {
      analytics:
      {
        eventType: EventTypes.track,
        eventPayload: {
          event: "updating counter",
          properties: {
            data
          }
        }
      }
    },
	};
}

export function fetchLectureByUuid (data) {
	return {
		type: types.GET_LECTURE_BY_UUID,
		payload: {
			lecture: data.data.lecture,
		},
		meta: {
      analytics: 
      {
        eventType: EventTypes.track,
        eventPayload: {
          event: "fetch lecture by id",
          properties: {
            data
          }
        }
      }
    },
	};
}

export function resetState () {
	return {
		type: 'RESET_STATE_LECTURE',
	};
}
