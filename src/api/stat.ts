/*
 * @Author: 唐宇
 * @Date: 2025-09-11 16:44:18
 * @LastEditors: 唐宇
 * @LastEditTime: 2025-09-11 16:50:10
 * @FilePath: \survey-frontend\src\api\stat.ts
 * @Description: 问卷统计相关API
 *
 * Copyright (c) 2025 by 唐宇, All Rights Reserved.
 */
import axios, { ResDataType } from './axios';

/**
 * 获取问卷统计列表的API
 *
 * @param questionId 问卷ID
 * @param opt 请求参数，包括页码和每页大小
 * @returns 返回问卷统计列表的数据类型
 */
export const getQuestionStatListApi = async (
  questionId: string,
  opt: { pageNum: number; pageSize: number }
): Promise<ResDataType> => {
  const url = `/api/stat/${questionId}`;
  const data = (await axios.get(url, { params: opt })) as ResDataType;
  return data;
};

/**
 * 获取组件统计数据的 API 函数
 *
 * @param questionId 问卷ID
 * @param componentId 组件ID
 * @returns 返回组件的统计数据
 */
export const getComponentStatApi = async (questionId: string, componentId: string) => {
  const url = `/api/stat/${questionId}/${componentId}`;
  const data = (await axios.get(url)) as ResDataType;
  return data;
};
