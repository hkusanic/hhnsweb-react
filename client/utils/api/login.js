import axios from 'axios';
import serverAddress from './config';

const utils = {
	login: (credential) => {
		let url = serverAddress + '/api/signin/';
		return axios.post(url, credential);
	},

	logout: () => {
		let url = serverAddress + '/api/signout/';
		return axios.post(url);
	}
}

export default utils;
