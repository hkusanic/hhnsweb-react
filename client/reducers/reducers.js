import { combineReducers } from "redux";
import getRecipes from "./recipe_actions/get_recipes.js";
import loadingRecipes from "./recipe_actions/loading_recipes.js";
import loginReducer from "./login_reducer/loginReducer";
import blogReducer from "./blogReducer/blogReducer";
import lectureReducer from "./lectureReducer/lectureReducer";
import appointmentReducer from "./appointmentReducer/appointmentReducer";
import appointmentListingReducer from "./appointmentReducer/appointmentListReducer";
import searchFilterReducer from "./searchFilter/searchFilter";
import kirtanReducer from "./kirtanReducer/kirtanReducer";
import { routerReducer } from "react-router-redux";

const reducers = combineReducers({
	recipes: getRecipes,
	loadRecipes: loadingRecipes,
	loginReducer: loginReducer,
	blogReducer: blogReducer,
	lectureReducer: lectureReducer,
	appointmentReducer: appointmentReducer,
	appointmentListingReducer: appointmentListingReducer,
	searchFilterReducer: searchFilterReducer,
	kirtanReducer: kirtanReducer,
	routing: routerReducer
});

export default reducers;
