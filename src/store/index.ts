import { configureStore, UnknownAction } from '@reduxjs/toolkit';
import userReducer, { UserStateType } from './userReducer';
import componentsReducer, { ComponentsStateType } from './componentsReducer';
import pageInfoReducer, { PageInfoType } from './pageInfoReducer';
import createUndoableReducer, { HistoryState } from './utils/undoable';

export type StateType = {
  user: UserStateType;
  components: HistoryState<ComponentsStateType>;
  pageInfo: PageInfoType;
};

export default configureStore({
  reducer: {
    user: userReducer,
    components: createUndoableReducer<ComponentsStateType>(componentsReducer, {
      limit: 20,
      filter: (action: UnknownAction) => {
        const actionFilterList = [
          'components/resetComponents',
          'components/setSelectedId',
          'components/selectPrevComponent',
          'components/selectNextComponent',
        ];

        if (actionFilterList.includes(action.type)) {
          return true;
        }
        return false;
      },
    }),
    pageInfo: pageInfoReducer,
  },
});
