import { IDispatch } from 'concent';
import * as reducer from './reducer';


// 异步状态初始化函数
// export async function initState(){}


// 当前模块的第一个组件实例挂载完毕时触发
// 默认值触发一次，如需满足条件反复触发，return false即可
export function mounted(dispatch: IDispatch) {
  dispatch(reducer.foo);
}

// 当前模块的最后一个组件实例卸载时触发
// 默认值触发一次，如需满足条件反复触发，return false即可
export function willUnmount(dispatch: IDispatch) {
  dispatch(reducer.clear);
}