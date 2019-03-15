import axios from 'axios';
import serverAddress from './config';


const utils = {
    searchLecture: (body) => {
        const page = body.page || 1;
        const title = body.title || '';
        const songs = body.songs || '';
        const chapter = body.chapter || '';
        const verse = body.verse || ''; 
        const author = body.author || '';
        const translation = body.translation || ''; 
        const location = body.location || '';
        const topic = body.topic || '';
        const event = body.event || '';
        const year = body.year || '';

        let url = serverAddress + `/api/lecture?page=${page}${title ? '&title=' + title : ''}
                 ${songs ? '&songs=' + songs : ''}
                 ${chapter ? '&chapter=' + chapter : ''}
                 ${verse ? '&verse=' + verse : ''}
                 ${title ? '&title=' + title : ''}
                 ${author ? '&author=' + author : ''}
                 ${title ? '&title=' + title : ''}
                 ${translation ? '&translation=' + translation : ''}
                 ${location ? '&location=' + location : ''}
                 ${topic ? '&topic=' + topic : ''}
                 ${event ? '&event=' + event : ''}
                 ${year ? '&year=' + year : ''}`;
        return axios.get(url);
    }

}

export default utils;