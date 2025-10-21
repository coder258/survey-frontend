import React, { FC, useEffect } from 'react';
import { Typography, Space, Form, Input, Button, Checkbox, message } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { REGISTER_PATHNAME, MANAGE_INDEX_PATHNAME } from '../router';
import styles from './Login.module.scss';
import { loginApi } from '../api/user';
import { useRequest } from 'ahooks';
import { setToken } from '../utils/user-token';

const { Title } = Typography;

const Login: FC = () => {
  const [form] = Form.useForm();
  const nav = useNavigate();

  // 初始化时检查本地存储
  useEffect(() => {
    const savedUser = localStorage.getItem('savedUser');
    if (savedUser) {
      const { username, password, remember } = JSON.parse(savedUser);
      form.setFieldsValue({ username, password, remember });
    }
  }, [form]);

  const { run: login, loading: loginLoading } = useRequest(
    (username: string, password: string) => loginApi(username, password),
    {
      manual: true,
      onSuccess: data => {
        // 存储token等登录信息
        setToken(data.token);
        message.success('登录成功');
        // 跳转到我的问卷页面
        nav(MANAGE_INDEX_PATHNAME);
      },
      onError: () => {
        message.error('登录失败');
      },
    }
  );

  const finishHandler = (values: any) => {
    // 处理"记住我"功能
    if (values.remember) {
      localStorage.setItem(
        'savedUser',
        JSON.stringify({
          username: values.username,
          password: values.password,
          remember: true,
        })
      );
    } else {
      localStorage.removeItem('savedUser');
    }
    const { username, password } = values;

    login(username, password);
  };

  return (
    <div className={styles.container}>
      <div>
        <Space>
          <Title level={2}>
            <UserOutlined></UserOutlined>
          </Title>
          <Title level={2}>用户登录</Title>
        </Space>
      </div>
      <div>
        <Form form={form} labelCol={{ span: 6 }} wrapperCol={{ span: 20 }} onFinish={finishHandler}>
          <Form.Item
            label="用户名"
            name="username"
            rules={[
              { required: true, message: '请输入用户名' },
              { min: 4, message: '用户名至少4个字符' },
              { max: 20, message: '用户名最多20个字符' },
            ]}
          >
            <Input allowClear placeholder="请输入用户名"></Input>
          </Form.Item>
          <Form.Item
            label="密码"
            name="password"
            rules={[
              { required: true, message: '请输入密码' },
              { min: 6, message: '密码至少6位' },
            ]}
          >
            <Input.Password allowClear placeholder="请输入密码"></Input.Password>
          </Form.Item>
          <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 6, span: 20 }}>
            <Checkbox>记住我</Checkbox>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 6, span: 20 }}>
            <Space>
              <Button type="primary" htmlType="submit" loading={loginLoading}>
                登录
              </Button>
              <Link to={REGISTER_PATHNAME}>没有账号，去注册</Link>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
