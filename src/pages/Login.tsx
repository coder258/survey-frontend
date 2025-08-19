import React, { FC } from 'react';
import { Typography, Space, Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { REGISTER_PATHNAME } from '../router';
import styles from './Login.module.scss';

const { Title } = Typography;

const Login: FC = () => {
  const [form] = Form.useForm();

  // 初始化时检查本地存储
  React.useEffect(() => {
    const savedUser = localStorage.getItem('savedUser');
    if (savedUser) {
      const { username, password, remember } = JSON.parse(savedUser);
      form.setFieldsValue({ username, password, remember });
    }
  }, [form]);

  const finishHandler = (values: any) => {
    console.log('表单数据:', values);

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

    // TODO: 待登录API接口提供后实现
    // 登录API调用示例：
    /*
    try {
      const res = await axios.post('/api/login', values);
      if (res.data.code === 0) {
        message.success('登录成功');
        // 登录成功后跳转到首页
        nav('/');
      } else {
        message.error(res.data.msg || '登录失败');
      }
    } catch (e) {
      message.error('登录请求失败');
      console.error('登录请求异常:', e);
    }
    */
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
            <Input placeholder="请输入用户名"></Input>
          </Form.Item>
          <Form.Item
            label="密码"
            name="password"
            rules={[
              { required: true, message: '请输入密码' },
              { min: 6, message: '密码至少6位' },
            ]}
          >
            <Input.Password placeholder="请输入密码"></Input.Password>
          </Form.Item>
          <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 6, span: 20 }}>
            <Checkbox>记住我</Checkbox>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 6, span: 20 }}>
            <Space>
              <Button type="primary" htmlType="submit">
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
