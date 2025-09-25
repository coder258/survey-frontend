/*
 * @Author: 唐宇
 * @Date: 2025-09-23 16:44:11
 * @LastEditors: 唐宇
 * @LastEditTime: 2025-09-25 14:56:29
 * @FilePath: \survey-frontend\src\components\QuestionComponents\QuestionUploadPic\Component.tsx
 * @Description: 图片上传组件
 *
 * Copyright (c) 2025 by 唐宇, All Rights Reserved.
 */
import React, { FC } from 'react';
import { Typography, Upload, Image } from 'antd';
import { QuestionUploadPicPropsType, QuestionUploadPicDefaultProps } from './interface';
import { PlusOutlined } from '@ant-design/icons';

const { Paragraph } = Typography;

const QuestionUploadPic: FC<QuestionUploadPicPropsType> = (props: QuestionUploadPicPropsType) => {
  const { title, file } = { ...QuestionUploadPicDefaultProps, ...props };

  return (
    <div>
      <Paragraph strong>{title}</Paragraph>
      <div>
        {file ? (
          <Image src={file.url} width={102}></Image>
        ) : (
          <Upload maxCount={1} listType="picture-card" beforeUpload={() => false}>
            <PlusOutlined style={{ fontSize: '26px' }} />
          </Upload>
        )}
      </div>
    </div>
  );
};

export default QuestionUploadPic;
