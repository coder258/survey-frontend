/*
 * @Author: 唐宇
 * @Date: 2025-08-25 17:08:26
 * @LastEditors: 唐宇
 * @LastEditTime: 2025-08-25 17:25:13
 * @FilePath: \survey-frontend\src\components\ListPagination.tsx
 * @Description: 分页组件
 *
 * Copyright (c) 2025 by 唐宇, All Rights Reserved.
 */
import { Pagination } from 'antd';
import React, { FC, useEffect, useState } from 'react';
import { useSearchParams, useNavigate, useLocation } from 'react-router-dom';
import { LIST_PAGE_SIZE, LIST_PAGE_NUM_PARAM_KEY, LIST_PAGE_SIZE_PARAM_KEY } from '../constant';

type PropsType = {
  total: number;
  justify?: 'left' | 'center' | 'right';
};

const ListPagination: FC<PropsType> = (props: PropsType) => {
  const { total } = props;
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(LIST_PAGE_SIZE);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const pageNum = parseInt(searchParams.get(LIST_PAGE_NUM_PARAM_KEY) || '') || 1;
    setCurrent(pageNum);
    const pageSize = parseInt(searchParams.get(LIST_PAGE_SIZE_PARAM_KEY) || '') || LIST_PAGE_SIZE;
    setPageSize(pageSize);
  }, [searchParams]);

  const nav = useNavigate();
  const { pathname } = useLocation();
  const pageChangeHandler = (pageNum: number, pageSize: number) => {
    searchParams.set(LIST_PAGE_NUM_PARAM_KEY, pageNum.toString());
    searchParams.set(LIST_PAGE_SIZE_PARAM_KEY, pageSize.toString());

    nav({
      pathname: pathname,
      search: searchParams.toString(),
    });
  };
  return (
    <div>
      <Pagination
        current={current}
        pageSize={pageSize}
        total={total}
        onChange={pageChangeHandler}
        style={{ justifyContent: props.justify || 'right' }}
      />
    </div>
  );
};

export default ListPagination;
