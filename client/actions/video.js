import VideoApi from '../utils/api/video';
import * as types from '../constants/index';
import { EventLayer } from './event-layer'

const Analytics = new EventLayer();

export function getVideoList (body) {
	return dispatch => {
		VideoApi.getVideoList(body)
			.then(response => {
				dispatch(dispatchGetVideoList(response));
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
				dispatch(dispatchGetVideoListById(response));
			})
			.catch(err => {
				console.log('err =======>>>>>>>>', err);
			});
	};
}

export function updateVideoPageViews (body) {
	return dispatch => {
		VideoApi.updateVideoPageViews(body)
			.then(response => {
				dispatch(updateVideoPageViewAction(response));
			})
			.catch(err => {
				console.log('err =========>>>>', err);
			});
	};
}

export function dispatchGetVideoList (data) {
	return dispatch => {
		//alert("blog1");;
		Analytics.page("Video", "Video List Page",{
			id : JSON.parse(localStorage.getItem("user")).user_id,

		}).then((res) => {
			//alert("blog");
			Analytics.track(JSON.parse(localStorage.getItem("user")).user_id, {
				id : JSON.parse(localStorage.getItem("user")).user_id,
				name : "Video List",
				data : {
					id : JSON.parse(localStorage.getItem("user")).user_id,
					name : "Video List",
				},

			}).then((res2) => {
				dispatch(getVideoListAction(data));

			}).catch( err => console.log(err));
		}).catch ( err => console.log(err));
	};	
}

export function getVideoListAction (data) {
	return {
		type: types.GET_VIDEO_LIST,
		payload: data,
	};
}

export function dispatchGetVideoListById (data) {
	return dispatch => {
		//alert("blog1");;
		Analytics.page("Video", "Video By Id",{
			id : JSON.parse(localStorage.getItem("user")).user_id,

		}).then((res) => {
			//alert("blog");
			Analytics.track(JSON.parse(localStorage.getItem("user")).user_id, {
				id : JSON.parse(localStorage.getItem("user")).user_id,
				name : "Video By Id",
				data : {
					id : JSON.parse(localStorage.getItem("user")).user_id,
					name : "Video By Id",
				},

			}).then((res2) => {
				dispatch(getVideoByIdAction(data));

			}).catch( err => console.log(err));
		}).catch ( err => console.log(err));
	};	
}

export function getVideoByIdAction (data) {
	return {
		type: types.GET_VIDEO_BY_ID,
		payload: data,
	};
}

export function updateVideoPageViewAction (data) {
	return {
		type: types.UPDATE_VIDEO_PAGE_VIEW,
		payload: data,
	// 	meta: {
    //   analytics: 
    //   {
    //     eventType: EventTypes.track,
    //     eventPayload: {
    //       event: "update video page view",
    //       properties: {
    //         data:data,
    //         userId:JSON.parse(localStorage.getItem("user")).user_id,
    //         user: JSON.parse(localStorage.getItem("user")),


    //       }
    //     }
    //   }
    // },
	};
}

export function resetState () {
	return {
		type: 'RESET_STATE_VIDEO',
	};
}
