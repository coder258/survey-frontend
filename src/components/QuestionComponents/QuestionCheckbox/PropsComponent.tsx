import React, { FC, useEffect } from 'react';
import { QuestionCheckboxPropsType } from './interface';
import { Button, Checkbox, Form, Input, Select, Space } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

const PropsComponent: FC<QuestionCheckboxPropsType> = (props: QuestionCheckboxPropsType) => {
  const { title, isVertical, options = [], onChange, disabled } = props;
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue({
      title,
      isVertical,
      options,
    });
  }, [title, isVertical, options]);

  const formChangeHandler = () => {
    if (onChange) {
      const newValues = form.getFieldsValue();
      const { options = [] } = newValues as QuestionCheckboxPropsType;
      options.forEach(option => {
        if (option.value) {
          return;
        }
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
      initialValues={{ title, isVertical, options }}
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
                    <Form.Item name={[name, 'checked']} valuePropName="checked">
                      <Checkbox />
                    </Form.Item>
                    <Form.Item
                      name={[name, 'label']}
                      rules={[{ validator: (_, value) => optionsValidator(_, value) }]}
                    >
                      <Input allowClear placeholder="请输入选项文字..." />
                    </Form.Item>
                    {index > 0 && <MinusCircleOutlined onClick={() => remove(name)} />}
                  </Space>
                ))}
                <Form.Item>
                  <Button
                    type="link"
                    onClick={() => add({ label: '', value: '', checked: false })}
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
      <Form.Item valuePropName="checked" name="isVertical">
        <Checkbox>竖向排列</Checkbox>
      </Form.Item>
    </Form>
  );
};

export default PropsComponent;
