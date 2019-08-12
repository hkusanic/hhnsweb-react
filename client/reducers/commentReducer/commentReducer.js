import * as types from '../../constants/index';

const initialState = {
	comments: [],
	replies: [],
	isCommentSubmited: false,
	error: '',
	isCommentDeleted: false,
	isReplyDeleted: false,
};

const commentReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.GET_COMMENTS:
			state = {
				...state,
				isCommentSubmited: false,
				isCommentDeleted: false,
				isReplyDeleted: false,
				comments: action.payload.data.comment,
			};
			break;

		case types.GET_REPLIES:
			state = {
				...state,
				isCommentSubmited: false,
				isCommentDeleted: false,
				isReplyDeleted: false,
				replies: action.payload.data.replies,
			};
			break;
		case types.CREATE_COMMENT:
			let isCommentSubmited = false;

			if (action.payload.data.Comment) {
				isCommentSubmited = true;
			}
			state = {
				...state,
				isCommentSubmited,
				isCommentDeleted: false,
				isReplyDeleted: false,
			};
			break;
		case types.CREATE_REPLIES:
			state = {
				...state,
				isCommentDeleted: false,
				isReplyDeleted: false,
			};
			break;
		case types.DELETE_COMMENT:
			const isCommentDeleted = action.payload.data.Comment;
			state = {
				...state,
				isCommentDeleted,
			};
			break;
		case types.DELETE_REPLY:
			const isReplyDeleted = action.payload.data.Reply;

			state = {
				...state,
				isReplyDeleted,
			};
			break;
		case 'RESET_STATE':
			state = {
				...state,
				comments: [],
				replies: [],
				isCompleted: false,
				isCommentDeleted: false,
				isReplyDeleted: false,
				error: '',
			};
	}
	return state;
};

export default commentReducer;
