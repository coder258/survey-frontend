import { useSelector } from 'react-redux';
import { StateType } from '../store';
import { ComponentsStateType } from '../store/componentsReducer';

/**
 * 获取组件信息的自定义 Hook
 *
 * @returns 包含组件信息的对象
 */
const useGetComponentInfo = () => {
  const components = useSelector<StateType>(state => state.components) as ComponentsStateType;
  const { componentList = [], selectedId = '' } = components;

  return {
    componentList,
    selectedId,
    // ...
  };
};

export default useGetComponentInfo;
