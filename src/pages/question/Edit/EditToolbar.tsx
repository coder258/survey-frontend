/*
 * @Author: 唐宇
 * @Date: 2025-09-02 14:56:53
 * @LastEditors: 唐宇
 * @LastEditTime: 2025-09-08 16:32:49
 * @FilePath: \survey-frontend\src\pages\question\Edit\EditToolbar.tsx
 * @Description: header工具栏
 *
 * Copyright (c) 2025 by 唐宇, All Rights Reserved.
 */
import React, { FC } from 'react';
import {
  BlockOutlined,
  CopyOutlined,
  DeleteOutlined,
  DownOutlined,
  EyeInvisibleOutlined,
  LockOutlined,
  RedoOutlined,
  UndoOutlined,
  UpOutlined,
} from '@ant-design/icons';
import { Button, Space, Tooltip } from 'antd';
import { useDispatch } from 'react-redux';
import {
  changeComponentHiddenState,
  copySelectedComponent,
  moveComponent,
  pasteCopiedComponent,
  removeSelectedComponent,
  toggleComponentLockState,
} from '../../../store/componentsReducer';
import useGetComponentInfo from '../../../hooks/useGetComponentInfo';
import { undo, redo } from '../../../store/utils/undoActions';

const EditToolbar: FC = () => {
  const { selectedId, selectedComponent, copiedComponent, componentList } = useGetComponentInfo();
  const { isLocked } = selectedComponent || {};
  const len = componentList.length;
  const selectedIndex = componentList.findIndex(c => c.fe_id === selectedId);
  const isFirst = selectedIndex === 0;
  const isLast = selectedIndex === len - 1;
  const dispatch = useDispatch();

  const deleteClickHandler = () => {
    dispatch(removeSelectedComponent());
  };
  const hiddenClickHandler = () => {
    dispatch(changeComponentHiddenState({ fe_id: selectedId, isHidden: true }));
  };
  const lockToggleHandler = () => {
    dispatch(toggleComponentLockState({ fe_id: selectedId }));
  };
  const copyClickHandler = () => {
    dispatch(copySelectedComponent());
  };
  const pasteClickHandler = () => {
    dispatch(pasteCopiedComponent());
  };

  const moveUpClickHandler = () => {
    dispatch(moveComponent({ oldIndex: selectedIndex, newIndex: selectedIndex - 1 }));
  };
  const moveDownClickHandler = () => {
    dispatch(moveComponent({ oldIndex: selectedIndex, newIndex: selectedIndex + 1 }));
  };

  return (
    <div>
      <Space>
        <Tooltip title="删除">
          <Button shape="circle" icon={<DeleteOutlined />} onClick={deleteClickHandler} />
        </Tooltip>
        <Tooltip title="隐藏">
          <Button shape="circle" icon={<EyeInvisibleOutlined />} onClick={hiddenClickHandler} />
        </Tooltip>
        <Tooltip title={isLocked ? '解锁' : '锁定'}>
          <Button
            type={isLocked ? 'primary' : 'default'}
            shape="circle"
            icon={<LockOutlined />}
            onClick={lockToggleHandler}
          />
        </Tooltip>
        <Tooltip title="复制">
          <Button shape="circle" icon={<CopyOutlined />} onClick={copyClickHandler} />
        </Tooltip>
        <Tooltip title="粘贴">
          <Button
            shape="circle"
            icon={<BlockOutlined />}
            onClick={pasteClickHandler}
            disabled={!copiedComponent}
          />
        </Tooltip>
        <Tooltip title="上移">
          <Button
            shape="circle"
            icon={<UpOutlined />}
            onClick={moveUpClickHandler}
            disabled={isFirst}
          />
        </Tooltip>
        <Tooltip title="下移">
          <Button
            shape="circle"
            icon={<DownOutlined />}
            onClick={moveDownClickHandler}
            disabled={isLast}
          />
        </Tooltip>
        <Tooltip title="撤销">
          <Button shape="circle" icon={<UndoOutlined />} onClick={() => dispatch(undo())} />
        </Tooltip>
        <Tooltip title="重做">
          <Button shape="circle" icon={<RedoOutlined />} onClick={() => dispatch(redo())} />
        </Tooltip>
      </Space>
    </div>
  );
};

export default EditToolbar;
