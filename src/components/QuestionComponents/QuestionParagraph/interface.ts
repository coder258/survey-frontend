/*
 * @Author: 唐宇
 * @Date: 2025-09-03 10:59:49
 * @LastEditors: 唐宇
 * @LastEditTime: 2025-09-03 11:04:11
 * @FilePath: \survey-frontend\src\components\QuestionComponents\QuestionParagraph\interface.ts
 * @Description: 段落组件的接口定义文件，用于定义组件的属性类型和默认属性。
 *
 * Copyright (c) 2025 by 唐宇, All Rights Reserved.
 */
export type QuestionParagraphPropsType = {
  text?: string;
  isCenter?: boolean;

  // 用于 PropsComponent
  onChange?: (value: QuestionParagraphPropsType) => void;
  disabled?: boolean;
};

export const QuestionParagraphDefaultProps: QuestionParagraphPropsType = {
  text: '一行段落',
  isCenter: false,
};
