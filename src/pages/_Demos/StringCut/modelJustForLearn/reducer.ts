import { callTarget } from 'concent-utils';
import * as timerUtil from 'utils/timer';
import { VoidPayload } from 'types/store';
import { IAC, St, CallerParams, ReducerFn } from './meta';

export function forCopy(payload: VoidPayload, moduleState: St, ac: IAC) {
  console.log('call ac.setState or ac.dispatch when needed', ac.setState);
}

export function tryCutDesc(payload: VoidPayload, moduleState: St) {
  const { desc } = moduleState;
  if (desc.length > 8) {
    return { desc: desc.substr(0, 8) };
  }
}

// 等同于UI层 mrg.loading.tryCutDesc(payload)
export async function tryAsyncCutDescWithLoading(payload: VoidPayload, moduleState: St, ac: IAC) {
  await ac.dispatch(loading, [tryCutDesc, payload]);
}

// 在 meta.js 里已注册为ghost函数
export async function loading(callerParams: CallerParams | [ReducerFn, any], moduleState: St, ac: IAC) {
  await ac.setState({ loading: true });
  await timerUtil.delay();
  await callTarget(callerParams, ac)
  return { loading: false };
}

export function initState() {
  console.log('call initState');
}

export function clear() {
  console.log('call clear');
}
