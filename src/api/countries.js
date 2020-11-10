import axios from 'axios';
import {api} from './api';

export const getCountries = (payload) => {
  const URL = `/countries/`;
  console.log(payload)
  return api(URL, {
    method: 'GET',
    headers: {
      'content-type': 'application/json', // whatever you want
    },
    params:{
      ...payload
    }
  })
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
};