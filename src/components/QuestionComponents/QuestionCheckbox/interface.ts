/*
 * @Author: 唐宇
 * @Date: 2025-09-04 14:35:12
 * @LastEditors: 唐宇
 * @LastEditTime: 2025-10-23 11:00:03
 * @FilePath: \survey-frontend\src\components\QuestionComponents\QuestionCheckbox\interface.ts
 * @Description: Checkbox 组件的接口定义文件，用于定义组件的属性类型和默认属性。
 *
 * Copyright (c) 2025 by 唐宇, All Rights Reserved.
 */
export type OptionType = {
  label: string;
  value: string;
  checked?: boolean;
};

export type QuestionCheckboxPropsType = {
  title?: string;
  isVertical?: boolean;
  options?: OptionType[];
  onChange?: (value: QuestionCheckboxPropsType) => void;
  disabled?: boolean;
};

export const QuestionCheckboxDefaultProps: QuestionCheckboxPropsType = {
  title: '多选框标题',
  isVertical: false,
  options: [
    { label: '选项1', value: '选项1', checked: true },
    { label: '选项2', value: '选项2', checked: false },
    { label: '选项3', value: '选项3', checked: false },
  ],
};

// 统计组件的属性类型
export type QuestionCheckboxStatComponentPropsType = {
  stat: Array<{
    type: string;
    value: number;
  }>;
  rightChartWidth?: string;
};
