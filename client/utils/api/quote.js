import axios from 'axios';
import serverAddress from './config';

const utils = {
	searchQuote: body => {
		const page = body.page || '1';
		let url
			= serverAddress
			+ '/api/quote?page='
			+ page;

		return axios.get(url);
	}
};

export default utils;
