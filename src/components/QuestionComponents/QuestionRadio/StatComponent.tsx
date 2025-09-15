import React, { FC } from 'react';
import { Pie } from '@ant-design/plots';
import { QuestionRadioStatComponentPropsType } from './interface';

const StatComponent: FC<QuestionRadioStatComponentPropsType> = (
  props: QuestionRadioStatComponentPropsType
) => {
  const { stat = [] } = props;
  const data = stat;
  if (!data.length) {
    return null;
  }
  const customLabel = (_: any, datum: any) => (
    <div style={{ color: '#fff', padding: 4 }}>
      {datum.type} : <b>{datum.value}</b>
    </div>
  );

  const PieChart = () => {
    const config = {
      data,
      angleField: 'value',
      colorField: 'type',
      radius: 1,
      label: {
        text: 'type',
        position: 'outside',
        textAlign: 'center',
        transform: [
          {
            type: 'contrastReverse',
          },
        ],
        render: customLabel,
      },
      tooltip: {
        title: 'type',
      },
      legend: false,
    };
    return <Pie {...config} />;
  };

  return <div style={{ width: '300px', height: '300px' }}>{PieChart()}</div>;
};

export default StatComponent;
