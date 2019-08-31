import axios from 'axios';
import { EventTypes } from 'redux-segment'
// Exporting our actions
export const LOADING_RECIPES = 'LOADING_RECIPES';
export const GET_RECIPES = 'GET_RECIPES';

// An action to check if the recipes are loaded accepts true or false
export function loadingRecipes (loading) {
	return {
		type: LOADING_RECIPES,
		payload: loading,
		// meta: {
    //   analytics: 
    //   {
    //     eventType: EventTypes.track,
    //     eventPayload: {
    //       event: "loading recipes",
    //       properties: {
    //          loading
    //       }
    //     }
    //   }
      
      	
      
    // },
	};
}

// This will get the recipes from the API
export function fetchRecipes (data) {
	return {
		type: GET_RECIPES,
		payload: data,
		// meta: {
    //   analytics: 
    //   {
    //     eventType: EventTypes.track,
    //     eventPayload: {
    //       event: "fetch recipes",
    //       properties: {
    //         data
    //       }
    //     }
    //   }
      
      
    // },
	};
}

// This is a redux thunk that will fetch our model data
export function recipesFetchData (url) {
	return (dispatch) => {
		const request = axios.get(url);
		request.then((response) => {
			dispatch(loadingRecipes(false));
			dispatch(fetchRecipes(response.data.recipe));
		});
	};
}
