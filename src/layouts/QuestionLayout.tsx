import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { Spin } from 'antd';
import useLoadUserData from '../hooks/useLoadUserData';
import useNavPage from '../hooks/useNavPage';
import styles from './QuestionLayout.module.scss';

const QuestionLayout: FC = () => {
  const { waitingUserData } = useLoadUserData();
  useNavPage(waitingUserData);

  return (
    <div style={{ height: '100vh' }}>
      {waitingUserData ? (
        <div className={styles['full-screen-center']}>
          <Spin></Spin>
        </div>
      ) : (
        <Outlet />
      )}
    </div>
  );
};

export default QuestionLayout;
