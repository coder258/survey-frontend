import { Typography } from 'antd';
import React, { FC } from 'react';
import { nanoid } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { addComponent } from '../../../store/componentsReducer';
import { componentConfGroup, ComponentConfType } from '../../../components/QuestionComponents';
import styles from './ComponentLib.module.scss';

const { Title } = Typography;

const renderComponent = (c: ComponentConfType, pointer: boolean) => {
  const { title, type, Component, defaultProps } = c;
  const dispatch = useDispatch();

  const addComponentClickHandler = () => {
    dispatch(
      addComponent({
        fe_id: nanoid(),
        type,
        title,
        props: defaultProps,
      })
    );
  };

  return (
    <div
      className={`${styles['wrapper']} ${styles['mb-12']} ${styles['cursor-pointer']} ${styles['p-12']} ${styles['rounded-xs']}`}
      key={type}
      onClick={addComponentClickHandler}
    >
      <div className={pointer ? '' : styles['component']}>
        <Component />
      </div>
    </div>
  );
};

const ComponentLib: FC<{ pointer: boolean }> = ({ pointer = false }: { pointer?: boolean }) => {
  return (
    <div className={styles.container}>
      {pointer && (
        <div className={styles['flex-center']}>
          <Title level={4}>组件库</Title>
        </div>
      )}
      {componentConfGroup.map((group, index) => {
        const { groupId, groupName, components } = group;

        return (
          <div key={groupId}>
            <Title level={3} className={`${styles['text-md']} ${styles['mt-20']}`}>
              {groupName}
            </Title>
            <div>
              {components.map(c => {
                return renderComponent(c, pointer);
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ComponentLib;
