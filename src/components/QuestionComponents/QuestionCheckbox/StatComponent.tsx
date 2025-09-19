import React, { FC } from 'react';
import { Column } from '@ant-design/plots';
import { QuestionCheckboxStatComponentPropsType } from './interface';

const StatComponent: FC<QuestionCheckboxStatComponentPropsType> = (
  props: QuestionCheckboxStatComponentPropsType
) => {
  const { stat = [], rightChartWidth = '300px' } = props;
  const data = stat;
  if (!data.length) {
    return null;
  }

  const ColumnChart = () => {
    const config = {
      data,
      xField: 'type',
      yField: 'value',
      style: {
        fill: ({ type }: any) => {
          if (type === '选项1') {
            return '#22CBCC';
          }
          return '#2989FF';
        },
      },
      label: {
        text: (originData: any) => {
          const val = parseFloat(originData.value);
          if (val <= 10) {
            return val;
          }
          return '';
        },
        offset: 10,
      },
      legend: false,
    };

    return <Column {...config} />;
  };

  return <div style={{ width: rightChartWidth, height: '300px' }}>{ColumnChart()}</div>;
};

export default StatComponent;
