import React from 'react';
import { Button } from 'antd';
import { useSetup, ctxOn } from 'services/concent';
import { CtxDe } from 'types/store';
import * as ev from 'configs/constant/event';

function setup(ctx: CtxDe) {
  const on = ctxOn(ctx);
  on(ev.someEvent, (p1, p2)=>{
    console.log('hover your mouse pointer to p1,p2, you will see the types');
  });
  const ins = ctx.initState({
    num: 1,
    name: 'xx',
    isOk: true,
  });

  const cu = ins.computed({
    doubleNum: n => n.num * 2,
    reversedName: n => n.name.split('')
      .reverse().join(''),
  });

  return {
    cu, // 导出计算结果wrap对象
    state: ins.state,
    changeName: ins.syncer.name,
    toogleIsOk: ins.syncerOfBool.isOk,
  }
}

export default function DemoUseSetup() {
  const settings = useSetup(setup);
  return (
    <div>
      <input value={settings.state.name}
        onChange={settings.changeName}
      />
      <h1>reverse: {settings.cu.reversedName}</h1>
      <h1>{settings.cu.doubleNum}</h1>
      <Button type="primary" onClick={settings.toogleIsOk}>toogleIsOk {`${settings.state.isOk}`}</Button>
    </div>
  );
}
