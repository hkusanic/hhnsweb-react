import axios from 'axios';

const utils = { 
    login: (credential) => {
		let url = '';
		return axios.post(url, credential);
	},
}

export default utils;
