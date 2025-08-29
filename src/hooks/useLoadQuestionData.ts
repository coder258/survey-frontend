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
import { useDispatch } from 'react-redux';
import { getQuestionApi } from '../api/question';
import { resetComponents } from '../store/componentsReducer';

const useLoadQuestionData = () => {
  const { id = '' } = useParams();
  const dispatch = useDispatch();
  const load = async () => {
    if (!id) {
      throw new Error('没有问卷ID');
    }
    const data = await getQuestionApi(id);
    return data;
  };

  const { data, loading, error, run } = useRequest(load, {
    manual: true,
    onSuccess(res) {
      console.log('问卷详情数据加载成功', res);
    },
    onError(err) {
      console.log('问卷详情数据加载失败', err);
    },
  });

  useEffect(() => {
    if (!data) {
      return;
    }
    const { title = '', componentList = [] } = data;
    dispatch(resetComponents({ componentList }));
  }, [data]);

  useEffect(() => {
    run();
  }, [id]);
  return { loading, error };
};

export default useLoadQuestionData;
