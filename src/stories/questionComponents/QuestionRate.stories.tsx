/*
 * @Author: 唐宇
 * @Date: 2025-10-11 15:54:06
 * @LastEditors: 唐宇
 * @LastEditTime: 2025-10-11 16:35:06
 * @FilePath: \survey-frontend\src\stories\questionComponents\QuestionRate.stories.tsx
 * @Description: 评分组件的 Storybook 配置文件
 *
 * Copyright (c) 2025 by 唐宇, All Rights Reserved.
 */
import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Component from '../../components/QuestionComponents/QuestionRate/Component';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Question/Rate',
  component: Component,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof Component>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Component> = args => <Component {...args} />;

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {};

export const CustomProps = Template.bind({});
CustomProps.args = {
  title: '自定义评分标题',
  value: 2.5,
  allowHalf: true,
};
