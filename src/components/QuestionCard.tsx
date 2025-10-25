import React, { FC, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button, Space, Divider, Tag, Popconfirm, message } from 'antd';
import {
  EditOutlined,
  LineChartOutlined,
  StarOutlined,
  CopyOutlined,
  DeleteOutlined,
  StarFilled,
} from '@ant-design/icons';
import styles from './QuestionCard.module.scss';
import { updateQuestionApi, duplicateQuestionApi } from '../api/question';
import { useRequest } from 'ahooks';
import DateFormatter from '../utils/date-format';

interface PropsType {
  _id: string;
  title: string;
  isStar: boolean;
  isPublished: boolean;
  answerCount: number;
  createdAt: string;
  onStarChange?: (id: string, newIsStar: boolean) => void;
  onDelete?: (id: string) => void;
}

const QuestionCard: FC<PropsType> = (props: PropsType) => {
  const nav = useNavigate();
  const { _id, title, isStar, isPublished, answerCount, createdAt } = props;
  const newDate = DateFormatter.format({ date: createdAt, format: 'yyyy-MM-dd HH:mm:ss' });
  const [isStarState, setIsStarState] = useState(isStar);
  const [openCopyPop, setOpenCopyPop] = useState(false);
  const [openDeletePop, setOpenDeletePop] = useState(false);
  // 标星/取消标星
  const { run: toggleStar, loading: starLoading } = useRequest(
    async () => {
      await updateQuestionApi(_id, { isStar: !isStarState });
    },
    {
      manual: true,
      onSuccess: () => {
        setIsStarState(!isStarState);
        message.success(isStarState ? '取消标星' : '已标星');
        if (props.onStarChange) {
          props.onStarChange(_id, isStarState);
        }
      },
    }
  );

  const starClickHandler = () => {
    toggleStar();
  };
  // 复制问卷
  const { run: copyQuestion, loading: copyLoading } = useRequest(
    async () => {
      const data = await duplicateQuestionApi(_id);
      return data;
    },
    {
      manual: true,
      onSuccess: data => {
        if (data.id || data._id) {
          message.success('复制成功');
          nav(`/question/edit/${data._id || data.id}`);
        }
        setOpenCopyPop(false);
      },
      onError: () => {
        message.error('复制失败');
        setOpenCopyPop(false);
      },
    }
  );

  const copyClickHandler = () => {
    copyQuestion();
  };
  // 删除问卷
  const { run: deleteQuestion, loading: deleteLoading } = useRequest(
    async () => {
      await updateQuestionApi(_id, { isDeleted: true });
    },
    {
      manual: true,
      onSuccess: () => {
        message.success('删除成功');
        if (props.onDelete) {
          props.onDelete(_id);
        }
        setOpenDeletePop(false);
      },
      onError: () => {
        message.error('删除失败');
        setOpenDeletePop(false);
      },
    }
  );

  const deleteClickHandler = () => {
    deleteQuestion();
  };

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div className={styles.left}>
          <Link to={isPublished ? `/question/stat/${_id}` : `/question/edit/${_id}`}>
            <Space>
              {isStarState && <StarOutlined className={styles['star-red']} />}
              {title}
            </Space>
          </Link>
        </div>
        <div className={styles.right}>
          <Space>
            {isPublished ? <Tag color="processing">已发布</Tag> : <Tag>未发布</Tag>}{' '}
            <span>答卷：{answerCount}</span>
            <span>{newDate}</span>
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
              icon={isStarState ? <StarFilled className={styles['star-fill']} /> : <StarOutlined />}
              type="text"
              size="small"
              loading={starLoading}
              onClick={starClickHandler}
            >
              {isStarState ? '取消标星' : '标星'}
            </Button>
            <Popconfirm
              title="确定复制此问卷吗？"
              okText="确定"
              cancelText="取消"
              onConfirm={copyClickHandler}
              onCancel={() => setOpenCopyPop(false)}
              open={openCopyPop}
              okButtonProps={{ loading: copyLoading }}
            >
              <Button
                icon={<CopyOutlined />}
                type="text"
                size="small"
                onClick={() => setOpenCopyPop(!openCopyPop)}
              >
                复制
              </Button>
            </Popconfirm>
            <Popconfirm
              title="确定删除此问卷吗？此操作执行后不可撤销！"
              okText="确定"
              cancelText="取消"
              onConfirm={deleteClickHandler}
              onCancel={() => setOpenDeletePop(false)}
              open={openDeletePop}
              okButtonProps={{ loading: deleteLoading }}
            >
              <Button
                icon={<DeleteOutlined />}
                type="text"
                size="small"
                onClick={() => setOpenDeletePop(!openDeletePop)}
              >
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
