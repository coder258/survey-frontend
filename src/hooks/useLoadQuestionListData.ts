import { useRequest } from 'ahooks';
import { useSearchParams } from 'react-router-dom';
import { getQuestionListApi } from '../api/question';
import {
  LIST_SEARCH_PARAM_KEY,
  LIST_PAGE_NUM_PARAM_KEY,
  LIST_PAGE_SIZE_PARAM_KEY,
  LIST_PAGE_SIZE,
} from '../constant';

type OptionType = {
  isStar: boolean;
  isDeleted: boolean;
};

const useLoadQuestionListData = (opt: Partial<OptionType> = {}) => {
  const { isStar = false, isDeleted = false } = opt;
  const [searchParams] = useSearchParams();

  const { data, loading, error } = useRequest(
    async () => {
      const keyword = searchParams.get(LIST_SEARCH_PARAM_KEY) || '';
      const pageNum = parseInt(searchParams.get(LIST_PAGE_NUM_PARAM_KEY) || '') || 1;
      const pageSize = parseInt(searchParams.get(LIST_PAGE_SIZE_PARAM_KEY) || '') || LIST_PAGE_SIZE;

      const data = await getQuestionListApi({ keyword, isStar, isDeleted, pageNum, pageSize });

      return data;
    },
    {
      refreshDeps: [searchParams],
    }
  );

  return { data, loading, error };
};

export default useLoadQuestionListData;
