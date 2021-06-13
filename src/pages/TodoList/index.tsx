import React from 'react';
import { Alert } from 'antd';
import { useC2Mod } from 'services/concent';
import { CtxM } from 'types/store';
import ListArea from './ListArea';
import SearchArea from './SearchArea';

export function setup(ctx: CtxM<{}, 'TodoList'>) {
  return {
    hiThere() {
      return 'hiThere';
    },
    changeBigTo(to: number) {
      ctx.setState({ bigValue: to });
    },
  };
}

const ValueLabel = React.memo(() => {
  const { state } = useC2Mod('TodoList');
  return <h1 style={{ border: '1px solid blue' }}>{state.value}</h1>;
});

function DemoPageTodoList() {
  const { moduleComputed, state } = useC2Mod('TodoList', { setup, tag: 'Dpt' });

  return (
    <div>
      <Alert message={moduleComputed.formattedInput} />
      <h1 id="bigValue">{state.bigValue}</h1>
      <SearchArea />
      <ValueLabel />
      <ValueLabel />
      <ListArea />
    </div>
  );
}

export default React.memo(DemoPageTodoList);
