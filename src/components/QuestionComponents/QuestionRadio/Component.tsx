/*
 * @Author: 唐宇
 * @Date: 2025-09-03 14:53:03
 * @LastEditors: 唐宇
 * @LastEditTime: 2025-09-03 15:04:27
 * @FilePath: \survey-frontend\src\components\QuestionComponents\QuestionRadio\Component.tsx
 * @Description: Radio 组件
 *
 * Copyright (c) 2025 by 唐宇, All Rights Reserved.
 */
import React, { FC } from 'react';
import { QuestionRadioDefaultProps, QuestionRadioPropsType } from './interface';
import { Radio, Space, Typography } from 'antd';

const { Paragraph } = Typography;

const QuestionRadio: FC<QuestionRadioPropsType> = (props: QuestionRadioPropsType) => {
  const { title, options = [], value, isVertical } = { ...QuestionRadioDefaultProps, ...props };

  return (
    <div>
      <Paragraph strong>{title}</Paragraph>
      <Radio.Group value={value}>
        <Space direction={isVertical ? 'vertical' : 'horizontal'}>
          {options.map(option => {
            const { label, value } = option;

            return (
              <Radio value={value} key={value}>
                {label}
              </Radio>
            );
          })}
        </Space>
      </Radio.Group>
    </div>
  );
};

export default QuestionRadio;
