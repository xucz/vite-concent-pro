import React from 'react';
import { useC2Mod } from 'services/concent';
import { COUNTER, T_COUNTER } from 'configs/c2Mods';
import { CtxM } from 'types/store';

/**
 * a very simple example
 */
export function Example() {
  const { state, setState } = useC2Mod(COUNTER);
  return <h1 onClick={() => setState({ value: state.value + 1 })}>{state.value} </h1>;
}

/**
 * an example call mr(moduleReducer) to change state
 */
export function ExampleCallMr() {
  const { state, mr } = useC2Mod(COUNTER);
  return <h1 onClick={mr.increment}>{state.value} </h1>;
}

/**
 * an example read moduleComputed
 */
export function ExampleReadMcu() {
  const { mr, moduleComputed } = useC2Mod(COUNTER);
  return <h1 onClick={mr.increment}>{moduleComputed.doubleCount} </h1>;
}



/**
 * an example define setup and call settings method to change state
 */
function setup1(ctx: CtxM<{}, T_COUNTER>) {
  return {
    inc100: () => ctx.mr.incBy(100),
  };
}
export function ExampleSetup() {
  const { state, settings } = useC2Mod(COUNTER, { setup: setup1 });
  return <h1 onClick={settings.inc100}>{state.value} </h1>;
}

/**
 * define ref computed in setup
 */
function setup2(ctx: CtxM<{}, T_COUNTER>) {
  const cu = ctx.computed({
    valueX1000: n => n.value * 1000,
    valueX200: n => n.value * 200,
  });
  return {
    inc100: () => ctx.mr.incBy(100),
    cu,
  };
}
export function ExampleRefCu() {
  const { state, settings } = useC2Mod(COUNTER, { setup: setup2 });
  return <h1 onClick={settings.inc100}>{state.value} {settings.cu.valueX200}</h1>;
}

