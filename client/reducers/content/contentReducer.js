import * as types from "../../constants/index";

const initialState = {
	content: [],
	currentPage: 1,
	totalContent: "",
	isCompleted: false,
	error: "",
	Count: false	
};

const contentReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.GET_CONTENTS:
			const data = action.payload.data.content;
			state = {
				...state,
				content: data.results,
				totalContent: data.total,
				currentPage: data.currentPage,
				isCompleted: true,
				Count: false
			};
			break;
	}
	return state;
};

export default contentReducer;
