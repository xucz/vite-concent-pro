import React from 'react';
import { Tabs, Tooltip, Switch } from 'antd';
import { history } from 'react-router-concent';
import { QuestionOutlined } from '@ant-design/icons';
import { useSetupCtx } from 'services/concent';
import { getSearchPath, extractPathAndSearch } from 'services/appPath';
import { CtxDe } from 'types/store';
import { IMenuGroup, IMenuItem } from 'configs/menus';
import { path2menuItem, path2menuGroup } from 'configs/derived/menus';
import { Blank } from 'components/dumb/general';
import * as arrUtil from 'utils/arr';
import SettingIcon from './SettingIcon';
import styles from '../styles/App.module.css';

const { TabPane } = Tabs;
const stItemIcon = { marginRight: '6px' };

function setup(ctx: CtxDe) {
  return {
    onChange: (curActiveRoutePathMayIncludeSearch: string) => {
      ctx.gr.addActiveRoutePath(extractPathAndSearch(curActiveRoutePathMayIncludeSearch));
      history.push(curActiveRoutePathMayIncludeSearch);
    },
    onEdit: async (curActiveRoutePathMayIncludeSearch: React.MouseEvent | React.KeyboardEvent | string, action: string) => {
      if (action === 'remove' && typeof curActiveRoutePathMayIncludeSearch === 'string') {
        const ret = await ctx.gr.delActiveRoutePath(extractPathAndSearch(curActiveRoutePathMayIncludeSearch));
        history.push(`${ret.curActiveRouteFullPath}`);
      }
    },
    getNavMenus: (path: string) => {
      const navMenus: Array<IMenuGroup | IMenuItem> = [];
      const menuItem = path2menuItem[path];
      menuItem && navMenus.unshift(menuItem);
      const menuGroup = path2menuGroup[path];
      menuGroup && navMenus.unshift(menuGroup);
      return navMenus;
    },
    openThemeSettingsDrawer: () => ctx.setGlobalState({ settingDrawerVisible: true }),
    changeIsTabPaneHeavyBg: (isTabPaneHeavyBg: boolean) => {
      ctx.gr.changeIsTabPaneHeavyBg(isTabPaneHeavyBg);
    },
  };
}

// 渲染导航面包屑 + 标签页
function QuickNavBar() {
  const { globalState: { activeRoutePaths, isTabPaneHeavyBg, curActiveRouteFullPath },
    settings: se, globalComputed: gcu,
  } = useSetupCtx(setup, { tag: 'QuickNavBar' });

  return (
    <div className={`quickNavBarWrapBase ${gcu.navBarItemCls} smallScBar`} style={gcu.quickNavBarStyle}>
      <Tabs
        style={{ paddingLeft: '3px', display: 'inline-block' }}
        activeKey={curActiveRouteFullPath}
        hideAdd
        onChange={se.onChange}
        onEdit={se.onEdit}
        type="editable-card"
      >
        {activeRoutePaths.map(({ path, search }) => {
          const navMenus = se.getNavMenus(path);
          const item = arrUtil.lastItem(navMenus);
          const uiIcon = item.Icon ? <item.Icon style={stItemIcon} /> : <QuestionOutlined style={stItemIcon} />;
          const navLen = navMenus.length;
          const pathWithSearch = getSearchPath(path, search);
          const uiTab = (
            <Tooltip key={pathWithSearch}
              title={navMenus.map((item, i) => <span key={i} >{(navLen > 1 && i > 0) ? ' / ' : ''}{item.label} {search}</span>)}
            >
              <span >{uiIcon}{item.label}</span>
            </Tooltip>
          );
          return <TabPane tab={uiTab} key={pathWithSearch} />;
        })}
      </Tabs>
      <div className={styles.headerSettingWrapInBar}>
        <Switch checked={isTabPaneHeavyBg} style={{ verticalAlign: 'text-bottom' }}
          onClick={se.changeIsTabPaneHeavyBg} checkedChildren="深" unCheckedChildren="浅"
        />
        <Blank width="6px" />
        {gcu.settingIconCtrl.showInBar && <SettingIcon mode="bar" />}
      </div>
    </div>
  );
}

export default React.memo(QuickNavBar);
