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
