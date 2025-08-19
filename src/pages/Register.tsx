/*
 * @Author: 唐宇
 * @Date: 2025-08-04 16:21:18
 * @LastEditors: 唐宇
 * @LastEditTime: 2025-08-19 16:39:31
 * @FilePath: \survey-frontend\src\pages\Register.tsx
 * @Description: 注册页
 *
 * Copyright (c) 2025 by 唐宇, All Rights Reserved.
 */
import React, { FC } from 'react';
import { Typography, Space, Form, Input, Button } from 'antd';
import { UserAddOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { LOGIN_PATHNAME } from '../router';
import styles from './Register.module.scss';

const { Title } = Typography;

const Register: FC = () => {
  const finishHandler = (values: any) => {
    console.log('表单数据:', values);
    // TODO: 待注册API接口提供后实现
    // 注册API调用示例：
    /*
    try {
      const res = await axios.post('/api/register', values);
      if (res.data.code === 0) {
        message.success('注册成功');
        // 注册成功后跳转到登录页
        nav(LOGIN_PATHNAME);
      } else {
        message.error(res.data.msg || '注册失败');
      }
    } catch (e) {
      message.error('注册请求失败');
      console.error('注册请求异常:', e);
    }
    */
  };
  return (
    <div className={styles.container}>
      <div>
        <Space>
          <Title level={2}>
            <UserAddOutlined></UserAddOutlined>
          </Title>
          <Title level={2}>注册新用户</Title>
        </Space>
      </div>
      <div>
        <Form labelCol={{ span: 6 }} wrapperCol={{ span: 20 }} onFinish={finishHandler}>
          <Form.Item
            label="用户名"
            name="username"
            rules={[
              { required: true, message: '请输入用户名' },
              { min: 4, message: '用户名至少4个字符' },
              { max: 20, message: '用户名最多20个字符' },
            ]}
          >
            <Input placeholder="4-20个字符"></Input>
          </Form.Item>
          <Form.Item
            label="密码"
            name="password"
            rules={[
              { required: true, message: '请输入密码' },
              { min: 6, message: '密码至少6位' },
              { pattern: /^(?=.*[A-Za-z])(?=.*\d).+$/, message: '密码需包含字母和数字' },
            ]}
          >
            <Input.Password placeholder="至少6位，包含字母和数字"></Input.Password>
          </Form.Item>
          <Form.Item
            label="确认密码"
            name="confirmPassword"
            dependencies={['password']}
            rules={[
              { required: true, message: '请确认密码' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('两次输入的密码不一致'));
                },
              }),
            ]}
          >
            <Input.Password placeholder="再次输入密码"></Input.Password>
          </Form.Item>
          <Form.Item
            label="昵称"
            name="nickname"
            rules={[{ max: 20, message: '昵称最多20个字符' }]}
          >
            <Input placeholder="可选"></Input>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 6, span: 20 }}>
            <Space>
              <Button type="primary" htmlType="submit">
                注册
              </Button>
              <Link to={LOGIN_PATHNAME}>已有账号，去登录</Link>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Register;
