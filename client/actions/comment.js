import commetsApi from '../utils/api/comment';
import * as types from '../constants/index';
import { EventTypes } from 'redux-segment';


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
			})
			.catch(err => {
				console.error(err);
			});
	};
}

export function createCommet (body) {
	return dispatch => {
		commetsApi
			.createComment(body)
			.then(response => {
				dispatch(createCommentAction(response));
			})
			.catch(err => {
				console.error(err);
			});
	};
}

export function createReply (body) {
	return dispatch => {
		commetsApi
			.createReply(body)
			.then(response => {
				dispatch(createReplyAction(response));
			})
			.catch(err => {
				console.error(err);
			});
	};
}

export function deleteComment (uuid) {
	return dispatch => {
		commetsApi.deleteComment(uuid)
			.then(response => {
				dispatch(deleteCommentAction(response));
			})
			.catch(err => {
				console.error(err);
			});
	};
}

export function deleteReply (uuid) {
	return dispatch => {
		commetsApi.deleteReply(uuid)
			.then(response => {
				dispatch();
			})
			.catch(err => {
				console.log(err);
			});
	};
}

export function getCommentsAction (data) {
	return {
		type: types.GET_COMMENTS,
		payload: data,
	// 	meta: {
    //   analytics: 
    //   {
    //     eventType: EventTypes.track,
    //     eventPayload: {
    //       event: "get comments",
    //       properties: {
    //         data
    //       }
    //     }
    //   }
    // },
	};
}

export function getRepliesAction (data) {
	return {
		type: types.GET_REPLIES,
		payload: data,
	// 	meta: {
    //   analytics: 
    //   {
    //     eventType: EventTypes.track,
    //     eventPayload: {
    //       event: "get replies",
    //       properties: {
    //         data
    //       }
    //     }
    //   }
    // },
	};
}

export function createCommentAction (data) {
	return {
		type: types.CREATE_COMMENT,
		payload: data,
	// 	meta: {
    //   analytics: 
    //   {
    //     eventType: EventTypes.track,
    //     eventPayload: {
    //       event: "creating comment",
    //       properties: {
    //         data
    //       }
    //     }
    //   }
    // },
	};
}

export function createReplyAction (data) {
	return {
		type: types.CREATE_REPLIES,
		payload: data,
	// 	meta: {
    //   analytics: 
    //   {
    //     eventType: EventTypes.track,
    //     eventPayload: {
    //       event: "creating replies",
    //       properties: {
    //         data
    //       }
    //     }
    //   }
    // },
	};
}

export function deleteCommentAction (data) {
	return {
		type: types.DELETE_COMMENT,
		payload: data,
	// 	meta: {
    //   analytics: 
    //   {
    //     eventType: EventTypes.track,
    //     eventPayload: {
    //       event: "deleting comment",
    //       properties: {
    //         data
    //       }
    //     }
    //   }
    // },
	};
}

export function deleteReplyAction (data) {
	return {
		type: types.DELETE_REPLY,
		payload: data,
	// 	meta: {
    //   analytics: 
    //   {
    //     eventType: EventTypes.track,
    //     eventPayload: {
    //       event: "deleting reply",
    //       properties: {
    //         data
    //       }
    //     }
    //   }
    // },
	};
}

export function resetState () {
	return {
		type: 'RESET_STATE',
	};
}
