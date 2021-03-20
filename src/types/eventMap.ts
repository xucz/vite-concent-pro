import * as ev from 'configs/constant/event';

/**
 * 管理所有事件名对应参数类型的 mappedType
 */
export interface EvMap {
  [ev.someEvent]: [number, string],
}
