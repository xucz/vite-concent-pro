import React from 'react';
import { Layout, Menu } from 'antd';
import { SettingsType, StateType, useConcent } from 'concent';
import { Link } from 'react-router-dom';
import { CtxDeS } from 'types/store';
import { SelectInfo } from 'rc-menu/lib/interface';
import menus, { IMenuGroup, IMenuItem } from 'configs/menus';
import { homePageFullPath, path2menuGroup } from 'configs/derived/menus';
import { sys } from 'configs/constant';
import { getRelativeRootPath } from 'services/appPath';
import styles from './App.module.css';

type CtxPre = CtxDeS<{}, StateType<typeof iState>>;
type Ctx = CtxDeS<{}, StateType<typeof iState>, SettingsType<typeof setup>>;

const {Sider} = Layout;
const {SubMenu, Item: MenuItem} = Menu;
const {webHeaderImg, siderWidth, siderWidthPx} = sys;

function iState() {
  // 获取路由参数，确定展开的菜单
  let path = getRelativeRootPath();
  if (path === '/') path = homePageFullPath; // 确保home页时左侧菜单能够正确的点亮
  const gourpKey = path2menuGroup[path]?.key;

  return {
    selectedKeys: [path] as string[],
    openKeys: [gourpKey] as string[],
  };
}

function setup(ctx: CtxPre) {
  ctx.initState(iState);
  const position = 'fixed' as const;

  return {
    changeSelectedKeys: ({selectedKeys}: SelectInfo) => {
      ctx.setState({selectedKeys});
    },
    openMenus: (openKeys: React.Key[]) => {
      ctx.setState({openKeys});
    },
    renderMenuItem: (menuItem: IMenuItem) => {
      const {showInSider = true, Icon, path, label} = menuItem;
      if (!showInSider) return '';
      const uiIcon = Icon ? <Icon/> : '';
      return <MenuItem key={path}>
        <Link to={path}>{uiIcon}{label}</Link>
      </MenuItem>;
    },
    logoStyle: {width: siderWidth - 30, position, left: 19, top: 10}
  };
}

function AppSider() {
  const {settings: se, state, globalState} = useConcent<{}, Ctx>({setup, tag: 'Sider'});
  return (
    <Sider width={siderWidthPx} className={styles.siderWrap} theme={globalState.siderTheme}>
      <img style={se.logoStyle} src={webHeaderImg}></img>
      <Menu
        theme={globalState.siderTheme}
        onSelect={se.changeSelectedKeys}
        onOpenChange={se.openMenus}
        mode="inline"
        selectedKeys={state.selectedKeys}
        openKeys={state.openKeys}
        style={{height: '100%', borderRight: 0}}
      >
        {menus.map((item) => {
          const groupItem = item as IMenuGroup;
          if (groupItem.children) {
            const uiGroupItemIon = groupItem.Icon ? <groupItem.Icon/> : '';
            return (
              <SubMenu key={groupItem.key} className="siderSubMenu" title={
                <span> {uiGroupItemIon}{groupItem.label} </span>
              }>
                {groupItem.children.map(childItem => se.renderMenuItem(childItem))}
              </SubMenu>
            );
          }
          const menuItem = item as IMenuItem;
          return se.renderMenuItem(menuItem);
        })}
      </Menu>
    </Sider>
  );
}

export default React.memo(AppSider);
