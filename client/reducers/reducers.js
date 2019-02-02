import { combineReducers } from 'redux';
import getRecipes from './recipe_actions/get_recipes.js';
import loadingRecipes from './recipe_actions/loading_recipes.js';
import loginReducer from './login_reducer/loginReducer';
import blogReducer from './blogReducer/blogReducer';

import { routerReducer } from 'react-router-redux';


const reducers = combineReducers({
	recipes: getRecipes,
	loadRecipes: loadingRecipes,
	loginReducer: loginReducer,
	blogReducer: blogReducer,
	routing: routerReducer
});

export default reducers;
