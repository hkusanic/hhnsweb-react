import * as types from '../../constants/index';

const initialState = {
	events: [],
	locations: [],
	topics: [],
	isCompleted: false,
	error: '',
};

const searchFilterReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.GET_EVENTS:
			state = {
				...state,
				events: action.payload.event,
			};
			break;

		case types.GET_LOCATIONS:
			state = {
				...state,
				locations: action.payload.location,
			};
			break;
		case types.GET_TOPIC:
			state = {
				...state,
				topics: action.payload.topic,
			};
			break;
		case 'reset_state':
			state = {
				...state,
				events: [],
				locations: [],
				topics: [],
				isCompleted: false,
				error: '',
			};
	}
	return state;
};

export default searchFilterReducer;
