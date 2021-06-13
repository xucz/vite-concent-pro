/*
|--------------------------------------------------------------------------
| concent-pro 的骨架屏组件
|
| 在 models/global/state.js 的 isAppReady 值置为true之前，
| 主内容区域会渲染此骨架屏
| 异步路由拉取资源时也会渲染此组件
|--------------------------------------------------------------------------
|
*/
import React from 'react';
import { Spin, Skeleton } from 'antd';

interface IProps {
  label?: string;
}

export default function SkeletonScreen(props: IProps) {
  const { label = '系统初始化中...' } = props;
  return (
    <div style={{ padding: '64px' }}>
      <Skeleton avatar paragraph={{ rows: 4 }} />
      <Skeleton avatar paragraph={{ rows: 4 }} />
      <Spin>
        <div style={{ textAlign: 'center' }}>{label}</div>
      </Spin>
    </div>
  );
}
