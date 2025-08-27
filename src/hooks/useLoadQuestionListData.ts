/*
 * @Author: 唐宇
 * @Date: 2025-08-25 15:03:41
 * @LastEditors: 唐宇
 * @LastEditTime: 2025-08-27 11:09:31
 * @FilePath: \survey-frontend\src\hooks\useLoadQuestionListData.ts
 * @Description: 加载问卷列表数据钩子函数
 *
 * Copyright (c) 2025 by 唐宇, All Rights Reserved.
 */
import { useRequest } from 'ahooks';
import { useSearchParams } from 'react-router-dom';
import { getQuestionListApi } from '../api/question';
import {
  LIST_SEARCH_PARAM_KEY,
  LIST_PAGE_NUM_PARAM_KEY,
  LIST_PAGE_SIZE_PARAM_KEY,
  LIST_PAGE_SIZE,
} from '../constant';

type OptionType = {
  isStar: boolean;
  isDeleted: boolean;
};

const useLoadQuestionListData = (opt: Partial<OptionType> = {}) => {
  const { isStar = false, isDeleted = false } = opt;
  const [searchParams] = useSearchParams();

  const { data, loading, error, refresh } = useRequest(
    async () => {
      const keyword = searchParams.get(LIST_SEARCH_PARAM_KEY) || '';
      const pageNum = parseInt(searchParams.get(LIST_PAGE_NUM_PARAM_KEY) || '') || 1;
      const pageSize = parseInt(searchParams.get(LIST_PAGE_SIZE_PARAM_KEY) || '') || LIST_PAGE_SIZE;

      const data = await getQuestionListApi({ keyword, isStar, isDeleted, pageNum, pageSize });

      return data;
    },
    {
      refreshDeps: [searchParams],
    }
  );

  return { data, loading, error, refresh };
};

export default useLoadQuestionListData;
