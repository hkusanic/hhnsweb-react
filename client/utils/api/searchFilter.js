import axios from 'axios';
import serverAddress from './config';

const utils = {
	getEvents: () => {
		let url = serverAddress + `/api/event/`;
		return axios.get(url);
	},

	getLocations: () => {
		let url = serverAddress + `/api/location/`;
		return axios.get(url);
	},

	getTopics: () => {
		let url = serverAddress + `/api/topic/`;
		return axios.get(url);
	},

	getTranslations: () => {
		let url = serverAddress + '/api/translation/';
		return axios.get(url);
	},
};

export default utils;
