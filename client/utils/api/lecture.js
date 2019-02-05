import axios from 'axios';
import serverAddress from './config';


const utils = {
    getlectures : (pageNumber) => {
        const page = pageNumber || 1;
        let url = serverAddress + `/api/lecture?page=${page}`;
        return axios.get(url);
    }
}

export default utils;