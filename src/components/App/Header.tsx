import React from 'react';
import { Layout, Popover, Switch, Tag, Avatar } from 'antd';
import { SwitchChangeEventHandler } from 'antd/lib/switch/index';
import { useConcent, SettingsType } from 'concent';
import { SketchPicker, ColorChangeHandler, ColorResult } from 'react-color'
import styles from './App.module.css';
import { SettingOutlined } from '@ant-design/icons';
import { CtxDe } from 'types/store';
import { Blank, VerticalBlank } from 'components/dumb/general';

interface ISettingPanelProps {
  color: string;
  onChangeComplete: ColorChangeHandler;
  onWebsiteColorChange: ColorChangeHandler;
  siderThemeChecked: boolean;
  onSiderThemeChange: SwitchChangeEventHandler;
  headerThemeChecked: boolean;
  onHeaderThemeChange: SwitchChangeEventHandler;
  innerMockChecked: boolean;
  onInnerMockChange: (checked: boolean) => void;
}

function SettingPanel({
  color, onChangeComplete, onWebsiteColorChange, siderThemeChecked, onSiderThemeChange,
  headerThemeChecked, onHeaderThemeChange, innerMockChecked, onInnerMockChange,
}: ISettingPanelProps) {
  return (
    <div style={{ padding: '12px 28px' }}>
      <Tag color="geekblue">站点主题设置：</Tag>
      <VerticalBlank />
      <SketchPicker color={color} onChange={onWebsiteColorChange} onChangeComplete={onChangeComplete} />
      <VerticalBlank />
      <div>
        <Tag color="geekblue">边栏设置：</Tag>
        <Blank />
        <Switch checkedChildren="关闭暗黑边栏" unCheckedChildren="开启暗黑边栏" checked={siderThemeChecked} onChange={onSiderThemeChange} />
      </div>
      <VerticalBlank />
      <div>
        <Tag color="geekblue">顶栏设置：</Tag>
        <Blank />
        <Switch checkedChildren="关闭暗黑顶栏" unCheckedChildren="开启暗黑顶栏" checked={headerThemeChecked} onChange={onHeaderThemeChange} />
      </div>
      <VerticalBlank />
      <div>
        <Tag color="geekblue">mock设置：</Tag>
        <Blank />
        <Switch checkedChildren="关闭innerMock" unCheckedChildren="开启innerMock" checked={innerMockChecked} onChange={onInnerMockChange} />
      </div>
    </div>
  );
}

type Se = SettingsType<typeof setup>;
function setup(ctx: CtxDe) {
  const { globalReducer: grd } = ctx;
  return {
    onWebsiteColorChange(colorResult: ColorResult) {
      grd.changeThemeColor(colorResult.hex);
    },
    onSiderThemeChange(checked: boolean) {
      grd.switchSiderTheme(checked);
    },
    onHeaderThemeChange(checked: boolean) {
      grd.switchHeaderTheme(checked);
    },
    onInnerMockChange(checked: boolean) {
      grd.changeIsInnerMock(checked);
    },
  }
}

function AppHeader() {
  const { globalState: st, globalComputed: gcu, settings: se } = useConcent<{}, CtxDe<{}, Se>>({ setup, tag: 'Header' });
  const uiContent = <SettingPanel color={st.themeColor} onWebsiteColorChange={se.onWebsiteColorChange}
    headerThemeChecked={gcu.headerThemeSwitchChecked} onHeaderThemeChange={se.onHeaderThemeChange}
    siderThemeChecked={gcu.siderThemeSwitchChecked} onSiderThemeChange={se.onSiderThemeChange}
    innerMockChecked={st.isInnerMock} onInnerMockChange={se.onInnerMockChange}
    onChangeComplete={se.onWebsiteColorChange} />;

  return (
    <Layout.Header className={styles.header} style={gcu.headerStyle}>
      <div className={styles.userIconWrap}>
        <Avatar size={40} src={st.uesrIcon} />
        <Blank width="8px" />
        {st.userName}
      </div>
      <Popover placement="bottomLeft" content={uiContent} title="主题设置" trigger="click">
        <SettingOutlined className={styles.headerSetting} style={{ color: gcu.headerStyle.color }} />
      </Popover>
    </Layout.Header>
  );
}

export default React.memo(AppHeader);
