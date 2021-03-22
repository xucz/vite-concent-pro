import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import UseSteup from 'components/_demos/UseSteup';

function DemoPageTodoList(props: RouteComponentProps) {
  return (
    <UseSteup />
  );
}

export default React.memo(DemoPageTodoList);
