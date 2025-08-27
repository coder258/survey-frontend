/*
 * @Author: 唐宇
 * @Date: 2025-08-13 16:24:07
 * @LastEditors: 唐宇
 * @LastEditTime: 2025-08-27 16:15:56
 * @FilePath: \survey-frontend\src\components\UserInfo.tsx
 * @Description: 用户信息组件。
 *
 * Copyright (c) 2025 by 唐宇, All Rights Reserved.
 */
import React, { FC, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LOGIN_PATHNAME } from '../router';
import { removeToken } from '../utils/user-token';
import { getUserInfoApi } from '../api/user';
import { useRequest } from 'ahooks';
import { Dropdown, Menu, Avatar, Space, Typography } from 'antd';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';

const { Text } = Typography;

const UserInfo: FC = () => {
  const nav = useNavigate();
  const [userInfo, setUserInfo] = useState<{ username: string } | null>(null);

  useRequest(getUserInfoApi, {
    onSuccess: data => {
      const { username } = data;
      setUserInfo({ username });
    },
  });

  const logout = () => {
    removeToken();
    setUserInfo(null);
    nav(LOGIN_PATHNAME);
  };

  const menu = (
    <Menu>
      <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={logout}>
        退出登录
      </Menu.Item>
    </Menu>
  );

  if (!userInfo) {
    return <Link to={LOGIN_PATHNAME}>登录</Link>;
  }

  return (
    <Dropdown overlay={menu}>
      <Space>
        <Avatar size="small" icon={<UserOutlined />} />
        <Text style={{ color: 'white' }}>{userInfo.username}</Text>
      </Space>
    </Dropdown>
  );
};

export default UserInfo;
