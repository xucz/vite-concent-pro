import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Alert } from 'antd';
import { CtxPre, useModelWithSetup } from './model/meta';
import ListArea from './ListArea';
import SearchArea from './SearchArea';

export function setup(ctx: CtxPre) {
  return {
    hiThere() {
      return 'hiThere';
    },
    changeBigTo(to: number) {
      ctx.setState({bigValue: to});
    },
  };
}

function DemoPageTodoList(props: RouteComponentProps) {
  const {moduleComputed, state} = useModelWithSetup(setup, {tag: 'Dpt'});

  return (
    <div>
      <Alert message={moduleComputed.formartedInput}/>
      <h1 id="bigValue">{state.bigValue}</h1>
      <SearchArea/>
      <ListArea/>
    </div>
  );
}

export default React.memo(DemoPageTodoList);
