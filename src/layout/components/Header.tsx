import React from 'react';
import { Layout, Avatar } from 'antd';
import { Blank } from 'components/dumb/general';
import { useC2DefaultMod } from 'services/concent';
import Logo from './Logo';
import SettingIcon from './SettingIcon';
import styles from '../styles/App.module.css';

function AppHeader() {
  const { globalState: gst, globalComputed: gcu } = useC2DefaultMod();

  return (
    <Layout.Header className={styles.header} style={gcu.headerStyle}>
      { !gcu.siderInfo.showSider && <Logo />}
      <div className={styles.headerRightAreaWrap} style={{ color: gcu.headerStyle.color }}>
        <Avatar size={32} src={gst.userIcon} className={styles.userIconWarp} />
        <Blank width="8px" />
        {gst.userName}
        <Blank width="8px" />
        {gcu.settingIconCtrl.showInHeader && <SettingIcon mode="header" />}
      </div>
    </Layout.Header>
  );
}

export default React.memo(AppHeader);
