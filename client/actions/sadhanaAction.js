import sadhanaApi from '../utils/api/sadhana';
import * as types from '../constants/index';
import { notification } from 'antd';
import { EventTypes } from 'redux-segment'

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
				notification.error({
					message: 'Error',
					description: `Some error occured, please try again.`,
					style: {
						marginTop: 50,
					},
				});
				console.error(err);
			});
	};
}

export function createSadhana (body) {
	return dispatch => {
		sadhanaApi
			.createSdahanaSheet(body)
			.then(response => {
				notification.success({
					message: 'Success',
					description: `Sadhana Sheet is submitted successfuly.`,
					style: {
						marginTop: 50,
					},
				});
				dispatch(createSadhanaSheetAction(response));
			})
			.catch(err => {
				notification.error({
					message: 'Error',
					description: `Some error occured, please try again.`,
					style: {
						marginTop: 50,
					},
				});
				console.error(err);
			});
	};
}

export function updateSadhana (uuid, body) {
	return dispatch => {
		sadhanaApi
			.updateSadhanaSheet(uuid, body)
			.then(response => {
				notification.success({
					message: 'Success',
					description: `Sadhana Sheet is updated successfully.`,
					style: {
						marginTop: 50,
					},
				});
				dispatch(updateSadhanaSheerAction(response));
			})
			.catch(err => {
				notification.error({
					message: 'Error',
					description: `Some error occured, please try again.`,
					style: {
						marginTop: 50,
					},
				});
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
				notification.error({
					message: 'Error',
					description: `Some error occured, please try again.`,
					style: {
						marginTop: 50,
					},
				});
				console.error(err);
			});
	};
}

export function getSadhanaListAction (data) {
	return {
		type: types.GET_SADHANA_LIST,
		payload: data,
		meta: {
      analytics: 
      {
        eventType: EventTypes.track,
        eventPayload: {
          event: "sadhana list",
          properties: {
            data
          }
        }
      }
    },
	};
}

export function createSadhanaSheetAction (data) {
	return {
		type: types.CREATE_SADHANA_SHEET,
		payload: data,
		meta: {
      analytics: 
      {
        eventType: EventTypes.track,
        eventPayload: {
          event: "create sadhana sheet",
          properties: {
            data
          }
        }
      }
    },
	};
}

export function updateSadhanaSheerAction (data) {
	return {
		type: types.UPDATE_SADHANA_SHEET,
		payload: data,
		meta: {
      analytics: 
      {
        eventType: EventTypes.track,
        eventPayload: {
          event: "update sadhana sheet",
          properties: {
            data
          }
        }
      }
    },
	};
}

export function getSadhanaByIdAction (data) {
	return {
		type: types.GET_SADHANA_BY_ID,
		payload: data,
		meta: {
      analytics: 
      {
        eventType: EventTypes.track,
        eventPayload: {
          event: "get sadhana by id",
          properties: {
            data
          }
        }
      }
    },
	};
}

export function getSingleSadhanaSheetByDate (data) {
	return {
		type: types.GET_SINGLE_SHEET_BY_DATE_USER,
		payload: data,
		meta: {
      analytics: 
      {
        eventType: EventTypes.track,
        eventPayload: {
          event: "get sadhana sheet by date",
          properties: {
            data
          }
        }
      }
    },
	};
}
