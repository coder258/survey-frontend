/*
 * @Author: 唐宇
 * @Date: 2025-09-04 10:23:43
 * @LastEditors: 唐宇
 * @LastEditTime: 2025-09-04 11:13:13
 * @FilePath: \survey-frontend\src\components\QuestionComponents\QuestionRate\interface.ts
 * @Description: 评分组件接口定义
 *
 * Copyright (c) 2025 by 唐宇, All Rights Reserved.
 */
export type QuestionRatePropsType = {
  title?: string;
  value?: any;
  allowHalf?: boolean;
  tooltips?: [string, string, string, string, string];
  onChange?: (value: QuestionRatePropsType) => void;
  disabled?: boolean;
};

export const QuestionRateDefaultProps: QuestionRatePropsType = {
  title: '评分标题',
  value: 5,
  allowHalf: true,
  tooltips: ['极差', '失望', '一般', '满意', '惊喜'],
};
