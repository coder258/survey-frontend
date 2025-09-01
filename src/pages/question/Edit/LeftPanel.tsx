/*
 * @Author: 唐宇
 * @Date: 2025-09-01 14:42:01
 * @LastEditors: 唐宇
 * @LastEditTime: 2025-09-01 16:30:49
 * @FilePath: \survey-frontend\src\pages\question\Edit\LeftPanel.tsx
 * @Description: 左侧面板
 *
 * Copyright (c) 2025 by 唐宇, All Rights Reserved.
 */
import { AppstoreAddOutlined, BarsOutlined } from '@ant-design/icons';
import { Tabs } from 'antd';
import React, { Children, FC } from 'react';
import ComponentLib from './ComponentLib';

const LeftPanel: FC = () => {
  const tabsItems = [
    {
      key: 'componentLib',
      label: <span>组件库</span>,
      icon: <AppstoreAddOutlined />,
      children: <ComponentLib />,
    },
    {
      key: 'layers',
      label: <span>图层</span>,
      icon: <BarsOutlined />,
      children: <div>图层</div>,
    },
  ];

  return <Tabs defaultActiveKey="componentLib" items={tabsItems} />;
};

export default LeftPanel;
