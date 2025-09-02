/*
 * @Author: 唐宇
 * @Date: 2025-08-29 15:54:53
 * @LastEditors: 唐宇
 * @LastEditTime: 2025-09-02 16:36:15
 * @FilePath: \survey-frontend\src\store\componentsReducer\index.ts
 * @Description: question components reducer
 *
 * Copyright (c) 2025 by 唐宇, All Rights Reserved.
 */
import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import { ComponentPropsType } from '../../components/QuestionComponents';
import { produce } from 'immer';
import { getNextSelectedId, insertNewComponent } from './utils';
import { deepClone } from '../../utils/lodash';

export type ComponentInfoType = {
  fe_id: string;
  type: string;
  title: string;
  isHidden?: boolean;
  isLocked?: boolean;
  props: ComponentPropsType;
};

export type ComponentsStateType = {
  componentList: Array<ComponentInfoType>;
  selectedId: string;
  copiedComponent: ComponentInfoType | null;
};

const INIT_STATE: ComponentsStateType = {
  componentList: [],
  selectedId: '',
  copiedComponent: null,
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
        insertNewComponent(draft, newComponent);
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
    removeSelectedComponent: produce((draft: ComponentsStateType) => {
      const { selectedId: removedId, componentList = [] } = draft;
      const newSelectedId = getNextSelectedId(removedId, componentList);
      draft.selectedId = newSelectedId;
      const index = componentList.findIndex(c => c.fe_id === removedId);
      componentList.splice(index, 1);
    }),
    changeComponentHiddenState: produce(
      (draft: ComponentsStateType, action: PayloadAction<{ fe_id: string; isHidden: boolean }>) => {
        const { componentList = [] } = draft;
        const { fe_id, isHidden } = action.payload;

        let newSelectedId = '';
        if (isHidden) {
          newSelectedId = getNextSelectedId(fe_id, componentList);
        } else {
          newSelectedId = fe_id;
        }
        draft.selectedId = newSelectedId;

        const currentComponent = componentList.find(c => c.fe_id === fe_id);
        if (currentComponent) {
          currentComponent.isHidden = isHidden;
        }
      }
    ),
    toggleComponentLockState: produce(
      (draft: ComponentsStateType, action: PayloadAction<{ fe_id: string }>) => {
        const { componentList = [] } = draft;
        const { fe_id } = action.payload;

        const currentComponent = componentList.find(c => c.fe_id === fe_id);
        if (currentComponent) {
          currentComponent.isLocked = !currentComponent.isLocked;
        }
      }
    ),
    copySelectedComponent: produce((draft: ComponentsStateType) => {
      const { selectedId: copiedId, componentList = [] } = draft;
      const currentComponent = componentList.find(c => c.fe_id === copiedId);
      if (!currentComponent) {
        return;
      }
      draft.copiedComponent = deepClone(currentComponent);
    }),
    pasteCopiedComponent: produce((draft: ComponentsStateType) => {
      const { copiedComponent } = draft;
      if (!copiedComponent) {
        return;
      }
      // 修改要粘贴的组件的fe_id
      copiedComponent.fe_id = nanoid();
      insertNewComponent(draft, copiedComponent);
    }),
  },
});

export const {
  resetComponents,
  setSelectedId,
  addComponent,
  changeComponentProps,
  removeSelectedComponent,
  changeComponentHiddenState,
  toggleComponentLockState,
  copySelectedComponent,
  pasteCopiedComponent,
  // ...其他actions
} = componentsSlice.actions;
export default componentsSlice.reducer;
