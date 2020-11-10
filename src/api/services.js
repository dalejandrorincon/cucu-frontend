import {api} from './api';

export const createService = (token, payload) => {
  const URL = `/translation_services/`;
  console.log(payload)
  return api(URL, {
    method: 'POST',
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

export const getServices = (type, token, payload) => {
  console.log(type)
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

export const getService = (id, token) => {
  const URL = `/translation_services/`+id;
  return api(URL, {
    method: 'GET',
    headers: {
      'content-type': 'application/json', // whatever you want
      'Authorization': token
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


export const payService = (token, id) => {
  const URL = `/translation_services/pay/`+id;
  return api(URL, {
    method: 'PUT',
    headers: {
      'content-type': 'application/json', // whatever you want
      'Authorization': token
    }
  })
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
};

export const acceptService = (token, id) => {
  const URL = `/translation_services/accept/`+id;
  return api(URL, {
    method: 'PUT',
    headers: {
      'content-type': 'application/json', // whatever you want
      'Authorization': token
    }
  })
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
};

export const finishService = (token, id) => {
  const URL = `/translation_services/finish/`+id;
  return api(URL, {
    method: 'PUT',
    headers: {
      'content-type': 'application/json', // whatever you want
      'Authorization': token
    }
  })
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
};

export const rateService = (token, id) => {
  const URL = `/translation_services/rate/`+id;
  return api(URL, {
    method: 'PUT',
    headers: {
      'content-type': 'application/json', // whatever you want
      'Authorization': token
    }
  })
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
};



export const saveFile = (file) => {
  const URL = `/translation_services/file`;
  console.log(file)

  var formdata = new FormData();
  formdata.append("files", file);

  return api(URL, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    data: formdata
    
  })
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
};