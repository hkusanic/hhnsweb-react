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

export function getStaticGalleryList () {
	return dispatch => {
		galleryApi
			.getStaticGalleryList()
			.then(response => {
				dispatch(getStaticGalleryListAction(response));
			})
			.catch(err => {
				console.log(err);
			});
	};
}

export function getSubGalleryByGallery (body) {
	return dispatch => {
		galleryApi
			.getSubGalleryByGallery(body)
			.then(response => {
				dispatch(getSubGalleryByGalleryAction(response));
			})
			.catch(err => {
				console.log(err);
			});
	};
}

export function getGalleriesAction (data) {
	return {
		type: types.GET_GALLERY,
		payload: data,
	};
}

export function getStaticGalleryListAction (data) {
	return {
		type: types.GET_STATIC_GALLERY,
		payload: data,
	};
}

export function getSubGalleryByGalleryAction (data) {
	return {
		type: types.GET_SUB_GALLERY,
		payload: data,
	};
}
