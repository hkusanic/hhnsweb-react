import blogApi from '../utils/api/blog';
import * as types from '../constants/index';

export function getBlogs(page) {
    return (dispatch) => {
        blogApi.getBlogs(page)
            .then((response) => {
                dispatch(getBlogAction(response.data))
            })
            .catch((err) => {
                console.log(err);
            })
    }
}

export function getBlogAction(data) {
    return {
        type: types.GET_BLOGS,
        payload: data
    }
}