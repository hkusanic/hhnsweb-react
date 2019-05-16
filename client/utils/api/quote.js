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
};

export default utils;
