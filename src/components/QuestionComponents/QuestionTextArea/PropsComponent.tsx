/*
 * @Author: 唐宇
 * @Date: 2025-09-01 16:11:42
 * @LastEditors: 唐宇
 * @LastEditTime: 2025-09-03 14:34:33
 * @FilePath: \survey-frontend\src\components\QuestionComponents\QuestionTextArea\PropsComponent.tsx
 * @Description: TextArea 属性配置组件
 *
 * Copyright (c) 2025 by 唐宇, All Rights Reserved.
 */
import React, { FC, useEffect } from 'react';
import { QuestionTextAreaPropsType } from './interface';
import { Form, Input } from 'antd';

const PropsComponent: FC<QuestionTextAreaPropsType> = (props: QuestionTextAreaPropsType) => {
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
        <Input allowClear />
      </Form.Item>
      <Form.Item label="placeholder" name="placeholder">
        <Input allowClear />
      </Form.Item>
    </Form>
  );
};

export default PropsComponent;
