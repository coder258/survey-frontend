/*
 * @Author: 唐宇
 * @Date: 2025-09-04 17:21:25
 * @LastEditors: 唐宇
 * @LastEditTime: 2025-09-04 17:24:58
 * @FilePath: \survey-frontend\src\store\pageInfoReducer.ts
 * @Description: PageInfoReducer.ts
 *
 * Copyright (c) 2025 by 唐宇, All Rights Reserved.
 */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type PageInfoType = {
  title: string;
  desc?: string;
  js?: string;
  css?: string;
};

const INIT_STATE: PageInfoType = {
  title: '',
  desc: '',
  js: '',
  css: '',
};

const pageInfoSlice = createSlice({
  name: 'pageInfo',
  initialState: INIT_STATE,
  reducers: {
    resetPageInfo(state: PageInfoType, action: PayloadAction<PageInfoType>) {
      return action.payload;
    },
  },
});

export const { resetPageInfo } = pageInfoSlice.actions;
export default pageInfoSlice.reducer;
