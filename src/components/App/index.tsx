// +++ node modules +++
import React from 'react';
import { ConnectRouter } from 'react-router-concent';
import { BrowserRouter } from 'react-router-dom';
import { Layout, Spin, Skeleton } from 'antd';
import { cst } from 'concent';
// +++ project modules +++
import { CtxDe } from 'types/store';
import SiderSwitchIcon from 'components/biz-dumb/SiderSwitchIcon';
import { getBasename } from 'services/appPath';
import { useC2Mod } from 'services/concent';
// +++ local modules +++
import Routes from './Routes';
import Sider from './Sider';
import Footer from './Footer';
import Header from './Header';

function setup({ effect, globalReducer, globalState, globalComputed }: CtxDe) {
  effect(() => {
    globalReducer.prepareApp();
  }, []);

  return {
    renderContentArea() {
      const { contentLayoutStyle } = globalComputed;
      let uiContentArea = '' as React.ReactNode;
      if (!globalState.isAppReady) {
        uiContentArea = <Layout style={{ ...contentLayoutStyle, padding: '64px' }}>
          <Skeleton avatar paragraph={{ rows: 4 }} />
          <Skeleton avatar paragraph={{ rows: 4 }} />
          <Spin>
            <div style={{ textAlign: 'center' }}>系统初始化中...</div>
          </Spin>
        </Layout>;
      } else {
        // 给一个最小高度，确保路由组件在异步加载过程中，Footer出现在底部
        uiContentArea = <div style={{ minHeight: 'calc(100vh - 120px)' }}><Routes /></div>;
      }
      return uiContentArea;
    }
  };
}

function App() {
  const { globalReducer, globalState, globalComputed, settings } = useC2Mod(cst.MODULE_DEFAULT, { setup, tag: 'App' });
  return (
    <Layout>
      <Layout>
        <Header />
      </Layout>
      <Layout>
        <SiderSwitchIcon des={globalComputed.siderIconDes} onClick={globalReducer.toggleSiderVisible} />
        {globalState.siderVisible && <Sider />}
      </Layout>
      {settings.renderContentArea()}
      <Footer />
    </Layout>
  );
}

export default React.memo(() => {
  return (
    <BrowserRouter basename={`/${getBasename()}`}>
      <ConnectRouter callUrlChangedOnInit={true}>
        <App />
      </ConnectRouter>
    </BrowserRouter>
  );
});
