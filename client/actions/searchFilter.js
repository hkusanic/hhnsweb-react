import searchFilterApi from '../utils/api/searchFilter';
import * as types from '../constants/index';

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
		payload: data
	};
}

export function getLocationsAction(data) {
	return {
		type: types.GET_LOCATIONS,
		payload: data
	};
}

export function getTopicsAction(data) {
	return {
		type: types.GET_TOPIC,
		payload: data
	};
}
