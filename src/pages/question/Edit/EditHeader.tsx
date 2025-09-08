/*
 * @Author: 唐宇
 * @Date: 2025-09-02 10:50:48
 * @LastEditors: 唐宇
 * @LastEditTime: 2025-09-08 15:31:22
 * @FilePath: \survey-frontend\src\pages\question\Edit\EditHeader.tsx
 * @Description: 编辑问卷头部组件
 *
 * Copyright (c) 2025 by 唐宇, All Rights Reserved.
 */
import React, { ChangeEvent, FC, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './EditHeader.module.scss';
import { Button, Input, message, Space, Typography } from 'antd';
import { EditOutlined, LeftOutlined } from '@ant-design/icons';
import EditToolbar from './EditToolbar';
import useGetPageInfo from '../../../hooks/useGetPageInfo';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../../store/pageInfoReducer';
import useGetComponentInfo from '../../../hooks/useGetComponentInfo';
import { useDebounceEffect, useKeyPress, useRequest } from 'ahooks';
import { updateQuestionApi } from '../../../api/question';

const { Title } = Typography;

// 问卷标题与修改按钮
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

// 保存按钮
const SaveButton: FC = () => {
  const { id } = useParams();
  const { componentList } = useGetComponentInfo();
  const pageInfo = useGetPageInfo();
  const {
    loading,
    error,
    run: save,
  } = useRequest(
    async () => {
      if (!id) {
        return;
      }
      await updateQuestionApi(id, { ...pageInfo, componentList });
    },
    {
      manual: true,
      onSuccess: () => {
        message.success('问卷保存成功');
      },
      onError: error => {
        console.log(error);
        message.error('问卷保存失败');
      },
    }
  );

  useKeyPress(['ctrl.s', 'meta.s'], (event: KeyboardEvent) => {
    event.preventDefault();
    if (!loading) {
      save();
    }
  });

  // 自动保存
  useDebounceEffect(
    () => {
      const { isAutoSave = true } = pageInfo;
      if (!isAutoSave) {
        return;
      }
      if (!loading) {
        save();
      }
    },
    [componentList, pageInfo],
    { wait: 1000 }
  );

  return (
    <Button onClick={save} loading={loading}>
      保存
    </Button>
  );
};

// 发布按钮
const PublishButton: FC = () => {
  const nav = useNavigate();
  const { id } = useParams();
  const { componentList } = useGetComponentInfo();
  const pageInfo = useGetPageInfo();
  const {
    loading,
    error,
    run: publish,
  } = useRequest(
    async () => {
      if (!id) {
        return;
      }
      await updateQuestionApi(id, { ...pageInfo, componentList, isPublished: true });
    },
    {
      manual: true,
      onSuccess: () => {
        message.success('问卷发布成功');
        nav(`/question/stat/${id}`);
      },
      onError: error => {
        console.log(error);
        message.error('问卷发布失败');
      },
    }
  );

  return (
    <Button type="primary" onClick={publish} loading={loading}>
      发布
    </Button>
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
            <SaveButton />
            <PublishButton />
          </Space>
        </div>
      </div>
    </div>
  );
};

export default EditHeader;
