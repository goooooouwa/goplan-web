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

const APIServiceBaseURL = (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') ? 'http://localhost:8000/' : 'https://goplan-api.herokuapp.com/';

// Add a request interceptor
axios.interceptors.request.use(
  function (config) {
    config.baseURL = APIServiceBaseURL;
    const accessToken = localStorage.getItem("access_token");
    if (accessToken) {
      config.headers['Authorization'] = 'Bearer ' + accessToken;
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

    // request new access token with refresh token
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem("refresh_token");
      return axios.post('/oauth/token', {
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
        client_id: 'B3xQUcXbzlcHEMWKp4tQo2QmquudSgKUvz1tyvTvbxw',
      })
        .then(res => {
          if (res.status === 201) {
            localStorage.setItem("access_token", res.data.access_token);
            localStorage.setItem("refresh_token", res.data.refresh_token);
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem("access_token");
            return axios(originalRequest);
          }
        })
    }

    if (error.response.status === 401) {
      window.location.href = `${APIServiceBaseURL}/oauth/authorize?client_id=B3xQUcXbzlcHEMWKp4tQo2QmquudSgKUvz1tyvTvbxw&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fcallback&response_type=code&scope=`;
      return Promise.reject(error);
    }

    return Promise.reject(error);
  });

  const requestAccessTokenWithAuthorizationCode = await (authorizationCode) => {
    axios.post('/oauth/token', {
      grant_type: 'authorization_code',
      client_id: 'B3xQUcXbzlcHEMWKp4tQo2QmquudSgKUvz1tyvTvbxw',
      redirect_uri: 'http://localhost:3000/callback',
      code: authorizationCode,
    })
      .then((response) => {
        localStorage.setItem("access_token", response.data.access_token);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const requestAccessTokenWithRefreshCode = await (refreshToken) => {
      axios.post('/oauth/token', {
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
        client_id: 'B3xQUcXbzlcHEMWKp4tQo2QmquudSgKUvz1tyvTvbxw',
      })
        .then(res => {
          if (res.status === 201) {
            localStorage.setItem("access_token", res.data.access_token);
            localStorage.setItem("refresh_token", res.data.refresh_token);
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem("access_token");
          }
        })
  };

const httpService = {
  get: axios.get,
  post: axios.post,
  delete: axios.delete,
  put: axios.put,
  patch: axios.patch,
  requestAccessTokenWithAuthorizationCode: requestAccessTokenWithAuthorizationCode,
  requestAccessTokenWithRefreshCode: requestAccessTokenWithRefreshCode,
};

export default httpService;