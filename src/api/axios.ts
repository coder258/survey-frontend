import { message } from 'antd';
import axios from 'axios';

const instance = axios.create({
  timeout: 1000 * 10,
});

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
    message.error('网络请求失败');
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
