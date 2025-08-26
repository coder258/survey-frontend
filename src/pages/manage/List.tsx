/*
 * @Author: 唐宇
 * @Date: 2025-08-04 16:45:54
 * @LastEditors: 唐宇
 * @LastEditTime: 2025-08-26 16:30:03
 * @FilePath: \survey-frontend\src\pages\manage\List.tsx
 * @Description: 我的问卷页面
 *
 * Copyright (c) 2025 by 唐宇, All Rights Reserved.
 */
import React, { FC, useEffect, useRef, useState } from 'react';
import { useTitle, useDebounceFn, useRequest } from 'ahooks';
import { useSearchParams } from 'react-router-dom';
import styles from './common.module.scss';
import { Spin, Typography } from 'antd';
import QuestionCard from '../../components/QuestionCard';
import ListSearch from '../../components/ListSearch';
import { getQuestionListApi } from '../../api/question';
import { LIST_SEARCH_PARAM_KEY, LIST_PAGE_SIZE } from '../../constant';

const { Title } = Typography;

const List: FC = () => {
  useTitle('小慕问卷 - 我的问卷');
  const [searchParams] = useSearchParams();
  const [list, setList] = useState<any[]>([]);
  const [pageNum, setPageNum] = useState(1);
  const [total, setTotal] = useState(0);
  const [loadingMore, setLoadingMore] = useState(false);
  const [noMoreData, setNoMoreData] = useState(false);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const keyword = searchParams.get(LIST_SEARCH_PARAM_KEY) || '';

  // 加载数据
  const { run: loadData, loading } = useRequest(
    async () => {
      const data = await getQuestionListApi({
        keyword,
        pageNum,
        pageSize: LIST_PAGE_SIZE,
        isStar: false,
        isDeleted: false,
      });
      return data;
    },
    {
      manual: true,
      onSuccess: result => {
        const { list: newList = [], total = 0 } = result;
        setList(pageNum === 1 ? newList : [...list, ...newList]);
        setTotal(total);
        setNoMoreData(newList.length < LIST_PAGE_SIZE);
      },
      onFinally: () => {
        setLoadingMore(false);
      },
    }
  );

  // 重置分页状态
  useEffect(() => {
    setPageNum(1);
    setList([]);
    setNoMoreData(false);
    setTotal(0);
    // 清空列表后，IntersectionObserver会自动触发加载
  }, [keyword]);

  // 防抖加载更多
  const { run: tryLoadMore } = useDebounceFn(
    () => {
      if (noMoreData || loadingMore) return;
      setPageNum(pageNum + 1);
      setLoadingMore(true);
      loadData();
    },
    { wait: 500 }
  );

  // Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          tryLoadMore();
        }
      },
      { threshold: 0.1 }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current);
      }
    };
  }, [list, noMoreData]);

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
      <Spin spinning={loading && !loadingMore}>
        <div className={styles.content}>
          {list.length > 0 &&
            list.map((question: any) => <QuestionCard key={question._id} {...question} />)}
        </div>
      </Spin>
      <div ref={loadMoreRef} className={styles.footer}>
        <Spin spinning={loadingMore}>
          {noMoreData ? '没有更多数据了' : loadingMore ? '加载中...' : '上划加载更多'}
        </Spin>
      </div>
    </div>
  );
};

export default List;
