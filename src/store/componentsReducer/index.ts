/*
 * @Author: 唐宇
 * @Date: 2025-08-29 15:54:53
 * @LastEditors: 唐宇
 * @LastEditTime: 2025-09-01 16:00:36
 * @FilePath: \survey-frontend\src\store\componentsReducer\index.ts
 * @Description: question components reducer
 *
 * Copyright (c) 2025 by 唐宇, All Rights Reserved.
 */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ComponentPropsType } from '../../components/QuestionComponents';
import { produce } from 'immer';

export type ComponentInfoType = {
  fe_id: string;
  type: string;
  title: string;
  props: ComponentPropsType;
};

export type ComponentsStateType = {
  componentList: Array<ComponentInfoType>;
  selectedId: string;
};

const INIT_STATE: ComponentsStateType = {
  componentList: [],
  selectedId: '',
  // TODO, 其他初始化状态
};

export const componentsSlice = createSlice({
  name: 'components',
  initialState: INIT_STATE,
  reducers: {
    // 重置所有组件
    resetComponents: (state: ComponentsStateType, action: PayloadAction<ComponentsStateType>) => {
      return action.payload;
    },

    // 修改selectedId
    setSelectedId: produce((draft: ComponentsStateType, action: PayloadAction<string>) => {
      draft.selectedId = action.payload;
    }),

    // 添加组件
    addComponent: produce(
      (draft: ComponentsStateType, action: PayloadAction<ComponentInfoType>) => {
        const newComponent = action.payload;
        const { selectedId, componentList } = draft;
        const index = componentList.findIndex(c => c.fe_id === selectedId);
        if (index < 0) {
          // 未选中任何组件
          draft.componentList.push(newComponent);
        } else {
          draft.componentList.splice(index + 1, 0, newComponent);
        }
        draft.selectedId = newComponent.fe_id;
      }
    ),
    changeComponentProps: produce(
      (
        draft: ComponentsStateType,
        action: PayloadAction<{ fe_id: string; newProps: ComponentPropsType }>
      ) => {
        const { fe_id, newProps } = action.payload;
        const currentComponent = draft.componentList.find(c => c.fe_id === fe_id);
        if (currentComponent) {
          currentComponent.props = {
            ...currentComponent.props,
            ...newProps,
          };
        }
      }
    ),
  },
});

export const { resetComponents, setSelectedId, addComponent, changeComponentProps } =
  componentsSlice.actions;
export default componentsSlice.reducer;
