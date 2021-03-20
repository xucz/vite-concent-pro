import React from 'react';
import { useConcent, SettingsType, StateType, ComputedValType } from 'concent';
import { DEMO, T_DEMO } from 'configs/c2Mods';
import { CtxMS } from 'types/store';

type St = StateType<typeof iState>;
type Cu = ComputedValType<typeof cuSpec>;
type CtxPre = CtxMS<{}, T_DEMO, St>;
type Ctx = CtxMS<{}, T_DEMO, St, SettingsType<typeof setup>, Cu>;

// 定义计算函数集合
const cuSpec = {
  borderStyle: (n: St) => (n.isOpen ? { border: '6px solid red' } : { border: '6px solid blue' }),
};

function iState() {
  return {
    isOpen: true,
  };
}

function setup(ctx: CtxPre) {
  ctx.initState(iState);
  ctx.computed(cuSpec);
  // optional, mock componentDidMount
  ctx.effect(() => {
    ctx.mr.changeDesc(`componentDidMount ${Date.now()}`);
  }, []);

  return {
    toogleOpen: ctx.syncBool('isOpen'),
  };
}

function Demo() {
  const { state, settings: se, refComputed: rcu } = useConcent<{}, Ctx>({ module: DEMO, setup });
  return (
    <div style={rcu.borderStyle}>
      <p>定义组件所属模块</p>
      <p>定义setup, 初始化实例私有状态，并对其定义计算函数</p>
      <div>
        {state.desc}
        <button onClick={se.toogleOpen}>toogleOpen</button>
      </div>
    </div>
  );
}

export default React.memo(Demo);
