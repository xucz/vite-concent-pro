import './model';
import React from 'react';
import { Button } from 'antd';
import { RouteComponentProps } from 'react-router-dom';
import { useModel } from './model/meta';


function Comp() {
  const { state, mr } = useModel();

  return (
    <div>
      <div>{state.small}</div>
      <Button onClick={mr.addSmall}>addSmall</Button>
    </div>
  );
}

function Page(props: RouteComponentProps) {
  return (
    <div>
      <Comp />
      <Comp />
    </div>
  );
}

export default React.memo(Page);
