import sadhanaApi from '../utils/api/sadhana';
import * as types from '../constants/index';

export function getSadhanaList (body, type) {
	return dispatch => {
		sadhanaApi
			.getSadhanaList(body)
			.then(response => {
				if (type === 'list') {
					dispatch(getSadhanaListAction(response));
				}
				if (type === 'single') {
					const singleSheet = response.data.sadhana.results[0];
					dispatch(getSingleSadhanaSheetByDate(singleSheet));
				}
			})
			.catch(err => {
				console.error(err);
			});
	};
}

export function createSadhana (body) {
	return dispatch => {
		sadhanaApi
			.createSdahanaSheet(body)
			.then(response => {
				dispatch(createSadhanaSheetAction(response));
			})
			.catch(err => {
				console.error(err);
			});
	};
}

export function updateSadhana (uuid, body) {
	return dispatch => {
		sadhanaApi
			.updateSadhanaSheet(uuid, body)
			.then(response => {
				dispatch(updateSadhanaSheerAction(response));
			})
			.catch(err => {
				console.error(err);
			});
	};
}

export function getSadhanaById (body) {
	return dispatch => {
		sadhanaApi
			.getSadhanaById(body)
			.then(response => {
				dispatch(getSadhanaByIdAction(response));
			})
			.catch(err => {
				console.error(err);
			});
	};
}

export function getSadhanaListAction (data) {
	return {
		type: types.GET_SADHANA_LIST,
		payload: data,
	};
}

export function createSadhanaSheetAction (data) {
	return {
		type: types.CREATE_SADHANA_SHEET,
		payload: data,
	};
}

export function updateSadhanaSheerAction (data) {
	return {
		type: types.UPDATE_SADHANA_SHEET,
		payload: data,
	};
}

export function getSadhanaByIdAction (data) {
	return {
		type: types.GET_SADHANA_BY_ID,
		payload: data,
	};
}

export function getSingleSadhanaSheetByDate (data) {
	return {
		type: types.GET_SINGLE_SHEET_BY_DATE_USER,
		payload: data,
	};
}
