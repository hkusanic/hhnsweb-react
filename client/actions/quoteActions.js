import quoteApi from '../utils/api/quote';
import * as types from '../constants/index';

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
	};
}