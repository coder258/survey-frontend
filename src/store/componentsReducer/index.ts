/*
 * @Author: 唐宇
 * @Date: 2025-08-29 15:54:53
 * @LastEditors: 唐宇
 * @LastEditTime: 2025-08-29 16:05:16
 * @FilePath: \survey-frontend\src\store\componentsReducer\index.ts
 * @Description: question components reducer
 *
 * Copyright (c) 2025 by 唐宇, All Rights Reserved.
 */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ComponentPropsType } from '../../components/QuestionComponents';

export type ComponentInfoType = {
  fe_id: string;
  type: string;
  title: string;
  props: ComponentPropsType;
};

export type ComponentsStateType = {
  componentList: Array<ComponentInfoType>;
};

const INIT_STATE: ComponentsStateType = {
  componentList: [],
  // TODO, 其他初始化状态
};

export const componentsSlice = createSlice({
  name: 'components',
  initialState: INIT_STATE,
  reducers: {
    // 重置所有组件
    resetComponents: (state, action: PayloadAction<ComponentsStateType>) => {
      return action.payload;
    },
  },
});

export const { resetComponents } = componentsSlice.actions;
export default componentsSlice.reducer;
