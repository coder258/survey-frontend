/*
 * @Author: 唐宇
 * @Date: 2025-09-03 15:07:19
 * @LastEditors: 唐宇
 * @LastEditTime: 2025-10-23 14:28:08
 * @FilePath: \survey-frontend\src\components\QuestionComponents\QuestionRadio\PropsComponent.tsx
 * @Description: Radio 属性配置组件
 *
 * Copyright (c) 2025 by 唐宇, All Rights Reserved.
 */
import React, { FC, useEffect } from 'react';
import { QuestionRadioPropsType } from './interface';
import { Button, Checkbox, Form, Input, Select, Space } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

const PropsComponent: FC<QuestionRadioPropsType> = (props: QuestionRadioPropsType) => {
  const { title, isVertical, options = [], value, onChange, disabled } = props;
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue({
      title,
      isVertical,
      options,
      value,
    });
  }, [title, isVertical, options, value]);

  const formChangeHandler = () => {
    if (onChange) {
      const newValues = form.getFieldsValue();
      const { options = [] } = newValues as QuestionRadioPropsType;
      options.forEach(option => {
        option.value = option.label;
      });
      onChange(newValues);
    }
  };

  const optionsValidator = (_: any, value: any) => {
    if (!value) {
      return Promise.reject(new Error('请输入选项文字'));
    }

    // 判断当前值是否和options中其他的值重复
    let num = 0;
    for (let i = 0; i < options.length; i++) {
      if (options[i].label === value) {
        num++;
      }
    }
    if (num > 1) {
      return Promise.reject(new Error('选项文字不能重复'));
    }

    return Promise.resolve();
  };

  return (
    <Form
      layout="vertical"
      disabled={disabled}
      initialValues={{ title, isVertical, options, value }}
      form={form}
      onValuesChange={formChangeHandler}
    >
      <Form.Item label="标题" name="title" rules={[{ required: true, message: '请输入标题' }]}>
        <Input allowClear />
      </Form.Item>
      <Form.Item label="选项">
        <Form.List name="options">
          {(fields, { add, remove }) => {
            return (
              <>
                {fields.map(({ key, name }, index) => (
                  <Space key={key} align="baseline">
                    <Form.Item
                      name={[name, 'label']}
                      rules={[{ validator: (_, value) => optionsValidator(_, value) }]}
                    >
                      <Input allowClear placeholder="请输入选项文字..." />
                    </Form.Item>
                    {index > 1 && <MinusCircleOutlined onClick={() => remove(name)} />}
                  </Space>
                ))}
                <Form.Item>
                  <Button
                    type="link"
                    onClick={() => add({ label: '', value: '' })}
                    icon={<PlusOutlined />}
                    block
                  >
                    添加选项
                  </Button>
                </Form.Item>
              </>
            );
          }}
        </Form.List>
      </Form.Item>
      <Form.Item label="默认选中" name="value">
        <Select value={value} options={options}></Select>
      </Form.Item>
      <Form.Item valuePropName="checked" name="isVertical">
        <Checkbox>竖向排列</Checkbox>
      </Form.Item>
    </Form>
  );
};

export default PropsComponent;
