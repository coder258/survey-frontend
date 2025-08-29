/*
 * @Author: 唐宇
 * @Date: 2025-08-29 15:56:29
 * @LastEditors: 唐宇
 * @LastEditTime: 2025-08-29 15:58:54
 * @FilePath: \survey-frontend\src\components\QuestionComponents\QuestionInput\index.ts
 * @Description: 问卷输入框
 *
 * Copyright (c) 2025 by 唐宇, All Rights Reserved.
 */
import Component from './Component';
import { QuestionInputDefaultProps } from './interface';

export * from './interface';

export default {
  title: '输入框',
  type: 'questionInput',
  Component,
  defaultProps: QuestionInputDefaultProps,
};
