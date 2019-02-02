import * as types from '../../constants/index';

const initialState = {
    blogs: [],
    currentPage: 1,
    totalBlogs: '',
    isCompleted: false,
    error: ''
}

const blogReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_BLOGS:
            const blogs = action.payload.blog;
            state = {
                ...state,
                currentPage: blogs.currentPage,
                blogs: blogs.results,
                totalBlogs: blogs.total,
                isCompleted: true
            }
            break;
    }
    return state
}

export default blogReducer;