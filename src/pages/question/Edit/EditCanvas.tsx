import React, { FC } from 'react';
import styles from './EditCanvas.module.scss';
import QuestionInput from '../../../components/QuestionComponents/QuestionInput/Component';
import QuestionTitle from '../../../components/QuestionComponents/QuestionTitle/Component';
import { Spin } from 'antd';

type PropsType = {
  loading: boolean;
};

const EditCanvas: FC<PropsType> = (props: PropsType) => {
  const { loading } = props;
  if (loading) {
    return (
      <div className={styles['loading-center']}>
        <Spin></Spin>
      </div>
    );
  }
  return (
    <div className={styles.canvas}>
      <div className={styles['component-wrapper']}>
        <div className={styles.component}>
          <QuestionTitle />
        </div>
      </div>
      <div className={styles['component-wrapper']}>
        <div className={styles.component}>
          <QuestionInput />
        </div>
      </div>
    </div>
  );
};

export default EditCanvas;
