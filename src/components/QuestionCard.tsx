import React, { FC } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button, Space, Divider, Tag, Popconfirm } from 'antd';
import {
  EditOutlined,
  LineChartOutlined,
  StarOutlined,
  CopyOutlined,
  DeleteOutlined,
  StarFilled,
} from '@ant-design/icons';
import styles from './QuestionCard.module.scss';

interface PropsType {
  _id: string;
  title: string;
  isStar: boolean;
  isPublished: boolean;
  answerCount: number;
  createdAt: string;
}

const QuestionCard: FC<PropsType> = (props: PropsType) => {
  const nav = useNavigate();
  const { _id, title, isStar, isPublished, answerCount, createdAt } = props;
  const starClickHandler = (_id: string) => {
    console.log(_id);
  };
  const copyClickHandler = (_id: string) => {
    console.log(_id);
  };
  const deleteClickHandler = (_id: string) => {
    console.log(_id);
  };

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div className={styles.left}>
          <Link to={isPublished ? `/question/stat/${_id}` : `/question/edit/${_id}`}>
            <Space>
              {isStar && <StarOutlined className={styles['star-red']} />}
              {title}
            </Space>
          </Link>
        </div>
        <div className={styles.right}>
          <Space>
            {isPublished ? <Tag color="processing">已发布</Tag> : <Tag>未发布</Tag>}{' '}
            <span>答卷：{answerCount}</span>
            <span>{createdAt}</span>
          </Space>
        </div>
      </div>
      <Divider className={styles.divider}></Divider>
      <div className={styles.bottom}>
        <div className={styles.left}>
          <Space>
            <Button
              icon={<EditOutlined />}
              type="text"
              size="small"
              onClick={() => nav(`/question/edit/${_id}`)}
            >
              编辑问卷
            </Button>
            <Button
              icon={<LineChartOutlined />}
              type="text"
              size="small"
              disabled={!isPublished}
              onClick={() => nav(`/question/stat/${_id}`)}
            >
              问卷统计
            </Button>
          </Space>
        </div>
        <div className={styles.right}>
          <Space>
            <Button
              icon={isStar ? <StarFilled className={styles['star-fill']} /> : <StarOutlined />}
              type="text"
              size="small"
              onClick={() => starClickHandler(_id)}
            >
              {isStar ? '取消标星' : '标星'}
            </Button>
            <Popconfirm
              title="确定复制此问卷吗？"
              okText="确定"
              cancelText="取消"
              onConfirm={() => copyClickHandler(_id)}
            >
              <Button icon={<CopyOutlined />} type="text" size="small">
                复制
              </Button>
            </Popconfirm>
            <Popconfirm
              title="确定删除此问卷吗？此操作执行后不可撤销！"
              okText="确定"
              cancelText="取消"
              onConfirm={() => deleteClickHandler(_id)}
            >
              <Button icon={<DeleteOutlined />} type="text" size="small">
                删除
              </Button>
            </Popconfirm>
          </Space>
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
