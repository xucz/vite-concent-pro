import {
  getComputed, getState, ComputedValType, StateType,
  IModActionCtx, IRefCtxM, IAnyObj, ICtxBase, SettingsType
} from 'concent';
import { makeUseModel, makeUseModelWithSetup, makeUseModelWithSetupCuf } from 'concent-utils';
import state, { St as ModuleState } from './state';
import * as computed from './computed';
import * as reducer from './reducer';
import * as lifecycle from './lifecycle';
// 如不需要知道根state，根computed，注释下面两句，打开 15 行即可
import { RootState, RootCu } from 'types/store';
export type RootInfo = { state: RootState, computed: RootCu };

// export type RootInfo = { state: {}, computed: {} };

export const moduleName = 'SomeModule';
export const modelDesc = {
  state,
  computed,
  reducer,
  lifecycle,
  ghosts: ['loading'] as const, // 仅当需要ghost功能时，才配置此项，否则可以删掉
};
export const model = { [moduleName]: modelDesc };

export type ModelDesc = typeof modelDesc;
export type ModuleName = typeof moduleName;
export type St = ModuleState;
/** 用于描述 reducer 函数第3位参数 actionCtx 的类型 */
export type IAC = IModActionCtx<RootInfo, ModelDesc>;
export type CtxPre<Props = IAnyObj, RefCu = IAnyObj, Extra = IAnyObj> = IRefCtxM<RootInfo, Props, ModelDesc, IAnyObj, RefCu, Extra>;
type ValidSetup = (ctx: ICtxBase) => IAnyObj | void;
export type Ctx<Setup extends ValidSetup> = IRefCtxM<RootInfo, {}, ModelDesc, SettingsType<Setup>>;

export const useModelWithSetup = makeUseModelWithSetup<RootInfo, ModelDesc>(moduleName);
export const useModelWithSetupCuf = makeUseModelWithSetupCuf<RootInfo, ModelDesc>(moduleName);
export const useModel = makeUseModel<RootInfo, ModelDesc>(moduleName);
export const getModelComputed = () => getComputed(moduleName) as ComputedValType<typeof computed>;
export const getModelState = () => getState(moduleName) as StateType<typeof state>;

export default model;
