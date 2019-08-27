import VideoApi from '../utils/api/video';
import * as types from '../constants/index';
import { EventTypes } from 'redux-segment'

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

export function getVideoListAction (data) {
	return {
		type: types.GET_VIDEO_LIST,
		payload: data,
		meta: {
      analytics: 
      {
        eventType: EventTypes.track,
        eventPayload: {
          event: "videos list",
           properties: {
            data:data,
            userId:JSON.parse(localStorage.getItem("user")).user_id,
            user: JSON.parse(localStorage.getItem("user")),


          }
        }
      }
    },
	};
}

export function getVideoByIdAction (data) {
	return {
		type: types.GET_VIDEO_BY_ID,
		payload: data,
		meta: {
      analytics: 
      {
        eventType: EventTypes.track,
        eventPayload: {
          event: "get video by id",
          properties: {
            data:data,
            userId:JSON.parse(localStorage.getItem("user")).user_id,
            user: JSON.parse(localStorage.getItem("user")),


          }
        }
      }
    },
	};
}

export function updateVideoPageViewAction (data) {
	return {
		type: types.UPDATE_VIDEO_PAGE_VIEW,
		payload: data,
		meta: {
      analytics: 
      {
        eventType: EventTypes.track,
        eventPayload: {
          event: "update video page view",
          properties: {
            data:data,
            userId:JSON.parse(localStorage.getItem("user")).user_id,
            user: JSON.parse(localStorage.getItem("user")),


          }
        }
      }
    },
	};
}

export function resetState () {
	return {
		type: 'RESET_STATE_VIDEO',
	};
}
