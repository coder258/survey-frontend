/*
 * @Author: 唐宇
 * @Date: 2025-09-01 16:11:42
 * @LastEditors: 唐宇
 * @LastEditTime: 2025-10-24 12:19:27
 * @FilePath: \survey-frontend\src\components\QuestionComponents\QuestionUploadPic\PropsComponent.tsx
 * @Description: 图片上传 属性配置组件
 *
 * Copyright (c) 2025 by 唐宇, All Rights Reserved.
 */
import React, { FC, useEffect, useState } from 'react';
import { QuestionUploadPicPropsType } from './interface';
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
} from 'antd';
import ImgCrop from 'antd-img-crop';
import { InfoCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { uploadPicApi } from '../../../api/upload';
import { genFormData } from '../../../utils/http-util';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const PropsComponent: FC<QuestionUploadPicPropsType> = (props: QuestionUploadPicPropsType) => {
  const {
    title,
    imgCrop = true,
    acceptImgType,
    maxSize = 2,
    file,
    onChange: onFormChange,
    disabled,
  } = props;
  const [form] = Form.useForm();
  let fileWithSrc = file;
  const [_fileList, _setFileList] = useState<UploadFile[]>([]);

  useEffect(() => {
    form.setFieldsValue({
      title,
      imgCrop,
      acceptImgType,
      maxSize,
    });
    if (!file) {
      _setFileList([]);
      return;
    }
    _setFileList([file]);
  }, [title, imgCrop, acceptImgType, maxSize, file]);

  const getImgDataUrl = async (file: UploadFile) => {
    if (!file) {
      return '';
    }
    let src = file.url as string;
    if (!src) {
      src = await new Promise(resolve => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as FileType);
        reader.onload = () => resolve(reader.result as string);
      });
    }

    return src;
  };

  const formChangeHandler = () => {
    if (onFormChange) {
      const newValues = form.getFieldsValue();
      newValues.file = fileWithSrc;
      onFormChange(newValues);
    }
  };

  const onPreview = async (file: UploadFile) => {
    const src = await getImgDataUrl(file);
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  const beforeUpload = (file: FileType, isContinue: boolean) => {
    const isValidImgType = acceptImgType?.includes(file.type);
    if (!isValidImgType) {
      message.error('不允许上传该类型图片！');
      return Upload.LIST_IGNORE;
    }

    const isBelowMaxSize = file.size / 1024 / 1024 < maxSize;
    if (!isBelowMaxSize) {
      message.error('图片大小超过限制！');
      return Upload.LIST_IGNORE;
    }

    return isContinue;
  };

  const fileChangeHandler: UploadProps['onChange'] = async ({ fileList: newFileList }) => {
    _setFileList(newFileList);
    const _file = newFileList[0];
    let _src = '';
    if (_file) {
      const body = {
        file: _file.originFileObj,
        questionId: '123',
      };
      const formData = genFormData(body);
      const uploadPicApiRes = await uploadPicApi(formData);

      _src = uploadPicApiRes.path;
      fileWithSrc = {
        uid: _file.uid,
        name: _file.name,
        status: 'done',
        url: _src,
      };
    } else {
      _src = '';
      fileWithSrc = null;
    }
    formChangeHandler();
  };

  return (
    <Form
      layout="vertical"
      disabled={disabled}
      initialValues={{ title, imgCrop, acceptImgType, maxSize }}
      form={form}
      onValuesChange={formChangeHandler}
    >
      <Form.Item label="标题" name="title" rules={[{ required: true, message: '请输入标题' }]}>
        <Input allowClear />
      </Form.Item>
      <Form.Item label="是否允许上传前裁剪" name="imgCrop" valuePropName="checked">
        <Checkbox />
      </Form.Item>
      <Form.Item label="允许上传的图片类型" name="acceptImgType">
        <Checkbox.Group>
          <Checkbox value="image/png">PNG</Checkbox>
          <Checkbox value="image/jpeg">JPEG</Checkbox>
          <Checkbox value="image/gif">GIF</Checkbox>
        </Checkbox.Group>
      </Form.Item>
      <Form.Item label="允许上传的单张图片大小" name="maxSize">
        <InputNumber
          addonBefore={
            <Tooltip title="单张图片最大多少M，范围在1M~10M之间。">
              <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
            </Tooltip>
          }
          min={1}
          max={10}
        />
      </Form.Item>
      <Form.Item
        label={
          <div>
            <Tooltip title="注意，此处上传的图片仅为了功能演示，问卷发布后并不会显示此图片">
              <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
            </Tooltip>
            &nbsp;
            <span>选择图片</span>
          </div>
        }
      >
        {imgCrop ? (
          <ImgCrop rotationSlider showReset modalOk="确定" modalCancel="取消">
            <Upload
              beforeUpload={file => beforeUpload(file, true)}
              maxCount={1}
              listType="picture-card"
              onPreview={onPreview}
              fileList={_fileList}
              onChange={fileChangeHandler}
              customRequest={({ file, onSuccess, onProgress }: any) => {
                onSuccess('ok');
              }}
            >
              {_fileList.length < 1 && <PlusOutlined style={{ fontSize: '26px' }} />}
            </Upload>
          </ImgCrop>
        ) : (
          <Upload
            beforeUpload={file => beforeUpload(file, false)}
            maxCount={1}
            listType="picture-card"
            onPreview={onPreview}
            fileList={_fileList}
            onChange={fileChangeHandler}
          >
            {_fileList.length < 1 && <PlusOutlined style={{ fontSize: '26px' }} />}
          </Upload>
        )}
      </Form.Item>
    </Form>
  );
};

export default PropsComponent;
