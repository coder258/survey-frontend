/*
 * @Author: 唐宇
 * @Date: 2025-09-02 14:44:36
 * @LastEditors: 唐宇
 * @LastEditTime: 2025-09-02 15:31:40
 * @FilePath: \survey-frontend\src\store\componentsReducer\utils.ts
 * @Description: componentsReducer utils
 *
 * Copyright (c) 2025 by 唐宇, All Rights Reserved.
 */
import { ComponentInfoType, ComponentsStateType } from '.';

export const getNextSelectedId = (fe_id: string, componentList: ComponentInfoType[]) => {
  const visibleComponentList = componentList.filter(component => !component.isHidden);
  const index = visibleComponentList.findIndex(component => component.fe_id === fe_id);

  if (index === -1) return '';

  const len = visibleComponentList.length;
  let newSelectedId = '';
  if (len <= 1) {
    return newSelectedId;
  }
  if (index + 1 === len) {
    newSelectedId = visibleComponentList[index - 1].fe_id;
  } else {
    newSelectedId = visibleComponentList[index + 1].fe_id;
  }
  return newSelectedId;
};

/**
 * 插入新组件
 *
 * @param draft draft state
 * @param newComponent 新的组件信息对象
 */
export const insertNewComponent = (draft: ComponentsStateType, newComponent: ComponentInfoType) => {
  const { selectedId, componentList } = draft;
  const index = componentList.findIndex(c => c.fe_id === selectedId);
  if (index < 0) {
    // 未选中任何组件
    draft.componentList.push(newComponent);
  } else {
    draft.componentList.splice(index + 1, 0, newComponent);
  }
  draft.selectedId = newComponent.fe_id;
};
