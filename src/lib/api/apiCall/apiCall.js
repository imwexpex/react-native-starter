import {Methods} from '@api';
import axios from 'axios';
import {Platform} from 'react-native';
import packageJson from '../../../../package.json';

export const apiUrl = __DEV__ ? 'https://dev.url/' : 'https://prod.url/';

const defaultConfig = {
  baseURL: apiUrl,
  headers: {
    'User-Agent': `${Platform.OS} ${packageJson.version}`,
  },
};

const instance = axios.create(defaultConfig);

const refreshInstance = axios.create({
  baseURL: apiUrl,
  skipAuthRefresh: true,
});

export const apiCall = async ({
  endpoint,
  method = Methods.GET,
  headers,
  params,
  data,
  locale = 'ru',
  useAuth = true,
}) => {
  headers = {
    'Accept-Language': locale,
    'User-Agent': `${Platform.OS} ${packageJson.version}`,
    ...headers,
  };

  return instance({
    url: endpoint,
    method,
    headers,
    params,
    data,
    timeout: 5000,
    _skip: !useAuth,
  });
};

let isRefreshing = false;
let refreshSubscribers = [];

function subscribeTokenRefresh(cb) {
  refreshSubscribers.push(cb);
}

function onRefreshed(token) {
  refreshSubscribers.map(cb => cb(token));
}

function requestRefreshToken() {
  return refreshInstance.get('REFRESH_ENDPOINT', {
    _skip: true,
    headers: {
      'User-Agent': `${Platform.OS}`,
      Authorization: 'refreshToken',
    },
  });
}

instance.interceptors.response.use(
  r => r,
  error => {
    const {
      config: originalRequest,
      response: {status},
    } = error;

    if (status === 401) {
      if (!isRefreshing) {
        isRefreshing = true;

        requestRefreshToken().then(({data}) => {
          isRefreshing = false;

          //SET NEW TOKEN HERE

          onRefreshed(data.token);
        });
      }

      return new Promise(resolve => {
        subscribeTokenRefresh(token => {
          originalRequest.headers.Authorization = token;
          resolve(axios({...originalRequest}));
        });
      });
    }

    return Promise.reject(error);
  },
);

refreshInstance.interceptors.response.use(
  r => r,
  error => {
    //PERFORM LOGOUT USER LOGIC HERE

    return Promise.reject(error);
  },
);
