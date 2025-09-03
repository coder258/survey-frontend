/*
 * @Author: 唐宇
 * @Date: 2025-09-03 10:59:39
 * @LastEditors: 唐宇
 * @LastEditTime: 2025-09-03 11:51:54
 * @FilePath: \survey-frontend\src\components\QuestionComponents\QuestionParagraph\Component.tsx
 * @Description: 段落组件
 *
 * Copyright (c) 2025 by 唐宇, All Rights Reserved.
 */
import React, { FC } from 'react';
import { Typography } from 'antd';
import { QuestionParagraphPropsType, QuestionParagraphDefaultProps } from './interface';

const { Paragraph } = Typography;

const QuestionParagraph: FC<QuestionParagraphPropsType> = (props: QuestionParagraphPropsType) => {
  const { text = '', isCenter = false } = { ...QuestionParagraphDefaultProps, ...props };

  // 处理换行
  const textList = text.split('\n');

  return (
    <div>
      <Paragraph
        style={{
          textAlign: isCenter ? 'center' : 'start',
          marginBottom: 0,
        }}
      >
        {textList.map((text, index) => (
          <span key={index}>
            {index > 0 && <br />}
            {text}
          </span>
        ))}
      </Paragraph>
    </div>
  );
};

export default QuestionParagraph;
