import * as types from '../../constants/index';

const initialState = {
	galleries: [],
	error: '',
};

const galleryReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.GET_GALLERY:
			state = {
				...state,
			};
			break;
		default:
			state = {
				...state,
			};
	}
	return state;
};

export default galleryReducer;
