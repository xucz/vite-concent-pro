import React from 'react';
import { Button, Input } from 'antd';
import { useModel } from './model/meta';

function SearArea() {
  const {sync, state, mr} = useModel();
  return (
    <div>
      <Input onChange={sync('keyword')} value={state.keyword}/>
      <span id="bigValue">{state.bigValue}</span>
      <Button id="addBigBtn" onClick={mr.addBig}/>
    </div>
  );
}

export default React.memo(SearArea);
