

import React from 'react';
import { useConcent, SettingsType } from 'concent';
import { ccReducer } from 'services/concent';
import GeneralTable from 'components/smart/GeneralTable';
import { CtxDe } from 'types/store';

type CtxPre = CtxDe<{}>;
type Ctx = CtxDe<{}, SettingsType<typeof setup>>;

function setup(ctx: CtxPre) {
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
    fetchList: (params: any) => {
      return ccReducer.DemoModel.fetchList(params);
    }
  };
}

function DemoTable() {
  const { settings: se } = useConcent<{}, Ctx>({ setup });

  return (
    <div>
      <button onClick={se.refreshTable}>refresh</button>
      <GeneralTable tid="todoTable" columns={se.columns} fetchFn={se.fetchList} />
    </div>
  );
}

export default React.memo(DemoTable);
