import * as types from '../../constants/index';

const initialState = {
	sadhanaList: [],
	isCompleted: false,
	error: '',
	totalSadhanaSheet: '',
	currentPage: 1,
};

const sadhanaReducer = (state = initialState, action) => {
	console.log('action.payload =======>>>>>', action.payload);
	switch (action.type) {
		case types.GET_SADHANA_LIST:
			const data = action.payload.data.sadhana;
			state = {
				...state,
				sadhanaList: data.results,
				totalSadhanaSheet: data.total,
				isCompleted: true,
				currentPage: data.currentPage,
			};
			break;
	}
	return state;
};

export default sadhanaReducer;
