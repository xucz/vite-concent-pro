import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { useConcent, SettingsType, StateType } from 'concent';
import { CtxDeS } from 'types/store';
import CounterWithModel from 'components/_demos/CounterWithModel';
import D0Module from 'components/_demos/D0Module';
import D1Module from 'components/_demos/D1Module';
import D2ModuleRefCu from 'components/_demos/D2ModuleRefCu';
import D3ModuleConn from 'components/_demos/D3ModuleConn';
import D4ModuleConnRefCu from 'components/_demos/D4ModuleConnRefCu';
import DemoTable from './DemoTable';
import { Tabs } from "antd";
const { TabPane } = Tabs;

type St = StateType<typeof iState>;
type CtxPre = CtxDeS<{}, St>;
type Ctx = CtxDeS<{}, St, SettingsType<typeof setup>>;

function iState() {
  return {
    selectedKey: 'CounterWithModel',
  };
}

function setup(ctx: CtxPre) {
  ctx.initState(iState);

  return {
    changeSelectedKey: (key: string) => {
      ctx.setState({ selectedKey: key });
    },
  };
}

function ADemoPage(props: RouteComponentProps) {
  const { settings: se, state } = useConcent<{}, Ctx>({ setup });

  return (
    <div>
      <Tabs defaultActiveKey="1" onChange={(key) => {se.changeSelectedKey(key)}}>
        <TabPane tab="CounterWithModel" key="CounterWithModel">
          <CounterWithModel />
        </TabPane>
        <TabPane tab="D0Module" key="D0Module">
          <D0Module />
        </TabPane>
        <TabPane tab="D1Module" key="D1Module">
          <D1Module />
        </TabPane>
        <TabPane tab="D2ModuleRefCu" key="D2ModuleRefCu">
          <D2ModuleRefCu />
        </TabPane>
        <TabPane tab="D3ModuleConn" key="D3ModuleConn">
          <D3ModuleConn />
        </TabPane>
        <TabPane tab="D4ModuleConnRefCu" key="D4ModuleConnRefCu">
          <D4ModuleConnRefCu />
        </TabPane>
        <TabPane tab="DemoTable" key="DemoTable">
          <DemoTable />
        </TabPane>
      </Tabs>
    </div>
  );
}

export default React.memo(ADemoPage);
