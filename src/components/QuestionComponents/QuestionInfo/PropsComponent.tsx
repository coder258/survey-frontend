/*
 * @Author: 唐宇
 * @Date: 2025-09-03 12:04:51
 * @LastEditors: 唐宇
 * @LastEditTime: 2025-09-03 12:15:29
 * @FilePath: \survey-frontend\src\components\QuestionComponents\QuestionInfo\PropsComponent.tsx
 * @Description: 问卷标题描述 属性配置组件
 *
 * Copyright (c) 2025 by 唐宇, All Rights Reserved.
 */
import React, { FC, useEffect } from 'react';
import { QuestionInfoPropsType } from './interface';
import { Form, Input } from 'antd';

const { TextArea } = Input;

const PropsComponent: FC<QuestionInfoPropsType> = (props: QuestionInfoPropsType) => {
  const { title, desc, onChange, disabled } = props;
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue({
      title,
      desc,
    });
  }, [title, desc]);

  const formChangeHandler = () => {
    console.log('form change=>', form.getFieldsValue());
    if (onChange) {
      onChange(form.getFieldsValue());
    }
  };

  return (
    <Form
      layout="vertical"
      disabled={disabled}
      initialValues={{ title, desc }}
      form={form}
      onValuesChange={formChangeHandler}
    >
      <Form.Item label="标题" name="title" rules={[{ required: true, message: '请输入问卷标题' }]}>
        <Input allowClear />
      </Form.Item>
      <Form.Item label="描述" name="desc">
        <TextArea allowClear />
      </Form.Item>
    </Form>
  );
};

export default PropsComponent;
