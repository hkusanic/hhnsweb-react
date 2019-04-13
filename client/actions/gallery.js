import galleryApi from '../utils/api/gallery';
import * as types from '../constants/index';

export function getGalleries () {
	return dispatch => {
		galleryApi
			.getGalleries()
			.then(response => {
				dispatch(getGalleriesAction(response));
			})
			.catch(err => {
				console.error(err);
			});
	};
}

export function getGalleriesAction (data) {
	return {
		type: types.GET_GALLERY,
		payload: data,
	};
}
