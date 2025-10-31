import axios, { ResDataType } from './axios';

let controller: AbortController | null = new AbortController();

/**
 * @description: 单张图片上传接口
 * @param {any} body
 * @return {*}
 */
export const uploadPicApi = async (body: any): Promise<ResDataType> => {
  const url = `/api/file/upload`;
  const data = (await axios.post(url, body, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })) as ResDataType;
  return data;
};

/**
 * @description: 大文件上传检测上传进度接口
 * @param {any} body
 * @return {*}
 */
export const checkFileStatusApi = async (body: any): Promise<ResDataType> => {
  const url = `/api/file/upload/largeFile/checkFileStatus`;
  const data = (await axios.post(url, body)) as ResDataType;
  return data;
};

/**
 * @description: 上传分片接口
 * @param {any} body
 * @return {*}
 */
export const uploadChunkApi = async (body: any): Promise<ResDataType> => {
  const url = `/api/file/upload/largeFile/chunk`;
  const data = (await axios.post(url, body, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    signal: controller!.signal,
  })) as ResDataType;
  return data;
};

/**
 * @description: 合并文件接口
 * @param {any} body
 * @return {*}
 */
export const mergeChunksApi = async (body: any): Promise<ResDataType> => {
  const url = `/api/file/upload/largeFile/mergeChunks`;
  const data = (await axios.post(url, body, {
    signal: controller!.signal,
  })) as ResDataType;
  return data;
};

export const abort = () => {
  controller!.abort();
  controller = null;
  controller = new AbortController();
};
