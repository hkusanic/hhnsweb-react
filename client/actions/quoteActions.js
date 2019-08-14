import quoteApi from '../utils/api/quote';
import * as types from '../constants/index';
import { func } from 'prop-types';
import { EventTypes } from 'redux-segment';

export function searchQuote (body) {
	return dispatch => {
		quoteApi
			.searchQuote(body)
			.then(response => {
				dispatch(searchQuoteAction(response));
			})
			.catch(err => {
				console.error(err);
			});
	};
}

export function searchQuoteAction (data) {
	return {
		type: types.SEARCH_QUOTE,
		payload: data,
		meta: {
      analytics: 
      {
        eventType: EventTypes.track,
        eventPayload: {
          event: "searching quote",
          properties: {
            data
          }
        }
      }
    },
	};
}

export function quoteOfDay (body) {
	return dispatch => {
		quoteApi
			.quoteOfDay(body)
			.then(response => {
				dispatch(searchQuoteOfDay(response));
			})
			.catch(err => {
				console.error(err);
			});
	};
}


export function searchQuoteOfDay (data) {
	return {
		type: types.SEARCH_QUOTE_OF_DAY,
		payload: data,
		meta: {
      analytics: 
      {
        eventType: EventTypes.track,
        eventPayload: {
          event: "searching quote of tha day",
          properties: {
            data
          }
        }
      }
    },
	};
}

export function getQuoteByUuid (body) {
	return dispatch => {
		quoteApi
			.getQuotesByUuid(body)
			.then(response => {
				dispatch(getQuoteByUuidAction(response));
			})
			.catch(err => {
				console.log(err);
			});
	};
}

export function getQuoteByUuidAction (data) {
	return {
		type: types.GET_QUOTE_BY_UUID,
		payload: data,
		meta: {
      analytics: 
      {
        eventType: EventTypes.track,
        eventPayload: {
          event: "getting quote by id",
          properties: {
            data
          }
        }
      }
    },
	};
}
