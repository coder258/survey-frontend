/*
 * @Author: 唐宇
 * @Date: 2025-09-03 14:47:43
 * @LastEditors: 唐宇
 * @LastEditTime: 2025-10-23 14:36:38
 * @FilePath: \survey-frontend\src\components\QuestionComponents\QuestionRadio\interface.ts
 * @Description: 单选框组件的接口定义文件，用于定义组件的属性类型和默认属性。
 *
 * Copyright (c) 2025 by 唐宇, All Rights Reserved.
 */
export type OptionType = {
  label: string;
  value: string;
};

export type QuestionRadioPropsType = {
  title?: string;
  isVertical?: boolean;
  options?: OptionType[];
  value?: any;
  onChange?: (value: QuestionRadioPropsType) => void;
  disabled?: boolean;
};

export const QuestionRadioDefaultProps: QuestionRadioPropsType = {
  title: '单选框标题',
  isVertical: false,
  value: '',
  options: [
    { label: '选项1', value: '选项1' },
    { label: '选项2', value: '选项2' },
    { label: '选项3', value: '选项3' },
  ],
};

// 统计组件的属性类型
export type QuestionRadioStatComponentPropsType = {
  stat: Array<{
    type: string;
    value: number;
  }>;
};
