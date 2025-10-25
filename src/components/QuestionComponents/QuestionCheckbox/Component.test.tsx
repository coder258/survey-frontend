/*
 * @Author: 唐宇
 * @Date: 2025-10-09 14:47:50
 * @LastEditors: 唐宇
 * @LastEditTime: 2025-10-25 18:06:05
 * @FilePath: \survey-frontend\src\components\QuestionComponents\QuestionCheckbox\Component.test.tsx
 * @Description: QuestionCheckbox组件测试文件
 *
 * Copyright (c) 2025 by 唐宇, All Rights Reserved.
 */
import React from 'react';
import { render, screen } from '@testing-library/react';
import Component from './Component';

// 默认属性测试用例
test('默认属性', () => {
  render(<Component />);
  const p = screen.getByText('多选框标题');
  expect(p).toBeInTheDocument();

  for (let i = 1; i <= 3; i++) {
    const checkbox = screen.getByDisplayValue(`选项${i}`);
    expect(checkbox).toBeInTheDocument();
    const label = screen.getByText(`选项${i}`);
    expect(label).toBeInTheDocument();
    if (i === 1) {
      expect(checkbox.getAttribute('checked')).not.toBeNull();
    } else {
      expect(checkbox.getAttribute('checked')).toBeNull();
    }
  }
});

// 自定义属性测试用例
test('自定义属性', () => {
  const props = {
    title: '自定义标题',
    options: [
      { label: 'l1', value: 'v1', checked: true },
      { label: 'l2', value: 'v2', checked: true },
      { label: 'l3', value: 'v3', checked: true },
    ],
  };
  render(<Component {...props} />);
  const p = screen.getByText('自定义标题');
  expect(p).toBeInTheDocument();

  for (let i = 1; i <= 3; i++) {
    const curVal = `v${i}`;
    const checkbox = screen.getByDisplayValue(curVal);
    expect(checkbox).toBeInTheDocument();
    const label = screen.getByText(`l${i}`);
    expect(label).toBeInTheDocument();

    expect(checkbox.getAttribute('checked')).not.toBeNull();
  }
});
