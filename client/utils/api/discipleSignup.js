import axios from "axios";
import serverAddress from "./config";

const utils = {
	uploadPicture: () => {
		let url = serverAddress + "/api/gallery/";
		return axios.get(url);
	},
	discipleSignup: body => {
		let url = serverAddress + "api/userVerify/";
		return axios.post(url, body);
	}
};
export default utils;
