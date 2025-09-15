/*
 * @Author: 唐宇
 * @Date: 2025-09-11 10:56:06
 * @LastEditors: 唐宇
 * @LastEditTime: 2025-09-12 14:17:06
 * @FilePath: \survey-frontend\src\pages\question\Stat\StatTable.tsx
 * @Description: 答卷统计表格组件
 *
 * Copyright (c) 2025 by 唐宇, All Rights Reserved.
 */
import { Space, Spin, Table, Typography } from 'antd';
import React, { FC, useEffect, useMemo, useState } from 'react';
import styles from './StatTable.module.scss';
import { useRequest } from 'ahooks';
import { getQuestionStatListApi } from '../../../api/stat';
import { useParams, useSearchParams } from 'react-router-dom';
import useGetComponentInfo from '../../../hooks/useGetComponentInfo';
import ListPagination from '../../../components/ListPagination';
import {
  LIST_PAGE_NUM_PARAM_KEY,
  LIST_PAGE_SIZE,
  LIST_PAGE_SIZE_PARAM_KEY,
} from '../../../constant';

type PropsType = {
  loading: boolean;
  selectedId: string;
  setSelectedId: (id: string) => void;
  setComponentType: (type: string) => void;
};

const { Title } = Typography;

const StatTable: FC<PropsType> = (props: PropsType) => {
  const { loading: questionDataLoading, selectedId, setSelectedId, setComponentType } = props;
  if (questionDataLoading) {
    return (
      <div className={styles['loading-center']}>
        <Spin></Spin>
      </div>
    );
  }

  const { id = '' } = useParams();
  const [total, setTotal] = useState(0);
  const [dataSource, setDataSource] = useState<any[]>([]);
  const [searchParams] = useSearchParams();

  const { loading: tableLoading } = useRequest(
    async () => {
      const pageNum = parseInt(searchParams.get(LIST_PAGE_NUM_PARAM_KEY) || '') || 1;
      const pageSize = parseInt(searchParams.get(LIST_PAGE_SIZE_PARAM_KEY) || '') || LIST_PAGE_SIZE;
      const opt = { pageNum, pageSize };
      const getQuestionStatListApiRes = await getQuestionStatListApi(id, opt);
      return getQuestionStatListApiRes;
    },
    {
      onSuccess: result => {
        const { total, list } = result;
        setTotal(total);
        setDataSource(list);
      },
      refreshDeps: [searchParams],
    }
  );

  const { componentList } = useGetComponentInfo();
  const genColumns = useMemo(() => {
    return componentList.map(c => {
      const { fe_id, title, props, type } = c;
      const colTitle = props!.title || title;
      return {
        title: (
          <div
            className={`${styles['cursor-pointer']}`}
            onClick={() => {
              setComponentType(type);
              setSelectedId(fe_id);
            }}
          >
            <span
              style={{ color: selectedId === fe_id ? '#1890ff' : 'inherit', transition: '.3s' }}
            >
              {colTitle}
            </span>
          </div>
        ),
        dataIndex: fe_id,
        key: fe_id,
      };
    });
  }, [dataSource, selectedId]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Title level={3}>答卷数量：{total}</Title>
      </div>
      <div className={styles.content}>
        <Table
          loading={tableLoading}
          rowKey={question => question._id}
          pagination={false}
          dataSource={dataSource}
          columns={genColumns}
        ></Table>
      </div>
      <div className={styles.footer}>
        <ListPagination total={total} />
      </div>
    </div>
  );
};

export default StatTable;
