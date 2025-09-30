/*
 * @Author: 唐宇
 * @Date: 2025-09-30 17:00:55
 * @LastEditors: 唐宇
 * @LastEditTime: 2025-09-30 17:08:14
 * @FilePath: \survey-frontend\src\components\QuestionComponents\QuestionRadio\Component.test.tsx
 * @Description: QuestionRadio组件测试文件
 *
 * Copyright (c) 2025 by 唐宇, All Rights Reserved.
 */
import React from 'react';
import { render, screen } from '@testing-library/react';
import Component from './Component';

// 默认属性测试用例
test('默认属性', () => {
  render(<Component />);
  const p = screen.getByText('单选框标题');
  expect(p).toBeInTheDocument();

  for (let i = 1; i <= 3; i++) {
    const radio = screen.getByDisplayValue(`option${i}`);
    expect(radio).toBeInTheDocument();
    const label = screen.getByText(`选项${i}`);
    expect(label).toBeInTheDocument();
  }
});

// 自定义属性测试用例
test('自定义属性', () => {
  const props = {
    title: '自定义标题',
    options: [
      { label: 'l1', value: 'v1' },
      { label: 'l2', value: 'v2' },
      { label: 'l3', value: 'v3' },
    ],
    value: 'v1',
  };
  render(<Component {...props} />);
  const p = screen.getByText('自定义标题');
  expect(p).toBeInTheDocument();

  for (let i = 1; i <= 3; i++) {
    const curVal = `v${i}`;
    const radio = screen.getByDisplayValue(curVal);
    expect(radio).toBeInTheDocument();
    const label = screen.getByText(`l${i}`);
    expect(label).toBeInTheDocument();

    if (curVal === props.value) {
      expect(radio.getAttribute('checked')).not.toBeNull();
    }
  }
});
