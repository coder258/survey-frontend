/*
 * @Author: 唐宇
 * @Date: 2025-08-05 16:40:35
 * @LastEditors: 唐宇
 * @LastEditTime: 2025-08-12 17:15:08
 * @FilePath: \survey-frontend\src\layouts\ManageLayout.tsx
 * @Description: 管理模板
 *
 * Copyright (c) 2025 by 唐宇, All Rights Reserved.
 */
import React, { FC, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import styles from './ManageLayout.module.scss';
import { Button, Space, Divider } from 'antd';
import type { ButtonType } from 'antd/es/button';
import { PlusOutlined, BarsOutlined, StarOutlined, DeleteOutlined } from '@ant-design/icons';

const ManageLayout: FC = () => {
  const nav = useNavigate();
  const [buttonTypeMapper, setButtonTypeMapper] = useState<{ [key: string]: ButtonType }>({
    '/manage/list': 'default',
    '/manage/star': 'default',
    '/manage/trash': 'default',
  });
  const menuClickHandler = (path: string) => {
    setButtonTypeMapper({
      '/manage/list': 'default',
      '/manage/star': 'default',
      '/manage/trash': 'default',
      [path]: 'text',
    });
    nav(path);
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.left}>
          <Space direction="vertical">
            <Button type="primary" size="large" icon={<PlusOutlined />}>
              新建问卷
            </Button>
            <Divider />
            <Button
              type={buttonTypeMapper['/manage/list']}
              size="large"
              icon={<BarsOutlined />}
              onClick={() => menuClickHandler('/manage/list')}
            >
              我的问卷
            </Button>
            <Button
              type={buttonTypeMapper['/manage/star']}
              size="large"
              icon={<StarOutlined />}
              onClick={() => menuClickHandler('/manage/star')}
            >
              星标问卷
            </Button>
            <Button
              type={buttonTypeMapper['/manage/trash']}
              size="large"
              icon={<DeleteOutlined />}
              onClick={() => menuClickHandler('/manage/trash')}
            >
              回收站
            </Button>
          </Space>
        </div>
        <div className={styles.right}>
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default ManageLayout;
