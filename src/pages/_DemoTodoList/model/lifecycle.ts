
/*
|--------------------------------------------------------------------------
| 定义模块的lifecyle
|--------------------------------------------------------------------------
| 文档:  https://concentjs.github.io/concent-doc/guide/concept-module-lifecycle
*/
import { IDispatch } from 'concent';
import * as reducer from './reducer';


// 异步状态初始化函数
// export async function initState(){}

// 模块被concent加载完毕时触发，(可替代initState，将初始化逻辑移到reducer文件里)
// export function loaded(dispatch: IDispatch) {}

// 当前模块的第一个组件实例挂载完毕时触发，
// 默认只触发一次，如需满足条件反复触发，return false即可
// 注意此函数触发时机和实例相关，如果没有任何属于此模块的组件实例化，该函数不会被触发
export function mounted(dispatch: IDispatch) {
  dispatch(reducer.foo);
}

// 当前模块的最后一个组件实例卸载时触发
// 默认只触发一次，如需满足条件反复触发，return false即可
export function willUnmount(dispatch: IDispatch) {
  dispatch(reducer.clear);
}