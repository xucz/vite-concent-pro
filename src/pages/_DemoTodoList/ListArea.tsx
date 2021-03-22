

import React from 'react';
import { Button } from 'antd';
import GeneralTable, { FetchFnParams } from 'components/smart/GeneralTable';
import { useModelWithSetup } from './model/meta';
import { CtxPre } from './model/meta';

function setup(ctx: CtxPre) {
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
  };
  // return {};
}

function ListArea() {
  const { settings: se } = useModelWithSetup(setup);
  return (
    <div>
      <Button id="refreshBtn" onClick={se.refreshTable}>refresh</Button>
      <GeneralTable tid="todoTable" columns={se.columns} fetchFn={se.fetchList} />
    </div>
  );
}

export default React.memo(ListArea);
