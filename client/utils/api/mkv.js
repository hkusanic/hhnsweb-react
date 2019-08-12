import axios from 'axios';
import serverAddress from './config';

const utils = {
	getMkv: body => {
		const year = body.year || '';
		let url
			= serverAddress
			+ '/api/mkv?'
			+ (year ? '&year=' + year : '');

		return axios.get(url);
	},
};

export default utils;
