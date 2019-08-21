import axios from 'axios';
import serverAddress from './config';

const utils = {
	searchQuote: body => {
		const page = body.page || '1';
		const author = body.author || '';
		let url
			= serverAddress
			+ '/api/quote?page='
			+ page
			+ (author ? '&author=' + author : '');

		return axios.get(url);
	},

	quoteOfDay: body => {
		console.log("quotes api calling")
		let url = serverAddress + '/api/quote/quoteOfDay';
		return axios.post(url, body);
	},

	getQuotesByUuid: body => {
		let url = serverAddress + '/api/quote/getquotebyid/';
		return axios.post(url, body);
	},
};

export default utils;
