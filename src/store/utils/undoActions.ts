import { createAction } from '@reduxjs/toolkit';

export const UNDO = 'UNDO';
export const REDO = 'REDO';
export const CLEAR_HISTORY = 'CLEAR_HISTORY';

export const undo = createAction(UNDO);
export const redo = createAction(REDO);
export const clearHistory = createAction(CLEAR_HISTORY);

export type UndoAction = ReturnType<typeof undo>;
export type RedoAction = ReturnType<typeof redo>;
export type ClearHistoryAction = ReturnType<typeof clearHistory>;
