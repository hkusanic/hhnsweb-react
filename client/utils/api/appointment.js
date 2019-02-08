import axios from 'axios';
import serverAddress from './config';

const utils = {
    createAppointment : (body) => {
        let url = serverAddress + `/api/appointment/create`;
        return axios.post(url, body);
    },
    getAppointment : (parameter) => {
        console.log('------->',parameter);
        let url = serverAddress + `/api/appointment/` + parameter;
        return axios.get(url);
    }
}

export default utils;