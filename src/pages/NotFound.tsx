/*
 * @Author: 唐宇
 * @Date: 2025-08-04 16:32:09
 * @LastEditors: 唐宇
 * @LastEditTime: 2025-08-13 17:05:17
 * @FilePath: \survey-frontend\src\pages\NotFound.tsx
 * @Description:
 *
 * Copyright (c) 2025 by 唐宇, All Rights Reserved.
 */
import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Result } from 'antd';
import { MANAGE_INDEX_PATHNAME } from '../router';
import styles from './NotFound.module.scss';

const NotFound: FC = () => {
  const nav = useNavigate();

  return (
    <>
      <Result
        className={styles.container}
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Button type="primary" onClick={() => nav(MANAGE_INDEX_PATHNAME)}>
            Back Home
          </Button>
        }
      />
    </>
  );
};

export default NotFound;
