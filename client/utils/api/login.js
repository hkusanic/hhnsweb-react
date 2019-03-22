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

	forgotPassword: (body) => {
		let url = serverAddress + '/api/forgotpassword/';
		return axios.post(url, body);
	},

	getUserByAccessId: (body) => {
		let url = serverAddress + '/api/getuserbyaccessid/';
		return axios.post(url, body);
	},

	resetPassword: (body) => {
		let url = serverAddress + '/api/resetpassword';
		return axios.post(url, body);
	},

	editProfile: (body) => {
		let url = serverAddress + '/api/editprofile/';
		return axios.post(url, body);
	},

	contactUs: (body) => {
		let url = serverAddress + '/api/contactus/';
		return axios.post(url, body);
	}
}

export default utils;
