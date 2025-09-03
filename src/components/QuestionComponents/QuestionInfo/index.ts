/*
 * @Author: 唐宇
 * @Date: 2025-09-03 12:04:32
 * @LastEditors: 唐宇
 * @LastEditTime: 2025-09-03 12:17:10
 * @FilePath: \survey-frontend\src\components\QuestionComponents\QuestionInfo\index.ts
 * @Description: 问卷信息
 *
 * Copyright (c) 2025 by 唐宇, All Rights Reserved.
 */
import Component from './Component';
import PropsComponent from './PropsComponent';
import { QuestionInfoDefaultProps } from './interface';

export * from './interface';

// QuestionInfo 组件配置
export default {
  title: '问卷信息',
  type: 'questionInfo',
  Component,
  PropsComponent,
  defaultProps: QuestionInfoDefaultProps,
};
