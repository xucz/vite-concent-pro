import React from 'react';
import { Avatar } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import { useSetupCtx } from 'services/concent';
import { CtxDe } from 'types/store';
import styles from '../styles/App.module.css';

function setup(ctx: CtxDe) {
  return {
    openThemeSettingsDrawer: () => ctx.setGlobalState({ settingDrawerVisible: true }),
  };
}

interface IProps {
  mode?: 'bar' | 'header' | 'body',
}

const iconClsMap = {
  bar: '',
  header: styles.settingInHeader,
  body: styles.settingInBody,
};
const uiEmpty = <span style={{ display: 'none' }} />;

function SettingIcon(props: IProps) {
  const { mode = 'body' } = props;
  const { globalComputed: gcu, settings: se } = useSetupCtx(setup);

  if (mode === 'body' && !gcu.settingIconCtrl.showInBody) {
    return uiEmpty;
  }

  const iconCls = `${iconClsMap[mode]} gHover`;
  const style = { color: gcu.settingIconCtrl.color };

  if (mode === 'body') {
    return <Avatar className={iconCls} icon={<SettingOutlined onClick={se.openThemeSettingsDrawer} style={style} />} />;
  }
  return <SettingOutlined onClick={se.openThemeSettingsDrawer} className={iconCls} style={style} />;
}

export default React.memo(SettingIcon);
