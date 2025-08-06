/*
 * @Author: 唐宇
 * @Date: 2025-08-05 16:59:48
 * @LastEditors: 唐宇
 * @LastEditTime: 2025-08-05 17:25:56
 * @FilePath: \survey-frontend\src\router\index.tsx
 * @Description: 路由配置
 *
 * Copyright (c) 2025 by 唐宇, All Rights Reserved.
 */
import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

import MainLayout from '../layouts/MainLayout';
import ManageLayout from '../layouts/ManageLayout';
import QuestionLayout from '../layouts/QuestionLayout';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import NotFound from '../pages/NotFound';
import List from '../pages/manage/List';
import Trash from '../pages/manage/Trash';
import Star from '../pages/manage/Star';
import Edit from '../pages/question/Edit';
import Stat from '../pages/question/Stat';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: '/', element: <Home /> },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      {
        path: 'manage',
        element: <ManageLayout />,
        children: [
          { path: 'list', element: <List /> },
          { path: 'trash', element: <Trash /> },
          { path: 'star', element: <Star /> },
        ],
      },
      { path: '*', element: <NotFound /> },
    ],
  },
  {
    path: 'question',
    element: <QuestionLayout />,
    children: [
      { path: 'edit/:id', element: <Edit /> },
      { path: 'stat/:id', element: <Stat /> },
    ],
  },
]);

export default router;
