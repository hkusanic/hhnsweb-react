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
	},

	signup: (body) => {
		let url = serverAddress + '/api/signup/';
		return axios.post(url, body);
	},

	forgotPassword: (email) => {
		let url = serverAddress + '/apiu/forgotpassword/';
		return axios.post(url, email);
	}
}

export default utils;
