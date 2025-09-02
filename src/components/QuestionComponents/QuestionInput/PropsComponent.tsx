/*
 * @Author: 唐宇
 * @Date: 2025-09-01 16:11:42
 * @LastEditors: 唐宇
 * @LastEditTime: 2025-09-01 16:18:57
 * @FilePath: \survey-frontend\src\components\QuestionComponents\QuestionInput\PropsComponent.tsx
 * @Description: input 属性配置组件
 *
 * Copyright (c) 2025 by 唐宇, All Rights Reserved.
 */
import React, { FC, useEffect } from 'react';
import { QuestionInputPropsType } from './interface';
import { Form, Input } from 'antd';

const PropsComponent: FC<QuestionInputPropsType> = (props: QuestionInputPropsType) => {
  const { title, placeholder, onChange, disabled } = props;
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue({
      title,
      placeholder,
    });
  }, [title, placeholder]);

  const formChangeHandler = () => {
    if (onChange) {
      onChange(form.getFieldsValue());
    }
  };

  return (
    <Form
      layout="vertical"
      disabled={disabled}
      initialValues={{ title, placeholder }}
      form={form}
      onValuesChange={formChangeHandler}
    >
      <Form.Item label="标题" name="title" rules={[{ required: true, message: '请输入标题' }]}>
        <Input />
      </Form.Item>
      <Form.Item label="placeholder" name="placeholder">
        <Input />
      </Form.Item>
    </Form>
  );
};

export default PropsComponent;
