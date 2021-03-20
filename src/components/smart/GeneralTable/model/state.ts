import { MetaItem } from '../type';

export function getInitMetaData(hasMoreMode = false, pageSize = 50) {
  return {
    lockId: 'init_lock', // 用于控制多个fetcher刷新同一个表格时，总是只认最近调用的那一个返回的数据
    /** 是否处于 hasMore 模式 */
    hasMoreMode,
    hasMore: true,
    current: 1,
    pageSize,
    total: 0,
    list: [] as any[],
    loading: false,
  };
}

export function getInitialState() {
  return {
    meta: { } as Record<string, MetaItem>,
  };
}

export type St = ReturnType<typeof getInitialState>;

export default getInitialState;
