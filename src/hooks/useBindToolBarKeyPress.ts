/*
 * @Author: 唐宇
 * @Date: 2025-09-02 17:01:28
 * @LastEditors: 唐宇
 * @LastEditTime: 2025-09-02 17:09:37
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
} from '../store/componentsReducer';

const isActiveElemValid = () => {
  const activeElem = document.activeElement;
  if (activeElem === document.body) return true;
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
};

export default useBindToolBarKeyPress;
