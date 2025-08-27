import React, { FC, useState } from 'react';
import { useRequest, useTitle } from 'ahooks';
import styles from './common.module.scss';
import { Typography, Table, Tag, Space, Popconfirm, Button, message } from 'antd';
import { StarFilled, StarOutlined } from '@ant-design/icons';
import ListSearch from '../../components/ListSearch';
import useLoadQuestionListData from '../../hooks/useLoadQuestionListData';
import ListPagination from '../../components/ListPagination';
import { updateQuestionApi, deleteQuestionApi } from '../../api/question';

const { Title } = Typography;

const Trash: FC = () => {
  useTitle('小慕问卷 - 回收站');

  const { data = {}, loading, refresh } = useLoadQuestionListData({ isDeleted: true });
  const { list = [], total = 0 } = data;
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
  const [openRestore, setOpenRestore] = useState(false);
  const [openDel, setOpenDel] = useState(false);
  const { run: restore, loading: restoreLoading } = useRequest(
    async () => {
      const taskList = [];
      for (const id of selectedIds) {
        taskList.push(updateQuestionApi(id, { isDeleted: false }));
      }
      await Promise.all(taskList);
    },
    {
      manual: true,
      debounceWait: 500,
      onSuccess: () => {
        setSelectedIds([]);
        message.success('恢复成功');
        refresh();
        setOpenRestore(false);
      },
      onError: () => {
        setSelectedIds([]);
        setOpenRestore(false);
      },
    }
  );
  const { run: deletePermanently, loading: deleteLoading } = useRequest(
    async () => {
      await deleteQuestionApi(selectedIds);
    },
    {
      manual: true,
      onSuccess: () => {
        message.success('彻底删除成功');
        setSelectedIds([]);
        refresh();
        setOpenDel(false);
      },
      onError: () => {
        message.error('彻底删除失败');
        setOpenDel(false);
      },
    }
  );

  const confirmDelHandler = () => {
    deletePermanently();
  };
  const confirmRestoreHandler = () => {
    console.log(selectedIds);
    restore();
  };

  const TableElement: JSX.Element = (
    <>
      <div className={styles['mb-16']}>
        <Space>
          <Popconfirm
            title="确定恢复选中问卷吗？"
            okText="确定"
            cancelText="取消"
            open={openRestore}
            onConfirm={() => confirmRestoreHandler()}
            okButtonProps={{ loading: restoreLoading }}
            onCancel={() => setOpenRestore(false)}
          >
            <Button
              type="primary"
              disabled={selectedIds.length === 0}
              onClick={() => setOpenRestore(!openRestore)}
            >
              恢复
            </Button>
          </Popconfirm>
          <Popconfirm
            title="确定彻底删除选中问卷吗？"
            okText="确定"
            cancelText="取消"
            open={openDel}
            okButtonProps={{ loading: deleteLoading }}
            onConfirm={() => confirmDelHandler()}
            onCancel={() => setOpenDel(false)}
          >
            <Button danger disabled={selectedIds.length === 0} onClick={() => setOpenDel(!openDel)}>
              彻底删除
            </Button>
          </Popconfirm>
        </Space>
      </div>
      <Table
        dataSource={list}
        columns={columns}
        rowKey={(question: any) => question._id}
        pagination={false}
        loading={loading}
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
        <div className={styles.content}>{TableElement}</div>
        <div className={styles.footer}>
          <ListPagination total={total} />
        </div>
      </div>
    </>
  );
};

export default Trash;
