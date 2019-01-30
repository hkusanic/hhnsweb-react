import { combineReducers } from 'redux';
import getRecipes from './recipe_actions/get_recipes.js';
import loadingRecipes from './recipe_actions/loading_recipes.js';
import loginReducer from './login_reducer/loginReducer';

import { routerReducer } from 'react-router-redux';


const reducers = combineReducers({
	recipes: getRecipes,
	loadRecipes: loadingRecipes,
	loginReducer: loginReducer,
	routing: routerReducer
});

export default reducers;
