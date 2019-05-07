import axios from 'axios';
import serverAddress from './config';


const utils = {
	getBlogs: (pageNumber) => {
		const page = pageNumber || 1;
		let url = serverAddress + `/api/blog?page=${page}`;
		return axios.get(url);
	},
	getBlog: (body) => {
		let url = serverAddress + `/api/blog/find/`;
		return axios.post(url, body);
	},
	fetchBlog: (body) => {
		let url = serverAddress + `/api/blog/getblogbyid/`;
		return axios.post(url, body);
	},
};

export default utils;
