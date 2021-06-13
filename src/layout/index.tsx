// +++ node modules +++
import React from 'react';
import { ConnectRouter } from 'react-router-concent';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import { Layout, ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
// +++ project modules +++
import { CtxDe } from 'types/store';
import { getBasename } from 'services/appPath';
import { useC2DefaultMod } from 'services/concent';
// +++ local modules +++
import TopContent from './TopContent';
import MainContent from './MainContent';
import LeftContent from './LeftContent';
import Footer from './Footer';
import SettingDrawer from './components/SettingDrawer';

function setup({ effect, globalReducer }: CtxDe) {
  effect(() => {
    globalReducer.prepareApp();
  }, []);
}

function App() {
  useC2DefaultMod({ setup, tag: 'App' });
  return (
    <ConfigProvider locale={zhCN}>
      <Layout>
        <TopContent />
        <LeftContent />
        <MainContent />
        <Footer />
        <SettingDrawer />
      </Layout>
    </ConfigProvider>
  );
}

export default React.memo(() => {
  const RootRouter: any = window.location.hostname.includes('github.io') ? HashRouter : BrowserRouter;
  return (
    <RootRouter basename={`/${getBasename()}`}>
      <ConnectRouter callUrlChangedOnInit={true}>
        <App />
      </ConnectRouter>
    </RootRouter>
  );
});
