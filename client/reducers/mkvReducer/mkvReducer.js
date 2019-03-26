import * as types from "../../constants/index";

const initialState = {
	mkv: [],
	isCompleted: false,
	error: ""
};

const mkvReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.GET_MKV:
			const data = action.payload.data.mkv;
				state = {
                    ...state,
                    mkv: data.results,
                    isCompleted: true
				};
			break;
	}
	return state;
};

export default mkvReducer;
