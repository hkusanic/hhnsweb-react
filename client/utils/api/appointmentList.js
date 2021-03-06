import axios from 'axios';
import serverAddress from './config';

const utils = {
	getUserList: () => {
		let url = serverAddress + `/api/user/`;
		return axios.get(url);
	},

	getAppointmentList: () => {
		let url = serverAddress + `/api/appointment/`;
		return axios.get(url);
	},

	updateAppointment: (email, body) => {
		let url = serverAddress + `/api/appointment/${email}/update`;
		return axios.post(url, body);
	},
};

export default utils;
