/*
 * @Author: 唐宇
 * @Date: 2025-09-07 19:01:44
 * @LastEditors: 唐宇
 * @LastEditTime: 2025-09-07 19:08:02
 * @FilePath: \survey-frontend\src\components\DragSortable\SortableItem.tsx
 * @Description: 拖拽项
 *
 * Copyright (c) 2025 by 唐宇, All Rights Reserved.
 */
import React, { FC } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

type PropsType = {
  id: string;
  children: JSX.Element;
};

const SortableItem: FC<PropsType> = (props: PropsType) => {
  const { id, children } = props;
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {children}
    </div>
  );
};

export default SortableItem;
