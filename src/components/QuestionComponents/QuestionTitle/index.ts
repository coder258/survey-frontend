/*
 * @Author: 唐宇
 * @Date: 2025-08-29 15:59:11
 * @LastEditors: 唐宇
 * @LastEditTime: 2025-08-29 16:01:04
 * @FilePath: \survey-frontend\src\components\QuestionComponents\QuestionTitle\index.ts
 * @Description: 标题
 *
 * Copyright (c) 2025 by 唐宇, All Rights Reserved.
 */
import Component from './Component';
import { QuestionTitleDefaultProps } from './interface';

export * from './interface';

export default {
  title: '标题',
  type: 'questionTitle',
  Component,
  defaultProps: QuestionTitleDefaultProps,
};
