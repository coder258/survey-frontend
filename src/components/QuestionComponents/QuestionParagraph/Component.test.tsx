/*
 * @Author: 唐宇
 * @Date: 2025-09-30 16:36:48
 * @LastEditors: 唐宇
 * @LastEditTime: 2025-09-30 16:44:25
 * @FilePath: \survey-frontend\src\components\QuestionComponents\QuestionParagraph\Component.test.tsx
 * @Description: 段落组件测试用例
 *
 * Copyright (c) 2025 by 唐宇, All Rights Reserved.
 */
import React from 'react';
import { render, screen } from '@testing-library/react';
import Component from './Component';

// 默认属性测试用例
test('默认属性', () => {
  render(<Component />);
  const span = screen.getByText('一行段落');
  expect(span).toBeInTheDocument();
});

// 自定义属性测试用例
test('自定义属性', () => {
  render(<Component text="自定义段落" isCenter={true} />);
  const span = screen.getByText('自定义段落');
  expect(span).toBeInTheDocument();

  const p = span.parentElement;
  expect(p).not.toBeNull();

  const pStyle = p!.style || {};
  expect(pStyle.textAlign).toBe('center');
});

// 多行文字
test('多行文字', () => {
  render(<Component text={`第一行\n第二行`} isCenter={true} />);
  const span1 = screen.getByText('第一行');
  expect(span1).toBeInTheDocument();
  expect(span1).toHaveTextContent('第一行');
  expect(span1).not.toHaveTextContent('第二行');

  const span2 = screen.getByText('第二行');
  expect(span2).toBeInTheDocument();
});
