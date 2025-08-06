/*
 * @Author: 唐宇
 * @Date: 2025-08-05 16:40:35
 * @LastEditors: 唐宇
 * @LastEditTime: 2025-08-05 16:52:36
 * @FilePath: \survey-frontend\src\layouts\ManageLayout.tsx
 * @Description: 管理模板
 *
 * Copyright (c) 2025 by 唐宇, All Rights Reserved.
 */
import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';
import styles from './ManageLayout.module.scss';

const ManageLayout: FC = () => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.left}>
          <p>ManageLayout left</p>
          <button>创建问卷</button>
          <br />
          <a>我的问卷</a>
          <br />
          <a>星标问卷</a>
          <br />
          <a>回收站</a>
          <br />
        </div>
        <div className={styles.right}>
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default ManageLayout;
