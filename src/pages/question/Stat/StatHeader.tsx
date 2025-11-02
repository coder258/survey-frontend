/*
 * @Author: 唐宇
 * @Date: 2025-09-11 10:43:24
 * @LastEditors: 唐宇
 * @LastEditTime: 2025-11-02 17:15:29
 * @FilePath: \survey-frontend\src\pages\question\Stat\StatHeader.tsx
 * @Description: 统计头部组件
 *
 * Copyright (c) 2025 by 唐宇, All Rights Reserved.
 */
import React, { FC, useRef } from 'react';
import styles from './StatHeader.module.scss';
import { Button, Input, InputRef, message, Popover, Space, Typography } from 'antd';
import { CopyOutlined, LeftOutlined, QrcodeOutlined } from '@ant-design/icons';
import { QRCodeSVG } from 'qrcode.react';
import { useNavigate, useParams } from 'react-router-dom';
import useGetPageInfo from '../../../hooks/useGetPageInfo';

const { Title } = Typography;

const StatHeader: FC = () => {
  const { title } = useGetPageInfo();
  const nav = useNavigate();
  const { id = '' } = useParams();
  const inputRef = useRef<InputRef>(null);
  const inputValue = `http://192.168.133.14:3000/question/${id}`;

  const qrcodeContent = (
    <div>
      <QRCodeSVG value={inputValue} />
    </div>
  );

  const copyClickHandler = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(inputValue);
      message.success('复制成功');
    } else {
      document.execCommand('copy', true, inputValue);
      message.success('复制成功');
    }
    const elem = inputRef.current;
    if (elem) {
      elem.select();
    }
  };

  return (
    <div className={`${styles['header-wrapper']} ${styles['py-12']}`}>
      <div className={`${styles['header']} ${styles['mx-24']}`}>
        <div className={styles.left}>
          <Space>
            <Button type="link" icon={<LeftOutlined />} onClick={() => nav(-1)}>
              返回
            </Button>
            <Space>
              <Title className={`${styles['text-lg']} ${styles['mb-0']}`}>{title}</Title>
            </Space>
          </Space>
        </div>
        <div className={`${styles.main} ${styles['text-center']}`}>
          <Space>
            <Input value={inputValue} className={styles['input-w-320']} ref={inputRef}></Input>
            <Button type="default" icon={<CopyOutlined />} onClick={copyClickHandler} />
            <Popover content={qrcodeContent}>
              <Button type="default" icon={<QrcodeOutlined />} />
            </Popover>
          </Space>
        </div>
        <div className={`${styles.right} ${styles['text-right']}`}>
          <Space>
            <Button type="primary" onClick={() => nav(`/question/edit/${id}`)}>
              编辑问卷
            </Button>
          </Space>
        </div>
      </div>
    </div>
  );
};

export default StatHeader;
