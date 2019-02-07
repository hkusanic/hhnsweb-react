import axios from 'axios';
import serverAddress from './config';

const utils = {
    createAppointment : (body) => {
        let url = serverAddress + `/api/appointment/create`;
        return axios.post(url, body);
    }
}

export default utils;