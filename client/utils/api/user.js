import axios from 'axios';
import serverAddress from './config';

const utils = {
	getUserDetails: (body) => {
		let url = serverAddress + '/api/user/getUserByUserId';
		return axios.post(url, body);

	},
};

export default utils;
