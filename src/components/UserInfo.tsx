/*
 * @Author: 唐宇
 * @Date: 2025-08-13 16:24:07
 * @LastEditors: 唐宇
 * @LastEditTime: 2025-08-28 16:00:20
 * @FilePath: \survey-frontend\src\components\UserInfo.tsx
 * @Description: 用户信息组件。
 *
 * Copyright (c) 2025 by 唐宇, All Rights Reserved.
 */
import React, { FC, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LOGIN_PATHNAME } from '../router';
import { useDispatch } from 'react-redux';
import { removeToken } from '../utils/user-token';
import { getUserInfoApi } from '../api/user';
import { useRequest } from 'ahooks';
import { Dropdown, Menu, Avatar, Space, Typography } from 'antd';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
import useGetUserInfo from '../hooks/useGetUserInfo';
import { logoutReducer } from '../store/userReducer';

const { Text } = Typography;

const UserInfo: FC = () => {
  const nav = useNavigate();
  const dispatch = useDispatch();
  // const [userInfo, setUserInfo] = useState<{ username: string } | null>(null);

  // useRequest(getUserInfoApi, {
  //   onSuccess: data => {
  //     const { username } = data;
  //     setUserInfo({ username });
  //   },
  // });
  const { username, nickname } = useGetUserInfo();

  const logout = () => {
    dispatch(logoutReducer());
    removeToken();
    // setUserInfo(null);
    nav(LOGIN_PATHNAME);
  };

  const menu = (
    <Menu>
      <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={logout}>
        退出登录
      </Menu.Item>
    </Menu>
  );

  if (!username) {
    return <Link to={LOGIN_PATHNAME}>登录</Link>;
  }

  return (
    <Dropdown overlay={menu}>
      <Space>
        <Avatar size="small" icon={<UserOutlined />} />
        <Text style={{ color: 'white' }}>{username}</Text>
      </Space>
    </Dropdown>
  );
};

export default UserInfo;
