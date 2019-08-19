import contentApi from "../utils/api/content";
import * as types from "../constants/index";
import { EventTypes } from 'redux-segment';


export function getContents() {
	return dispatch => {
		contentApi
			.getContents()
			.then(response => {
				dispatch(getContentAction(response));
			})
			.catch(err => {
				console.error(err);
			});
	};
}

export function getContentAction(data) {
	return {
		type: types.GET_CONTENTS,
		payload: data,
		meta: {
      analytics: 
      {
        eventType: EventTypes.track,
        eventPayload: {
          event: "get contents",
         properties: {
            data:data,
            user: JSON.parse(localStorage.getItem("user")),


          }
        }
      }
    },
	};
}
