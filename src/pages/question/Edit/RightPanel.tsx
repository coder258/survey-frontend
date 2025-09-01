/*
 * @Author: 唐宇
 * @Date: 2025-09-01 16:34:27
 * @LastEditors: 唐宇
 * @LastEditTime: 2025-09-01 16:40:38
 * @FilePath: \survey-frontend\src\pages\question\Edit\RightPanel.tsx
 * @Description: 右侧面板
 *
 * Copyright (c) 2025 by 唐宇, All Rights Reserved.
 */
import React, { FC } from 'react';
import { FileTextOutlined, SettingOutlined } from '@ant-design/icons';
import { Tabs } from 'antd';
import ComponentProps from './ComponentProps';

const RightPanel: FC = () => {
  const tabsItems = [
    {
      key: 'props',
      label: <span>属性</span>,
      icon: <FileTextOutlined />,
      children: <ComponentProps />,
    },
    {
      key: 'setting',
      label: <span>页面设置</span>,
      icon: <SettingOutlined />,
      children: <div>页面设置</div>,
    },
  ];

  return <Tabs defaultActiveKey="props" items={tabsItems} />;
};

export default RightPanel;
