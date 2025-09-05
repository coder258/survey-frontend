/*
 * @Author: 唐宇
 * @Date: 2025-09-04 15:36:04
 * @LastEditors: 唐宇
 * @LastEditTime: 2025-09-05 12:25:59
 * @FilePath: \survey-frontend\src\pages\question\Edit\Layers.tsx
 * @Description: 左侧面板-图层
 *
 * Copyright (c) 2025 by 唐宇, All Rights Reserved.
 */
import React, { ChangeEvent, FC, useState } from 'react';
import useGetComponentInfo from '../../../hooks/useGetComponentInfo';
import { useDispatch } from 'react-redux';
import { Button, Input, message, Space } from 'antd';
import {
  changeComponentHiddenState,
  changeComponentTitle,
  setSelectedId,
  toggleComponentLockState,
} from '../../../store/componentsReducer';
import styles from './Layers.module.scss';
import { EyeInvisibleOutlined, EyeOutlined, LockOutlined } from '@ant-design/icons';

const Layers: FC = () => {
  const { componentList, selectedId } = useGetComponentInfo();
  const dispatch = useDispatch();

  const [changingTitleId, setChangingTitleId] = useState<string>('');
  const titleClickHandler = (fe_id: string) => {
    const currentComponent = componentList.find(component => component.fe_id === fe_id);
    if (currentComponent && currentComponent.isHidden) {
      message.warning('该组件已被隐藏，请先显示后再进行操作');
      return;
    }

    if (fe_id !== selectedId) {
      dispatch(setSelectedId(fe_id));
      setChangingTitleId('');
      return;
    }
    setChangingTitleId(fe_id);
  };

  const titleChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const newTitle = event.target.value.trim();
    if (!newTitle) {
      message.warning('图层标题不能为空');
      return;
    }
    if (!selectedId) {
      return;
    }
    dispatch(changeComponentTitle({ fe_id: selectedId, newTitle }));
  };

  const hiddenChangeClickHandler = (fe_id: string, isHidden: boolean) => {
    dispatch(changeComponentHiddenState({ fe_id, isHidden }));
  };

  const lockChangeClickHandler = (fe_id: string) => {
    dispatch(toggleComponentLockState({ fe_id }));
  };

  return (
    <>
      {componentList.map(component => {
        const { fe_id, isHidden, title, isLocked } = component;

        return (
          <div key={fe_id} className={`${styles.wrapper} ${styles['py-6']}`}>
            <div
              className={`${styles.title} ${fe_id === selectedId ? styles.selected : ''}`}
              onClick={() => titleClickHandler(fe_id)}
            >
              {fe_id === changingTitleId && (
                <Input
                  allowClear
                  value={title}
                  onChange={event => titleChangeHandler(event)}
                  onPressEnter={() => setChangingTitleId('')}
                  onBlur={() => setChangingTitleId('')}
                  autoFocus
                />
              )}
              {fe_id !== changingTitleId && <span>{title}</span>}
            </div>
            <div className={`${styles.btn} ${styles['text-right']}`}>
              <Space>
                <Button
                  className={!isHidden ? styles['btn-opacity'] : ''}
                  icon={isHidden ? <EyeInvisibleOutlined /> : <EyeOutlined />}
                  type="text"
                  size="small"
                  shape="circle"
                  onClick={() => hiddenChangeClickHandler(fe_id, !isHidden)}
                ></Button>
                <Button
                  className={!isLocked ? styles['btn-opacity'] : ''}
                  icon={<LockOutlined />}
                  type={isLocked ? 'primary' : 'text'}
                  size="small"
                  shape="circle"
                  onClick={() => lockChangeClickHandler(fe_id)}
                ></Button>
              </Space>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Layers;
