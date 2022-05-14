import axios from 'axios';    

// Add a request interceptor
axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    // config.headers.Authorization = `Bearer ${your_token}`;
    // config.baseURL = 'http://localhost:3001/';

    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

const httpService = {
  get: axios.get,
  post: axios.put,
  delete: axios.delete,
  patch: axios.patch
};

export default httpService;