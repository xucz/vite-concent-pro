/**
 * 不生成meta文件的话，需要将model提升到顶层 models/index.ts 里暴露出去集中注册
 * 然后任务地方的子组件可使用 services/concent 的 useC2Mod 方法来使用模块
 * 如 useC2Mod('CounterOneFileModel')
 */
import {
  getComputed, getState, ComputedValType, StateType,
  IModActionCtx, IRefCtxM, ReducerCallerParams, IReducerFn, IAnyObj, ICtxBase, SettingsType
} from 'concent';
import { makeUseModel, makeUseModelWithSetup, makeUseModelWithSetupCuf } from 'concent-utils';
import { RootState, RootCu } from 'types/store';

import { modelDesc } from './index';

export const moduleName = 'CounterOneFileModel';

export const model = { [moduleName]: modelDesc };

export type ModelDesc = typeof modelDesc;
export type ModuleName = typeof moduleName;
export type CallerParams = ReducerCallerParams | [IReducerFn, any];
export type ReducerFn = IReducerFn;
export type St = StateType<typeof modelDesc.state>;
export type RootInfo = { state: RootState, computed: RootCu };
// export type RootInfo = { state: {}, computed: {} };
/** 用于描述 reducer 函数第3位参数 actionCtx 的类型 */
export type IAC = IModActionCtx<RootInfo, ModelDesc>;
export type CtxPre<Props = IAnyObj, RefCu = IAnyObj, Extra = IAnyObj> = IRefCtxM<RootInfo, Props, ModelDesc, IAnyObj, RefCu, Extra>;
type ValidSetup = (ctx: ICtxBase) => IAnyObj | void;
export type Ctx<Setup extends ValidSetup> = IRefCtxM<RootInfo, {}, ModelDesc, SettingsType<Setup>>;

export const useModelWithSetup = makeUseModelWithSetup<RootInfo, ModelDesc>(moduleName);
export const useModelWithSetupCuf = makeUseModelWithSetupCuf<RootInfo, ModelDesc>(moduleName);
export const useModel = makeUseModel<RootInfo, ModelDesc>(moduleName);
export const getModelComputed = () => getComputed(moduleName) as ComputedValType<typeof modelDesc.computed>;
export const getModelState = () => getState(moduleName) as St;

export default model;
