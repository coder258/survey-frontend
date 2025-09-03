/*
 * @Author: 唐宇
 * @Date: 2025-09-03 11:00:01
 * @LastEditors: 唐宇
 * @LastEditTime: 2025-09-03 11:13:10
 * @FilePath: \survey-frontend\src\components\QuestionComponents\QuestionParagraph\PropsComponent.tsx
 * @Description:
 *
 * Copyright (c) 2025 by 唐宇, All Rights Reserved.
 */
import React, { FC, useEffect } from 'react';
import { QuestionParagraphPropsType } from './interface';
import { Form, Input, Checkbox } from 'antd';

const { TextArea } = Input;

const PropsComponent: FC<QuestionParagraphPropsType> = (props: QuestionParagraphPropsType) => {
  const { text, isCenter, onChange, disabled } = props;
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue({
      text,
      isCenter,
    });
  }, [text, isCenter]);

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
      initialValues={{ text, isCenter }}
      form={form}
      onValuesChange={formChangeHandler}
    >
      <Form.Item
        label="段落内容"
        name="text"
        rules={[{ required: true, message: '请输入段落内容' }]}
      >
        <TextArea />
      </Form.Item>
      <Form.Item name="isCenter" valuePropName="checked">
        <Checkbox>居中显示</Checkbox>
      </Form.Item>
    </Form>
  );
};

export default PropsComponent;
