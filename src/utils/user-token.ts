/*
 * @Author: 唐宇
 * @Date: 2025-08-27 15:54:06
 * @LastEditors: 唐宇
 * @LastEditTime: 2025-08-27 15:56:23
 * @FilePath: \survey-frontend\src\utils\user-token.ts
 * @Description: 用户token工具类
 *
 * Copyright (c) 2025 by 唐宇, All Rights Reserved.
 */
const KEY = 'USER_TOKEN';

export const setToken = (token: string) => {
  localStorage.setItem(KEY, token);
};

export const getToken = () => {
  return localStorage.getItem(KEY) || '';
};

export const removeToken = () => {
  localStorage.removeItem(KEY);
};
