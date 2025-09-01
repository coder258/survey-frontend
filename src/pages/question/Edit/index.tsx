/*
 * @Author: 唐宇
 * @Date: 2025-08-04 17:15:41
 * @LastEditors: 唐宇
 * @LastEditTime: 2025-09-01 11:45:37
 * @FilePath: \survey-frontend\src\pages\question\Edit\index.tsx
 * @Description: 编辑问卷页面
 *
 * Copyright (c) 2025 by 唐宇, All Rights Reserved.
 */
import React, { FC } from 'react';
import useLoadQuestionData from '../../../hooks/useLoadQuestionData';
import styles from './index.module.scss';
import EditCanvas from './EditCanvas';
import { useDispatch } from 'react-redux';
import { setSelectedId } from '../../../store/componentsReducer';

const Edit: FC = () => {
  const { loading, error } = useLoadQuestionData();
  const dispatch = useDispatch();
  const mainClickHandler = () => {
    dispatch(setSelectedId(''));
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>Header</div>
      <div className={styles['content-wrapper']}>
        <div className={styles.content}>
          <div className={styles.left}>Left</div>
          <div className={styles.main} onClick={() => mainClickHandler()}>
            <div className={styles['canvas-wrapper']}>
              <EditCanvas loading={loading} />
            </div>
          </div>
          <div className={styles.right}>Right</div>
        </div>
      </div>
    </div>
  );
};

export default Edit;
