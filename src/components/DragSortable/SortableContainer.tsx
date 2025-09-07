/*
 * @Author: 唐宇
 * @Date: 2025-09-07 18:41:07
 * @LastEditors: 唐宇
 * @LastEditTime: 2025-09-07 19:00:25
 * @FilePath: \survey-frontend\src\components\DragSortable\SortableContainer.tsx
 * @Description: 拖拽容器
 *
 * Copyright (c) 2025 by 唐宇, All Rights Reserved.
 */
import React, { FC } from 'react';
import {
  DndContext,
  closestCenter,
  MouseSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  //   arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

type PropsType = {
  children: JSX.Element | JSX.Element[];
  items: Array<{ id: string; [key: string]: any }>;
  onDragEnd: (oldIndex: number, newIndex: number) => void;
};

const SortableContainer: FC<PropsType> = (props: PropsType) => {
  const { children, items, onDragEnd } = props;
  const sensors = useSensors(
    useSensor(MouseSensor, {
      // Prevent default on mousedown
      activationConstraint: {
        distance: 8, // 8px
      },
    })
  );

  const dragEndHandler = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over === null) {
      return;
    }
    if (active.id !== over.id) {
      const oldIndex = items.findIndex(item => item.fe_id === active.id);
      const newIndex = items.findIndex(item => item.fe_id === over.id);
      onDragEnd(oldIndex, newIndex);
    }
  };

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={dragEndHandler}>
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        {children}
      </SortableContext>
    </DndContext>
  );
};

export default SortableContainer;
