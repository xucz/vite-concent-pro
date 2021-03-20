/* eslint-disable no-underscore-dangle,no-param-reassign */
import './model';
import React, { Fragment } from 'react';
import { Table, Pagination, Button } from 'antd';
import { getInitMetaData } from './model/state';
import { CtxPre, useModelWithSetup } from './model/meta';
import * as t from './type';

const setup = (ctx: CtxPre) => {
  const {
    tid: tableId, fetchAfterMounted = true, hasMoreMode = false, fetchFn: propsFetchFn,
    pageSizeOptions = ['50', '100', '200'],
  } = ctx.props;
  const { ccUniqueKey } = ctx;
  if (!ctx.state.meta[tableId]) {
    const pageSize = parseInt(pageSizeOptions[0], 10) || 50;
    ctx.state.meta[tableId] = getInitMetaData(hasMoreMode, pageSize);
  }

  ctx.on(['refreshTable', tableId], async (fetchFn) => {
    const _fetchFn = fetchFn || propsFetchFn;
    await ctx.mr.clearTable({ tableId }, ccUniqueKey);
    await ctx.mr.handlePageCurrentChange({ tableId, current: 1, fetchFn: _fetchFn }, ccUniqueKey);
  });
  ctx.on(['clearTable', tableId], () => {
    ctx.mr.clearTable({ tableId }, ccUniqueKey);
  });
  ctx.on(['refreshTableCurPage', tableId], (fetchFn) => {
    const _fetchFn = fetchFn || propsFetchFn;
    const tableMeta = ctx.state.meta[tableId];
    ctx.mr.handlePageCurrentChange({ tableId, current: tableMeta.current, fetchFn: _fetchFn }, ccUniqueKey);
  });

  ctx.effect(() => {
    if (fetchAfterMounted) {
      handlePageCurrentChange(1);
    }
    return () => ctx.dispatch('clearTable', { tableId }, ccUniqueKey);
  }, []);

  const handlePageCurrentChange = (current: number) => {
    const { fetchFn } = ctx.props;// fetchFn有可能会变，这里每次取最新的
    ctx.mr.handlePageCurrentChange({ tableId, current, fetchFn }, ccUniqueKey)
  };
  const handelPageSizeChange = (page: number, pageSize: number) => {
    const { fetchFn } = ctx.props;
    ctx.mr.handlePageSizeChange({ tableId, pageSize, fetchFn }, ccUniqueKey);
  };
  const handleNextPage = () => {
    const { fetchFn } = ctx.props;
    ctx.mr.handleNextPage({ tableId, fetchFn }, ccUniqueKey);
  };

  return {
    handlePageCurrentChange,
    handelPageSizeChange,
    handleNextPage,
    pageSizeOptions,
  };
};

export type Props = t.Props;
export type FetchFn = t.FetchFn;
export type FetchFnParams = t.FetchFnParams;

/**
 * #################[Code example]#####################
 *
 *  const fetcher = ()=> xxxService.fetchData();
 *  <GeneralTable tid="xxxId" fetchFn={fetcher} columns={yourColumnsDef} />
 *
 * ####################################################
 */
export function GeneralTable(props: t.Props) {
  /** @type Ctx */
  const { state, settings } = useModelWithSetup(setup, { props });
  const {
    tid, columns, rowKey = 'id', scroll = { x: '100%' }, hasMoreMode = false,
    disableBtnWhenNoMore, size,
  } = props;
  const { list, loading, current, total, pageSize, hasMore } = state.meta[tid];
  const { handelPageSizeChange, handlePageCurrentChange, handleNextPage, pageSizeOptions } = settings;

  const renderBtn = () => {
    if (disableBtnWhenNoMore && !hasMore) return <Button disabled style={{ width: '100%' }}>没有更多了</Button>;
    return <Button onClick={handleNextPage} style={{ width: '100%' }}>加载更多</Button>;
  };

  // console.log(`%c@@@ GeneralTable ${props.tid}`, 'color:red;border:1px solid red;');
  return (
    <Fragment>
      <Table rowKey={rowKey} columns={columns} dataSource={list} size={size}
        loading={loading} pagination={false} scroll={scroll}
      />
      <div style={{ height: '19px', width: '100%' }} />
      {hasMoreMode
        ? renderBtn()
        : (
          <Pagination onShowSizeChange={handelPageSizeChange} onChange={handlePageCurrentChange}
            current={current} total={total} showSizeChanger pageSizeOptions={pageSizeOptions}
            pageSize={pageSize}
          />
        )
      }
    </Fragment>
  );
}

export default React.memo(GeneralTable);
