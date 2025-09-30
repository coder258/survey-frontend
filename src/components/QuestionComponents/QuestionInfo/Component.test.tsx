/*
 * @Author: 唐宇
 * @Date: 2025-09-30 15:59:53
 * @LastEditors: 唐宇
 * @LastEditTime: 2025-09-30 16:08:21
 * @FilePath: \survey-frontend\src\components\QuestionComponents\QuestionInfo\Component.test.tsx
 * @Description: 测试 QuestionInfo 组件的默认属性、自定义属性和多行文字渲染是否正确。
 *
 * Copyright (c) 2025 by 唐宇, All Rights Reserved.
 */
import React from 'react';
import { render, screen } from '@testing-library/react';
import Component from './Component';

// 默认属性测试用例
test('默认属性', () => {
  render(<Component />);
  const h = screen.getByText('问卷标题');
  expect(h).toBeInTheDocument();
  const p = screen.getByText('问卷描述');
  expect(p).toBeInTheDocument();
});

// 自定义属性测试用例
test('自定义属性', () => {
  render(<Component title="自定义标题" desc="自定义描述" />);
  const h = screen.getByText('自定义标题');
  expect(h).toBeInTheDocument();
  const p = screen.getByText('自定义描述');
  expect(p).toBeInTheDocument();
});

// 多行文字测试用例
test('多行文字', () => {
  render(<Component desc={`换行1\n换行2\n换行3`} />);
  const span1 = screen.getByText('换行1');
  expect(span1).toBeInTheDocument();
  expect(span1).toHaveTextContent('换行1');
  expect(span1).not.toHaveTextContent('换行2');

  const span2 = screen.getByText('换行2');
  expect(span2).toBeInTheDocument();
});
