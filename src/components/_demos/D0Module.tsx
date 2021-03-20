import React from 'react';
import { DEMO } from 'configs/c2Mods';
import { useC2Mod } from 'services/concent';


function Demo() {
  const { state, mr, moduleComputed } = useC2Mod(DEMO);
  return (
    <div>
      <p>一个使用了Demo模块的组件</p>
      <div>
        {state.desc}
        <br /> {moduleComputed.revesedDesc}
        <button onClick={mr.changeDesc}>call mr.changeDesc</button>
      </div>
    </div>
  );
}

export default React.memo(Demo);
