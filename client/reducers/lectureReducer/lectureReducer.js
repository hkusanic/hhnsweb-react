import * as types from '../../constants/index';

const initialState = {
	lectures: [],
	currentPage: 1,
  videoCurrentPage: 1,
  transcriptionsCurrentPage: 1,
  summariesCurrentPage: 1,
	totalLectures: '',
	isCompleted: false,
	error: '',
	Count: false
};

const lectureReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.SEARCH_LECTURE:
			const data = action.payload.data.lecture;
			state = {
				...state,
				lectures: data.results,
				totalLectures: data.total,
				currentPage: data.currentPage,
				isCompleted: true,
				Count: false
			};
			break;
		case types.SEARCH_LECTURE_VIDEO:
			const dataVideo = action.payload.data.lecture;
			state = {
				...state,
				lectures: dataVideo.results,
				totalLectures: dataVideo.total,
				videoCurrentPage: dataVideo.currentPage,
				isCompleted: true,
				Count: false
			};
			break;
		case types.SEARCH_LECTURE_TRANSCRIPTIONS:
			const dataTrans = action.payload.data.lecture;
			state = {
				...state,
				lectures: dataTrans.results,
				totalLectures: dataTrans.total,
				transcriptionsCurrentPage: dataTrans.currentPage,
				isCompleted: true,
				Count: false
			};
			break;
		case types.SEARCH_LECTURE_SUMMARIES:
			const dataSummary = action.payload.data.lecture;
			state = {
				...state,
				lectures: dataSummary.results,
				totalLectures: dataSummary.total,
				summariesCurrentPage: dataSummary.currentPage,
				isCompleted: true,
				Count: false
			};
			break;
		case types.UPDATE_COUNTERS:
			state = {
				...state,
				Count: true
			};
			break;
	}
	return state;
};

export default lectureReducer;
