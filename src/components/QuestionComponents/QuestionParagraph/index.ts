/*
 * @Author: 唐宇
 * @Date: 2025-09-03 10:59:24
 * @LastEditors: 唐宇
 * @LastEditTime: 2025-09-03 11:08:24
 * @FilePath: \survey-frontend\src\components\QuestionComponents\QuestionParagraph\index.ts
 * @Description: 段落
 *
 * Copyright (c) 2025 by 唐宇, All Rights Reserved.
 */
import Component from './Component';
import PropsComponent from './PropsComponent';
import { QuestionParagraphDefaultProps } from './interface';

export * from './interface';

// Paragraph 组件配置
export default {
  title: '段落',
  type: 'questionParagraph',
  Component,
  PropsComponent,
  defaultProps: QuestionParagraphDefaultProps,
};
