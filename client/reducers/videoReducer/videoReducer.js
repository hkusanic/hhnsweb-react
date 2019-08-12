import * as types from '../../constants/index';

const initialState = {
	videoList: [],
	loading: false,
	singleVideo: null,
	totalVideos: null,
	currentPage: 1,
	isCompleted: false,
	error: '',
	updateCount: false,
};

const videoReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.GET_VIDEO_LIST:
			const data = action.payload.data.video;
			state = {
				...state,
				videoList: data.results,
				totalVideos: data.total,
				currentPage: data.currentPage,
				isCompleted: true,
				updateCount: false,
			};
			break;

		case types.GET_VIDEO_BY_ID:
			const singleVideoData = action.payload.data.video;
			state = {
				...state,
				singleVideo: singleVideoData,
				updateCount: false,
			};
			break;

		case types.UPDATE_VIDEO_PAGE_VIEW:
			state = {
				...state,
				updateCount: true,
				singleVideo: action.payload.data.video,
			};
			break;

		case 'RESET_STATE_VIDEO':
			state = {
				...state,
				singleVideo: null,
				updateCount: false,
				isCompleted: false,
				videoList: [],
				error: '',
			};
			break;

		default:
			state = {
				...state,
			};
	}
	return state;
};

export default videoReducer;

