import blogApi from '../utils/api/blog';
import * as types from '../constants/index';
import { EventLayer } from './event-layer'

const Analytics = new EventLayer();


function uuidv4() {
	return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
		var r = (Math.random() * 16) | 0;
		var v = c == "x" ? r : (r & 0x3) | 0x8;
		return v.toString(16);
	});
}

export function getBlogs (page) {
	return (dispatch) => {
		blogApi.getBlogs(page)
			.then((response) => {
				dispatch(dispatchGetBlog(response.data));
			})
			.catch((err) => {
				console.error(err);
			});
	};
}

export function dispatchGetBlog (data) {
	return dispatch => {
		//alert("blog1");;
		Analytics.page("Blog", "Blog Page",{
			id : JSON.parse(localStorage.getItem("user")).user_id,

		}).then((res) => {
			//alert("blog");
			Analytics.track(JSON.parse(localStorage.getItem("user")).user_id, {
				id : JSON.parse(localStorage.getItem("user")).user_id,
				name : "All Blogs",
				data : {
					id : JSON.parse(localStorage.getItem("user")).user_id,
					name : "All Blogs",
				},

			}).then((res2) => {
				dispatch(getBlogAction(data));

			}).catch( err => console.log(err));
		}).catch ( err => console.log(err));
	};	
}

export function getBlogAction (data) {
	//alert('blogs');
	console.log(data);
	return {
		type: types.GET_BLOGS,
		payload: data,
	// 	meta: {
    //   analytics: 
    //   {
    //     eventType: EventTypes.track,
    //     eventPayload: {
    //       event: "all blogs",
    //        properties: {
    //         data:data,
    //         userId:JSON.parse(localStorage.getItem("user")).user_id,
    //         user: JSON.parse(localStorage.getItem("user")),


    //       }
    //     }
    //   }
    // },
	};
}

export function getBlog (body) {
	return (dispatch) => {
		blogApi.getBlog(body)
			.then((response) => {
				dispatch(dispatchGetAction(response.data));
			})
			.catch((err) => {
				console.error(err);
			});
	};
}

export function getBlogByUuid (body) {
	return (dispatch) => {
		blogApi.fetchBlog(body)
			.then((response) => {
				dispatch(dispatchFetchBlogUuid(response));
			})
			.catch((err) => {
				console.log(err);
			});
	};
}

export function dispatchGetAction (data) {
	alert("1");
	return dispatch => {
		//alert("blog1");;
		Analytics.page("Blog", "Blog Action",{
			id : JSON.parse(localStorage.getItem("user")).user_id,

		}).then((res) => {
			//alert("blog");
			Analytics.track(JSON.parse(localStorage.getItem("user")).user_id, {
				id : JSON.parse(localStorage.getItem("user")).user_id,
				name : "Blog Action",
				data : {
					id : JSON.parse(localStorage.getItem("user")).user_id,
					name : "Blog Action",
				},

			}).then((res2) => {
				dispatch(getAction(data));

			}).catch( err => console.log(err));
		}).catch ( err => console.log(err));
	};	
}

export function getAction (data) {
	return {
		type: types.GET_BLOG,
		payload: data,
	// 	meta: {
    //   analytics: 
    //   {
    //     eventType: EventTypes.track,
    //     eventPayload: {
    //       event: "get a blog",
    //       properties: {
    //         data:data,
    //         userId:JSON.parse(localStorage.getItem("user")).user_id,
    //         user: JSON.parse(localStorage.getItem("user")),


    //       }
    //     }
    //   }
    // },
	};
}

export function dispatchFetchBlogUuid (data) {
	alert('2');
	return dispatch => {
		//alert("blog1");;
		Analytics.page("Blog", "Fetch Blog By id",{
			id : JSON.parse(localStorage.getItem("user")).user_id,

		}).then((res) => {
			//alert("blog");
			Analytics.track(JSON.parse(localStorage.getItem("user")).user_id, {
				id : JSON.parse(localStorage.getItem("user")).user_id,
				name : "Fetch Blog By id",
				data : {
					id : JSON.parse(localStorage.getItem("user")).user_id,
					name : "Fetch Blog By id",
				},

			}).then((res2) => {
				dispatch(fetchBlogByUuid(data));

			}).catch( err => console.log(err));
		}).catch ( err => console.log(err));
	};	
}

export function fetchBlogByUuid (data) {
	return {
		type: types.GET_BLOG_BY_UUID,
		payload: {
			blog: data.data.blog,
		},
	// 	meta: {
    //   analytics: 
    //   {
    //     eventType: EventTypes.track,
    //     eventPayload: {
    //       event: "fetch blog by id",
    //       properties: {
    //         data:data,
    //         userId:JSON.parse(localStorage.getItem("user")).user_id,
    //         user: JSON.parse(localStorage.getItem("user")),


    //       }
    //     }
    //   }
    // },
	};
};
