/*
 * @Author: 唐宇
 * @Date: 2025-09-04 14:35:12
 * @LastEditors: 唐宇
 * @LastEditTime: 2025-09-21 16:13:55
 * @FilePath: \survey-frontend\src\components\QuestionComponents\QuestionCheckbox\Component.tsx
 * @Description: Checkbox 组件
 *
 * Copyright (c) 2025 by 唐宇, All Rights Reserved.
 */
import React, { FC, useEffect, useState } from 'react';
import { OptionType, QuestionCheckboxDefaultProps, QuestionCheckboxPropsType } from './interface';
import { Checkbox, Space, Typography } from 'antd';

const { Paragraph } = Typography;

const QuestionCheckbox: FC<QuestionCheckboxPropsType> = (props: QuestionCheckboxPropsType) => {
  const { title, options = [], isVertical } = { ...QuestionCheckboxDefaultProps, ...props };
  const [_options, _setOptions] = useState<OptionType[]>(options);

  useEffect(() => {
    _setOptions(options);
  }, [options]);

  return (
    <div>
      <Paragraph strong>{title}</Paragraph>
      <Space direction={isVertical ? 'vertical' : 'horizontal'}>
        {_options.map(option => {
          const { label, value, checked } = option;
          return (
            <Checkbox
              key={value}
              value={value}
              onChange={event => {
                _setOptions(
                  _options.map(o => {
                    if (o.value === value) {
                      return { ...o, checked: event.target.checked };
                    }
                    return o;
                  })
                );
              }}
              checked={checked}
            >
              {label}
            </Checkbox>
          );
        })}
      </Space>
    </div>
  );
};

export default QuestionCheckbox;
