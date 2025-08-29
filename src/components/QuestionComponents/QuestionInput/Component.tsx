/*
 * @Author: 唐宇
 * @Date: 2025-08-29 14:54:19
 * @LastEditors: 唐宇
 * @LastEditTime: 2025-08-29 15:22:05
 * @FilePath: \survey-frontend\src\components\QuestionComponents\QuestionInput\Component.tsx
 * @Description: input 组件
 *
 * Copyright (c) 2025 by 唐宇, All Rights Reserved.
 */
import React, { FC } from 'react';
import { Typography, Input } from 'antd';
import { QuestionInputPropsType, QuestionInputDefaultProps } from './interface';

const { Paragraph } = Typography;

const QuestionInput: FC<QuestionInputPropsType> = (props: QuestionInputPropsType) => {
  const { title, placeholder } = { ...QuestionInputDefaultProps, ...props };
  return (
    <div>
      <Paragraph strong>{title}</Paragraph>
      <div>
        <Input placeholder={placeholder}></Input>
      </div>
    </div>
  );
};

export default QuestionInput;
