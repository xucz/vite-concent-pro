import React from 'react';
import { useConcent, SettingsType } from 'concent';
import { DEMO, T_DEMO } from 'configs/c2Mods';
import { CtxM } from 'types/store';

type CtxPre = CtxM<{}, T_DEMO>;
type Ctx = CtxM<{}, T_DEMO, SettingsType<typeof setup>>;

function setup(ctx: CtxPre) {
  // optional, mock componentDidMount
  ctx.effect(() => {
    ctx.mr.changeDesc(`componentDidMount ${Date.now()}`);
    return () => console.log('componentWillUnmount');
  }, []);

  return {
    foo: () => console.log('call setttings.foo'),
  };
}

function Demo() {
  const { state, settings: se, mr } = useConcent<{}, Ctx>({ module: DEMO, setup });
  return (
    <div>
      <p>定义组件所属模块</p>
      <p>定义setup</p>
      <div>
        {state.desc}
        <button onClick={se.foo}>call settings.foo</button>
        <button onClick={mr.changeDesc}>call mr.changeDesc</button>
      </div>
    </div>
  );
}

export default React.memo(Demo);
