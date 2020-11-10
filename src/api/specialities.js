import axios from 'axios';
import { api } from './api';

export const getSpecialities = () => {
    const URL = `/specialities/`;
    return api(URL, {
        method: 'GET',
        headers: {
            'content-type': 'application/json'
        },
    })
    .then(response => response.data)
    .catch(error => {
        throw error;
    });
};