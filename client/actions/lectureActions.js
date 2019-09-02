import lectureApi from '../utils/api/lecture';
import * as types from '../constants/index';
import { EventLayer } from './event-layer'

const Analytics = new EventLayer();


export function searchLecture (body) {
	alert('audio');
	return dispatch => {
		lectureApi
			.searchLecture(body)
			.then(response => {
				// response.data.lecture.currentPage = body.page;
				dispatch(dispatchSearchLecture(response));
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
				dispatch(dispatchSearchLectureVideo(response));
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
				dispatch(dispatchSearchLectureTranscriptions(response));
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
				dispatch(dispatchSearchLectureSummaries(response));
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
				dispatch(dispatchSearchLecture(response));
			})
			.catch(err => {
				console.log(err);
			});
	};
}

export function dispatchSearchLecture (data) {
	return dispatch => {
		//alert("blog1");;
		Analytics.page("Audio", "Audio List Page",{
			id : JSON.parse(localStorage.getItem("user")).user_id,

		}).then((res) => {
			//alert("blog");
			Analytics.track(JSON.parse(localStorage.getItem("user")).user_id, {
				id : JSON.parse(localStorage.getItem("user")).user_id,
				name : "Audio List",
				data : {
					id : JSON.parse(localStorage.getItem("user")).user_id,
					name : "Audio List",
				},

			}).then((res2) => {
				dispatch(searchLectureAction(data));

			}).catch( err => console.log(err));
		}).catch ( err => console.log(err));
	};	
}

export function searchLectureAction (data) {
	return {
		type: types.SEARCH_LECTURE,
		payload: data,
	// 	meta: {
    //   analytics: 
    //   {
    //     eventType: EventTypes.track,
    //     eventPayload: {
    //       event: "Audios list",
    //       properties: {
    //         data:data,
    //         userId:JSON.parse(localStorage.getItem("user")).user_id,
    //         user: JSON.parse(localStorage.getItem("user")),


    //       }
    //     }
    //   }
    // },
	};
}

export function dispatchSearchLectureVideo (data) {
	return dispatch => {
		//alert("blog1");;
		Analytics.page("Video", "Search Video List",{
			id : JSON.parse(localStorage.getItem("user")).user_id,

		}).then((res) => {
			//alert("blog");
			Analytics.track(JSON.parse(localStorage.getItem("user")).user_id, {
				id : JSON.parse(localStorage.getItem("user")).user_id,
				name : "Search Video List",
				data : {
					id : JSON.parse(localStorage.getItem("user")).user_id,
					name : "Search Video List",
				},

			}).then((res2) => {
				dispatch(searchLectureActionVideo(data));

			}).catch( err => console.log(err));
		}).catch ( err => console.log(err));
	};	
}

export function searchLectureActionVideo (data) {
	return {
		type: types.SEARCH_LECTURE_VIDEO,
		payload: data,
	// 	meta: {
    //   analytics: 
    //   {
    //     eventType: EventTypes.track,
    //     eventPayload: {
    //       event: "searching lecture video",
    //       properties: {
    //         data:data,
    //         userId:JSON.parse(localStorage.getItem("user")).user_id,
    //         user: JSON.parse(localStorage.getItem("user")),


    //       }
    //     }
    //   }
    // },
	};
}

export function dispatchSearchLectureTranscriptions (data) {
	return dispatch => {
		//alert("blog1");;
		Analytics.page("Transcripts", "Search Transcripts List",{
			id : JSON.parse(localStorage.getItem("user")).user_id,

		}).then((res) => {
			//alert("blog");
			Analytics.track(JSON.parse(localStorage.getItem("user")).user_id, {
				id : JSON.parse(localStorage.getItem("user")).user_id,
				name : "Search Transcripts List",
				data : {
					id : JSON.parse(localStorage.getItem("user")).user_id,
					name : "Search Transcripts List",
				},

			}).then((res2) => {
				dispatch(searchLectureActionTranscriptions(data));

			}).catch( err => console.log(err));
		}).catch ( err => console.log(err));
	};	
}

export function searchLectureActionTranscriptions (data) {
	return {
		type: types.SEARCH_LECTURE_TRANSCRIPTIONS,
		payload: data,
	// 	meta: {
    //   analytics: 
    //   {
    //     eventType: EventTypes.track,
    //     eventPayload: {
    //       event: "searching lecture transcriptions",
    //       properties: {
    //         data,
    //         userId:JSON.parse(localStorage.getItem("user")).user_id,
    //       }
    //     }
    //   }
    // },
	};
}

export function dispatchSearchLectureSummaries (data) {
	return dispatch => {
		//alert("blog1");;
		Analytics.page("Summaries", "Search Summaries List",{
			id : JSON.parse(localStorage.getItem("user")).user_id,

		}).then((res) => {
			//alert("blog");
			Analytics.track(JSON.parse(localStorage.getItem("user")).user_id, {
				id : JSON.parse(localStorage.getItem("user")).user_id,
				name : "Search Summaries List",
				data : {
					id : JSON.parse(localStorage.getItem("user")).user_id,
					name : "Search Summaries List",
				},

			}).then((res2) => {
				dispatch(searchLectureActionSummaries(data));

			}).catch( err => console.log(err));
		}).catch ( err => console.log(err));
	};	
}

export function searchLectureActionSummaries (data) {
	return {
		type: types.SEARCH_LECTURE_SUMMARIES,
		payload: data,
	// 	meta: {
    //   analytics: 
    //   {
    //     eventType: EventTypes.track,
    //     eventPayload: {
    //       event: "searching lecture summaries",
    //       properties: {
    //         data
    //       }
    //     }
    //   }
    // },
	};
}

export function updateCountersAction (data) {
	return {
		type: types.UPDATE_COUNTERS,
		payload: data,
	// 	meta: {
    //   analytics:
    //   {
    //     eventType: EventTypes.track,
    //     eventPayload: {
    //       event: "updating counter",
    //       properties: {
    //         data
    //       }
    //     }
    //   }
    // },
	};
}

export function fetchLectureByUuid (data) {
	return {
		type: types.GET_LECTURE_BY_UUID,
		payload: {
			lecture: data.data.lecture,
		},
	// 	meta: {
    //   analytics: 
    //   {
    //     eventType: EventTypes.track,
    //     eventPayload: {
    //       event: "fetch lecture by id",
    //       properties: {
    //         data
    //       }
    //     }
    //   }
    // },
	};
}

export function resetState () {
	return {
		type: 'RESET_STATE_LECTURE',
	};
}
