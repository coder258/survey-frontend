/*
 * @Author: 唐宇
 * @Date: 2025-08-29 15:28:44
 * @LastEditors: 唐宇
 * @LastEditTime: 2025-09-02 17:10:00
 * @FilePath: \survey-frontend\src\pages\question\Edit\EditCanvas.tsx
 * @Description: 显示编辑画布的组件
 *
 * Copyright (c) 2025 by 唐宇, All Rights Reserved.
 */
import React, { FC, MouseEvent } from 'react';
import styles from './EditCanvas.module.scss';
import { Spin } from 'antd';
import useGetComponentInfo from '../../../hooks/useGetComponentInfo';
import { ComponentInfoType, setSelectedId } from '../../../store/componentsReducer';
import { getComponentConfByType } from '../../../components/QuestionComponents';
import { useDispatch } from 'react-redux';
import useBindToolBarKeyPress from '../../../hooks/useBindToolBarKeyPress';

type PropsType = {
  loading: boolean;
};

const renderComponent = (c: ComponentInfoType) => {
  const { type, props } = c;
  const componentConf = getComponentConfByType(type);
  if (!componentConf) {
    return null;
  }
  const { Component } = componentConf;
  return <Component {...props} />;
};

const EditCanvas: FC<PropsType> = (props: PropsType) => {
  useBindToolBarKeyPress();
  const { componentList, selectedId } = useGetComponentInfo();
  const dispatch = useDispatch();
  const componentClickHandler = (event: MouseEvent, fe_id: string) => {
    event.stopPropagation();
    dispatch(setSelectedId(fe_id));
  };
  const { loading } = props;
  if (loading) {
    return (
      <div className={styles['loading-center']}>
        <Spin></Spin>
      </div>
    );
  }
  return (
    <div className={styles.canvas}>
      {componentList
        .filter(c => !c.isHidden)
        .map(c => {
          const { fe_id, isLocked } = c;

          return (
            <div
              key={fe_id}
              className={`${styles['component-wrapper']} ${fe_id === selectedId ? styles['selected'] : ''} ${isLocked ? styles['locked'] : ''}`}
              onClick={event => {
                componentClickHandler(event, fe_id);
              }}
            >
              <div className={styles.component}>{renderComponent(c)}</div>
            </div>
          );
        })}
    </div>
  );
};

export default EditCanvas;
