import { T_DEMO } from 'configs/c2Mods';
import { VoidPayload, AC } from 'types/store';
import { St } from './state';
import http from 'services/http';

type IAC = AC<T_DEMO>;

export function aNormalMethod(payload: VoidPayload, moduleState: St, actionCtx: IAC) {
  console.log('for copy - ', actionCtx.dispatch);
}

export function changeDesc(payload: string | VoidPayload, moduleState: St, actionCtx: IAC) {
  let desc = `module--${actionCtx.module} ${Date.now()}`;
  if (payload) {
    if (typeof payload === 'string') {
      desc = payload;
    } else {
      desc = `module--${actionCtx.module} ${payload.currentTarget.nodeName} ${Date.now()}`;;
    }
  }
  return { desc };
}

interface FetchListP{
  current: number,
  pageSize: number,
}
export async function fetchList({ current, pageSize }: FetchListP): Promise<{ pageList: any[], total: number }> {
  const todos = await http.get('api/todos');
  console.log(current, pageSize, todos);
  return { pageList: todos, total: 1000 };
}

export function foo(){
  console.log('call foo');
}

export function clear(){
  console.log('clear');
}
