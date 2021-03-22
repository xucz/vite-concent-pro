
import { DEMO_TODO_LIST } from 'configs/c2Mods';
import {
  IModActionCtx, IRefCtxM, ReducerCallerParams, IReducerFn, IAnyObj,
  getComputed, getState, ComputedValType, StateType, SettingsType, ICtxBase,
} from 'concent';
import { makeUseModel, makeUseModelWithSetup, makeUseModelWithSetupCuf } from 'concent-utils';
import state, { St as ModuleState } from './state';
import * as computed from './computed';
import * as reducer from './reducer';
import * as lifecycle from './lifecycle';
import { RootState, RootCu } from 'types/store';

export const moduleName = DEMO_TODO_LIST;

export const modelDesc = {
  state,
  computed,
  reducer,
  lifecycle,
};

export const model = { [moduleName]: modelDesc };

export type ModelDesc = typeof modelDesc;
export type ModuleName = typeof moduleName;
export type CallerParams = ReducerCallerParams;
export type ReducerFn = IReducerFn;
export type St = ModuleState;
export type RootInfo = { state: RootState, computed: RootCu };
// export type RootInfo = { state: {}, computed: {} };
/** 用于描述 reducer 函数第3位参数 actionCtx 的类型 */
export type IAC = IModActionCtx<RootInfo, ModelDesc>;
export type CtxPre<Props = IAnyObj, RefCu = IAnyObj, Extra = IAnyObj> = IRefCtxM<RootInfo, Props, ModelDesc, {}, RefCu, Extra>;
type ValidSetup = (ctx: ICtxBase) => IAnyObj | void;
export type Ctx<Setup extends ValidSetup> = IRefCtxM<RootInfo, {}, ModelDesc, SettingsType<Setup>>;

export const useModelWithSetup = makeUseModelWithSetup<RootInfo, ModelDesc>(moduleName);
export const useModelWithSetupCuf = makeUseModelWithSetupCuf<RootInfo, ModelDesc>(moduleName);
export const useModel = makeUseModel<RootInfo, ModelDesc>(moduleName);
// 访问本模块计算结果的入口函数，方便某些地方脱离渲染上下文的地方可直接调用
export const getModelComputed = () => getComputed(moduleName) as ComputedValType<typeof computed>;
// 访问本模块状态的入口函数，方便某些地方脱离渲染上下文的地方可直接调用
export const getModelState = () => getState(moduleName) as StateType<typeof state>;

export default model;

