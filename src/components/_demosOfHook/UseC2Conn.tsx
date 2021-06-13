import React from 'react';
import { useC2Conn } from 'services/concent';
import { COUNTER, T_COUNTER, DEMO, T_DEMO } from 'configs/c2Mods';
import { CtxConn } from 'types/store';

function setup(ctx: CtxConn<{}, T_COUNTER | T_DEMO>) {
  const ins = ctx.initState({
    xx1: 'priv',
  });

  return {
    insState: ins.state,
  };
}

/**
 * 一个连接其他模块的简单示例
 */
export function Example() {
  const { connectedState, cr } = useC2Conn([COUNTER, DEMO], { setup });
  return <h1 onClick={() => cr.Counter.setState({ value: connectedState.Counter.value + 1 })}>{connectedState.Counter.value} </h1>;
}

// export function Example2() {
//   const { connectedState, cr } = useC2Conn([DEMO_TODO_LIST]);
//   return <h1>{connectedState.DemoTodoList.bigValue}</h1>
// }
