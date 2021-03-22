import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Alert } from 'antd';
import { makeUseC2Mod } from 'services/concent';
import { useModelWithSetup, CtxPre } from './model/meta';
import ListArea from './ListArea';
import SearchArea from './SearchArea';

const ret = makeUseC2Mod("Counter");
function setupA1(c: any) {
  const ctx = ret.typeCtx(c);
  const cu = ctx.computed({
    countX6: (n) => n.value * 6
  });
  return { cu };
}
export function UseC2ModByFactory() {
  const ctx = ret.useC2Mod({ setup: setupA1 });
  return <h1>{ctx.state.bigValue}&nbsp;{ctx.settings.cu.countX6}</h1>
}

export function setup(ctx: CtxPre) {
  return {
    hiThere() {
      return 'hiThere';
    },
    changeBigTo(to: number) {
      ctx.setState({ bigValue: to });
    },
  };
}

function DemoPageTodoList(props: RouteComponentProps) {
  const { moduleComputed, state } = useModelWithSetup(setup, { tag: 'Dpt' });

  return (
    <div>
      <Alert message={moduleComputed.formattedInput} />
      <h1 id="bigValue">{state.bigValue}</h1>
      <SearchArea />
      <ListArea />
    </div>
  );
}

export default React.memo(DemoPageTodoList);
