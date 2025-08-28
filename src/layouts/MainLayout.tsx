/*
 * @Author: 唐宇
 * @Date: 2025-08-05 16:32:16
 * @LastEditors: 唐宇
 * @LastEditTime: 2025-08-28 16:54:14
 * @FilePath: \survey-frontend\src\layouts\MainLayout.tsx
 * @Description: 首页模板
 *
 * Copyright (c) 2025 by 唐宇, All Rights Reserved.
 */
import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { Layout, Spin } from 'antd';
import styles from './MainLayout.module.scss';
import Logo from '../components/Logo';
import UserInfo from '../components/UserInfo';
import useLoadUserData from '../hooks/useLoadUserData';
import useNavPage from '../hooks/useNavPage';

const { Header, Footer, Content } = Layout;

const MainLayout: FC = () => {
  const { waitingUserData } = useLoadUserData();
  useNavPage(waitingUserData);

  return (
    <Layout className={styles.layout}>
      <Header className={styles.header}>
        <div className={styles.left}>
          <Logo />
        </div>
        <div className={styles.right}>
          <UserInfo />
        </div>
      </Header>
      <Content className={styles.content}>
        {waitingUserData ? (
          <div className={styles['full-screen-center']}>
            <Spin></Spin>
          </div>
        ) : (
          <Outlet />
        )}
      </Content>
      <Footer className={styles.footer}>小慕问卷 &copy;2025 - present. Created by tangyu</Footer>
    </Layout>
  );
};

export default MainLayout;
