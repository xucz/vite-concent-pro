import state, { St as ModuleState } from './state';
import * as computed from './computed';
import * as reducer from './reducer';
import * as lifecycle from './lifecycle';
import { RootCu, RootState } from 'types/store';
import {
  ComputedValType,
  getComputed,
  getState,
  IAnyObj,
  ICtxBase,
  IModActionCtx,
  IReducerFn,
  IRefCtxM,
  ReducerCallerParams,
  ReducerType,
  SettingsType,
  StateType,
} from 'concent';
import { makeUseModel, makeUseModelWithSetup, makeUseModelWithSetupCuf } from 'concent-utils';

// 如改模块状态需要给其他页面组件消费，推荐将模块名放到 configs/c2Mods 集中管理起来
export const moduleName = 'SomeModule';

export const modelDesc = {
  state,
  computed,
  reducer,
  lifecycle,
  // 需要对目标执行函数包裹一层额外的逻辑时，定义 ghost 函数名列表
  // 如下面表示将 reducer 的 loading 函数定义为 ghost
  // 则视图里可以调用 mrg.loading.xxxx 来注入loading逻辑
  ghosts: ['loading'] as const,
};

export const model = {[moduleName]: modelDesc};

export type ModelDesc = typeof modelDesc;

export type ModuleName = typeof moduleName;

// 排除掉 loadEffect 自己，防止无限循环调用
export type Fns = Omit<ReducerType<ModuleState, typeof reducer>, 'loadEffect'>;
export type Payloads = { [key in keyof Fns]: Parameters<Fns[key]>[0] };
export type CallerParams = ReducerCallerParams;
export type ReducerFn = IReducerFn;

/** 用于描述 reducer 函数第2位参数 moduleState 的类型 */
export type St = ModuleState;

/** 用与辅助 IModActionCtx IRefCtxM 推导出 globalState globalComputed 的类型 */
export type RootInfo = { state: RootState, computed: RootCu };
// 如组件不关心，可替代写为下面代码, 同时将上面的  import { RootState, RootCu } from 'types/store' 注释掉
// export type RootInfo = { state: {}, computed: {} };

/** 用于描述 reducer 函数第3位参数 actionCtx 的类型 */
export type IAC = IModActionCtx<RootInfo, ModelDesc>;

/**
 * 用于描述 setup 函数的第一位参数类型
 * 如需描述props的类型，可在组件文件内部使用 CtxPre 时透传 Props 类型
 */
export type CtxPre<Props = IAnyObj, RefCu = IAnyObj, Extra = IAnyObj> = IRefCtxM<RootInfo, Props, ModelDesc, IAnyObj, RefCu, Extra>;

/**
 * 辅助单测文件 getRef 接口定义具体的返回类型
 */
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
