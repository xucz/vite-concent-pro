/**
 * concent 相关的一些公共封装函数
 */
import {
  ComputedValType,
  cst,
  emit,
  getGlobalState as getGst,
  getState as getSt,
  IActionCtxBase,
  IAnyObj,
  ICtxBase,
  IReducerFn,
  MultiComputed,
  reducer,
  ReducerCallerParams,
  SettingsType,
  SetupFn,
  useConcent,
} from 'concent';
import { CtxConn, CtxDe, CtxM, CtxMConn, Modules, RootRd, RootState } from 'types/store';
import { EvMap } from 'types/eventMap';

function priBuildCallParams(moduleName: string, connect: Array<Modules>, options?: Options<any, any, any, any, any, any>) {
  const targetOptions = options || {};
  const {setup, tag, extra, staticExtra, cuDesc, passCuDesc = true, props = {}, ccClassKey} = targetOptions;
  const regOpt = {module: moduleName, connect, setup, props, tag, extra, staticExtra, cuDesc: null as any};
  if (passCuDesc) regOpt.cuDesc = cuDesc;
  return {regOpt, ccClassKey};
}

/**
 * 调用目标函数，用于对接 reducer里的 ghost函数
 * @param callerParams
 * @param ac
 */
export async function callTarget(callerParams: ReducerCallerParams | [IReducerFn, any], ac: IActionCtxBase) {
  try {
    // 支持 reducer文件里内部调用 ac.dispatch(loading, [targetFn, payload])
    if (Array.isArray(callerParams)) {
      const [fn, payload] = callerParams;
      await ac.dispatch(fn, payload);
    } else {
      const {fnName, payload, renderKey, delay} = callerParams;
      await ac.dispatch(fnName, payload, renderKey, delay);
    }
  } catch (err) {
    alert(err.message);
  }
}

/**
 * 适用于不属于任何模块，只是设置setup函数的场景
 * @param setup
 */
export function useSetup<T extends SetupFn>(setup: T, props?: any) {
  const {settings} = useConcent<{}, CtxDe<{}, SettingsType<T>>>({setup, props});
  return settings;
}

export interface ValidSetup {
  (ctx: ICtxBase): IAnyObj | void;
}

export interface ValidMapProps {
  (ctx: ICtxBase): IAnyObj;
}

export interface Options<P extends IAnyObj, Setup extends ValidSetup, CuDesc extends MultiComputed<any>,
  Extra extends IAnyObj, StaticExtra extends any, Mp extends ValidMapProps,
  > {
  props?: P;
  setup?: Setup,
  tag?: string;
  ccClassKey?: string;
  extra?: Extra;
  staticExtra?: StaticExtra;
  /**
   * 一个遗留的参数，对接useConcent的mapProps，每一轮渲染都会调用，返回结果可通过 ctx.mapped拿到
   */
  mapProps?: Mp;
  cuDesc?: CuDesc;
  /**
   * 是否透传 cuSpec 给 useConcent函数，默认为true，
   * 表示需要透传，此时用户不需要再setup函数体内调用 ctx.computed(cuSpec)
   * 如果用户设置passCuSpec为false，表示传入 cuSpec 仅为了方便推导出refComputed类型，但不透传 cuSpec 给 useConcent函数
   * 注意此时用户需要在 setup函数体内调用 ctx.computed(cuSpec) 来完成示例计算函数的定义，
   * 否则 refComputed 里拿不到真正的计算结果
   */
  passCuDesc?: boolean;
}

/**
 * 属于某个模块
 * use the target model context you want by passing a module name
 * 如需要全局任意地方可通过 useC2Mod('xx') 导出xx模块上下文来使用，
 * 需要在 src/models/index.js 显式的导出该模块
 * -----------------------[Code example]-----------------------
 *  // models/index.ts 里导出
 *  import somePageModel from 'pages/SomePage/model';
 *  import someCompModel from 'components/SomeComp/model';
 *
 *  const allModels = {
 *    ...somePageModel,
 *    ...someCompModel,
 *  }
 *
 *
 *  export default allModels;
 *
 *  // 某些组件里使用
 *  import { useC2Mod } from 'services/concent';
 *  function DemoComp(){
 *    const ctx = useC2Mod('xxxMod');
 *    return <h1>{ctx.state.hello}</h1>
 *  }
 * --------------------------------------------------------------
 * @param moduleName
 * @param options {Options} - 可选参数，见 Options定义
 */
export function useC2Mod<M extends Modules, Setup extends ValidSetup, P extends IAnyObj, CuDesc extends MultiComputed<any>,
  Extra extends IAnyObj, StaticExtra extends any, Mp extends ValidMapProps,
  >(moduleName: M, options?: Options<P, Setup, CuDesc, Extra, StaticExtra, Mp>) {
  const {regOpt, ccClassKey} = priBuildCallParams(moduleName, [], options);
  type Ctx = CtxM<P, M, SettingsType<Setup>, ComputedValType<CuDesc>, [Extra, StaticExtra, ReturnType<Mp>]>;
  return useConcent<{}, Ctx>(regOpt, ccClassKey);
}

/**
 * 属于某个模块，连接多个模块
 */
export function useC2ModConn<M extends Modules, Conn extends Array<Modules>, Setup extends ValidSetup, P extends IAnyObj, CuDesc extends MultiComputed<any>,
  Extra extends IAnyObj, StaticExtra extends any, Mp extends ValidMapProps,
  >(moduleName: M, connect: Conn, options?: Options<P, Setup, CuDesc, Extra, StaticExtra, Mp>) {
  const {regOpt, ccClassKey} = priBuildCallParams(moduleName, connect, options);
  type Ctx = CtxMConn<P, M, Conn[number], SettingsType<Setup>, ComputedValType<CuDesc>, [Extra, StaticExtra, ReturnType<Mp>]>;
  return useConcent<{}, Ctx>(regOpt, ccClassKey);
}

/**
 * 连接多个模块
 */
export function useC2Conn<Conn extends Array<Modules>, Setup extends ValidSetup, P extends IAnyObj, CuDesc extends MultiComputed<any>,
  Extra extends IAnyObj, StaticExtra extends any, Mp extends ValidMapProps,
  >(connect: Conn, options?: Options<P, Setup, CuDesc, Extra, StaticExtra, Mp>) {
  const {regOpt, ccClassKey} = priBuildCallParams(cst.MODULE_DEFAULT, connect, options);
  type Ctx = CtxConn<P, Conn[number], SettingsType<Setup>, ComputedValType<CuDesc>, [Extra, StaticExtra, ReturnType<Mp>]>;
  return useConcent<{}, Ctx>(regOpt, ccClassKey);
}

export const ccReducer = (reducer as unknown) as RootRd;

/**
 * 获取 globa模块的状态
 * 在已拥有concent model上下文、action上线文的地方，推荐直接获取，代替调用此函数
 */
export function getGlobalState() {
  const globalState = getGst<RootState>();
  return globalState;
}

/**
 * 获取整个根状态
 */
export function getRootState() {
  const rootState = getSt() as RootState;
  return rootState;
}

/**
 * 获取目标模块状态
 */
export function getModelState<T extends Modules>(modelName: T) {
  const modelState = getSt(modelName) as RootState[T];
  return modelState;
}

type EvKeys = keyof EvMap;

/**
 * 发射事件
 * @param eventName - 事件名
 * @param args
 */
export function ccEmit<E extends EvKeys, T extends EvMap[E]>(eventName: E, ...args: T) {
  emit(eventName, ...args);
}

/**
 * 携带id的发射事件
 * @param eventdesc - [eventName, id]
 * @param args
 */
export function ccEmitId<E extends EvKeys, T extends EvMap[E]>(eventdesc: [E, string], ...args: T) {
  emit(eventdesc, ...args);
}

type OnFn = <E extends EvKeys>(eventName: E, cb: (...args: EvMap[E]) => void) => void;

/**
 * 配合EvMap，为ctx.on装配类型
 * 外部调用时传入具体的事件名就推导出cb函数的参数列表类型
 *
 *  function setup(ctx: Ctx){
 *    const on = ctxOn(ctx);
 *    on('xxx',(a, b)=>{
 *      // 此处ts能感知a、b的具体类型
 *    })
 *  }
 *
 */
export function ctxOn(ctx: ICtxBase) {
  return ctx.on as OnFn;
}

type OnIdFn = <E extends EvKeys>(eventdesc: [E, string], cb: (...args: EvMap[E]) => void) => void;

/**
 * 可以携带id的ctx.on
 * @param ctx
 */
export function ctxOnId(ctx: ICtxBase) {
  return ctx.on as OnIdFn;
}
