/*
 * @Author: 唐宇
 * @Date: 2025-09-01 16:34:27
 * @LastEditors: 唐宇
 * @LastEditTime: 2025-09-04 17:09:56
 * @FilePath: \survey-frontend\src\pages\question\Edit\RightPanel.tsx
 * @Description: 右侧面板
 *
 * Copyright (c) 2025 by 唐宇, All Rights Reserved.
 */
import React, { FC, useEffect, useState } from 'react';
import { FileTextOutlined, SettingOutlined } from '@ant-design/icons';
import { Tabs } from 'antd';
import ComponentProps from './ComponentProps';
import PageSetting from './PageSetting';
import styles from './CommonPanel.module.scss';
import useGetComponentInfo from '../../../hooks/useGetComponentInfo';

enum TAB_KEYS {
  PROPS_KEY = 'props',
  SETTING_KEY = 'setting',
}

const RightPanel: FC = () => {
  const [activeKey, setActiveKey] = useState<string>(TAB_KEYS.PROPS_KEY);
  const { selectedId } = useGetComponentInfo();

  useEffect(() => {
    if (selectedId) {
      setActiveKey(TAB_KEYS.PROPS_KEY);
    } else {
      setActiveKey(TAB_KEYS.SETTING_KEY);
    }
  }, [selectedId]);

  const tabsItems = [
    {
      key: TAB_KEYS.PROPS_KEY,
      label: <span>属性</span>,
      icon: <FileTextOutlined />,
      children: <ComponentProps />,
    },
    {
      key: TAB_KEYS.SETTING_KEY,
      label: <span>页面设置</span>,
      icon: <SettingOutlined />,
      children: <PageSetting />,
    },
  ];

  return (
    <Tabs
      className={styles['custom-tabs']}
      activeKey={activeKey}
      items={tabsItems}
      onChange={(activeKey: string) => setActiveKey(activeKey)}
    />
  );
};

export default RightPanel;
