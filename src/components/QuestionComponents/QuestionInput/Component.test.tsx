/*
 * @Author: 唐宇
 * @Date: 2025-09-30 16:50:07
 * @LastEditors: 唐宇
 * @LastEditTime: 2025-09-30 16:51:48
 * @FilePath: \survey-frontend\src\components\QuestionComponents\QuestionInput\Component.test.tsx
 * @Description: 问卷输入框组件测试文件
 *
 * Copyright (c) 2025 by 唐宇, All Rights Reserved.
 */
import React from 'react';
import { render, screen } from '@testing-library/react';
import Component from './Component';

// 默认属性测试用例
test('默认属性', () => {
  render(<Component />);
  const p = screen.getByText('输入框标题');
  expect(p).toBeInTheDocument();

  const input = screen.getByPlaceholderText('请输入...');
  expect(input).toBeInTheDocument();
});

// 自定义属性测试用例
test('自定义属性', () => {
  render(<Component title="自定义标题" placeholder="自定义占位符" />);
  const p = screen.getByText('自定义标题');
  expect(p).toBeInTheDocument();

  const input = screen.getByPlaceholderText('自定义占位符');
  expect(input).toBeInTheDocument();
});
