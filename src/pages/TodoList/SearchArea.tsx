

import React from 'react';
import { Input, Button } from 'antd';
import { useC2Mod } from 'services/concent';

function SearArea() {
  const { sync, syncer, state, mr } = useC2Mod('TodoList');
  return (
    <div>
      <Input onChange={sync('keyword')} value={state.keyword} />
      <Input onChange={syncer.keyword} value={state.keyword} />
      <span id="bigValue">{state.bigValue}</span>
      <Button id="addBigBtn" onClick={mr.addBig} />
    </div>
  );
}

export default React.memo(SearArea);
