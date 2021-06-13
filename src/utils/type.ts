
/**
 * 绕过 @typescript-eslint/consistent-type-assertions 限制
 * 不能写 const a = null as ( null | Info ); 的地方
 * 可以用此函数 const a = typeVal<null | Info>(null);
 * 通常用于对象里给某个属性赋值的同时也赋上类型的操作
 *
 * 考虑model/state里书写getInitialState函数的场景
 * ```js
 * export function getInitialState(){
 *   return {
 *      info: null as null | Info,
 *   }
 * }
 * ```
 * 触发了 @typescript-eslint/consistent-type-assertions 限制，修改为
 * ```js
 * export function getInitialState(){
 *   const info :  null | Info  = null;
 *   return {
 *      info,
 *   }
 * }
 * ```
 * 此时state类型为{ inf: null }，不符合预期，经验证一个值赋给另一个对象的属性时，那个属性的类型会是这个值当前的实际类型
 * 写为 const a : ( null | Info ) = null; 再把a赋值给 const state = { a };
 * 此时推导出的 state 类型为 { a: null }，而非 { a: null | Info }，所以实际的正确写法为
 * ```js
 * export function getInitialState(): { info:null | Info }{
 *   return {
 *      info: null,
 *   }
 * }
 * ```
 * 但如果我们期望直接通过返回值就隐式的让ts推导出类型，此时用 typeVal，则可方便的为不同的属性单独赋类型
 * ```js
 * export function getInitialState(){
 *   return {
 *      info: typeVal<null | Info>(null),
 *   }
 * }
 * ```
 * 此种写法既能够用精简的写法符合写出符合类型推导预期的代码，
 * 也能够绕过 @typescript-eslint/consistent-type-assertions  限制
 * @param val
 */
export function typeVal<T extends any>(val: any): T {
  return val;
}
