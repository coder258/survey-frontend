/*
 * @Author: 唐宇
 * @Date: 2025-08-04 16:45:54
 * @LastEditors: 唐宇
 * @LastEditTime: 2025-08-25 15:09:43
 * @FilePath: \survey-frontend\src\pages\manage\List.tsx
 * @Description: 我的问卷页面
 *
 * Copyright (c) 2025 by 唐宇, All Rights Reserved.
 */
import React, { FC } from 'react';
import { useTitle } from 'ahooks';
import styles from './common.module.scss';
import { Spin, Typography } from 'antd';
import QuestionCard from '../../components/QuestionCard';
import ListSearch from '../../components/ListSearch';
import useLoadQuestionListData from '../../hooks/useLoadQuestionListData';

const { Title } = Typography;

const List: FC = () => {
  useTitle('小慕问卷 - 我的问卷');
  const { data = {}, loading } = useLoadQuestionListData();
  const { list = [], total = 0 } = data;
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>我的问卷</Title>
        </div>
        <div className={styles.right}>
          <ListSearch />
        </div>
      </div>
      <Spin spinning={loading}>
        <div className={styles.content}>
          {list.length > 0 &&
            list.map((question: any) => <QuestionCard key={question._id} {...question} />)}
        </div>
      </Spin>
      <div className={styles.footer}>loadMore... 上划加载更多...</div>
    </div>
  );
};

export default List;
