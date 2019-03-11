import axios from 'axios';
import serverAddress from './config';


const utils = {
    getlectures : (body) => {
        const page = body.page || 1;
        const event = body.event || '';
        const topic = body.topic || '';
        const title = body.title || '';
       
        let url = serverAddress + `/api/lecture?page=${page}${event ? '&event=' + event : ''}${topic ? '&topic=' + topic : ''}${title ? '&title=' + title : ''}`;
        return axios.get(url);
    }
}

export default utils;