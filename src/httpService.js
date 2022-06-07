import axios from 'axios';

const APIServiceBaseURL = process.env.REACT_APP_API_SERVICE_BASE_URL;
const clientId = process.env.REACT_APP_CLIENT_ID;
const redirectURI = process.env.REACT_APP_REDIRECT_URI;
const scope = process.env.REACT_APP_SCOPE;

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
    if (error.response.status === 401 && !originalRequest._retry && localStorage.getItem("refresh_token") !== null) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem("refresh_token");
      return requestAccessTokenWithRefreshToken(refreshToken)
        .then(res => {
          if (res.status === 200) {
            localStorage.setItem("access_token", res.data.access_token);
            localStorage.setItem("refresh_token", res.data.refresh_token);
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem("access_token");
            return axios(originalRequest);
          }
        })
    }

    if (error.response.status === 401) {
      window.location.href = `${APIServiceBaseURL}/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectURI}&response_type=code&scope=${scope}`;
      return Promise.reject(error);
    }

    return Promise.reject(error);
  });

const requestAccessTokenWithAuthorizationCode = (authorizationCode) => {
  return axios.post('/oauth/token', {
    grant_type: 'authorization_code',
    client_id: clientId,
    redirect_uri: redirectURI,
    code: authorizationCode,
  });
};

const requestAccessTokenWithRefreshToken = (refreshToken) => {
  return axios.post('/oauth/token', {
    grant_type: 'refresh_token',
    refresh_token: refreshToken,
    client_id: clientId,
  });
};

const httpService = {
  get: axios.get,
  post: axios.post,
  delete: axios.delete,
  put: axios.put,
  patch: axios.patch,
  requestAccessTokenWithAuthorizationCode: requestAccessTokenWithAuthorizationCode,
  requestAccessTokenWithRefreshToken: requestAccessTokenWithRefreshToken,
};

export default httpService;