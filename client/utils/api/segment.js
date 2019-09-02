import axios from 'axios';
import serverAddress from './config';

const utils = {
	customerio : (event, Properties) => {
		if(event.process === 'identify'){
			console.log(Properties);
			let url = serverAddress + '/api/customerio/identify/';
			return axios.post(url, Properties);
		} else if ( event.process === 'pageview'){
			console.log(Properties);
			let url = serverAddress + '/api/customerio/pageview/';
			return axios.post(url, Properties);
		} else if ( event.process === 'track'){
			console.log(Properties);
			let url = serverAddress + '/api/customerio/track/';
			return axios.post(url, Properties);
		}
	},
	s3 : (event, Properties) => {
		if(event.process === 'identify'){
			console.log(Properties);
			//alert('here');
			let url = serverAddress + '/api/s3/identify/';
			return axios.post(url, Properties);
		} else if ( event.process === 'pageview'){
			console.log(Properties);
			let url = serverAddress + '/api/s3/pageview/';
			return axios.post(url, Properties);
		} else if ( event.process === 'track'){
			console.log(Properties);
			let url = serverAddress + '/api/s3/track/';
			return axios.post(url, Properties);
		}
	},	
};

export default utils;
