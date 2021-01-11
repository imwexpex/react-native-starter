/* eslint-disable */
import {AxiosPromise, AxiosResponse} from 'axios';

interface CallOptions {
  endpoint: string;
  method?: string;
  headers?: any;
  params?: any;
  data?: any;
  locale?: string;
}

export function apiCall(options: CallOptions): AxiosPromise<AxiosResponse>;
