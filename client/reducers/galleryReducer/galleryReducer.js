import * as types from '../../constants/index';

const initialState = {
	mainGallery: [],
	subGalleries: [],
	error: '',
};

const galleryReducer = (state = initialState, action) => {
	// console.log('action =====>>>>>>', action);
	switch (action.type) {
		case types.GET_GALLERY:
			state = {
				...state,
			};
			break;
		case types.GET_STATIC_GALLERY:
			state = {
				...state,
				mainGallery: action.payload.data.gallery,
				subGalleries: [],
			};
			break;
		case types.GET_SUB_GALLERY:
			state = {
				...state,
				subGalleries: action.payload.data.gallery,
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
