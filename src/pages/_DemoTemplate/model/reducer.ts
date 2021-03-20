import * as timerUtil from 'utils/timer';
import { VoidPayload } from 'types/store';
import { callTarget } from 'services/concent';
import { CallerParams, IAC, ReducerFn, St } from './meta';

export function forCopy(payload: VoidPayload, moduleState: St, ac: IAC) {
  console.log('call ac.setState or ac.dispatch when needed', ac.setState);
}

export function tryCutDesc(payload: VoidPayload, moduleState: St) {
  const {desc} = moduleState;
  if (desc.length > 8) {
    return {desc: desc.substr(0, 8)};
  }
}

export async function tryAsyncCutDesc(payload: VoidPayload, moduleState: St, ac: IAC) {
  await timerUtil.delay(666);
  await ac.dispatch(tryCutDesc);
}

export async function innerLoadingTryAsyncCutDesc(payload: VoidPayload, moduleState: St, ac: IAC) {
  ac.dispatch(loading, [tryCutDesc, payload])
}

// 在 meta.js 里已注册为ghost函数
// 支持 reducer文件里内部调用 ac.dispatch(loading, [targetFn, payload])
// 或者视图里触发 mrg.loading.targetFn(payload)
export async function loading(callerParams: CallerParams | [ReducerFn, any], moduleState: St, ac: IAC) {
  await ac.setState({loading: true});
  await callTarget(callerParams, ac);
  return {loading: false};
}

export function initState() {
  console.log('call initState');
}

export function clear() {
  console.log('call clear');
}
