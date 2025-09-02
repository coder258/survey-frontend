/*
 * @Author: 唐宇
 * @Date: 2025-09-02 16:16:15
 * @LastEditors: 唐宇
 * @LastEditTime: 2025-09-02 16:17:29
 * @FilePath: \survey-frontend\src\utils\lodash.ts
 * @Description: 常用lodash工具函数
 *
 * Copyright (c) 2025 by 唐宇, All Rights Reserved.
 */
export const deepClone = (obj: any) => {
  return JSON.parse(JSON.stringify(obj));
};
