/*
 * @Author: 唐宇
 * @Date: 2025-08-04 17:17:19
 * @LastEditors: 唐宇
 * @LastEditTime: 2025-09-11 15:24:38
 * @FilePath: \survey-frontend\src\pages\question\Stat\index.tsx
 * @Description: 问卷统计入口页面组件
 *
 * Copyright (c) 2025 by 唐宇, All Rights Reserved.
 */
import React, { FC, useState } from 'react';
import styles from './index.module.scss';
import StatHeader from './StatHeader';
import ComponentList from './ComponentList';
import StatTable from './StatTable';
import StatChart from './StatChart';
import useLoadQuestionData from '../../../hooks/useLoadQuestionData';

const Stat: FC = () => {
  const { loading, error } = useLoadQuestionData();
  const [selectedId, setSelectedId] = useState<string>('');
  const [componentType, setComponentType] = useState<string>('');

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <StatHeader />
      </div>
      <div className={styles['content-wrapper']}>
        <div className={styles.content}>
          <div className={styles.left}>
            <div className={styles['lr-wrapper']}>
              <ComponentList
                loading={loading}
                selectedId={selectedId}
                setSelectedId={setSelectedId}
                setComponentType={setComponentType}
              />
            </div>
          </div>
          <div className={styles.main}>
            <div className={styles['table-wrapper']}>
              <StatTable loading={loading} />
            </div>
          </div>
          <div className={styles.right}>
            <div className={styles['lr-wrapper']}>
              <StatChart />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stat;
