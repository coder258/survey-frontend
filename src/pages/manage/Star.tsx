import React, { FC, useState } from 'react';
import { useTitle } from 'ahooks';
import styles from './common.module.scss';
import { Typography, Empty } from 'antd';
import QuestionCard from '../../components/QuestionCard';

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
    isStar: true,
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
];

const Star: FC = () => {
  useTitle('小慕问卷 - 星标问卷');
  const [questionList, setQuestionList] = useState(questionListData);
  return (
    <>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.left}>
            <Title level={3}>星标问卷</Title>
          </div>
          <div className={styles.right}>（搜索）</div>
        </div>
        <div className={styles.content}>
          {questionList.length > 0 ? (
            questionList.map(question => <QuestionCard key={question._id} {...question} />)
          ) : (
            <Empty description="暂无数据" />
          )}
        </div>
        <div className={styles.footer}>分页</div>
      </div>
    </>
  );
};

export default Star;
