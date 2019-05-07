import blogApi from '../utils/api/blog';
import * as types from '../constants/index';

export function getBlogs (page) {
	return (dispatch) => {
		blogApi.getBlogs(page)
			.then((response) => {
				dispatch(getBlogAction(response.data));
			})
			.catch((err) => {
				console.error(err);
			});
	};
}

export function getBlogAction (data) {
	return {
		type: types.GET_BLOGS,
		payload: data,
	};
}

export function getBlog (body) {
	return (dispatch) => {
		blogApi.getBlog(body)
			.then((response) => {
				dispatch(getAction(response.data));
			})
			.catch((err) => {
				console.error(err);
			});
	};
}

export function getBlogByUuid (body) {
	return (dispatch) => {
		blogApi.fetchBlog(body)
			.then((response) => {
				dispatch(fetchBlogByUuid(response));
			})
			.catch((err) => {
				console.log(err);
			});
	};
}

export function getAction (data) {
	return {
		type: types.GET_BLOG,
		payload: data,
	};
}

export function fetchBlogByUuid (data) {
	return {
		type: types.GET_BLOG_BY_UUID,
		payload: {
			blog: data.data.blog,
		},
	};
};
