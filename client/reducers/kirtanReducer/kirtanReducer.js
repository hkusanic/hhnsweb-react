import * as types from '../../constants/index';

const initialState = {
	kirtans: [],
	currentPage: 1,
	totalKirtans: '',
	isCompleted: false,
	error: '',
	kirtan: null,
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
				isCompleted: true,
			};
			break;
		case types.GET_KIRTAN_BY_UUID:
			state = {
				...state,
				kirtan: action.payload.kirtan,
			};
			break;
		case types.UPDATE_COUNTERS:
			state = {
				...state,
				Count: true,
				kirtan: action.payload.data.kirtan,
			};
			break;
		case 'RESET_STATE_KIRTAN':
			state = {
				...state,
				kirtan: null,
				kirtans: [],
			};
			break;
	}
	return state;
};

export default kirtanReducer;
