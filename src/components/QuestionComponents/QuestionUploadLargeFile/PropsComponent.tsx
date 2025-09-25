/*
 * @Author: 唐宇
 * @Date: 2025-09-01 16:11:42
 * @LastEditors: 唐宇
 * @LastEditTime: 2025-09-24 17:29:58
 * @FilePath: \survey-frontend\src\components\QuestionComponents\QuestionUploadLargeFile\PropsComponent.tsx
 * @Description: 图片上传 属性配置组件
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
  InputNumber,
  message,
  Tooltip,
  Typography,
} from 'antd';
import ImgCrop from 'antd-img-crop';
import { InboxOutlined, InfoCircleOutlined, PlusOutlined } from '@ant-design/icons';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];
const { Paragraph } = Typography;

const PropsComponent: FC<QuestionUploadLargeFilePropsType> = (
  props: QuestionUploadLargeFilePropsType
) => {
  const { title, acceptFileType, file, onChange: onFormChange, disabled } = props;
  const [form] = Form.useForm();
  const [_fileList, _setFileList] = useState<UploadFile[]>([]);

  useEffect(() => {
    form.setFieldsValue({
      title,
      acceptFileType,
    });
    if (!file) {
      _setFileList([]);
      return;
    }
    _setFileList([file]);
  }, [title, acceptFileType, file]);

  const formChangeHandler = () => {
    if (onFormChange) {
      const newValues = form.getFieldsValue();
      onFormChange(newValues);
    }
  };

  const beforeUpload = (file: FileType) => {
    const isValidFileType = acceptFileType?.includes(file.type);
    if (!isValidFileType) {
      message.error('不允许上传该类型文件！');
      return Upload.LIST_IGNORE;
    }

    return false;
  };

  const fileChangeHandler: UploadProps['onChange'] = async ({ fileList: newFileList }) => {
    _setFileList(newFileList);
    formChangeHandler();
  };

  return (
    <Form
      layout="vertical"
      disabled={disabled}
      initialValues={{ title, acceptFileType }}
      form={form}
      onValuesChange={formChangeHandler}
    >
      <Form.Item label="标题" name="title" rules={[{ required: true, message: '请输入标题' }]}>
        <Input allowClear />
      </Form.Item>
      <Form.Item label="允许上传的文件类型" name="acceptFileType">
        <Checkbox.Group>
          <Checkbox value=".pdf">PDF</Checkbox>
          <Checkbox value=".doc">DOC</Checkbox>
          <Checkbox value=".xls">XLS</Checkbox>
          <Checkbox value=".ppt">PPT</Checkbox>
          <Checkbox value=".docx">DOCX</Checkbox>
          <Checkbox value=".xlsx">XLSX</Checkbox>
          <Checkbox value=".pptx">PPTX</Checkbox>
          <Checkbox value=".txt">TXT</Checkbox>
          <Checkbox value=".zip">ZIP</Checkbox>
          <Checkbox value=".rar">RAR</Checkbox>
          <Checkbox value=".mp3">MP3</Checkbox>
          <Checkbox value=".mp4">MP4</Checkbox>
          <Checkbox value=".wav">WAV</Checkbox>
        </Checkbox.Group>
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
        <Upload.Dragger maxCount={1} name="file" beforeUpload={beforeUpload}>
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
