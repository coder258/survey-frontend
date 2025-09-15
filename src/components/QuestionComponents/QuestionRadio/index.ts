/*
 * @Author: 唐宇
 * @Date: 2025-09-03 15:04:54
 * @LastEditors: 唐宇
 * @LastEditTime: 2025-09-12 14:27:37
 * @FilePath: \survey-frontend\src\components\QuestionComponents\QuestionRadio\index.ts
 * @Description: 问卷单选框
 *
 * Copyright (c) 2025 by 唐宇, All Rights Reserved.
 */
import Component from './Component';
import PropsComponent from './PropsComponent';
import { QuestionRadioDefaultProps } from './interface';
import StatComponent from './StatComponent';

export * from './interface';

export default {
  title: '单选',
  type: 'questionRadio',
  Component,
  PropsComponent,
  defaultProps: QuestionRadioDefaultProps,
  StatComponent,
};
