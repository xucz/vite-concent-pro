import './model';
import React from 'react';
import { Input, Alert, Button, Spin, Tag } from 'antd';
import { RouteComponentProps } from 'react-router-dom';
import { useModel } from './model/meta';

const InputArea = React.memo(() => {
  const { state, sync } = useModel();
  return (
    <div>
      请输入的描述 <Input value={state.desc} onChange={sync('desc')} />
    </div>
  );
});

const RevserdDesc = React.memo(() => {
  const { moduleComputed } = useModel();
  return <Alert message={moduleComputed.reversedDesc} type="success" />
});

function DemoPageTodoList(props: RouteComponentProps) {
  const { state, mr, mrg } = useModel();

  return (
    <div>
      <Tag>{state.desc}</Tag>
      <Spin spinning={state.loading}>
        <Button onClick={mr.tryCutDesc}>裁减描述</Button>
        <Button onClick={mr.innerLoadingTryAsyncCutDesc}>内部函数包裹loading</Button>
        <Button onClick={mrg.loading.tryAsyncCutDesc}>使用ghost功能复用loading函数（推荐）</Button>
        <InputArea />
        <RevserdDesc />
      </Spin>
    </div>
  );
}

export default React.memo(DemoPageTodoList);
