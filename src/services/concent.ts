/**
 * concent 相关的一些公共封装函数
 */
import {
  useConcent, reducer, getState as getSt, getGlobalState as getGst, emit, getComputed,
  IActionCtxBase, cst, MODULE_DEFAULT, MODULE_GLOBAL,
  ICtxBase, IAnyObj, SettingsType, ComputedValType, SetupFn, MultiComputed, CallTargetParams,
} from 'concent';
import { noop } from 'utils/fn';
import { CtxM, CtxMConn, CtxConn, Modules, RootRd, RootState, RootCu } from 'types/store';
import { EvMap } from 'types/eventMap';

function priBuildCallParams(moduleName: Modules, connect: Array<Modules>, options?: Options<any, any, any, any, any, any>) {
  const targetOptions = options || {};
  const { setup, tag, extra, staticExtra, cuDesc, passCuDesc = true, props = {}, ccClassKey } = targetOptions;
  const regOpt = { module: moduleName, connect, setup, props, tag, extra, staticExtra, cuDesc: null as any };
  if (passCuDesc) regOpt.cuDesc = cuDesc;
  return { regOpt, ccClassKey };
}

/**
 * 调用目标函数，用于对接 reducer里的 ghost函数
 * @param callerParams
 * @param ac
 */
export async function callTarget<T extends any = any>(callerParams: CallTargetParams, ac: IActionCtxBase, errHandler?: (err: Error) => void): Promise<T> {
  let ret: T = {} as any;
  try {
    // 支持 reducer文件里内部调用 ac.dispatch(loading, fnPayload(targetFn, payload))
    if (Array.isArray(callerParams)) {
      ret = await Function.prototype.apply.call(ac.dispatch, ac, callerParams);
    } else {
      const { fnName, payload, renderKey, delay } = callerParams;
      ret = await ac.dispatch(fnName, payload, renderKey, delay) as unknown as any;
    }
  } catch (err) {
    if (errHandler) errHandler(err);
    throw err;
  }
  return ret;
}

export interface ValidSetup {
  (ctx: ICtxBase): IAnyObj | void;
}
export interface ValidMapProps {
  (ctx: ICtxBase): IAnyObj;
}
export interface OptionsBase<
  P extends IAnyObj,
  CuDesc extends MultiComputed<any>,
  Extra extends IAnyObj,
  StaticExtra extends any,
  Mp extends ValidMapProps
  > {
  props?: P;
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
export interface Options<
  P extends IAnyObj,
  Setup extends ValidSetup,
  CuDesc extends MultiComputed<any>,
  Extra extends IAnyObj,
  StaticExtra extends any,
  Mp extends ValidMapProps
  > extends OptionsBase<P, CuDesc, Extra, StaticExtra, Mp> {
  setup?: Setup;
}

/**
 * 属于某个模块
 * use the target model context you want by passing a module name
 * 如需要全局任意地方可通过 useC2Mod('xx') 导出xx模块上下文来使用，
 * 需要在 src/models/index.js 显式的导出该模块
 *
 * -----------------------[Export example]-----------------------
 * ```js
 * import somePageModel from 'pages/SomePage/model';
 * import someCompModel from 'components/SomeComp/model';
 * const allModels = {...somePageModel,  ...someCompModel};
 * ```
 * ---------------------------------------------------------------
 *
 * 各种调用示例：
 * 需自己跳转到 components/_demosOfHook/useC2Mod 文件里查看
 * @see {useC2ModDemos.Example} - 简单示例
 * @see {useC2ModDemos.ExampleCallMr} - 调用moduleReducer
 * @see {useC2ModDemos.ExampleReadMcu} - 读取模块计算结果
 * @see {useC2ModDemos.ExampleSetup} - 配置setup
 * @see {useC2ModDemos.ExampleRefCu} - 定义实例计算
 * @param moduleName
 * @param options {Options} - 可选参数，见 Options定义
 */
export function useC2Mod<
  M extends Modules, Setup extends ValidSetup, P extends IAnyObj, CuDesc extends MultiComputed<any>,
  Extra extends IAnyObj, StaticExtra extends any, Mp extends ValidMapProps,
  >(moduleName: M, options?: Options<P, Setup, CuDesc, Extra, StaticExtra, Mp>) {
  const { regOpt, ccClassKey } = priBuildCallParams(moduleName, [], options);
  type Ctx = CtxM<P, M, SettingsType<Setup>, ComputedValType<CuDesc>, [Extra, StaticExtra, ReturnType<Mp>]>;
  return useConcent<{}, Ctx>(regOpt, ccClassKey);
}

/**
 * 使用默认模块（在没有重写$$default模块的情况下，默认模块是一个空模块）
 * @param options
 * @returns
 */
export function useC2DefaultMod<
  Setup extends ValidSetup, P extends IAnyObj, CuDesc extends MultiComputed<any>,
  Extra extends IAnyObj, StaticExtra extends any, Mp extends ValidMapProps,
  >(options?: Options<P, Setup, CuDesc, Extra, StaticExtra, Mp>) {
  const { regOpt, ccClassKey } = priBuildCallParams(cst.MODULE_DEFAULT, [], options);
  type Ctx = CtxM<P, MODULE_DEFAULT, SettingsType<Setup>, ComputedValType<CuDesc>, [Extra, StaticExtra, ReturnType<Mp>]>;
  return useConcent<{}, Ctx>(regOpt, ccClassKey);
}

/**
 * 属于某个模块，连接多个模块
 */
export function useC2ModConn<
  M extends Modules, Conn extends Array<Modules>, Setup extends ValidSetup, P extends IAnyObj, CuDesc extends MultiComputed<any>,
  Extra extends IAnyObj, StaticExtra extends any, Mp extends ValidMapProps,
  >(moduleName: M, connect: Conn, options?: Options<P, Setup, CuDesc, Extra, StaticExtra, Mp>) {
  const { regOpt, ccClassKey } = priBuildCallParams(moduleName, connect, options);
  type Ctx = CtxMConn<P, M, Conn[number], SettingsType<Setup>, ComputedValType<CuDesc>, [Extra, StaticExtra, ReturnType<Mp>]>;
  return useConcent<{}, Ctx>(regOpt, ccClassKey);
}

/**
 * 连接多个模块
 * ```js
 *  const { connectedState, cr } = useC2Conn(['mod1', 'mod2']);
 *  // connectedState.mod1.stateXxx
 *  // cr.mod1.methodXxx
 *
 * ```
 */
export function useC2Conn<
  Conn extends Array<Modules>, Setup extends ValidSetup, P extends IAnyObj, CuDesc extends MultiComputed<any>,
  Extra extends IAnyObj, StaticExtra extends any, Mp extends ValidMapProps,
  >(connect: Conn, options?: Options<P, Setup, CuDesc, Extra, StaticExtra, Mp>) {
  const { regOpt, ccClassKey } = priBuildCallParams(cst.MODULE_DEFAULT, connect, options);
  type Ctx = CtxConn<P, Conn[number], SettingsType<Setup>, ComputedValType<CuDesc>, [Extra, StaticExtra, ReturnType<Mp>]>;
  return useConcent<{}, Ctx>(regOpt, ccClassKey);
}

/**
 * 适用于不属于任何模块，只是设置setup函数的场景
 * @param setup
 * @param options - see OptionsBase
 */
export function useSetup<
  T extends SetupFn, P extends IAnyObj, CuDesc extends MultiComputed<any>,
  Extra extends IAnyObj, StaticExtra extends any, Mp extends ValidMapProps,
  >(setup: T, options?: OptionsBase<P, CuDesc, Extra, StaticExtra, Mp>) {
  const mergedOptions = { setup, ...options };
  const { regOpt, ccClassKey } = priBuildCallParams(cst.MODULE_DEFAULT, [], mergedOptions);
  type Ctx = CtxM<P, MODULE_DEFAULT, SettingsType<T>, ComputedValType<CuDesc>, [Extra, StaticExtra, ReturnType<Mp>]>;
  const { settings } = useConcent<{}, Ctx>(regOpt, ccClassKey);
  return settings;
}

/**
 * useSetupCtx 会返回整个ctx对象，区别于 useSetup 只返回 settings
 * @param setup
 * @param options - see OptionsBase
 */
export function useSetupCtx<
  T extends SetupFn, P extends IAnyObj, CuDesc extends MultiComputed<any>,
  Extra extends IAnyObj, StaticExtra extends any, Mp extends ValidMapProps,
  >(setup: T, options?: OptionsBase<P, CuDesc, Extra, StaticExtra, Mp>) {
  const mergedOptions = { setup, ...options };
  const { regOpt, ccClassKey } = priBuildCallParams(cst.MODULE_DEFAULT, [], mergedOptions);
  type Ctx = CtxM<P, MODULE_DEFAULT, SettingsType<T>, ComputedValType<CuDesc>, [Extra, StaticExtra, ReturnType<Mp>]>;
  const ctx = useConcent<{}, Ctx>(regOpt, ccClassKey);
  return ctx;
}


/**
 * 为属于某个模块的 ctx 标记类型, 通常使用在class成员变量上 和 setup函数体内
 * 在class组件成员变量使用时不需要传递第三位参数ctx，组件实例化时会由concent注入并替换
 * 在setup函数里使用时，可直接传入已经创建好的ctx
 */
export function typeCtxM<
  M extends Modules, Setup extends ValidSetup, P extends IAnyObj, CuDesc extends MultiComputed<any>,
  Extra extends IAnyObj, StaticExtra extends any, Mp extends ValidMapProps,
  >(moduleName: M, options?: Options<P, Setup, CuDesc, Extra, StaticExtra, Mp>, ctx?: any) {
  noop(moduleName, options);
  type Ctx = CtxM<P, M, SettingsType<Setup>, ComputedValType<CuDesc>, [Extra, StaticExtra, ReturnType<Mp>]>;
  return (ctx || {}) as Ctx;
}

/**
 * useC2Mod的工厂函数，返回钩子函数的同时，也提供了帮助推导setup函数的ctx参数类型的辅助函数
 * 注意! 此工厂函数仅适用于 setup函数ctx参数不需要感知 props, extra 类型时，方可使用
 * @param moduleName
 * @param options
 * -----------------------[Code example]-----------------------
 * ```js
 *  const ret = makeUseC2Mod("Counter");
 *   function setupA1(c: any) {
 *    const ctx = ret.typeCtx(c);
 *     const cu = ctx.computed({countX6: (n) => n.value * 6 });
 *     return { cu };
 *   }
 *   export function UseC2ModByFactory() {
 *     const ctx = ret.useC2Mod({ setup: setupA1 });
 *     return <h1>{ctx.state.bigValue} {ctx.settings.cu.countX6}</h1>
 *   }
 * ```
 * --------------------------------------------------------------
 */
export function makeUseC2Mod<M extends Modules>(moduleName: M) {
  return {
    /**
     * 需要传入的 setup 函数
     */
    useC2Mod: <Setup extends ValidSetup, P extends IAnyObj, CuDesc extends MultiComputed<any>,
      Extra extends IAnyObj, StaticExtra extends any, Mp extends ValidMapProps,
      >(options?: Options<P, Setup, CuDesc, Extra, StaticExtra, Mp>) => {
      const { regOpt, ccClassKey } = priBuildCallParams(moduleName, [], options);
      type Ctx = CtxM<P, M, SettingsType<Setup>, ComputedValType<CuDesc>, [Extra, StaticExtra, ReturnType<Mp>]>;
      return useConcent<P, Ctx>(regOpt, ccClassKey);
    },
    /**
     * 推导setup函数的ctx参数类型
     */
    typeCtx: (ctx: ICtxBase) => {
      return ctx as CtxM<{}, M>;
    },
  };
}

export const ccReducer = (reducer as unknown) as RootRd;

/**
 * 获取 global模块的状态
 * 在已拥有 concent model 上下文、action 上下文的地方，
 * 推荐直接获取，代替调用此函数，因为直接获取数据时组件并不会订阅数据变化
 */
export function getGlobalState() {
  const globalState = getGst<RootState>();
  return globalState;
}

/**
 * 获取整个根状态
 * 注意直接获取数据时组件并不会订阅数据变化
 */
export function getRootState() {
  const rootState = getSt<RootState>();
  return rootState;
}

/**
 * 获取目标模块状态
 * 注意直接获取数据时组件并不会订阅数据变化
 */
export function getModelState<T extends Modules>(modelName: T) {
  if (modelName) {
    const modelState = getSt<RootState, T>(modelName);
    return modelState;
  }
  throw new Error('miss modelName');
}

/**
 * 获取目标模块状态
 */
export function getModelComputed<T extends Modules>(modelName: T) {
  if (modelName) {
    const modelComputed = getComputed<RootCu, T>(modelName);
    return modelComputed;
  }
  throw new Error('miss modelName');
}

/**
 * 获取 global模块的状态
 * 在已拥有 concent model 上下文、action 上下文的地方，
 * 推荐直接获取，代替调用此函数，因为直接获取数据时组件并不会订阅数据变化
 */
export function getGlobalComputed() {
  const globalComputed = getComputed<RootCu, MODULE_GLOBAL>(cst.MODULE_GLOBAL);
  return globalComputed;
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
 * @param eventDesc - [eventName, id]
 * @param args
 */
export function ccEmitId<E extends EvKeys, T extends EvMap[E]>(eventDesc: [E, string], ...args: T) {
  emit(eventDesc, ...args);
}

type OnFn = <E extends EvKeys>(eventName: E, cb: (...args: EvMap[E]) => void) => void;
/**
 * 配合EvMap，为ctx.on装配类型
 * 外部调用时传入具体的事件名就推导出cb函数的参数列表类型
 *
    function setup(ctx: Ctx){
      const on = ctxOn(ctx);
      on('xxx',(a, b)=>{
       // 此处ts能感知a、b的具体类型
      })
    }
 */
export function ctxOn(ctx: ICtxBase) {
  return ctx.on as OnFn;
}

type OnIdFn = <E extends EvKeys>(eventDesc: [E, string], cb: (...args: EvMap[E]) => void) => void;
/**
 * 可以携带id的ctx.on
 * @param ctx
 */
export function ctxOnId(ctx: ICtxBase) {
  return ctx.on as OnIdFn;
}
