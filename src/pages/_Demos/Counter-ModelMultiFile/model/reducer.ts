import * as timerUtil from 'utils/timer';
import { VoidPayload } from 'types/store';
import { IAC, St} from './meta';

export function forCopy(payload: VoidPayload, moduleState: St, ac: IAC) {
  console.log('call ac.setState or ac.dispatch when needed', ac.setState);
}

export function addSmall(payload: VoidPayload, moduleState: St) {
  return { small: moduleState.small + 1 };
}
export async function asyncAddSmall(payload: VoidPayload, moduleState: St, actionCtx: IAC) {
  await actionCtx.setState({ loading: true });
  await timerUtil.delay();
  return { small: moduleState.small + 1 };
}

// 组合其他reducer
export async function addSmallTwice(payload: VoidPayload, moduleState: St, actionCtx: IAC) {
  await actionCtx.dispatch(addSmall);
  await actionCtx.dispatch(addSmall);
}

export function someInitLogic() {
  console.log('do some init logic');
}

export function someClearLogic() {
  console.log('do some clear logic');
}
