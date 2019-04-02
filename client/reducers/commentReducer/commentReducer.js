import * as types from '../../constants/index';

const initialState = {
	comments: [],
	replies: [],
	isCommentSubmitedd: false,
	error: '',
};

const commentReducer = (state = initialState, action) => {
	console.log('action ====>>>', action);
	switch (action.type) {
		case types.GET_COMMENTS:
			state = {
				...state,
				comments: action.payload.data.comment,
			};
			break;

		case types.GET_REPLIES:
			state = {
				...state,
				replies: action.payload.data.replies,
			};
			break;
		case types.CREATE_COMMENT:
			let isCommentSubmitedd = false;

			if (action.payload.data.Comment) {
				isCommentSubmitedd = true;
			}
			state = {
				...state,
				isCommentSubmitedd,
			};
			break;
		case types.CREATE_REPLIES:
			state = {
				...state,
			};
			break;
		case 'reset_state':
			state = {
				...state,
				comments: [],
				replies: [],
				isCompleted: false,
				error: '',
			};
	}
	return state;
};

export default commentReducer;
