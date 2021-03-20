import React from 'react';
import { useConcent, SettingsType, StateType, ComputedValType } from 'concent';
import { DEMO, T_DEMO, DEMO_CLONED, COUNTER } from 'configs/c2Mods';
import { CtxMConn, ItemsType } from 'types/store';

type Mods = ItemsType<typeof connect>;
type St = StateType<typeof iState>;
type Cu = ComputedValType<typeof cuSpec>;
type CtxPre = CtxMConn<{}, T_DEMO, Mods>;
type Ctx = CtxMConn<{}, T_DEMO, Mods, SettingsType<typeof setup>, Cu>;

const connect = [DEMO_CLONED, COUNTER];

// 定义计算函数集合
const cuSpec = {
  borderStyle: (n: St) => (n.isOpen ? { border: '3px solid red' } : { border: '3px solid blue' }),
};

function iState() {
  return {
    isOpen: true,
  };
}

function setup(ctx: CtxPre) {
  const ins = ctx.initState(iState);
  ins.computed(cuSpec);
  // optional, mock componentDidMount
  ctx.effect(() => {
    ctx.mr.changeDesc(`componentDidMount ${Date.now()}`);
  }, []);

  return {
    toogleOpen: () => ctx.syncBool('isOpen'),
  };
}

function Demo() {
  const {
    state, settings: se, refComputed: rcu, connectedState: cstate,
  } = useConcent<{}, Ctx>({ module: DEMO, setup, connect });
  return (
    <div style={rcu.borderStyle}>
      <p>定义组件所属模块</p>
      <p>定义组件连接其他多个模块</p>
      <p>定义setup, 初始化实例私有状态，并对其定义计算函数</p>
      <div>
        <h3>state.desc {state.desc}</h3>
        <h3>cstate.Counter.value {cstate.Counter.value}</h3>
        <h3>cstate.DemoCloned.desc {cstate.DemoCloned.desc}</h3>
        <button onClick={se.toogleOpen}>toogleOpen</button>
      </div>
    </div>
  );
}

export default React.memo(Demo);
