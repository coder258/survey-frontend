import { UnknownAction } from '@reduxjs/toolkit';
import { UNDO, REDO, CLEAR_HISTORY } from './undoActions';
import { produce } from 'immer';

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

/**
 * 创建可撤销/重做的高阶reducer
 * 使用方法: 参考src/store/index.ts
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
      if (past.length === 0) {
        return state;
      }
      const res = produce(state, (draft: HistoryState<T>) => {
        draft.future.unshift(draft.present);
        draft.present = draft.past.pop() as T;
      });

      return res;
    }

    // 处理重做动作
    if (action.type === REDO) {
      if (future.length === 0) {
        return state;
      }

      const res = produce(state, (draft: HistoryState<T>) => {
        draft.past.push(draft.present);
        draft.present = draft.future.shift() as T;
      });

      return res;
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
    return produce(state, (draft: HistoryState<T>) => {
      draft.past.push(draft.present);
      draft.present = newPresent;
      draft.future = [];

      // 应用历史记录限制
      if (draft.past.length > limit) {
        draft.past = draft.past.slice(draft.past.length - limit);
      }
    });
  };
};

export default createUndoableReducer;
