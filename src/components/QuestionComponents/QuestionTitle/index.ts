/*
 * @Author: 唐宇
 * @Date: 2025-08-29 15:59:11
 * @LastEditors: 唐宇
 * @LastEditTime: 2025-09-01 16:27:59
 * @FilePath: \survey-frontend\src\components\QuestionComponents\QuestionTitle\index.ts
 * @Description: 标题
 *
 * Copyright (c) 2025 by 唐宇, All Rights Reserved.
 */
import Component from './Component';
import PropsComponent from './PropsComponent';
import { QuestionTitleDefaultProps } from './interface';

export * from './interface';

export default {
  title: '标题',
  type: 'questionTitle',
  Component,
  PropsComponent,
  defaultProps: QuestionTitleDefaultProps,
};
