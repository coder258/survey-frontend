/*
 * @Author: 唐宇
 * @Date: 2025-09-04 10:33:07
 * @LastEditors: 唐宇
 * @LastEditTime: 2025-09-04 11:46:27
 * @FilePath: \survey-frontend\src\components\QuestionComponents\QuestionRate\Component.tsx
 * @Description: Rate 组件
 *
 * Copyright (c) 2025 by 唐宇, All Rights Reserved.
 */
import React, { FC } from 'react';
import { QuestionRatePropsType, QuestionRateDefaultProps } from './interface';
import { Rate, Typography, Flex } from 'antd';

const { Paragraph } = Typography;

const QuestionRate: FC<QuestionRatePropsType> = (props: QuestionRatePropsType) => {
  const { title, allowHalf, value, tooltips = [] } = { ...QuestionRateDefaultProps, ...props };

  const renderTooltip = () => {
    if (value === 0.5) {
      return <span>不能再差了</span>;
    }
    const newValue = Math.floor(value);
    return newValue ? <span>{tooltips[newValue - 1]}</span> : null;
  };

  return (
    <div>
      <Paragraph strong>{title}</Paragraph>
      <Flex gap="middle" vertical>
        <Rate allowHalf={allowHalf} value={value} tooltips={tooltips} />
        {renderTooltip()}
      </Flex>
    </div>
  );
};

export default QuestionRate;
