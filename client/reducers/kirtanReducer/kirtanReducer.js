import * as types from "../../constants/index";

const initialState = {
	kirtans: [],
	currentPage: 1,
	totalKirtans: "",
	isCompleted: false,
	error: ""
};

const kirtanReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.SEARCH_KIRTAN:
			const data = action.payload.data.kirtan;
			state = {
				...state,
				kirtans: data.results,
				totalKirtans: data.total,
				currentPage: data.currentPage,
				isCompleted: true
			};
			break;
	}
	return state;
};

export default kirtanReducer;
