import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { SettingsType, StateType, useConcent } from 'concent';
import { CtxDeS, MouseEv } from 'types/store';
import CounterWithModel from 'components/_demos/CounterWithModel';
import D0Module from 'components/_demos/D0Module';
import D1Module from 'components/_demos/D1Module';
import D2ModuleRefCu from 'components/_demos/D2ModuleRefCu';
import D3ModuleConn from 'components/_demos/D3ModuleConn';
import D4ModuleConnRefCu from 'components/_demos/D4ModuleConnRefCu';
import DemoTable from './DemoTable';

type St = StateType<typeof iState>;
type CtxPre = CtxDeS<{}, St>;
type Ctx = CtxDeS<{}, St, SettingsType<typeof setup>>;

const key2comp: Record<string, React.SFC<any>> = {
  CounterWithModel,
  D0Module,
  D1Module,
  D2ModuleRefCu,
  D3ModuleConn,
  D4ModuleConnRefCu,
  DemoTable,
};

function iState() {
  return {
    selectedKey: 'CounterWithModel',
  };
}

function setup(ctx: CtxPre) {
  ctx.initState(iState);

  return {
    changeSelectedKey: (e: MouseEv) => {
      const {key: selectedKey} = e.currentTarget.dataset;
      ctx.setState({selectedKey});
    },
  };
}

function ADemoPage(props: RouteComponentProps) {
  const {settings: se, state} = useConcent<{}, Ctx>({setup});
  const Comp = key2comp[state.selectedKey];

  const uiBtns = Object.keys(key2comp).map(key => {
    return <button key={key} onClick={se.changeSelectedKey} data-key={key}>{key}</button>;
  });

  return (
    <div>
      <h1>at path {props.location.pathname}</h1>
      {uiBtns}
      <Comp/>
    </div>
  );
}

export default React.memo(ADemoPage);
