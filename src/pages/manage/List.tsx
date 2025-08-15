/*
 * @Author: 唐宇
 * @Date: 2025-08-04 16:45:54
 * @LastEditors: 唐宇
 * @LastEditTime: 2025-08-15 16:01:46
 * @FilePath: \survey-frontend\src\pages\manage\List.tsx
 * @Description: 我的问卷
 *
 * Copyright (c) 2025 by 唐宇, All Rights Reserved.
 */
import React, { FC, useState } from 'react';
import { useTitle } from 'ahooks';
import styles from './common.module.scss';
import { Typography } from 'antd';
import QuestionCard from '../../components/QuestionCard';
import ListSearch from '../../components/ListSearch';

const { Title } = Typography;
const questionListData = [
  {
    _id: '1',
    title: '问卷1',
    isStar: true,
    isPublished: false,
    answerCount: 6,
    createdAt: '1月8日 16:56',
  },
  {
    _id: '2',
    title: '问卷2',
    isStar: false,
    isPublished: false,
    answerCount: 19,
    createdAt: '1月9日 16:56',
  },
  {
    _id: '3',
    title: '问卷3',
    isStar: true,
    isPublished: true,
    answerCount: 100,
    createdAt: '1月18日 16:56',
  },
  {
    _id: '4',
    title: '问卷4',
    isStar: false,
    isPublished: false,
    answerCount: 90,
    createdAt: '6月8日 16:56',
  },
];

const List: FC = () => {
  useTitle('小慕问卷 - 我的问卷');
  const [questionList, setQuestionList] = useState(questionListData);

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
      <div className={styles.content}>
        {questionList.length > 0 &&
          questionList.map(question => <QuestionCard key={question._id} {...question} />)}
      </div>
      <div className={styles.footer}>loadMore... 上划加载更多...</div>
    </div>
  );
};

export default List;
