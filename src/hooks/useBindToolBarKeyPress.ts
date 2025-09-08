/*
 * @Author: 唐宇
 * @Date: 2025-09-02 17:01:28
 * @LastEditors: 唐宇
 * @LastEditTime: 2025-09-08 17:07:51
 * @FilePath: \survey-frontend\src\hooks\useBindToolBarKeyPress.ts
 * @Description: 工具栏快捷键绑定
 *
 * Copyright (c) 2025 by 唐宇, All Rights Reserved.
 */
import { useKeyPress } from 'ahooks';
import { useDispatch } from 'react-redux';
import {
  copySelectedComponent,
  pasteCopiedComponent,
  removeSelectedComponent,
  selectNextComponent,
  selectPrevComponent,
} from '../store/componentsReducer';
import { redo, undo } from '../store/utils/undoActions';

const isActiveElemValid = () => {
  const activeElem = document.activeElement;
  if (activeElem === document.body) {
    return true;
  }
  // 适配dnd-kit拖拽排序
  if (activeElem?.matches('div[role="button"]')) {
    return true;
  }
  return false;
};

const useBindToolBarKeyPress = () => {
  const dispatch = useDispatch();

  // 删除组件
  useKeyPress(['backspace', 'delete'], () => {
    if (!isActiveElemValid()) {
      return;
    }
    dispatch(removeSelectedComponent());
  });

  // 复制组件
  useKeyPress(['ctrl.c', 'meta.c'], () => {
    if (!isActiveElemValid()) {
      return;
    }
    dispatch(copySelectedComponent());
  });

  // 粘贴组件
  useKeyPress(['ctrl.v', 'meta.v'], () => {
    if (!isActiveElemValid()) {
      return;
    }
    dispatch(pasteCopiedComponent());
  });

  // 选中上一个
  useKeyPress(['uparrow'], () => {
    if (!isActiveElemValid()) {
      return;
    }
    dispatch(selectPrevComponent());
  });

  // 选中下一个
  useKeyPress(['downarrow'], () => {
    if (!isActiveElemValid()) {
      return;
    }
    dispatch(selectNextComponent());
  });

  // 撤销
  useKeyPress(
    ['ctrl.z', 'meta.z'],
    () => {
      if (!isActiveElemValid()) {
        return;
      }
      dispatch(undo());
    },
    {
      exactMatch: true,
    }
  );

  // 重做
  useKeyPress(['ctrl.shift.z', 'meta.shift.z'], () => {
    if (!isActiveElemValid()) {
      return;
    }
    dispatch(redo());
  });
};

export default useBindToolBarKeyPress;
