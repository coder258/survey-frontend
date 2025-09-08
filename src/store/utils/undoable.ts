import { UnknownAction } from '@reduxjs/toolkit';
import { UNDO, REDO, CLEAR_HISTORY } from './undoActions';

// 历史状态结构
export type HistoryState<T> = {
  past: T[];
  present: T;
  future: T[];
};

// 配置选项
type Config = {
  limit?: number; // 历史记录限制
  filter?: (action: UnknownAction) => boolean; // action过滤器
  initTypes?: string[]; // 初始化历史的状态
};

// ==================== 核心实现 ====================

/**
 * 创建可撤销/重做的高阶reducer
 * @param originalReducer 原始reducer
 * @param config 配置选项
 */
const createUndoableReducer = <T>(
  originalReducer: (state: T | undefined, action: UnknownAction) => T,
  config: Config = {}
): ((state: HistoryState<T> | undefined, action: UnknownAction) => HistoryState<T>) => {
  const {
    limit = 20, // 默认限制20条历史记录
    filter = () => false, // 默认记录所有action（返回false表示记录）
    initTypes = ['@@redux/INIT'],
  } = config;
  // 初始状态
  const initialState: HistoryState<T> = {
    past: [],
    present: originalReducer(undefined, { type: '@@INIT' } as UnknownAction),
    future: [],
  };

  return (state = initialState, action) => {
    const { past, present, future } = state;

    // 过滤检查：返回true表示跳过历史记录
    if (filter(action)) {
      const newPresent = originalReducer(present, action);
      return {
        past,
        present: newPresent,
        future,
      };
    }

    // 处理撤销动作
    if (action.type === UNDO) {
      if (past.length === 0) return state;

      const previous = past[past.length - 1];
      const newPast = past.slice(0, past.length - 1);

      return {
        past: newPast,
        present: previous,
        future: [present, ...future],
      };
    }

    // 处理重做动作
    if (action.type === REDO) {
      if (future.length === 0) return state;

      const next = future[0];
      const newFuture = future.slice(1);

      return {
        past: [...past, present],
        present: next,
        future: newFuture,
      };
    }

    // 处理清除历史动作
    if (action.type === CLEAR_HISTORY) {
      return {
        past: [],
        present,
        future: [],
      };
    }

    // 对于其他动作，交给原始reducer处理
    const newPresent = originalReducer(present, action);

    // 如果状态没有变化，直接返回原状态
    if (newPresent === present) {
      return state;
    }

    // 初始化类型不记录历史
    if (initTypes.includes(action.type) || action.type === '@@INIT') {
      return {
        past: [],
        present: newPresent,
        future: [],
      };
    }

    // 处理普通action
    // 1. 将当前状态存入past状态
    // 2. 计算当前的新状态
    // 3. 清空future状态
    let newPast = [...past, present];

    // 应用历史记录限制
    if (newPast.length > limit) {
      newPast = newPast.slice(newPast.length - limit);
    }

    return {
      past: newPast,
      present: newPresent,
      future: [], // 清空future栈
    };
  };
};

export default createUndoableReducer;
