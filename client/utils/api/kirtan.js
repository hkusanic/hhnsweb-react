import axios from 'axios';
import serverAddress from './config';

const utils = {
	searchKirtan: body => {
		const page = body.page || '1';
		const title = body.title || '';
		const author = body.author || '';
		const translation = body.translation || '';
		const location = body.location || '';
		const topic = body.topic || '';
		const event = body.event || '';
		const year = body.year || '';
		const video = body.video || false;
		let url
			= serverAddress
			+ '/api/kirtan/?page='
			+ page
			+ (year ? '&year=' + year : '')
			+ (location ? '&location=' + location : '')
			+ (event ? '&event=' + event : '')
			+ (title ? '&title=' + title : '')
			+ (topic ? '&topic=' + topic : '')
			+ (author ? '&author=' + author : '')
			+ (translation ? '&translation=' + translation : '')
			+ (video ? '&video=' + video : '');

		return axios.get(url);
	},
};

export default utils;
