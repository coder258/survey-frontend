import { message } from 'antd';
import axios from 'axios';
import { getToken } from '../utils/user-token';

const instance = axios.create({
  timeout: 1000 * 10,
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

instance.interceptors.request.use(
  config => {
    config.headers.Authorization = `Bearer ${getToken()}`;
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  response => {
    const resData = (response.data || {}) as ResType;
    const { errno, data, msg } = resData;
    if (errno !== 0) {
      message.error(msg || '网络请求失败');
      return Promise.reject(msg);
    }
    return data as any;
  },
  error => {
    return Promise.reject(error);
  }
);

export default instance;

export type ResType = {
  errno: number;
  data?: ResDataType;
  msg?: string;
};

export type ResDataType = {
  [key: string]: any;
};
