/*
 * @Author: 唐宇
 * @Date: 2025-08-28 16:45:08
 * @LastEditors: 唐宇
 * @LastEditTime: 2025-08-28 16:52:06
 * @FilePath: \survey-frontend\src\hooks\useNavPage.ts
 * @Description: 导航页面钩子，用于处理登录状态和路由跳转逻辑。
 *
 * Copyright (c) 2025 by 唐宇, All Rights Reserved.
 */
import { useLocation, useNavigate } from 'react-router-dom';
import useGetUserInfo from './useGetUserInfo';
import { useEffect } from 'react';
import {
  LOGIN_PATHNAME,
  MANAGE_INDEX_PATHNAME,
  isLoginOrRegisterPage,
  isNoNeedUserInfo,
} from '../router';

const useNavPage = (waitingUserData: boolean) => {
  const { username } = useGetUserInfo();
  const { pathname } = useLocation();
  const nav = useNavigate();

  useEffect(() => {
    if (waitingUserData) {
      return;
    }
    if (username) {
      if (isLoginOrRegisterPage(pathname)) {
        nav(MANAGE_INDEX_PATHNAME);
      }
      return;
    }

    if (isNoNeedUserInfo(pathname)) {
      return;
    } else {
      nav(LOGIN_PATHNAME);
    }
  }, [waitingUserData, username, pathname]);
};

export default useNavPage;
