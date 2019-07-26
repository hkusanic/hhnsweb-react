import axios from 'axios';
import serverAddress from './config';

const utils = {
	getVideoList: body => {
		const page = body.page || '1';
		const title = body.title || '';
		const type = body.type || '';
		const location = body.location || '';
		const event = body.event || '';
		const year = body.year || '';
		const limit = body.limit || 20;
		let url = serverAddress + '/api/video?page='
        + page
			+ (year ? '&year=' + year : '')
			+ (location ? '&location=' + location : '')
			+ (event ? '&event=' + event : '')
			+ (title ? '&title=' + title : '')
			+ (type ? '&type=' + type : '')
			+ (limit ? '&limit=' + limit : ''); ;
		return axios.get(url);

	},

	getVideoById: body => {
		let url = serverAddress + '/api/video/getvideobyid/';
		return axios.post(url, body);
	},

	updateVideoPageViews: body => {
		let url = serverAddress + '/api/video/updatePageView';
		return axios.post(url, body);
	},
};

export default utils;
