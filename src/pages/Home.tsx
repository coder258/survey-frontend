import React, { FC, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Typography } from 'antd';
import { MANAGE_INDEX_PATHNAME } from '../router';
import styles from './Home.module.scss';
import ComponentLib from './question/Edit/ComponentLib';

const { Title, Paragraph } = Typography;

const Home: FC = () => {
  const cardRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const yRange = [-3, 3];
  const xRange = [-3, 3];
  const nav = useNavigate();
  const startBtnHandler = () => {
    nav(MANAGE_INDEX_PATHNAME);
  };

  const getRotate = (range: number[], value: number, max: number): number => {
    return (value / max) * (range[1] - range[0]) + range[0];
  };

  useEffect(() => {
    const cardElem = cardRef.current;
    if (!cardElem) {
      return;
    }
    const containerElem = containerRef.current;
    if (!containerElem) {
      return;
    }
    const rect = cardElem.getBoundingClientRect();
    const { left, top, width, height } = rect;

    const removeTransition = (event: TransitionEvent) => {
      if (event.target !== cardElem) {
        return;
      }
      cardElem.style.transition = 'none';
    };

    containerElem.onmouseenter = () => {
      cardElem.addEventListener('transitionend', removeTransition);
    };

    let ticking = false;
    let lastEvent: MouseEvent | null = null;

    cardElem.onmousemove = (event: MouseEvent) => {
      lastEvent = event;
      if (!ticking) {
        requestAnimationFrame(() => {
          if (lastEvent) {
            const { clientX, clientY } = lastEvent;
            const x = clientX - left;
            const y = clientY - top;
            const ry = -getRotate(yRange, x, width);
            const rx = getRotate(xRange, y, height);
            cardElem.style.setProperty('--rx', `${rx}deg`);
            cardElem.style.setProperty('--ry', `${ry}deg`);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    containerElem.onmouseleave = () => {
      cardElem.style.transition = '0.5s';
      cardElem.removeEventListener('transitionend', removeTransition);
    };

    cardElem.onmouseleave = () => {
      cardElem.style.setProperty('--rx', '0deg');
      cardElem.style.setProperty('--ry', '0deg');
    };

    return () => {
      cardElem.onmousemove = null;
      cardElem.onmouseleave = null;
      cardElem.removeEventListener('transitionend', removeTransition);
      containerElem.onmouseenter = null;
      containerElem.onmouseleave = null;
    };
  }, []);

  return (
    <div className={styles.container} ref={containerRef}>
      <div className={styles.info}>
        <Title>问卷调查 | 在线投票</Title>
        <Paragraph>已累计创建问卷 100 份，发布问卷 90 份，收到答卷 980 份</Paragraph>
        <div>
          <Button type="primary" onClick={startBtnHandler}>
            开始使用
          </Button>
        </div>
      </div>
      <div className={styles.card} ref={cardRef}>
        <ComponentLib pointer={true} />
      </div>
    </div>
  );
};

export default Home;
