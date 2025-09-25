/*
 * @Author: 唐宇
 * @Date: 2025-08-29 15:56:29
 * @LastEditors: 唐宇
 * @LastEditTime: 2025-09-24 17:09:52
 * @FilePath: \survey-frontend\src\components\QuestionComponents\QuestionUploadLargeFile\index.ts
 * @Description: 大文件上传组件配置文件
 *
 * Copyright (c) 2025 by 唐宇, All Rights Reserved.
 */
import Component from './Component';
import PropsComponent from './PropsComponent';
import { QuestionUploadLargeFileDefaultProps } from './interface';

export * from './interface';

// QuestionUploadLargeFile 组件配置
export default {
  title: '图片上传',
  type: 'questionUploadLargeFile',
  Component, // 中间画布显示的组件
  PropsComponent, // 右侧属性组件
  defaultProps: QuestionUploadLargeFileDefaultProps,
};
