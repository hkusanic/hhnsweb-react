import searchFilterApi from '../utils/api/searchFilter';
import * as types from '../constants/index';

export function getEvents () {
	return dispatch => {
		searchFilterApi
			.getEvents()
			.then(response => {
				dispatch(getEventsAction(response.data));
			})
			.catch(err => {
				console.error(err);
			});
	};
}

export function getLocations () {
	return dispatch => {
		searchFilterApi
			.getLocations()
			.then(response => {
				dispatch(getLocationsAction(response.data));
			})
			.catch(err => {
				console.error(err);
			});
	};
}

export function getTopics () {
	return dispatch => {
		searchFilterApi
			.getTopics()
			.then(response => {
				dispatch(getTopicsAction(response.data));
			})
			.catch(err => {
				console.error(err);
			});
	};
}

export function getTranslations () {
	return dispatch => {
		searchFilterApi
			.getTranslations()
			.then(response => {
				dispatch(getTranslationsAction(response.data));
			})
			.catch(err => {
				console.log(err);
			});
	};
}

export function getEventsAction (data) {
	return {
		type: types.GET_EVENTS,
		payload: data,
	};
}

export function getLocationsAction (data) {
	return {
		type: types.GET_LOCATIONS,
		payload: data,
	};
}

export function getTopicsAction (data) {
	return {
		type: types.GET_TOPIC,
		payload: data,
	};
}

export function getTranslationsAction (data) {
	return {
		type: types.GET_TRANSLATION,
		payload: data,
	};
}
