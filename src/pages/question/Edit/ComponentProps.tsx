/*
 * @Author: 唐宇
 * @Date: 2025-09-01 16:38:32
 * @LastEditors: 唐宇
 * @LastEditTime: 2025-09-25 16:39:51
 * @FilePath: \survey-frontend\src\pages\question\Edit\ComponentProps.tsx
 * @Description: 组件属性编辑组件
 *
 * Copyright (c) 2025 by 唐宇, All Rights Reserved.
 */
import React, { FC } from 'react';
import useGetComponentInfo from '../../../hooks/useGetComponentInfo';
import { ComponentPropsType, getComponentConfByType } from '../../../components/QuestionComponents';
import { useDispatch } from 'react-redux';
import { changeComponentProps } from '../../../store/componentsReducer';
import { Empty, Typography } from 'antd';

const NoProps: FC = () => {
  return (
    <div>
      <Empty
        image={Empty.PRESENTED_IMAGE_SIMPLE}
        styles={{ image: { height: 60 } }}
        description={<Typography.Text>未选中组件</Typography.Text>}
      />
    </div>
  );
};

const ComponentProps: FC = () => {
  const dispatch = useDispatch();
  const { selectedComponent } = useGetComponentInfo();
  if (!selectedComponent) {
    return <NoProps />;
  }
  const { type, props, isLocked, isHidden } = selectedComponent;
  const componentConf = getComponentConfByType(type);
  if (!componentConf) {
    return <NoProps />;
  }

  const { PropsComponent } = componentConf;
  const propsComponentChangeHandler = (newProps: ComponentPropsType) => {
    if (!selectedComponent) {
      return;
    }
    const { fe_id } = selectedComponent;
    console.log('propsComponentChangeHandler', selectedComponent);
    dispatch(changeComponentProps({ fe_id, newProps }));
  };
  return (
    <PropsComponent
      {...props}
      onChange={propsComponentChangeHandler}
      disabled={isLocked || isHidden}
    />
  );
};

export default ComponentProps;
