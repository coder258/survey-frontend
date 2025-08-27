/*
 * @Author: 唐宇
 * @Date: 2025-08-27 15:10:54
 * @LastEditors: 唐宇
 * @LastEditTime: 2025-08-27 15:15:49
 * @FilePath: \survey-frontend\src\api\user.ts
 * @Description: 用户相关API。
 *
 * Copyright (c) 2025 by 唐宇, All Rights Reserved.
 */
import axios, { ResDataType } from './axios';

/**
 * 获取用户信息API
 *
 * @returns 返回用户信息的Promise对象
 */
export const getUserInfoApi = async (): Promise<ResDataType> => {
  const url = `/api/user/info`;
  const data = (await axios.get(url)) as ResDataType;
  return data;
};

/**
 * 注册API
 *
 * @param username 用户名
 * @param password 密码
 * @param nickname 昵称（可选），如果未提供，则默认为用户名
 * @returns 返回注册结果的Promise对象，包含注册成功或失败的信息
 */
export const registerApi = async (
  username: string,
  password: string,
  nickname?: string
): Promise<ResDataType> => {
  const url = `/api/user/register`;
  const requestBody = {
    username,
    password,
    nickname: nickname || username,
  };
  const data = (await axios.post(url, requestBody)) as ResDataType;
  return data;
};

/**
 * 登录API函数
 *
 * @param username 用户名
 * @param password 密码
 * @returns 返回登录响应数据
 */
export const loginApi = async (username: string, password: string): Promise<ResDataType> => {
  const url = `/api/user/login`;
  const requestBody = { username, password };
  const data = (await axios.post(url, requestBody)) as ResDataType;
  return data;
};
