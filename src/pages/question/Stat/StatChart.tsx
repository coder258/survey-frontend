/*
 * @Author: 唐宇
 * @Date: 2025-09-11 10:57:14
 * @LastEditors: 唐宇
 * @LastEditTime: 2025-09-15 10:52:46
 * @FilePath: \survey-frontend\src\pages\question\Stat\StatChart.tsx
 * @Description: 右侧图表组件
 *
 * Copyright (c) 2025 by 唐宇, All Rights Reserved.
 */
import React, { FC, useEffect, useState } from 'react';
import { getComponentConfByType } from '../../../components/QuestionComponents';
import { Result, Typography } from 'antd';
import { useRequest } from 'ahooks';
import { getComponentStatApi } from '../../../api/stat';
import { useParams } from 'react-router-dom';
import styles from './StatChart.module.scss';

type PropsType = {
  componentType: string;
  selectedId: string;
  rightChartWidth: string;
  setRightChartWidth: (width: string) => void;
};

const { Title } = Typography;

const StatChart: FC<PropsType> = (props: PropsType) => {
  const { componentType, selectedId, rightChartWidth, setRightChartWidth } = props;
  const componentConf = getComponentConfByType(componentType);
  if (!componentConf) {
    return <Result status="warning" title="未选中组件" />;
  }

  const { StatComponent } = componentConf;
  if (!StatComponent) {
    return <Result status="warning" title="该组件无图表统计" />;
  }

  const { id = '' } = useParams();
  const [stat, setStat] = useState<any>({});
  const { loading, run } = useRequest(
    async () => {
      const getComponentStatApiRes = await getComponentStatApi(id, selectedId);
      return getComponentStatApiRes;
    },
    {
      manual: true,
      onSuccess: result => {
        const { stat } = result;
        setStat(stat);
      },
    }
  );

  useEffect(() => {
    if (!selectedId) {
      return;
    }
    if (componentType === 'questionCheckbox') {
      setRightChartWidth('500px');
    } else {
      setRightChartWidth('300px');
    }
    run();
  }, [id, selectedId]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Title level={3}>图表统计</Title>
      </div>
      <div className={styles.content}>
        <StatComponent stat={stat} rightChartWidth={rightChartWidth} />
      </div>
    </div>
  );
};

export default StatChart;
