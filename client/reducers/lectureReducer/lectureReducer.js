import * as types from '../../constants/index';

const initialState = {
    lectures: [],
    currentPage: 1,
    totalLectures: '',
    isCompleted: false,
    error: ''
}

const lectureReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_LECTURES:
            const lectures = action.payload.lecture;
            state = {
                ...state,
                currentPage: lectures.currentPage,
                lectures: lectures.results,
                totalLectures: lectures.total,
                isCompleted: true
            }
            break;
    }
    return state
}

export default lectureReducer;
