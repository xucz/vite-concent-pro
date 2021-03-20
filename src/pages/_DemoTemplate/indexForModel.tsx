import './modelJustForLearn';
import React from 'react';
import { Alert, Button, Input, Spin, Tag } from 'antd';
import { RouteComponentProps } from 'react-router-dom';
import { useModel } from './modelJustForLearn/meta';

const InputArea = React.memo(() => {
  const {state, sync} = useModel();
  return (
    <div>
      请输入的描述 <Input value={state.desc} onChange={sync('desc')}/>
    </div>
  );
});

const RevserdDesc = React.memo(() => {
  const {moduleComputed} = useModel();
  return <Alert message={moduleComputed.reversedDesc} type="success"/>
});

function DemoPageTodoList(props: RouteComponentProps) {
  const {state, mr, mrg} = useModel();

  return (
    <div>
      <Tag>{state.desc}</Tag>
      <Spin spinning={state.loading}>
        <Button onClick={mr.tryCutDesc}>裁减描述</Button>
        <Button onClick={mr.tryAsyncCutDescWithLoading}>包含loading的裁减方式1</Button>
        <Button onClick={mrg.loading.tryCutDesc}>包含loading的裁减方式2</Button>
        <InputArea/>
        <RevserdDesc/>
      </Spin>
    </div>
  );
}

export default React.memo(DemoPageTodoList);
