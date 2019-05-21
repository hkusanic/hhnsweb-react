import axios from 'axios';
import serverAddress from './config';

const utils = {
	getSadhanaList: body => {
		const email = body.email;
		const page = body.pageNumber || 1;
		const date = body.date;
		let url
            = serverAddress
            + '/api/sadhana?page='
            + page
		+ (email ? '&email=' + email : '')
		+ (date ? '&date=' + date : '');
		return axios.get(url);
	},
};

export default utils;
