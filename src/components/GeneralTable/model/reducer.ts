import * as obj from 'utils/obj';
import { getInitMetaData } from './state';
import { IAC, St } from './meta';

function getTableMeta(meta: any, tableId: string) {
  return obj.safeGet(meta, tableId, getInitMetaData());
}

export function modTableMeta({ tableId, toMod }: any, moduleState: St) {
  const { meta } = moduleState;
  const tableMeta = getTableMeta(meta, tableId);
  if (obj.isValidVal(toMod.pageSize) && typeof toMod.pageSize !== 'number') {
    toMod.pageSize = parseInt(toMod.pageSize, 10);
  }
  obj.safeAssign(tableMeta, toMod);
  return { meta };
}

/** 处理页码变更 */
export async function handlePageCurrentChange({ current, tableId, fetchFn }: any, _: St, ctx: IAC) {
  await ctx.dispatch(modTableMeta, { tableId, toMod: { loading: true, current, lockId: Date.now() } });
  await ctx.dispatch(fetchTableData, { tableId, fetchFn });
}

/** 翻到下一页 */
export async function handleNextPage({ tableId, fetchFn }: any, { meta }: St, ctx: IAC) {
  const { current } = getTableMeta(meta, tableId);
  await ctx.dispatch(handlePageCurrentChange, { current: current + 1, tableId, fetchFn });
}

/** 处理一页展示条数的变更 */
export async function handlePageSizeChange({ tableId, pageSize, fetchFn }: any, _: St, ctx: IAC) {
  await ctx.dispatch(modTableMeta, { tableId, toMod: { loading: true, pageSize, lockId: Date.now() } });
  await ctx.dispatch(fetchTableData, { tableId, fetchFn });
}

export function clearTable({ tableId }: any, m: St, ctx: IAC) {
  ctx.dispatch(modTableMeta, {
    tableId,
    toMod: { list: [], total: 0, loading: false },
  });
}

export async function fetchTableData({ tableId, fetchFn }: any, moduleState: St, ctx: IAC) {
  const { meta } = moduleState;
  const { current, pageSize, lockId, list: oldList, hasMoreMode } = getTableMeta(meta, tableId);

  const res = await fetchFn({ current, pageSize, list: oldList });
  if (!res) {
    await ctx.dispatch(modTableMeta, {
      tableId,
      toMod: { loading: false },
    });
    return;
  }

  const { pageList, page_list, total = 0, hasMore = true } = res;
  const list = pageList || page_list || [];
  if (getTableMeta(meta, tableId).lockId !== lockId) {
    return; // lockId已不对，这是一个较老生成的lockId，放弃执行当前函数，不触发刷新表格
  }

  const start = (current - 1) * pageSize;
  list.forEach((v: any, idx: number) => {
    if (v) v.__seq = start + (idx + 1);
  });

  let targetList = list;
  if (hasMoreMode) {
    targetList = oldList.concat(list);
  }

  await ctx.dispatch(modTableMeta, {
    tableId,
    toMod: { list: targetList, total, hasMore, loading: false },
  });
}
