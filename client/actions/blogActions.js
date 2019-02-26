import blogApi from '../utils/api/blog';
import * as types from '../constants/index';

export function getBlogs(page) {
    return (dispatch) => {
        blogApi.getBlogs(page)
            .then((response) => {
                dispatch(getBlogAction(response.data))
            })
            .catch((err) => { console.error(err); });
    }
}

export function getBlogAction(data) {
    return {
        type: types.GET_BLOGS,
        payload: data
    }
}

export function getBlog(body) {
    return (dispatch) => {
        blogApi.getBlog(body)
            .then((response) => {
                dispatch(getAction(response.data))
            })
            .catch((err) => { console.error(err); });
    }
}

export function getAction(data) {
    return {
        type: types.GET_BLOG,
        payload: data
    }
}
