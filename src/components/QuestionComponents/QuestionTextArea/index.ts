/*
 * @Author: 唐宇
 * @Date: 2025-08-29 15:56:29
 * @LastEditors: 唐宇
 * @LastEditTime: 2025-09-03 11:16:50
 * @FilePath: \survey-frontend\src\components\QuestionComponents\QuestionInput\index.ts
 * @Description: 问卷多行输入框
 *
 * Copyright (c) 2025 by 唐宇, All Rights Reserved.
 */
import Component from './Component';
import PropsComponent from './PropsComponent';
import { QuestionTextAreaDefaultProps } from './interface';

export * from './interface';

// TextArea 组件配置
export default {
  title: '多行输入',
  type: 'questionTextArea',
  Component, // 中间画布显示的组件
  PropsComponent, // 右侧属性组件
  defaultProps: QuestionTextAreaDefaultProps,
};
