import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './EditHeader.module.scss';
import { Button, Space, Typography } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import EditToolbar from './EditToolbar';

const { Title } = Typography;

const EditHeader: FC = () => {
  const nav = useNavigate();

  return (
    <div className={`${styles['header-wrapper']} ${styles['py-12']}`}>
      <div className={`${styles['header']} ${styles['mx-24']}`}>
        <div className={styles.left}>
          <Space>
            <Button type="link" icon={<LeftOutlined />} onClick={() => nav(-1)}>
              返回
            </Button>
            <Title className={`${styles['text-lg']} ${styles['mb-0']}`}>问卷标题</Title>
          </Space>
        </div>
        <div className={`${styles.main} ${styles['text-center']}`}>
          <EditToolbar></EditToolbar>
        </div>
        <div className={`${styles.right} ${styles['text-right']}`}>
          <Space>
            <Button>保存</Button>
            <Button type="primary">发布</Button>
          </Space>
        </div>
      </div>
    </div>
  );
};

export default EditHeader;
