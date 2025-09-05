/*
 * @Author: 唐宇
 * @Date: 2025-08-25 10:15:00
 * @LastEditors: 唐宇
 * @LastEditTime: 2025-09-05 17:14:23
 * @FilePath: \survey-frontend\src\api\question.ts
 * @Description: 问卷服务相关接口
 *
 * Copyright (c) 2025 by 唐宇, All Rights Reserved.
 */
import { ComponentInfoType } from '../store/componentsReducer';
import axios, { ResDataType } from './axios';

type SearchOption = {
  keyword: string;
  isStar: boolean;
  isDeleted: boolean;
  pageNum: number;
  pageSize: number;
};

type UpdateOption = {
  isStar: boolean;
  isPublished: boolean;
  isDeleted: boolean;
  title: string;
  desc: string;
  css: string;
  js: string;
  componentList: ComponentInfoType[];
};

/**
 * 通过问卷ID获取问卷的API接口
 *
 * @param id 问卷ID
 * @returns 返回一个Promise对象，该对象解析为ResDataType类型的数据
 */
export const getQuestionApi = async (id: string): Promise<ResDataType> => {
  const url = `/api/question/${id}`;
  const data = (await axios.get(url)) as ResDataType;
  return data;
};

/**
 * 异步创建问卷API
 *
 * @returns 返回Promise，解析为ResDataType类型的数据
 */
export const createQuestionApi = async (): Promise<ResDataType> => {
  const url = `/api/question`;
  const data = (await axios.post(url)) as ResDataType;
  return data;
};

/**
 * 获取问卷列表的 API 接口
 *
 * @param opt 可选参数，用于配置搜索选项
 * @returns 返回问卷列表的数据类型
 */
export const getQuestionListApi = async (opt: Partial<SearchOption> = {}): Promise<ResDataType> => {
  const url = `/api/question`;
  const data = (await axios.get(url, { params: opt })) as ResDataType;
  return data;
};

/**
 * 更新问卷API
 *
 * @param id 问卷ID
 * @param opt 更新选项
 * @returns 返回结果类型
 */
export const updateQuestionApi = async (
  id: string,
  opt: Partial<UpdateOption>
): Promise<ResDataType> => {
  const url = `/api/question/${id}`;
  const data = (await axios.patch(url, opt)) as ResDataType;
  return data;
};

/**
 * 调用复制问卷的API
 *
 * @param id 问卷ID
 * @returns 返回API调用的结果，类型为ResDataType
 */
export const duplicateQuestionApi = async (id: string): Promise<ResDataType> => {
  const url = `/api/question//duplicate/${id}`;
  const data = (await axios.post(url)) as ResDataType;
  return data;
};

/**
 * 彻底删除指定ID的问卷
 *
 * @param ids 要删除的问卷ID数组
 * @returns 返回删除操作的结果
 */
export const deleteQuestionApi = async (ids: string[]): Promise<ResDataType> => {
  const url = `/api/question`;
  const data = (await axios.delete(url, { data: { ids } })) as ResDataType;
  return data;
};
