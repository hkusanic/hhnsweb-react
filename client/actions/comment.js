import commetsApi from '../utils/api/comment';
import * as types from '../constants/index';

export function getComments (uuid) {
	return dispatch => {
		commetsApi
			.getComments(uuid)
			.then(response => {
				dispatch(getCommentsAction(response));
			})
			.catch(err => {
				console.error(err);
			});
	};
}

export function getReplies (uuid) {
	return dispatch => {
		commetsApi
			.getReplies(uuid)
			.then(response => {
				dispatch(getRepliesAction(response));
			});
	};
}

export function createCommet (body) {
	return dispatch => {
		commetsApi
			.createComment(body)
			.then(response => {
				dispatch(createCommentAction(response));
			});
	};
}

export function createReply (body) {
	return dispatch => {
		commetsApi
			.createReply(body)
			.then(response => {
				dispatch(createReplyAction(response));
			});
	};
}

export function getCommentsAction (data) {
	return {
		type: types.GET_COMMENTS,
		payload: data,
	};
}

export function getRepliesAction (data) {
	return {
		type: types.GET_REPLIES,
		payload: data,
	};
}

export function createCommentAction (data) {
	return {
		type: types.CREATE_COMMENT,
		payload: data,
	};
}

export function createReplyAction (data) {
	return {
		type: types.CREATE_REPLIES,
		payload: data,
	};
}
