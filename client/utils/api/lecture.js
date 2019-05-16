import axios from 'axios';
import serverAddress from './config';

const utils = {
	searchLecture: body => {
		const page = body.page || '1';
		const title = body.title || '';
		const songs = body.songs || '';
		const chapter = body.chapter || '';
		const verse = body.verse || '';
		const author = body.author || '';
		const translation = body.translation || '';
		const location = body.location || '';
		const topic = body.topic || '';
		const event = body.event || '';
		const year = body.year || '';
		const transcriptions = body.transcriptions || false;
		const summaries = body.summaries || false;
		const video = body.video || false;
		let url
			= serverAddress
			+ '/api/lecture?page='
			+ page
			+ (year ? '&year=' + year : '')
			+ (location ? '&location=' + location : '')
			+ (event ? '&event=' + event : '')
			+ (title ? '&title=' + title : '')
			+ (verse ? '&verse=' + verse : '')
			+ (topic ? '&topic=' + topic : '')
			+ (transcriptions ? '&transcriptions=' + transcriptions : '')
			+ (summaries ? '&summaries=' + summaries : '')
			+ (songs ? '&songs=' + songs : '')
			+ (chapter ? '&chapter=' + chapter : '')
			+ (author ? '&author=' + author : '')
			+ (translation ? '&translation=' + translation : '')
			+ (video ? '&video=' + video : '');

		return axios.get(url);
	},

	updateCounters: body => {
		let url = serverAddress + '/api/lecture/updateCounters';
		return axios.post(url, body);
	},

	fetchLecture: body => {
		let url = serverAddress + '/api/lecture/getlecturebyid/';
		return axios.post(url, body);
	},
};

export default utils;
