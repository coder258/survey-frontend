/*
 * @Author: 唐宇
 * @Date: 2025-09-01 16:11:42
 * @LastEditors: 唐宇
 * @LastEditTime: 2025-11-03 16:24:28
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
import { ChunkType, cutFile } from './utils/cutFile';
import { abort, checkFileStatusApi, mergeChunksApi, uploadChunkApi } from '../../../api/upload';
import { genFormData } from '../../../utils/http-util';
import { number } from 'prop-types';

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
    const setProgress = (percent: number, status: 'uploading' | 'error' | 'done') => {
      _setFileList([
        {
          ...newFileList[0],
          status,
          percent,
        },
      ]);
    };
    if (newFileList.length === 1) {
      setProgress(0, 'uploading');
      console.time('cutFile');
      const chunks = await cutFile(newFileList[0].originFileObj as FileType);
      console.timeEnd('cutFile');
      console.log('chunks: ', chunks);
      try {
        await uploadLargeFile(chunks, setProgress, newFileList);
      } catch (error) {
        console.log('uploadLargeFile error: ', error);
      }
      formChangeHandler();
    } else {
      _setFileList([]);
      _file = null;
      formChangeHandler();
    }
  };

  const uploadLargeFile = async (
    chunks: ChunkType[],
    setProgress: (percent: number, status: 'uploading' | 'error' | 'done') => void,
    newFileList: UploadFile[]
  ): Promise<boolean> => {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      const fileHash = chunks[0].hash + '-' + chunks.at(-1)?.hash;
      const chunkHashs = chunks.map(chunk => chunk.hash);
      const totalChunks = chunks.length;
      const extname = '.' + newFileList[0].originFileObj!.name.split('.').at(-1);

      console.log('开始检测文件上传进度...');
      // 先检测文件的上传进度
      const checkFileStatusApiRes = await checkFileStatusApi({
        fileHash,
        chunkHashs,
        totalChunks,
        extname,
      });
      const { neededChunkList, msg } = checkFileStatusApiRes;
      console.log('检测结束...');
      if (neededChunkList.length === 0) {
        // 已上传完成
        console.log('检测完成，文件已上传完成: ', msg);
        message.success(msg);
        setProgress(100, 'done');
        resolve(true);
        return;
      }

      let uploadedChunksCount = totalChunks - neededChunkList.length;
      let currentProgressPercent: number;
      const getCurrentProgressPercent = (uploadedChunksCount: number) => {
        return Math.floor((uploadedChunksCount / totalChunks) * 100);
      };
      currentProgressPercent = getCurrentProgressPercent(uploadedChunksCount);
      setProgress(currentProgressPercent, 'uploading');
      console.log('开始上传分片...');
      // 开始上传分片
      let completedChunks = 0;
      const uploadChunkHandler = async () => {
        completedChunks++;
        uploadedChunksCount++;
        uploadedChunksCount = Math.min(uploadedChunksCount, totalChunks);
        currentProgressPercent = getCurrentProgressPercent(uploadedChunksCount);
        currentProgressPercent = Math.min(currentProgressPercent, 100);
        if (currentProgressPercent < 100) {
          setProgress(currentProgressPercent, 'uploading');
        }
        if (completedChunks === neededChunkListWithFile.length) {
          // 所有分片都上传完成了，合并分片
          console.log('所有分片都上传完成了，开始合并分片...');
          const mergeChunksApiRes = await mergeChunksApi({ fileHash, extname, chunkHashs });
          const { msg, path } = mergeChunksApiRes;
          _file = {
            uid: '-1',
            name: newFileList[0].name,
            size: newFileList[0].originFileObj?.size,
            status: 'done',
            url: path,
          };
          setProgress(100, 'done');
          console.log('合并分片完成: ', path, msg);
          resolve(true);
        }
      };

      const neededChunkListWithFile = chunks.filter(chunk => neededChunkList.includes(chunk.hash));
      for (let i = 0; i < neededChunkListWithFile.length; i++) {
        const chunkFile = neededChunkListWithFile[i].blob;
        const chunkHash = neededChunkListWithFile[i].hash;
        const chunkInfo = {
          chunk: chunkFile,
          fileHash,
          chunkHash,
        };
        const formData = genFormData(chunkInfo);
        uploadChunkApi(formData)
          .then(uploadChunkHandler)
          .catch(error => {
            console.log('分片上传失败: ', error);
            if (error.message === 'canceled') {
              message.error('上传已取消');
              _setFileList([]);
              _file = null;
              formChangeHandler();
            }
            reject(false);
            return;
          });
      }
    });
  };

  const fileRemoveHandler: UploadProps['onRemove'] = () => {
    abort();
    return true;
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
            <Tooltip title="大文件上传目前仅支持pc端演示，移动端暂不支持此功能">
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
          onRemove={fileRemoveHandler}
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
