import axios from "axios";
import serverAddress from "./config";

const utils = {
	getContents: () => {
		let url = serverAddress + "/api/content/getLimitedList";
		return axios.get(url);
	}
};

export default utils;
