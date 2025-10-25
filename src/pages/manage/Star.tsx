/*
 * @Author: 唐宇
 * @Date: 2025-08-04 16:46:59
 * @LastEditors: 唐宇
 * @LastEditTime: 2025-10-23 12:14:59
 * @FilePath: \survey-frontend\src\pages\manage\Star.tsx
 * @Description: 星标问卷页面
 *
 * Copyright (c) 2025 by 唐宇, All Rights Reserved.
 */
import React, { FC } from 'react';
import { useTitle } from 'ahooks';
import styles from './common.module.scss';
import { Typography, Empty, Spin } from 'antd';
import QuestionCard from '../../components/QuestionCard';
import ListSearch from '../../components/ListSearch';
import useLoadQuestionListData from '../../hooks/useLoadQuestionListData';
import ListPagination from '../../components/ListPagination';

const { Title } = Typography;

const Star: FC = () => {
  useTitle('小慕问卷 - 星标问卷');
  const { data = {}, loading, refresh } = useLoadQuestionListData({ isStar: true });
  const { list = [], total = 0 } = data;

  const onStarChange = () => {
    // 刷新数据
    refresh();
  };

  const onDelete = () => {
    // 刷新数据
    refresh();
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.left}>
            <Title level={3}>星标问卷</Title>
          </div>
          <div className={styles.right}>
            <ListSearch />
          </div>
        </div>
        <Spin spinning={loading}>
          <div className={styles.content}>
            {list.length > 0 ? (
              list.map((question: any) => (
                <QuestionCard
                  onStarChange={onStarChange}
                  onDelete={onDelete}
                  key={question._id}
                  {...question}
                />
              ))
            ) : (
              <Empty description="暂无数据" />
            )}
          </div>
        </Spin>
        <div className={styles.footer}>
          <ListPagination total={total} />
        </div>
      </div>
    </>
  );
};

export default Star;
