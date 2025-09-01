import React, { FC } from 'react';
import useGetComponentInfo from '../../../hooks/useGetComponentInfo';
import { ComponentPropsType, getComponentConfByType } from '../../../components/QuestionComponents';
import { useDispatch } from 'react-redux';
import { changeComponentProps } from '../../../store/componentsReducer';

const NoProps: FC = () => {
  return <div>未选中组件</div>;
};

const ComponentProps: FC = () => {
  const dispatch = useDispatch();
  const { selectedComponent } = useGetComponentInfo();
  if (!selectedComponent) {
    return <NoProps />;
  }
  const { type, props } = selectedComponent;
  const componentConf = getComponentConfByType(type);
  if (!componentConf) {
    return <NoProps />;
  }

  const { PropsComponent } = componentConf;
  const propsComponentChangeHandler = (newProps: ComponentPropsType) => {
    if (!selectedComponent) {
      return;
    }
    const { fe_id } = selectedComponent;
    dispatch(changeComponentProps({ fe_id, newProps }));
  };
  return <PropsComponent {...props} onChange={propsComponentChangeHandler} />;
};

export default ComponentProps;
