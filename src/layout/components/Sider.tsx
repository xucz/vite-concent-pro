import React from 'react';
import { Menu, Button } from 'antd';
import { QuestionOutlined, DoubleLeftOutlined, DoubleRightOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { getUrlChangedEvName } from 'react-router-concent';
import { MenuMode, SelectInfo } from 'rc-menu/lib/interface';
import { CtxDe } from 'types/store';
import { IMenuGroup, IMenuItem } from 'configs/menus';
import { path2menuGroup, homePageFullPath, showingMenus } from 'configs/derived/menus';
import { SiderViewTypes } from 'configs/constant/sys';
import { getRelativeRootPath, extractPathAndSearch } from 'services/appPath';
import { useSetupCtx, getGlobalComputed } from 'services/concent';
import * as arrUtil from 'utils/arr';
import { EmptyView } from 'components/dumb/general';
import Logo from './Logo';
import '../styles/resetMenu.css';
import styles from '../styles/App.module.css';

const { SubMenu, Item: MenuItem } = Menu;
let firstCallGetOpenKeys = true;

function iState() {
  // 获取路由参数，确定展开的菜单
  let path = getRelativeRootPath();
  // 确保home页时左侧菜单能够正确的点亮
  if (path === '/') path = homePageFullPath;

  let openKeys: string[] = [];
  // 当边栏展开时，才计算 openKeys
  if (getGlobalComputed().siderInfo.isUnfold && path2menuGroup[path]) {
    openKeys = [path2menuGroup[path].key];
  }

  return {
    selectedKeys: [path],
    openKeys,
  };
}

let prevPathName = getRelativeRootPath();
let prevSearch = extractPathAndSearch(window.location.href).search;

function setup(ctx: CtxDe) {
  const ins = ctx.initState(iState);
  ctx.on(getUrlChangedEvName(), (param: any) => {
    const { pathname, search } = param;
    if (prevPathName === pathname && search !== prevSearch) {
      // 刷新同一个key挂载的路由组件
      ctx.emit('refreshRouterGuard');
    }
    prevPathName = pathname;
    prevSearch = search;
    const newState = iState();
    // 重新计算的值和实例上维护的不一样时，才触发 Sider 重渲染
    if (newState.selectedKeys[0] !== ins.state.selectedKeys[0]) {
      // 保持原来的菜单展开状态, 同时也让新的能够正确展开
      newState.openKeys = arrUtil.merge(newState.openKeys, ins.state.openKeys);
      ctx.setState(newState);
    }
    setActiveRoutePath(newState.selectedKeys[0]);
  });

  const setActiveRoutePath = (path: string) => {
    let search = extractPathAndSearch(window.location.href).search;
    ctx.gr.addActiveRoutePath({ path, search });
  };
  setActiveRoutePath(ins.state.selectedKeys[0]);

  return {
    insState: ins.state,
    // 展开时才获取真正的openKeys，否则会突兀的出现悬浮导航菜单
    getOpenKeys: () => {
      if (
        Date.now() - ctx.globalState.siderViewToCollapsedTime < 300
        || (firstCallGetOpenKeys && ctx.globalState.siderViewType === SiderViewTypes.NOT_COLLAPSED)
      ) {
        firstCallGetOpenKeys = false;
        setTimeout(() => {
          ins.setState({});
        }, 300);
        return [];
      }
      return ins.state.openKeys;
    },
    changeSelectedKeys: ({ selectedKeys }: SelectInfo) => {
      ins.setState({ selectedKeys: selectedKeys?.map(item => `${item}`) });
    },
    openMenus: (openKeys: React.Key[]) => {
      ins.setState({ openKeys: openKeys?.map(item => `${item}`) });
    },
    renderMenuItem: (menuItem: IMenuItem) => {
      const { Icon, path, label } = menuItem;
      const uiIcon = Icon ? <Icon /> : <QuestionOutlined />;
      return <MenuItem key={path} icon={uiIcon}>
        <Link to={path}>{label}</Link>
      </MenuItem>;
    },
    toggleCollapsed: () => {
      ctx.gr.toggleCollapsedBtn();
    },
  };
}

interface ISiderMenusProps {
  mode?: MenuMode;
  style?: React.CSSProperties;
}
export function SiderMenus(props: ISiderMenusProps) {
  const { mode = 'inline', style = { height: '100%', borderRight: 0 } } = props;
  const { settings: se, globalState, globalComputed: gcu } = useSetupCtx(setup, { tag: 'SiderMenus' });
  // 垂直在左侧布局时，才读siderTheme，否则主题色应和 headerTheme 相同
  const theme = mode === 'inline' ? globalState.siderTheme : globalState.headerTheme;

  return (
    <div className={`${styles.siderMenusWrap} smallScBar`} style={{ width: gcu.siderStyle.width }}>
      <Menu
        theme={theme}
        mode={mode}
        selectedKeys={se.insState.selectedKeys}
        openKeys={se.getOpenKeys()}
        className="layout-sider"
        style={style}
        onOpenChange={se.openMenus}
        onSelect={se.changeSelectedKeys}
        inlineCollapsed={!gcu.siderInfo.isUnfold}
      >
        {showingMenus.map((item) => {
          const groupItem = item as IMenuGroup;
          if (groupItem.children) {
            const uiGroupItemIon = groupItem.Icon ? <groupItem.Icon /> : <QuestionOutlined />;
            return (
              <SubMenu key={groupItem.key} icon={uiGroupItemIon} title={groupItem.label}>
                {groupItem.children.map(childItem => se.renderMenuItem(childItem))}
              </SubMenu>
            );
          }
          const menuItem = item as IMenuItem;
          return se.renderMenuItem(menuItem);
        })}
      </Menu>
    </div >
  );
}


function AppSider() {
  const { globalComputed: gcu, settings } = useSetupCtx(setup, { tag: 'Sider' });
  if (!gcu.siderInfo.showSider) return <EmptyView />;

  return (
    <div style={gcu.siderStyle} className={styles.siderWrap}>
      <Logo />
      <SiderMenus />
      <Button type="primary" onClick={settings.toggleCollapsed} style={{ width: '100%', border: 'none' }}>
        {gcu.siderInfo.isUnfold ? <DoubleLeftOutlined /> : <DoubleRightOutlined />}
      </Button>
    </div>
  );
}

export default React.memo(AppSider);
