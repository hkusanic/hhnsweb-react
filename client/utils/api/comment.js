import axios from 'axios';
import serverAddress from './config';

const utils = {
	createComment: (body) => {
		let url = serverAddress + '/api/comment/create/';
		return axios.post(url, body);
	},

	createReply: (body) => {
		let url = serverAddress + '/api/replies/create/';
		return axios.post(url, body);
	},

	getComments: (uuid) => {
		const lecture_uuid = uuid.lecture_uuid;
		let url = serverAddress + '/api/comment/?uuid=' + lecture_uuid;
		return axios.get(url);
	},

	getReplies: (uuid) => {
		const comment_uuid = uuid.comment_uuid;
		let url = serverAddress + '/api/replies/?uuid=' + comment_uuid;
		return axios.get(url);
	},

	deleteComment: (uuid) => {
		let url = serverAddress + '/api/comment/' + uuid + '/remove';
		return axios.post(url);
	},

	deleteReply: (uuid) => {
		let url = serverAddress + '/api/replies/' + uuid + '/remove';
		return axios.post(url);
	},
	deleteReplyByCommentId: (uuid) => {
		let url = serverAddress + '/api/replies/' + uuid + '/removeByCommentId';
		return axios.post(url);
	},
};

export default utils;
