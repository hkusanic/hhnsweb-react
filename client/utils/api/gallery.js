import axios from 'axios';
import serverAddress from './config';

const utils = {
	getGalleries: () => {
		let url = serverAddress + '/api/gallery/';
		return axios.get(url);
	},

	createGsllery: body => {
		let url = serverAddress + '/api/gallery/create/';
		return axios.post(url, body);
	},

	removeGallery: uuid => {
		let url = serverAddress + '/api/gallery/:' + { uuid } + '/remove';
		return axios.post(url);
	},
};

export default utils;
