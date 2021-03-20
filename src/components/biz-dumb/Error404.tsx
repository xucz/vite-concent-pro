import React from 'react';
import { Alert } from 'antd';
import { sys } from 'configs/constant';

const stBg = {
  width: '600px',
  height: '600px',
  backgroundImage: `url(${sys.img404})`,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  paddingTop: '360px',
  margin: '0 auto',
};

export default function Error404() {
  return (
    <div style={stBg}>
      <Alert type="error" message="页面不存在" />
    </div>
  );
}
