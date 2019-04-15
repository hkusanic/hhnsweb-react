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

	getStaticGalleryList: () => {
		let url = serverAddress + '/api/gallery/getStaticGallery';
		return axios.get(url);
	},

	getSubGalleryByGallery: body => {
		let url = serverAddress + '/api/gallery/getGalleryByGallery/';
		return axios.post(url, body);
	},
};

export default utils;
