/*
 * @Author: 唐宇
 * @Date: 2025-08-28 16:05:04
 * @LastEditors: 唐宇
 * @LastEditTime: 2025-08-28 16:19:02
 * @FilePath: \survey-frontend\src\hooks\useLoadUserData.ts
 * @Description: 加载用户数据钩子
 *
 * Copyright (c) 2025 by 唐宇, All Rights Reserved.
 */
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRequest } from 'ahooks';
import { getUserInfoApi } from '../api/user';
import { loginReducer } from '../store/userReducer';
import useGetUserInfo from './useGetUserInfo';

const useLoadUserData = () => {
  const dispatch = useDispatch();
  const [waitingUserData, setWaitingUserData] = useState(true);
  const { run } = useRequest(getUserInfoApi, {
    manual: true,
    onSuccess: result => {
      const { username, nickname } = result;
      dispatch(loginReducer({ username, nickname }));
    },
    onFinally: () => {
      setWaitingUserData(false);
    },
  });

  const { username } = useGetUserInfo();
  useEffect(() => {
    if (username) {
      setWaitingUserData(false);
      return;
    }
    run();
  }, [username]);

  return { waitingUserData };
};

export default useLoadUserData;
