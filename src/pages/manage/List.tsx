import React, { FC } from 'react';
import { useTitle } from 'ahooks';

const List: FC = () => {
  useTitle('小慕问卷 - 我的问卷');
  return <div>List</div>;
};

export default List;
