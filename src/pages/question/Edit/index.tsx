import React, { FC } from 'react';
import useLoadQuestionData from '../../../hooks/useLoadQuestionData';

const Edit: FC = () => {
  const { data, loading, error } = useLoadQuestionData();
  console.log(data, loading, error);
  return <div>Edit</div>;
};

export default Edit;
