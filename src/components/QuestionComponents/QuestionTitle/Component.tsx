/*
 * @Author: 唐宇
 * @Date: 2025-08-29 14:54:19
 * @LastEditors: 唐宇
 * @LastEditTime: 2025-08-29 15:15:43
 * @FilePath: \survey-frontend\src\components\QuestionComponents\QuestionTitle\Component.tsx
 * @Description: title 组件
 *
 * Copyright (c) 2025 by 唐宇, All Rights Reserved.
 */
import { Typography } from 'antd';
import React, { FC } from 'react';
import { QuestionTitlePropsType, QuestionTitleDefaultProps } from './interface';

const { Title } = Typography;

const QuestionTitle: FC<QuestionTitlePropsType> = (props: QuestionTitlePropsType) => {
  const { text = '', level = 1, isCenter = false } = { ...QuestionTitleDefaultProps, ...props };

  const getFontSize = (level: QuestionTitlePropsType['level']) => {
    switch (level) {
      case 1:
        return '24px';
      case 2:
        return '20px';
      case 3:
        return '16px';
      default:
        return '16px';
    }
  };
  return (
    <Title
      level={level}
      style={{
        textAlign: isCenter ? 'center' : 'start',
        marginBottom: 0,
        fontSize: getFontSize(level),
      }}
    >
      {text}
    </Title>
  );
};

export default QuestionTitle;
