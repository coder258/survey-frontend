/*
 * @Author: 唐宇
 * @Date: 2025-09-04 16:58:05
 * @LastEditors: 唐宇
 * @LastEditTime: 2025-09-05 17:22:04
 * @FilePath: \survey-frontend\src\pages\question\Edit\PageSetting.tsx
 * @Description: 右侧面板-页面设置
 *
 * Copyright (c) 2025 by 唐宇, All Rights Reserved.
 */
import { Checkbox, Form, Input } from 'antd';
import React, { FC, useEffect } from 'react';
import useGetPageInfo from '../../../hooks/useGetPageInfo';
import { useDispatch } from 'react-redux';
import { resetPageInfo } from '../../../store/pageInfoReducer';

const { TextArea } = Input;

const PageSetting: FC = () => {
  const pageInfo = useGetPageInfo();
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  useEffect(() => {
    form.setFieldsValue(pageInfo);
  }, [pageInfo]);

  const formChangeHandler = () => {
    dispatch(resetPageInfo(form.getFieldsValue()));
  };

  return (
    <>
      <Form
        layout="vertical"
        initialValues={pageInfo}
        form={form}
        onValuesChange={() => formChangeHandler()}
      >
        <Form.Item
          label="问卷标题"
          name="title"
          rules={[{ required: true, message: '请输入问卷标题' }]}
        >
          <Input placeholder="请输入问卷标题" allowClear />
        </Form.Item>
        <Form.Item label="问卷描述" name="desc">
          <TextArea placeholder="请输入问卷描述" allowClear />
        </Form.Item>
        <Form.Item label="样式代码" name="css">
          <TextArea placeholder="请输入 css 样式代码" allowClear />
        </Form.Item>
        <Form.Item label="脚本代码" name="js">
          <TextArea placeholder="请输入 js 脚本代码" allowClear />
        </Form.Item>
        <Form.Item name="isAutoSave" valuePropName="checked">
          <Checkbox>是否自动保存</Checkbox>
        </Form.Item>
      </Form>
    </>
  );
};

export default PageSetting;
