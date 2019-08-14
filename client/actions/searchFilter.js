import searchFilterApi from '../utils/api/searchFilter';
import * as types from '../constants/index';
import { EventTypes } from 'redux-segment'

export function getEvents() {
	return (dispatch) => {
		searchFilterApi
			.getEvents()
			.then((response) => {
				dispatch(getEventsAction(response.data));
			})
			.catch((err) => {
				console.error(err);
			});
	};
}

export function getLocations() {
	return (dispatch) => {
		searchFilterApi
			.getLocations()
			.then((response) => {
				// console.log('getlocation action', response.data);
				dispatch(getLocationsAction(response.data));
			})
			.catch((err) => {
				console.error(err);
			});
	};
}

export function getTopics() {
	return (dispatch) => {
		searchFilterApi
			.getTopics()
			.then((response) => {
				dispatch(getTopicsAction(response.data));
			})
			.catch((err) => {
				console.error(err);
			});
	};
}

export function getEventsAction(data) {
	return {
		type: types.GET_EVENTS,
		payload: data,
		meta: {
      analytics: 
      {
        eventType: EventTypes.track,
        eventPayload: {
          event: "event action",
          properties: {
            data
          }
        }
      }
    },
	};
}

export function getLocationsAction(data) {
	return {
		type: types.GET_LOCATIONS,
		payload: data,
		meta: {
      analytics: 
      {
        eventType: EventTypes.track,
        eventPayload: {
          event: "search location action",
          properties: {
            data
          }
        }
      }
    },
	};
}

export function getTopicsAction(data) {
	return {
		type: types.GET_TOPIC,
		payload: data,
		meta: {
      analytics: 
      {
        eventType: EventTypes.track,
        eventPayload: {
          event: "topic action",
          properties: {
            data
          }
        }
      }
    },
	};
}
