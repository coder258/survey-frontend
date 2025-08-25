/*
 * @Author: 唐宇
 * @Date: 2025-08-25 10:23:26
 * @LastEditors: 唐宇
 * @LastEditTime: 2025-08-25 10:26:58
 * @FilePath: \survey-frontend\src\hooks\useLoadQuestionData.ts
 * @Description: 加载问卷详情数据钩子函数
 *
 * Copyright (c) 2025 by 唐宇, All Rights Reserved.
 */
import { useRequest } from 'ahooks';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getQuestionApi } from '../api/question';

const useLoadQuestionData = () => {
  const { id = '' } = useParams();
  const load = async () => {
    const data = await getQuestionApi(id);
    return data;
  };

  const { data, loading, error } = useRequest(load);
  return { data, loading, error };
};

export default useLoadQuestionData;
