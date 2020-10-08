import axios from 'axios';
import {api} from './api';

export const getServices = (type, token, payload) => {
  const URL = `/translation_services/`+type;
  console.log(payload)
  return api(URL, {
    method: 'GET',
    headers: {
      'content-type': 'application/json', // whatever you want
      'Authorization': token
    },
    params: {
        ...payload
    }
  })
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
};

export const rejectService = (token, id, payload) => {
  const URL = `/translation_services/reject/`+id;
  return api(URL, {
    method: 'PUT',
    headers: {
      'content-type': 'application/json', // whatever you want
      'Authorization': token
    },
    data: {
        ...payload
    }
  })
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
};

export const cancelService = (token, id, payload) => {
  const URL = `/translation_services/cancel/`+id;
  return api(URL, {
    method: 'PUT',
    headers: {
      'content-type': 'application/json', // whatever you want
      'Authorization': token
    },
    data: {
        ...payload
    }
  })
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
};