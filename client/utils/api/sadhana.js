import axios from 'axios';
import serverAddress from './config';

const utils = {
	getSadhanaList: body => {
		const userId = body.userId;
		const page = body.pageNumber || 1;
		const date = body.date;
		let url
			= serverAddress
			+ '/api/sadhana?page='
			+ page
			+ (userId ? '&userId=' + userId : '')
			+ (date ? '&date=' + date : '');
		return axios.get(url);
	},

	createSdahanaSheet: body => {
		let url = serverAddress + '/api/sadhana/create/';
		return axios.post(url, body);
	},

	updateSadhanaSheet: (uuid, body) => {
		let url = serverAddress + `/api/sadhana/${uuid}/update`;
		return axios.post(url, body);
	},

	getSadhanaById: body => {
		let url = serverAddress + '/api/sadhana/getSadhanaById';
		return axios.post(url, body);
	},

	detectLanguage: body => {
		let url = serverAddress + '/api/sadhana/checkLanguage';
		return axios.post(url, body);
	},
};

export default utils;
