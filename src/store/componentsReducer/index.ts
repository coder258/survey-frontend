/*
 * @Author: 唐宇
 * @Date: 2025-08-29 15:54:53
 * @LastEditors: 唐宇
 * @LastEditTime: 2025-09-07 19:31:17
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
import { arrayMove } from '@dnd-kit/sortable';

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
    // 修改组件属性
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
    // 删除选中的组件
    removeSelectedComponent: produce((draft: ComponentsStateType) => {
      const { selectedId: removedId, componentList = [] } = draft;
      const newSelectedId = getNextSelectedId(removedId, componentList);
      draft.selectedId = newSelectedId;
      const index = componentList.findIndex(c => c.fe_id === removedId);
      componentList.splice(index, 1);
    }),
    // 修改组件隐藏状态
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
    // 切换组件锁定状态
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
    // 复制组件
    copySelectedComponent: produce((draft: ComponentsStateType) => {
      const { selectedId: copiedId, componentList = [] } = draft;
      const currentComponent = componentList.find(c => c.fe_id === copiedId);
      if (!currentComponent) {
        return;
      }
      draft.copiedComponent = deepClone(currentComponent);
    }),
    // 粘贴复制的组件
    pasteCopiedComponent: produce((draft: ComponentsStateType) => {
      const { copiedComponent } = draft;
      if (!copiedComponent) {
        return;
      }
      // 修改要粘贴的组件的fe_id
      copiedComponent.fe_id = nanoid();
      insertNewComponent(draft, copiedComponent);
    }),
    // 选中上一个组件
    selectPrevComponent: produce((draft: ComponentsStateType) => {
      const { selectedId, componentList = [] } = draft;
      const selectedIndex = componentList.findIndex(c => c.fe_id === selectedId);
      if (selectedIndex === -1) {
        return;
      }
      if (selectedIndex === 0) {
        return;
      }

      draft.selectedId = componentList[selectedIndex - 1].fe_id;
    }),
    // 选中下一个组件
    selectNextComponent: produce((draft: ComponentsStateType) => {
      const { selectedId, componentList = [] } = draft;
      const selectedIndex = componentList.findIndex(c => c.fe_id === selectedId);
      if (selectedIndex === -1) {
        return;
      }
      if (selectedIndex === componentList.length - 1) {
        return;
      }

      draft.selectedId = componentList[selectedIndex + 1].fe_id;
    }),
    // 修改组件标题
    changeComponentTitle: produce(
      (draft: ComponentsStateType, action: PayloadAction<{ fe_id: string; newTitle: string }>) => {
        const { componentList = [] } = draft;
        const { fe_id, newTitle } = action.payload;

        const currentComponent = componentList.find(c => c.fe_id === fe_id);
        if (currentComponent) {
          currentComponent.title = newTitle;
        }
      }
    ),
    moveComponent: produce(
      (
        draft: ComponentsStateType,
        action: PayloadAction<{ oldIndex: number; newIndex: number }>
      ) => {
        const { componentList: currentComponentList } = draft;
        const { oldIndex, newIndex } = action.payload;

        draft.componentList = arrayMove(currentComponentList, oldIndex, newIndex);
      }
    ),
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
  selectPrevComponent,
  selectNextComponent,
  changeComponentTitle,
  moveComponent,
  // ...其他actions
} = componentsSlice.actions;
export default componentsSlice.reducer;
