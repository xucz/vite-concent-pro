import React from 'react';
import { Alert } from 'antd';
import { sys } from 'configs/constant';

const stBg = {
  width: '600px',
  height: '600px',
  backgroundImage: `url(${sys.img403})`,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  paddingTop: '360px',
  margin: '0 auto',
};

export default function Error403() {
  return (
    <div style={stBg}>
      <Alert type="error" message="暂无权限查看该页面" />
    </div>
  );
}