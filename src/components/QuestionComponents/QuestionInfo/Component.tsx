/*
 * @Author: 唐宇
 * @Date: 2025-09-03 12:04:17
 * @LastEditors: 唐宇
 * @LastEditTime: 2025-09-03 12:11:14
 * @FilePath: \survey-frontend\src\components\QuestionComponents\QuestionInfo\Component.tsx
 * @Description: 问卷标题描述组件
 *
 * Copyright (c) 2025 by 唐宇, All Rights Reserved.
 */
import React, { FC } from 'react';
import { Typography } from 'antd';
import { QuestionInfoPropsType, QuestionInfoDefaultProps } from './interface';

const { Title, Paragraph } = Typography;

const QuestionInfo: FC<QuestionInfoPropsType> = (props: QuestionInfoPropsType) => {
  const { title = '', desc = '' } = { ...QuestionInfoDefaultProps, ...props };

  // 处理换行
  const descTextList = desc.split('\n');

  return (
    <div style={{ textAlign: 'center' }}>
      <Title style={{ fontSize: '24px' }}>{title}</Title>
      <Paragraph>
        {descTextList.map((text, index) => (
          <span key={index}>
            {index > 0 && <br />}
            {text}
          </span>
        ))}
      </Paragraph>
    </div>
  );
};

export default QuestionInfo;
