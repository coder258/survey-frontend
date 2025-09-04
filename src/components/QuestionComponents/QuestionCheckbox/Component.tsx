/*
 * @Author: 唐宇
 * @Date: 2025-09-04 14:35:12
 * @LastEditors: 唐宇
 * @LastEditTime: 2025-09-04 14:48:25
 * @FilePath: \survey-frontend\src\components\QuestionComponents\QuestionCheckbox\Component.tsx
 * @Description: Checkbox 组件
 *
 * Copyright (c) 2025 by 唐宇, All Rights Reserved.
 */
import React, { FC } from 'react';
import { QuestionCheckboxDefaultProps, QuestionCheckboxPropsType } from './interface';
import { Checkbox, Space, Typography } from 'antd';

const { Paragraph } = Typography;

const QuestionCheckbox: FC<QuestionCheckboxPropsType> = (props: QuestionCheckboxPropsType) => {
  const { title, options = [], isVertical } = { ...QuestionCheckboxDefaultProps, ...props };

  return (
    <div>
      <Paragraph strong>{title}</Paragraph>
      <Space direction={isVertical ? 'vertical' : 'horizontal'}>
        {options.map(option => {
          const { label, value, checked } = option;
          return (
            <Checkbox key={value} value={value} checked={checked}>
              {label}
            </Checkbox>
          );
        })}
      </Space>
    </div>
  );
};

export default QuestionCheckbox;
