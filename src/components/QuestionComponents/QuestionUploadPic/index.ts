/*
 * @Author: 唐宇
 * @Date: 2025-08-29 15:56:29
 * @LastEditors: 唐宇
 * @LastEditTime: 2025-09-24 17:00:16
 * @FilePath: \survey-frontend\src\components\QuestionComponents\QuestionUploadPic\index.ts
 * @Description: 图片上传组件配置文件
 *
 * Copyright (c) 2025 by 唐宇, All Rights Reserved.
 */
import Component from './Component';
import PropsComponent from './PropsComponent';
import { QuestionUploadPicDefaultProps } from './interface';

export * from './interface';

// QuestionUploadPic 组件配置
export default {
  title: '图片上传',
  type: 'questionUploadPic',
  Component, // 中间画布显示的组件
  PropsComponent, // 右侧属性组件
  defaultProps: QuestionUploadPicDefaultProps,
};
