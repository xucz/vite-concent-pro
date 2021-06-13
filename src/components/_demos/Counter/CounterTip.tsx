import React from 'react';
import { useC2Mod } from 'services/concent';
import { COUNTER } from 'configs/c2Mods';

export const CounterTip = React.memo(() => {
  const ctx = useC2Mod(COUNTER);
  const [show, setShow] = React.useState(true);
  // module state, module computed
  const { state, moduleComputed, renderCount } = ctx;
  const toggleShow = () => setShow(!show);

  return (
    <div>
      <h2>renderCount {renderCount}</h2>
      {show
        ? <>
          <span> value:{state.value}</span>
          <span> bigValue:{state.bigValue}</span>
          <span> doubleCount:{moduleComputed.doubleCount}</span>
        </>
        : 'lost dep! module state change will not trigger CounterTip re-render'
      }
      <button onClick={toggleShow}>switch CounterTip view</button>
    </div>
  );
});
