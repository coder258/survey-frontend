/*
 * @Author: 唐宇
 * @Date: 2025-09-23 16:44:11
 * @LastEditors: 唐宇
 * @LastEditTime: 2025-09-25 16:31:11
 * @FilePath: \survey-frontend\src\components\QuestionComponents\QuestionUploadLargeFile\Component.tsx
 * @Description: 大文件上传组件
 *
 * Copyright (c) 2025 by 唐宇, All Rights Reserved.
 */
import React, { FC } from 'react';
import { Space, Typography, Upload } from 'antd';
import { QuestionUploadLargeFileDefaultProps, QuestionUploadLargeFilePropsType } from './interface';
import { FileOutlined, InboxOutlined } from '@ant-design/icons';

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
          <Space direction="vertical">
            <FileOutlined style={{ fontSize: '46px', color: '#1677ff' }} />
            <Paragraph>{file.name}</Paragraph>
          </Space>
        ) : (
          <Upload.Dragger maxCount={1} name="file" beforeUpload={() => false}>
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
