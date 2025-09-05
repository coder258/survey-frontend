/*
 * @Author: 唐宇
 * @Date: 2025-08-29 14:54:19
 * @LastEditors: 唐宇
 * @LastEditTime: 2025-09-03 14:31:24
 * @FilePath: \survey-frontend\src\components\QuestionComponents\QuestionTextarea\Component.tsx
 * @Description: Textarea 组件
 *
 * Copyright (c) 2025 by 唐宇, All Rights Reserved.
 */
import React, { FC } from 'react';
import { Typography, Input } from 'antd';
import { QuestionTextAreaPropsType, QuestionTextAreaDefaultProps } from './interface';

const { Paragraph } = Typography;
const { TextArea } = Input;

const QuestionTextArea: FC<QuestionTextAreaPropsType> = (props: QuestionTextAreaPropsType) => {
  const { title, placeholder } = { ...QuestionTextAreaDefaultProps, ...props };
  return (
    <div>
      <Paragraph strong>{title}</Paragraph>
      <div>
        <TextArea allowClear placeholder={placeholder}></TextArea>
      </div>
    </div>
  );
};

export default QuestionTextArea;
