import * as todoServ from 'services/domain/todo';
import { VoidPayload } from 'types/store';
import { IAC, St } from './meta';

export function forCopy(payload: VoidPayload, moduleState: St, ac: IAC) {
  console.log('call ac.setState or ac.dispatch when needed', ac.setState);
}

interface FetchListPayload {
  current: number,
  pageSize: number,
}
export async function fetchList({ current, pageSize }: FetchListPayload, moduleState: St) {
  const ret = await todoServ.getTodoList();
  return { pageList: ret.list, total: ret.total };
}

export function foo() {
  console.log('call foo');
}

export function clear() {
  console.log('clear');
  return { value: 1 };
}

export function addBig(payload: VoidPayload, moduleState: St) {
  const { bigValue } = moduleState;
  return { bigValue: bigValue + 1 };
}
