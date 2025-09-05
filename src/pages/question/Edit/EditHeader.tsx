/*
 * @Author: 唐宇
 * @Date: 2025-09-02 10:50:48
 * @LastEditors: 唐宇
 * @LastEditTime: 2025-09-05 12:23:43
 * @FilePath: \survey-frontend\src\pages\question\Edit\EditHeader.tsx
 * @Description: 编辑问卷头部组件
 *
 * Copyright (c) 2025 by 唐宇, All Rights Reserved.
 */
import React, { ChangeEvent, FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './EditHeader.module.scss';
import { Button, Input, message, Space, Typography } from 'antd';
import { EditOutlined, LeftOutlined } from '@ant-design/icons';
import EditToolbar from './EditToolbar';
import useGetPageInfo from '../../../hooks/useGetPageInfo';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../../store/pageInfoReducer';

const { Title } = Typography;

const TitleElem: FC = () => {
  const { title } = useGetPageInfo();
  const dispatch = useDispatch();

  const [editState, setEditState] = useState<boolean>(false);
  const titleChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const newTitle = event.target.value.trim();
    if (!newTitle) {
      message.warning('问卷标题不能为空');
      return;
    }
    dispatch(setPageTitle(newTitle));
  };

  if (editState) {
    return (
      <Input
        autoFocus
        allowClear
        value={title}
        onChange={titleChangeHandler}
        onPressEnter={() => setEditState(false)}
        onBlur={() => setEditState(false)}
      ></Input>
    );
  }

  return (
    <Space>
      <Title className={`${styles['text-lg']} ${styles['mb-0']}`}>{title}</Title>
      <Button type="text" icon={<EditOutlined />} onClick={() => setEditState(true)} />
    </Space>
  );
};

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
            <TitleElem />
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
