/*
 * @Author: 唐宇
 * @Date: 2025-08-12 17:21:55
 * @LastEditors: 唐宇
 * @LastEditTime: 2025-08-28 16:04:00
 * @FilePath: \survey-frontend\src\components\Logo.tsx
 * @Description: LOGO组件
 *
 * Copyright (c) 2025 by 唐宇, All Rights Reserved.
 */
import React, { FC, useEffect } from 'react';
import { Space, Typography } from 'antd';
import { FormOutlined } from '@ant-design/icons';
import styles from './Logo.module.scss';
import { Link } from 'react-router-dom';
import useGetUserInfo from '../hooks/useGetUserInfo';
import { HOME_PATHNAME, MANAGE_INDEX_PATHNAME } from '../router';

const { Title } = Typography;

const Logo: FC = () => {
  const { username } = useGetUserInfo();
  const [pathname, setPathname] = React.useState(HOME_PATHNAME);
  useEffect(() => {
    if (username) {
      setPathname(MANAGE_INDEX_PATHNAME);
    } else {
      setPathname(HOME_PATHNAME);
    }
  }, [username]);
  return (
    <div className={styles.container}>
      <Link to={pathname}>
        <Space>
          <Title>
            <FormOutlined />
          </Title>
          <Title>小慕问卷</Title>
        </Space>
      </Link>
    </div>
  );
};

export default Logo;
