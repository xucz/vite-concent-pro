import { St } from './state';
import { VoidPayload, AC } from 'types/store';
import { T_COUNTER } from 'configs/c2Mods';

type IAC = AC<T_COUNTER>;

export function forCopy(payload: VoidPayload, moduleState: St, ac: IAC) {
  console.log('call ac.setState or ac.dispatch when needed', ac.setState);
}

const delay = (ms = 1000) => new Promise(r => setTimeout(r, ms));

export function incrementBigValue(payload: VoidPayload, moduleState: St): Partial<St> {
  return { bigValue: moduleState.bigValue + 50 };
}

export function increment(payload: VoidPayload, moduleState: St): Partial<St> {
  return { value: moduleState.value + 1 };
}

export function decrement(payload: VoidPayload, moduleState: St): Partial<St> {
  return { value: moduleState.value - 1 };
}

export function incrementByAmount(amount: number, moduleState: St): Partial<St> {
  return { value: moduleState.value + amount };
}

export async function incrementAsync(amount: number, moduleState: St): Promise<Partial<St>> {
  await delay();
  // or just write ac.dispatch of return
  // await ac.dispatch(incrementByAmount, amount);
  return { value: moduleState.value + amount };
}

export function foo(){
  console.log('call foo');
}

export function clear(){
  console.log('clear');
}
