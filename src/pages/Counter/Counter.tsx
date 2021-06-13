import React from "react";
import { useC2Mod } from 'services/concent';
import { COUNTER } from "configs/c2Mods";
import { CtxM } from "types/store";
import styles from "./Counter.module.css";

function setup(ctx: CtxM<{}, typeof COUNTER>) {
  const ins = ctx.initState({
    _privCount: 1,
  });
  return {
    insState: ins.state,
    add: () => ins.setState({ _privCount: ins.state._privCount + 1 }),
  };
}

export function Counter() {
  const ctx = useC2Mod(COUNTER, { setup });
  // module state, module computed, module reducer
  const { state, moduleComputed, mr, settings } = ctx;
  console.log(mr);

  return (
    <div>
      <div className={styles.row}>
        <h3>{settings.insState._privCount}</h3>
        <button onClick={settings.add}>add local</button>
      </div>
      <div className={styles.row}>
        <button
          className={styles.button}
          aria-label="Increment value"
          onClick={mr.increment}
        >
          +
        </button>
        <span className={styles.value}>{state.value}</span>
        <span className={styles.value}>
          doubleCount: {moduleComputed.doubleCount}
        </span>
        <button
          className={styles.button}
          aria-label="Decrement value"
          onClick={mr.decrementOne}
        >
          -
        </button>
      </div>
      <div className={styles.row}>
        <input
          className={styles.textbox}
          aria-label="Set increment amount"
          value={state.toInc}
          onChange={(e) => mr.setState({ toInc: Number(e.target.value) || 0 })}
        />
        <button
          className={styles.button}
          onClick={mr.increment}
        >
          Add Amount
        </button>
        <button
          className={styles.asyncButton}
          onClick={mr.incrementAsync}
        >
          Add Async
        </button>
        <button className={styles.normalButton} onClick={mr.incrementBigValue}>
          Add Big Value
        </button>
      </div>
    </div>
  );
}
