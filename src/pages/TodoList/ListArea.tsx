

import React from 'react';
import { Button } from 'antd';
import GeneralTable, { FetchFnParams } from 'components/GeneralTable';
import { CtxM } from 'types/store';
import { useC2Mod } from 'services/concent';

function setup(ctx: CtxM<{}, 'TodoList'>) {
  const { mr } = ctx;
  return {
    columns: [
      {
        key: 'id',
        dataIndex: 'id',
        title: 'id',
      },
      {
        key: 'text',
        dataIndex: 'text',
        title: '文案',
      },
      {
        key: 'done',
        dataIndex: 'done',
        title: '是否完成',
        render: (done: boolean) => (done ? 'done' : 'uncomplish'),
      },
    ],
    refreshTable: () => {
      ctx.emit(['refreshTable', 'todoTable']);
    },
    fetchList: (params: FetchFnParams) => mr.fetchList(params),
    test: () => {
      ctx.setModuleState('TodoList', { value: Date.now() }, () => { }, null, 500);
    }
  };
}

function ListArea() {
  const { settings: se, state } = useC2Mod('TodoList', { setup });
  return (
    <div>
      <Button id="refreshBtn" onClick={se.refreshTable}>refresh</Button>
      <Button id="refreshBtn" onClick={se.test}>test {state.value}</Button>
      <GeneralTable tid="todoTable" columns={se.columns} fetchFn={se.fetchList} />
    </div>
  );
}

export default React.memo(ListArea);
