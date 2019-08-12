import * as types from '../../constants/index';

const initialState = {
	blogs: [],
	currentPage: 1,
	totalBlogs: '',
	isCompleted: false,
	error: '',
	blog: null,
};

const blogReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.GET_BLOGS:
			const blogs = action.payload.blog;
			state = {
				...state,
				currentPage: blogs.currentPage,
				blogs: blogs.results,
				totalBlogs: blogs.total,
				isCompleted: true,
			};
			break;
		case types.GET_BLOG:
			const data = action.payload;
			state = {
				...state,
				appointmentData: data,
				error: '',
			};
			break;
		case types.GET_BLOG_BY_UUID:
			state = {
				...state,
				blog: action.payload.blog,
			};
			break;
	}
	return state;
};

export default blogReducer;
