/*
 * @Author: 唐宇
 * @Date: 2025-09-11 10:52:17
 * @LastEditors: 唐宇
 * @LastEditTime: 2025-09-11 15:25:34
 * @FilePath: \survey-frontend\src\pages\question\Stat\ComponentList.tsx
 * @Description: 左侧组件列表组件
 *
 * Copyright (c) 2025 by 唐宇, All Rights Reserved.
 */
import React, { FC, MouseEvent } from 'react';
import styles from './ComponentList.module.scss';
import { Spin } from 'antd';
import useGetComponentInfo from '../../../hooks/useGetComponentInfo';
import { ComponentInfoType } from '../../../store/componentsReducer';
import { getComponentConfByType } from '../../../components/QuestionComponents';

type PropsType = {
  loading: boolean;
  selectedId: string;
  setSelectedId: (id: string) => void;
  setComponentType: (type: string) => void;
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

const ComponentList: FC<PropsType> = (props: PropsType) => {
  const { componentList } = useGetComponentInfo();
  const componentClickHandler = (
    event: MouseEvent,
    fe_id: string,
    type: ComponentInfoType['type']
  ) => {
    event.stopPropagation();
    // 状态提升
    setSelectedId(fe_id);
    setComponentType(type);
  };
  const { loading, selectedId, setSelectedId, setComponentType } = props;
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
          const { fe_id, isLocked, type } = c;

          return (
            <div
              key={fe_id}
              className={`${styles['component-wrapper']} ${fe_id === selectedId ? styles['selected'] : ''} ${isLocked ? styles['locked'] : ''}`}
              onClick={event => {
                componentClickHandler(event, fe_id, type);
              }}
            >
              <div className={styles.component}>{renderComponent(c)}</div>
            </div>
          );
        })}
    </div>
  );
};

export default ComponentList;
