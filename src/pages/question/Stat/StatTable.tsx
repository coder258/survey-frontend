import { Space, Spin, Table, Typography } from 'antd';
import React, { FC, useEffect, useMemo, useState } from 'react';
import styles from './StatTable.module.scss';
import { useRequest } from 'ahooks';
import { getQuestionStatListApi } from '../../../api/stat';
import { useParams } from 'react-router-dom';
import useGetComponentInfo from '../../../hooks/useGetComponentInfo';

type PropsType = {
  loading: boolean;
};

const { Title } = Typography;

const StatTable: FC<PropsType> = (props: PropsType) => {
  const { loading: questionDataLoading } = props;
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
  const [pageNum, setPageNum] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { loading: tableLoading, run: loadTableData } = useRequest(
    async () => {
      const opt = { pageNum, pageSize };
      const getQuestionStatListApiRes = await getQuestionStatListApi(id, opt);
      return getQuestionStatListApiRes;
    },
    {
      manual: true,
      onSuccess: result => {
        const { total, list } = result;
        setTotal(total);
        setDataSource(list);
      },
    }
  );

  useEffect(() => {
    loadTableData();
  });

  const { componentList } = useGetComponentInfo();
  const genColumns = useMemo(() => {
    return componentList.map(c => {
      const { fe_id, title, props } = c;
      const colTitle = props!.title || title;

      return {
        title: colTitle,
        dataIndex: fe_id,
        key: fe_id,
      };
    });
  }, [dataSource]);

  return (
    <div className={styles.container}>
      <Space direction="vertical">
        <div>
          <Title>答卷数量：{total}</Title>
        </div>
        <div>
          <Table loading={tableLoading} dataSource={dataSource} columns={genColumns}></Table>
        </div>
      </Space>
    </div>
  );
};

export default StatTable;
