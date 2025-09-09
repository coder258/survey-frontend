/*
 * @Author: 唐宇
 * @Date: 2025-08-29 16:01:25
 * @LastEditors: 唐宇
 * @LastEditTime: 2025-09-09 16:51:27
 * @FilePath: \survey-frontend\src\components\QuestionComponents\index.ts
 * @Description: 统一管理所有组件的配置信息
 *
 * Copyright (c) 2025 by 唐宇, All Rights Reserved.
 */
import { FC } from 'react';
import QuestionInputConf, { QuestionInputPropsType } from './QuestionInput';
import QuestionTitleConf, { QuestionTitlePropsType } from './QuestionTitle';
import QuestionParagraphConf, { QuestionParagraphPropsType } from './QuestionParagraph';
import QuestionInfoConf, { QuestionInfoPropsType } from './QuestionInfo';
import QuestionTextAreaConf, { QuestionTextAreaPropsType } from './QuestionTextArea';
import QuestionRadioConf, { QuestionRadioPropsType } from './QuestionRadio';
import QuestionRateConf, { QuestionRatePropsType } from './QuestionRate';
import QuestionCheckboxConf, { QuestionCheckboxPropsType } from './QuestionCheckbox';

// 各个组件统一的 props 类型
export type ComponentPropsType = QuestionInputPropsType &
  QuestionTitlePropsType &
  QuestionParagraphPropsType &
  QuestionInfoPropsType &
  QuestionTextAreaPropsType &
  QuestionRadioPropsType &
  QuestionRatePropsType &
  QuestionCheckboxPropsType;

// 组件配置信息类型
export type ComponentConfType = {
  title: string;
  type: string;
  Component: FC<ComponentPropsType>;
  PropsComponent: FC<ComponentPropsType>;
  defaultProps: ComponentPropsType;
};

// 所有组件的配置列表
const componentConfList: ComponentConfType[] = [
  QuestionInputConf,
  QuestionTitleConf,
  QuestionParagraphConf,
  QuestionInfoConf,
  QuestionTextAreaConf,
  QuestionRadioConf,
  QuestionCheckboxConf,
  QuestionRateConf,
];

export type ComponentConfGroupType = {
  groupId: string;
  groupName: string;
  components: ComponentConfType[];
};

// 组件分组
export const componentConfGroup: ComponentConfGroupType[] = [
  {
    groupId: 'textGroup',
    groupName: '文本显示',
    components: [QuestionInfoConf, QuestionTitleConf, QuestionParagraphConf],
  },
  {
    groupId: 'inputGroup',
    groupName: '用户输入',
    components: [QuestionInputConf, QuestionTextAreaConf],
  },
  {
    groupId: 'chooseGroup',
    groupName: '用户选择',
    components: [QuestionRadioConf, QuestionCheckboxConf, QuestionRateConf],
  },
  // TODO：添加文件上传，支持图片上传(支持本地预览、裁剪)、大文件上传
];

/**
 * 根据组件类型获取组件配置
 *
 * @param type 组件类型
 * @returns 返回对应类型的组件配置对象，若未找到则返回 undefined
 */
export const getComponentConfByType = (type: string) => {
  return componentConfList.find(conf => conf.type === type);
};
