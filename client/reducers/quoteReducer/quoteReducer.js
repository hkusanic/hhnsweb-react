import * as types from '../../constants/index';

const initialState = {
	quotes: [],
	currentPage: 1,
	totalQuotes: '',
	isCompleted: false,
	error: '',
	Count: false
};

const quoteReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.SEARCH_QUOTE:
			const data = action.payload.data.quote;
			state = {
				...state,
				quotes: data.results,
				totalQuotes: data.total,
				currentPage: data.currentPage,
				isCompleted: true,
				Count: false
			};
			break;
		case types.SEARCH_QUOTE_OF_DAY:
			state = {
				...state,
				quotes: action.payload.data.quote
			};
			break;
	}
	return state;
};

export default quoteReducer;
