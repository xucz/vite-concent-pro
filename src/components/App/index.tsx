import 'configs/runConcent';
// +++ node modules +++
import React from 'react';
import { ConnectRouter, getUrlChangedEvName } from 'react-router-concent';
import { BrowserRouter } from 'react-router-dom';
import { Layout, Spin } from 'antd';
import { useConcent } from 'concent';
// +++ project modules +++
import { CtxDe } from 'types/store';
import SiderSwitchIcon from 'components/biz-dumb/SiderSwitchIcon';
import { getBasename, getRelativeRootPath } from 'services/appPath';
import { path2menuGroup, path2menuItem } from 'configs/derived/menus';
// +++ local modules +++
import styles from './App.module.css';
import Routes from './Routes';
import Sider from './Sider';
import Footer from './Footer';
import Header from './Header';

const {Content} = Layout;

function setup({effect, on, globalReducer}: CtxDe) {

  const setAppPathLabel = () => {
    const curAppPath = getRelativeRootPath();
    const menuItem = path2menuItem[curAppPath];
    if (menuItem) {
      const label2 = menuItem.label;
      const menuGroup = path2menuGroup[curAppPath];
      let label1 = '';
      if (menuGroup) {
        label1 = `${menuGroup.label}/`;
      }
      const dom = document.querySelector('#appPathLabel') as any;
      if (!dom) return;
      dom.innerText = `${label1}${label2}`;
    }
  };

  effect(() => {
    setAppPathLabel();
    globalReducer.prepareApp()
  }, []);

  on(getUrlChangedEvName(), (param, action, history) => {
    console.log(param, action, history);
    setAppPathLabel();
  });
}

function App() {
  const {globalReducer, globalState, globalComputed} = useConcent<{}, CtxDe>({setup, tag: 'App'});
  const siderVisible = globalState.siderVisible;

  let uiContentArea = '' as React.ReactNode;
  if (!globalState.isAppReady) {
    uiContentArea = <Spin>系统初始化中...</Spin>
  } else {
    uiContentArea = <Routes/>;
  }

  return (
    <Layout>
      <Layout>
        <Header/>
      </Layout>
      <Layout>
        <SiderSwitchIcon des={globalComputed.siderIconDes} onClick={globalReducer.toggleSiderVisible}/>
        {siderVisible && <Sider/>}
      </Layout>
      <Layout style={globalComputed.contentLayoutStyle}>
        <h5 id="appPathLabel"></h5>
        <Content id="appContentArea" className={styles.contentWrap}>
          {uiContentArea}
        </Content>
        <Footer/>
      </Layout>
    </Layout>
  );
}

export default React.memo(() => {
  return (
    <BrowserRouter basename={`/${getBasename()}`}>
      <ConnectRouter callUrlChangedOnInit={true}>
        <App/>
      </ConnectRouter>
    </BrowserRouter>
  );
});
