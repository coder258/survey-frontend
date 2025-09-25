/*
 * @Author: 唐宇
 * @Date: 2025-09-01 16:11:42
 * @LastEditors: 唐宇
 * @LastEditTime: 2025-09-25 17:21:31
 * @FilePath: \survey-frontend\src\components\QuestionComponents\QuestionUploadLargeFile\PropsComponent.tsx
 * @Description: 大文件上传 属性配置组件
 *
 * Copyright (c) 2025 by 唐宇, All Rights Reserved.
 */
import React, { FC, useEffect, useState } from 'react';
import { QuestionUploadLargeFilePropsType } from './interface';
import {
  Form,
  Input,
  Checkbox,
  Upload,
  GetProp,
  UploadFile,
  UploadProps,
  message,
  Tooltip,
  Typography,
  InputNumber,
} from 'antd';
import { InboxOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { cutFile } from './utils/cutFile';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];
const { Paragraph } = Typography;

const PropsComponent: FC<QuestionUploadLargeFilePropsType> = (
  props: QuestionUploadLargeFilePropsType
) => {
  const { title, acceptFileType, maxSize = 1024, file, onChange: onFormChange, disabled } = props;
  const [form] = Form.useForm();
  const [_fileList, _setFileList] = useState<UploadFile[]>([]);
  let _file: any = file;

  useEffect(() => {
    form.setFieldsValue({
      title,
      acceptFileType,
      maxSize,
    });
    if (!file) {
      _setFileList([]);
      return;
    }
    _setFileList([file]);
  }, [title, acceptFileType, file, maxSize]);

  const formChangeHandler = () => {
    if (onFormChange) {
      const newValues = form.getFieldsValue();
      newValues.file = _file;
      onFormChange(newValues);
    }
  };

  const beforeUpload = (file: FileType) => {
    const isValidFileType = acceptFileType?.includes(file.type);
    if (!isValidFileType) {
      message.error('不允许上传该类型文件！');
      return Upload.LIST_IGNORE;
    }

    const isBelowMaxSize = file.size / 1024 / 1024 < maxSize;
    if (!isBelowMaxSize) {
      message.error('文件大小超过限制！');
      return Upload.LIST_IGNORE;
    }

    return false;
  };

  const fileChangeHandler: UploadProps['onChange'] = async ({ fileList: newFileList }) => {
    // 搞个假进度条
    _setFileList([
      {
        ...newFileList[0],
        status: 'uploading',
        percent: 95,
      },
    ]);
    _file = newFileList[0];
    if (newFileList.length === 1) {
      console.time('cutFile');
      const chunks = await cutFile(newFileList[0].originFileObj as FileType);
      console.timeEnd('cutFile');
      console.log('chunks: ', chunks);
      _setFileList([
        {
          ...newFileList[0],
          status: 'done',
          percent: 100,
        },
      ]);
    }
    formChangeHandler();
  };

  return (
    <Form
      layout="vertical"
      disabled={disabled}
      initialValues={{ title, acceptFileType, maxSize }}
      form={form}
      onValuesChange={formChangeHandler}
    >
      <Form.Item label="标题" name="title" rules={[{ required: true, message: '请输入标题' }]}>
        <Input allowClear />
      </Form.Item>
      <Form.Item label="允许上传的文件类型" name="acceptFileType">
        <Checkbox.Group>
          <Checkbox value="application/pdf">PDF</Checkbox>
          <Checkbox value="application/vnd.openxmlformats-officedocument.wordprocessingml.document">
            DOCX
          </Checkbox>
          <Checkbox value="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet">
            XLSX
          </Checkbox>
          <Checkbox value="application/vnd.openxmlformats-officedocument.presentationml.presentation">
            PPTX
          </Checkbox>
          <Checkbox value="text/plain">TXT</Checkbox>
          <Checkbox value="application/x-zip-compressed">ZIP</Checkbox>
          <Checkbox value="audio/mp3">MP3</Checkbox>
          <Checkbox value="video/mp4">MP4</Checkbox>
          <Checkbox value="audio/wav">WAV</Checkbox>
        </Checkbox.Group>
      </Form.Item>
      <Form.Item label="允许上传的单个文件大小" name="maxSize">
        <InputNumber
          addonBefore={
            <Tooltip title="单个文件最大多少M，范围在100M~2048M之间。">
              <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
            </Tooltip>
          }
          min={100}
          max={1024 * 2}
        />
      </Form.Item>
      <Form.Item
        label={
          <div>
            <Tooltip title="注意，此处上传的文件仅为了功能演示，问卷发布后并不会显示此文件">
              <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
            </Tooltip>
            &nbsp;
            <span>选择文件</span>
          </div>
        }
      >
        <Upload.Dragger
          maxCount={1}
          name="file"
          beforeUpload={beforeUpload}
          fileList={_fileList}
          onChange={fileChangeHandler}
        >
          <Paragraph>
            <InboxOutlined style={{ fontSize: '32px', color: '#1677ff' }} />
          </Paragraph>
          <Paragraph style={{ fontSize: '15px' }}>点击上传文件或拖拽文件到此处</Paragraph>
          <Paragraph style={{ color: 'rgba(0, 0, 0, 0.45)', fontSize: '13px' }}>
            仅支持单个文件上传
          </Paragraph>
        </Upload.Dragger>
      </Form.Item>
    </Form>
  );
};

export default PropsComponent;
