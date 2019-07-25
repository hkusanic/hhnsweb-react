import VideoApi from '../utils/api/video';
import * as types from '../constants/index';

export function getVideoList (body) {
	return dispatch => {
		VideoApi.getVideoList(body)
			.then(response => {
				dispatch(getVideoListAction(response));
			})
			.catch(err => {
				console.error('err ====>>>>>>', err);
			});
	};
}


export function getVideoById (body) {
	return dispatch => {
		VideoApi.getVideoById(body)
			.then(response => {
				dispatch(getVideoByIdAction(response));
			})
			.catch(err => {
				console.log('err =======>>>>>>>>', err);
			});
	};
}


export function getVideoListAction (data) {
	return {
		type: types.GET_VIDEO_LIST,
		payload: data,
	};
}

export function getVideoByIdAction (data) {
	return {
		type: types.GET_VIDEO_BY_ID,
		payload: data,
	};
}

export function resetState () {
	return {
		type: 'RESET_STATE_VIDEO',
	};
}
