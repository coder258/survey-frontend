/*
 * @Author: 唐宇
 * @Date: 2025-09-23 16:44:11
 * @LastEditors: 唐宇
 * @LastEditTime: 2025-09-24 17:29:02
 * @FilePath: \survey-frontend\src\components\QuestionComponents\QuestionUploadLargeFile\Component.tsx
 * @Description: 大文件上传组件
 *
 * Copyright (c) 2025 by 唐宇, All Rights Reserved.
 */
import React, { FC } from 'react';
import { Typography, Upload, Image } from 'antd';
import { QuestionUploadLargeFileDefaultProps, QuestionUploadLargeFilePropsType } from './interface';
import { InboxOutlined, PlusOutlined } from '@ant-design/icons';

const { Paragraph } = Typography;

const QuestionUploadLargeFile: FC<QuestionUploadLargeFilePropsType> = (
  props: QuestionUploadLargeFilePropsType
) => {
  const { title, file } = { ...QuestionUploadLargeFileDefaultProps, ...props };

  return (
    <div>
      <Paragraph strong>{title}</Paragraph>
      <div>
        {file ? (
          <Image src={file.url} width={102}></Image>
        ) : (
          <Upload.Dragger maxCount={1} name="file">
            <Paragraph>
              <InboxOutlined style={{ fontSize: '32px', color: '#1677ff' }} />
            </Paragraph>
            <Paragraph style={{ fontSize: '15px' }}>点击上传文件或拖拽文件到此处</Paragraph>
            <Paragraph style={{ color: 'rgba(0, 0, 0, 0.45)', fontSize: '13px' }}>
              仅支持单个文件上传
            </Paragraph>
          </Upload.Dragger>
        )}
      </div>
    </div>
  );
};

export default QuestionUploadLargeFile;
