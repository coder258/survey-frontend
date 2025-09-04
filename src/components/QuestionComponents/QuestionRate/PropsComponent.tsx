/*
 * @Author: 唐宇
 * @Date: 2025-09-04 10:41:06
 * @LastEditors: 唐宇
 * @LastEditTime: 2025-09-04 17:15:09
 * @FilePath: \survey-frontend\src\components\QuestionComponents\QuestionRate\PropsComponent.tsx
 * @Description: Rate 属性配置组件
 *
 * Copyright (c) 2025 by 唐宇, All Rights Reserved.
 */
import React, { FC, useEffect } from 'react';
import { QuestionRatePropsType } from './interface';
import { Checkbox, Form, Input, Rate, Space, Tooltip } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';

const PropsComponent: FC<QuestionRatePropsType> = (props: QuestionRatePropsType) => {
  const { title, allowHalf, tooltips = [], value, onChange, disabled } = props;
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue({
      title,
      allowHalf,
      tooltips,
      value,
    });
  }, [title, allowHalf, tooltips, value]);

  const formChangeHandler = () => {
    if (onChange) {
      const newValues = form.getFieldsValue();
      onChange(newValues);
    }
  };

  const tooltipsValidator = (_: any, value: any) => {
    // 判断当前值是否和tooltips中其他的值重复
    let num = 0;
    for (let i = 0; i < tooltips.length; i++) {
      if (tooltips[i] === value && value !== '') {
        num++;
      }
    }
    if (num > 1) {
      return Promise.reject(new Error('文案不能重复'));
    }

    return Promise.resolve();
  };

  const renderPrefixTooltipsTitle = (index: number): string => {
    switch (index) {
      case 0:
        return '1~2星';
      case 1:
        return '2~3星';
      case 2:
        return '3~4星';
      case 3:
        return '4~5星';
      case 4:
        return '5星';
      default:
        return '5星';
    }
  };

  return (
    <Form
      layout="vertical"
      disabled={disabled}
      initialValues={{ title, allowHalf, tooltips, value }}
      form={form}
      onValuesChange={formChangeHandler}
    >
      <Form.Item label="标题" name="title" rules={[{ required: true, message: '请输入标题' }]}>
        <Input />
      </Form.Item>
      <Form.Item label="默认评分" name="value">
        <Rate allowHalf={allowHalf} value={value} />
      </Form.Item>
      <Form.Item label="评分文案">
        <Form.List name="tooltips">
          {fields => {
            return (
              <>
                {fields.map(({ key, name }, index) => (
                  <Space key={key} align="baseline">
                    <Form.Item
                      name={name}
                      rules={[{ validator: (_, value) => tooltipsValidator(_, value) }]}
                    >
                      <Input
                        placeholder="请输入评分文案..."
                        prefix={
                          <Tooltip title={renderPrefixTooltipsTitle(index)}>
                            <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                          </Tooltip>
                        }
                      />
                    </Form.Item>
                  </Space>
                ))}
              </>
            );
          }}
        </Form.List>
      </Form.Item>
      <Form.Item valuePropName="checked" name="allowHalf">
        <Checkbox>半星选中</Checkbox>
      </Form.Item>
    </Form>
  );
};

export default PropsComponent;
