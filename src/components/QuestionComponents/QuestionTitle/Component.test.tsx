/*
 * @Author: 唐宇
 * @Date: 2025-09-30 16:30:53
 * @LastEditors: 唐宇
 * @LastEditTime: 2025-09-30 16:34:37
 * @FilePath: \survey-frontend\src\components\QuestionComponents\QuestionTitle\Component.test.tsx
 * @Description: QuestionTitle组件测试文件
 *
 * Copyright (c) 2025 by 唐宇, All Rights Reserved.
 */
import React from 'react';
import { render, screen } from '@testing-library/react';
import Component from './Component';

// 默认属性测试用例
test('默认属性', () => {
  render(<Component />);
  const h = screen.getByText('一行标题');
  expect(h).toBeInTheDocument();
});

// 自定义属性测试用例
test('自定义属性', () => {
  render(<Component text="自定义标题" level={2} isCenter={true} />);
  const h = screen.getByText('自定义标题');
  expect(h).toBeInTheDocument();

  expect(h.matches('h2')).toBeTruthy();

  const hStyle = h.style;
  expect(hStyle.textAlign).toBe('center');
});
