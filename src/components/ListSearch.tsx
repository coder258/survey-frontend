/*
 * @Author: 唐宇
 * @Date: 2025-08-15 15:48:48
 * @LastEditors: 唐宇
 * @LastEditTime: 2025-08-15 16:39:18
 * @FilePath: \survey-frontend\src\components\ListSearch.tsx
 * @Description: 搜索组件
 *
 * Copyright (c) 2025 by 唐宇, All Rights Reserved.
 */
import React, { FC, useState, useEffect } from 'react';
import { Input } from 'antd';
import type { ChangeEvent } from 'react';
import { LIST_SEARCH_PARAM_KEY } from '../constant/index';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import styles from './ListSearch.module.scss';

const { Search } = Input;

const ListSearch: FC = () => {
  const nav = useNavigate();
  const { pathname } = useLocation();
  const [value, setValue] = useState('');
  const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  // 获取当前搜索参数，并设置到input value中
  const [searchParams] = useSearchParams();
  useEffect(() => {
    const curVal = searchParams.get(LIST_SEARCH_PARAM_KEY) || '';
    setValue(curVal);
  }, [searchParams]);

  const searchHandler = (value: string) => {
    console.log(value);
    // 增加pathname后面的参数，并导航到当前页面
    nav({
      pathname: pathname,
      search: `${LIST_SEARCH_PARAM_KEY}=${value}`,
    });
  };

  return (
    <Search
      size="large"
      allowClear
      placeholder="请输入关键字"
      value={value}
      onChange={changeHandler}
      onSearch={searchHandler}
      className={styles['search-input']}
    ></Search>
  );
};

export default ListSearch;
