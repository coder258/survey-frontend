/*
 * @Author: 唐宇
 * @Date: 2025-09-05 10:59:42
 * @LastEditors: 唐宇
 * @LastEditTime: 2025-09-05 11:02:00
 * @FilePath: \survey-frontend\src\hooks\useGetPageInfo.ts
 * @Description: 获取页面设置信息
 *
 * Copyright (c) 2025 by 唐宇, All Rights Reserved.
 */
import { useSelector } from 'react-redux';
import type { StateType } from '../store';
import type { PageInfoType } from '../store/pageInfoReducer';

const useGetPageInfo = () => {
  const pageInfo = useSelector<StateType>(state => state.pageInfo) as PageInfoType;
  return pageInfo;
};

export default useGetPageInfo;
