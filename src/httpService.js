import axios from 'axios';
import LocalStorageService from 'lib/LocalStorageService';
import { useNavigate } from 'react-router-dom';

// const getAuthorizationCode = oauth.client(axios.create(), {
//   url: 'http://localhost:8000/oauth/authorize',
//   grant_type: 'authorization_code',
//   client_id: 'B3xQUcXbzlcHEMWKp4tQo2QmquudSgKUvz1tyvTvbxw',
//   client_secret: '',
//   redirect_uri: 'http://localhost:3000/goplan-web/callback',
//   code: '...',
//   scope: '',
// });

// LocalstorageService
const localStorageService = LocalStorageService.getService();

const baseURL = (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') ? 'http://localhost:8000/' : 'https://goplan-api.herokuapp.com/';

// Add a request interceptor
axios.interceptors.request.use(
  function (config) {
    config.baseURL = baseURL;
    const token = localStorageService.getAccessToken();
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token;
    }
    config.headers['Content-Type'] = 'application/json';
    return config;
  },
  function (error) {
    return Promise.reject(error);
  });

//Add a response interceptor
axios.interceptors.response.use(
  function (response) {
    return response;
  }, function (error) {
    const originalRequest = error.config;

    if (error.response.status === 401 && originalRequest.url === `${baseURL}/auth/token`) {
      const navigate = useNavigate();
      navigate("/oauth/authorize");
      return Promise.reject(error);
    }

    if (error.response.status === 401 && !originalRequest._retry) {

      originalRequest._retry = true;
      const refreshToken = localStorageService.getRefreshToken();
      return axios.post('/oauth/token',
        {
          "refresh_token": refreshToken
        })
        .then(res => {
          if (res.status === 201) {
            localStorageService.setToken(res.data);
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorageService.getAccessToken();
            return axios(originalRequest);
          }
        })
    }
    return Promise.reject(error);
  });

const httpService = {
  get: axios.get,
  post: axios.post,
  delete: axios.delete,
  put: axios.put,
  patch: axios.patch
};

export default httpService;