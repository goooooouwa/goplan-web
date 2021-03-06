import axios from 'axios';
import qs from 'qs';
import setupOfflineMode from './offlineService';

const APIServiceBaseURL = process.env.REACT_APP_API_SERVICE_BASE_URL;
const clientId = process.env.REACT_APP_CLIENT_ID;
const redirectURI = process.env.REACT_APP_REDIRECT_URI;
const scope = process.env.REACT_APP_SCOPE;

const offlineMode = localStorage.getItem("offlineMode");

if (offlineMode === 'true') {
  setupOfflineMode(axios);
}

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

    if (error.response.status === 401 && !originalRequest._retry) {
      if (localStorage.getItem("refresh_token") !== null) {
        // request new access token with refresh token
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
          });
      } else {
        window.location.replace("/");
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  });

const signInPage = `${APIServiceBaseURL}/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectURI}&response_type=code&scope=${scope}`;

const logoutPage = `${APIServiceBaseURL}/profile`;

const handleOAuthCallback = (authorizationCode, callback) => {
  if (authorizationCode !== null) {
    requestAccessTokenWithAuthorizationCode(authorizationCode)
      .then((response) => {
        localStorage.setItem("access_token", response.data.access_token);
        localStorage.setItem("refresh_token", response.data.refresh_token);
        callback();
      })
      .catch(function (error) {
        console.log(error);
      });
  }
};

const handleOfflineMode = () => {
  localStorage.setItem("offlineMode", "true");
  window.location.replace("/");
};

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

// Ref: https://stackoverflow.com/questions/38552003/how-to-decode-jwt-token-in-javascript-without-using-a-library
const parseJwt = (token) => {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
};

const logoutOfflineMode = (callback) => {
  localStorage.clear();
  callback();
};

const getOfflineModeCurrentUserId = () => {
  return 1;
};

const getCurrentUserId = () => {
  const accessToken = localStorage.getItem("access_token");
  if (accessToken !== null) {
    return parseJwt(accessToken).user.id;
  }
};

const logout = (callback) => {
  const accessToken = localStorage.getItem("access_token");
  return axios.create().post(`${APIServiceBaseURL}/oauth/revoke`,
    qs.stringify({
      token: accessToken
    }), {
    headers: {
      'Authorization': 'Basic ' + btoa(clientId),
      'content-type': 'application/x-www-form-urlencoded'
    }
  })
    .then((response) => {
      localStorage.clear();
      callback();
    });
};

const getAccessToken = () => {
  return localStorage.getItem("access_token");
}

const httpService = {
  get: axios.get,
  post: axios.post,
  delete: axios.delete,
  put: axios.put,
  patch: axios.patch,
  signInPage,
  getCurrentUserId: offlineMode ? getOfflineModeCurrentUserId : getCurrentUserId,
  logout: offlineMode ? logoutOfflineMode : logout,
  logoutPage,
  getAccessToken,
  handleOAuthCallback,
  handleOfflineMode
};

export default httpService;