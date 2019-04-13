import axios from 'axios';
import serverAddress from './config';

const utils = {
	createAppointment: (body) => {
		let url = serverAddress + `/api/appointment/create`;
		return axios.post(url, body);
	},
	getAppointment: (parameter) => {
		let url = serverAddress + `/api/appointment/` + parameter;
		return axios.get(url);
	},
	getBookingStatus: (email) => {
		let url = serverAddress + `/api/booking/${email}`;
		return axios.get(url);
	},
};

export default utils;
