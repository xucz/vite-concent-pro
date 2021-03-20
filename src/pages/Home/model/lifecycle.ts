import { IDispatch } from 'concent';
import * as reducer from './reducer';


export function mounted(dispatch: IDispatch) {
  dispatch(reducer.foo);
}

export function willUnmount(dispatch: IDispatch) {
  dispatch(reducer.clear);
}