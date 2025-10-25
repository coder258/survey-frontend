import axios, { ResDataType } from './axios';

export const uploadPicApi = async (body: any): Promise<ResDataType> => {
  const url = `/api/file/upload`;
  const data = (await axios.post(url, body, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    timeout: 10000,
  })) as ResDataType;
  return data;
};
