import * as types from "../../constants/index";

const initialState = {
	lectures: [],
	currentPage: 1,
	totalLectures: "",
	isCompleted: false,
	error: "",
	Count: '',
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
				isCompleted: true
			};
			break;
		case types.UPDATE_COUNTERS:
			state = {
				...state
			};
			break;
	}
	return state;
};

export default lectureReducer;
