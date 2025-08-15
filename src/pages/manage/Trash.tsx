import React, { FC, useState } from 'react';
import { useTitle } from 'ahooks';
import styles from './common.module.scss';
import { Typography, Empty, Table, Tag, Space, Popconfirm, Button } from 'antd';
import { StarFilled, StarOutlined } from '@ant-design/icons';
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
    isStar: false,
    isPublished: true,
    answerCount: 100,
    createdAt: '1月18日 16:56',
  },
];

const Trash: FC = () => {
  useTitle('小慕问卷 - 回收站');

  const [questionList, setQuestionList] = useState(questionListData);

  const columns = [
    {
      title: '问卷标题',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: '是否星标',
      dataIndex: 'isStar',
      key: 'isStar',
      render: (isStar: boolean) => {
        return isStar ? (
          <Space>
            <StarFilled className={styles['star-fill']} /> 已标星
          </Space>
        ) : (
          <Space>
            <StarOutlined />
            未标星
          </Space>
        );
      },
    },
    {
      title: '发布状态',
      dataIndex: 'isPublished',
      key: 'isPublished',
      render: (isPublished: boolean) => {
        return <Tag color={isPublished ? 'green' : ''}>{isPublished ? '已发布' : '未发布'}</Tag>;
      },
    },
    {
      title: '答卷数',
      dataIndex: 'answerCount',
      key: 'answerCount',
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (createdAt: string) => {
        return <Tag color="blue">{createdAt}</Tag>;
      },
    },
  ];

  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const confirmDelHandler = () => {
    console.log(selectedIds);
  };
  const confirmRestoreHandler = () => {
    console.log(selectedIds);
  };

  const TableElement: JSX.Element = (
    <>
      <div className={styles['mb-16']}>
        <Space>
          <Popconfirm
            title="确定恢复选中问卷吗？"
            okText="确定"
            cancelText="取消"
            onConfirm={() => confirmRestoreHandler()}
          >
            <Button type="primary" disabled={selectedIds.length === 0}>
              恢复
            </Button>
          </Popconfirm>
          <Popconfirm
            title="确定彻底删除选中问卷吗？"
            okText="确定"
            cancelText="取消"
            onConfirm={() => confirmDelHandler()}
          >
            <Button danger disabled={selectedIds.length === 0}>
              彻底删除
            </Button>
          </Popconfirm>
        </Space>
      </div>
      <Table
        dataSource={questionList}
        columns={columns}
        rowKey={question => question._id}
        pagination={false}
        rowSelection={{
          type: 'checkbox',
          onChange: selectedRowKeys => setSelectedIds(selectedRowKeys as string[]),
        }}
      />
    </>
  );

  return (
    <>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.left}>
            <Title level={3}>回收站</Title>
          </div>
          <div className={styles.right}>
            <ListSearch />
          </div>
        </div>
        <div className={styles.content}>
          {questionList.length > 0 ? TableElement : <Empty description="暂无数据" />}
        </div>
        <div className={styles.footer}>分页</div>
      </div>
    </>
  );
};

export default Trash;
