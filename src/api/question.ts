import axios, { ResDataType } from './axios';

type SearchOption = {
  keyword: string;
  isStar: boolean;
  isDeleted: boolean;
  pageNum: number;
  pageSize: number;
};

export const getQuestionApi = async (id: string): Promise<ResDataType> => {
  const url = `/api/question/${id}`;
  const data = (await axios.get(url)) as ResDataType;
  return data;
};

export const createQuestionApi = async (): Promise<ResDataType> => {
  const url = `/api/question`;
  const data = (await axios.post(url)) as ResDataType;
  return data;
};

export const getQuestionListApi = async (opt: Partial<SearchOption> = {}): Promise<ResDataType> => {
  const url = `/api/question`;
  const data = (await axios.get(url, { params: opt })) as ResDataType;
  return data;
};
