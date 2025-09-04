/*
 * @Author: 唐宇
 * @Date: 2025-09-04 14:35:12
 * @LastEditors: 唐宇
 * @LastEditTime: 2025-09-04 14:49:09
 * @FilePath: \survey-frontend\src\components\QuestionComponents\QuestionCheckbox\index.ts
 * @Description: 多选题组件配置文件
 *
 * Copyright (c) 2025 by 唐宇, All Rights Reserved.
 */
import Component from './Component';
import PropsComponent from './PropsComponent';
import { QuestionCheckboxDefaultProps } from './interface';

export * from './interface';

export default {
  title: '多选',
  type: 'questionCheckbox',
  Component,
  PropsComponent,
  defaultProps: QuestionCheckboxDefaultProps,
};
