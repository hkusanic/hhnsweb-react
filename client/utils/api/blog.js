import axios from 'axios';
import serverAddress from './config';


const utils = {
    getBlogs : (pageNumber) => {
        const page = pageNumber || 1;
        let url = serverAddress + `/api/blog?page=${page}`;
        return axios.get(url);
    }
}

export default utils;