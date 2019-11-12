import * as types from '../../constants/index';

const initialState = {
	sadhanaList: [],
	isCompleted: false,
	isCreated: false,
	isUpdated: false,
	error: '',
	totalSadhanaSheet: '',
	currentPage: 1,
	singleSadhanaSheet: '',
	noMoreSadhanaSheet: false,
	isDetectedLanguageCorrect: null,
	isEnglishDominantLanguage: null,
};

const sadhanaReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.GET_SADHANA_LIST:
			const data = action.payload.data.sadhana;
			state = {
				...state,
				sadhanaList: data.results,
				totalSadhanaSheet: data.total,
				isCompleted: true,
				isCreated: false,
				isUpdated: false,
				noMoreSadhanaSheet: false,
				currentPage: data.currentPage,
				singleSadhanaSheet: '',
			};
			break;

		case types.CREATE_SADHANA_SHEET:
			const result = action.payload.data.isCreated;
			state = {
				...state,
				isCreated: result ? true : false,
				isCompleted: true,
				isUpdated: false,
				noMoreSadhanaSheet: false,
				isDetectedLanguageCorrect: null,
				isEnglishDominantLanguage: null,
			};
			break;

		case types.CREATE_SADHANA_SHEET_ERROR:
			state = {
				...state,
				isDetectedLanguageCorrect: null,
				isEnglishDominantLanguage: null,
				isCreated: false,
			};
			break;

		case types.UPDATE_SADHANA_SHEET:
			const updateResult = action.payload.data.isUpdated;
			state = {
				...state,
				isUpdated: updateResult ? true : false,
				isCompleted: false,
				noMoreSadhanaSheet: false,
			};
			break;

		case types.GET_SADHANA_BY_ID:
			const getResult = action.payload.data.sadhana;
			state = {
				...state,
				singleSadhanaSheet: getResult,
				noMoreSadhanaSheet: false,
			};
			break;

		case types.GET_SINGLE_SHEET_BY_DATE_USER:
			state = {
				...state,
				singleSadhanaSheet: action.payload,
				noMoreSadhanaSheet: true,
			};
			break;

		case types.DETECT_LANGUAGE:
			const detectedArray = action.payload.data.data.language;
			let isDetectedLanguageCorrect = null;
			let isEnglishDominantLanguage = null;
			if (detectedArray[0].language === detectedArray[1].language) {
				isDetectedLanguageCorrect = true;
				if (detectedArray[0].language === 'en') {
					isEnglishDominantLanguage = true;
				}
				if (detectedArray[0].language === 'ru') {
					isEnglishDominantLanguage = false;
				}
			} else {
				isDetectedLanguageCorrect = false;
			}
			state = {
				...state,
				isDetectedLanguageCorrect,
				isEnglishDominantLanguage,
			};
			break;

		default:
			return state;
	}
	return state;
};

export default sadhanaReducer;
