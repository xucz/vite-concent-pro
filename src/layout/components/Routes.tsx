/* eslint-disable react/no-children-prop */
/**
 * 根据 configs/menus 配置组装整个应用的路由系统
 */
import React, { Suspense } from 'react';
import { Switch, Route, RouteComponentProps } from 'react-router-dom';
import { register, cst } from 'concent';
import { useSetup } from 'services/concent';
import { getUrlChangedEvName } from 'react-router-concent';
import { Layout } from 'antd';
import { flattedMenus } from 'configs/derived/menus';
import { IMenuItem } from 'configs/menus';
import Error403 from 'components/dumb/Error403';
import Error404 from 'components/dumb/Error404';
import * as typeUtil from 'utils/type';
import { decideVal } from 'utils/obj';
import { CtxDe } from 'types/store';
import SkeletonScreen from './SkeletonScreen';
import styles from '../styles/App.module.css';

const { Content } = Layout;

let key = 0;
function setup(ctx: CtxDe) {
  key = key + 1;
  const ins = ctx.initState({
    key,
  });
  ctx.on('refreshRouterGuard', () => {
    key = key + 1;
    ins.setState({ key });
  });
  return {
    state: ins.state,
  };
}

const RouterGuard = React.memo((props: { Comp: React.ComponentType<any>, routerProps: RouteComponentProps }) => {
  const settings = useSetup(setup);
  return <props.Comp key={settings.state.key} {...props.routerProps} />;
});

class Routes extends React.Component {
  public ctx = typeUtil.typeVal<CtxDe>({});
  public errOccurred = false;

  public state: { err: string } = { err: '' };

  // 构建一次后就缓存路由组件，否则会在边栏收起时造成页面组件卸载并再挂载
  public cachedUi: Record<string, any> = { uiRoutes: null, uiHomeRoute: null, uiNotFound: null };
  public cachedUiCompWrapContent: Record<string, { ui: any, layoutStyle: any }> = {};

  public $$setup() {
    this.ctx.on(getUrlChangedEvName(), (param, action, history) => {
      console.log(param, action, history);
      if (this.errOccurred) {
        this.errOccurred = false;
        this.setState({ err: '' });
      }
    });
  }

  public componentDidCatch(err: any) {
    this.errOccurred = true;
    this.setState({ err: err.message });
  }

  // 提示当前路由页崩溃
  public renderCrashTip = () => {
    return (
      <Layout style={this.ctx.globalComputed.contentLayoutStyle}>
        <h1 style={{ color: 'red', padding: '64px' }}>
          当前路由页面崩溃，请联系 xxx 开发者 做进一步跟踪，如果是开发者，可打开console查看具体错误,
          如想继续访问当前页面，可刷新浏览器重试。
        </h1>
      </Layout>
    );
  }

  public renderChildrenWithContentWrap(children: React.ReactNode) {
    const { contentLayoutStyle } = this.ctx.globalComputed;
    return <Layout style={contentLayoutStyle}>
      <Layout style={{ padding: '24px' }}>
        <Content className={styles.contentWrap}>
          {children}
        </Content>
      </Layout>
    </Layout>;
  }

  public renderChildrenWithNoContentWrap(children: React.ReactNode) {
    const { contentLayoutStyle } = this.ctx.globalComputed;
    return <Layout style={contentLayoutStyle}>
      {children}
    </Layout>;
  }

  public renderChildren = (item: IMenuItem, props: RouteComponentProps, inputSetContentLayout?: boolean) => {
    console.warn('Render CompWrap');
    const setContentLayout = decideVal(inputSetContentLayout, item.setContentLayout);
    const { contentLayoutStyle } = this.ctx.globalComputed;

    // check auth
    if (item.authId && !this.ctx.globalState.authIds.includes(item.authId)) {
      return this.renderChildrenWithContentWrap(<Error403 />);
    }

    // beforeComponentMount 可能返回一个替换的视图
    let uiReplaceRouteComp: React.ReactNode | void = '';
    const executed = React.useRef(false);
    if (!executed.current) {
      executed.current = true;
      if (item.beforeComponentMount) {
        uiReplaceRouteComp = item.beforeComponentMount(props);
      }
    }

    const ret = this.cachedUiCompWrapContent[item.path] || {};
    let { ui: uiCompWrapContent } = ret;
    const { layoutStyle } = ret;
    // layout 没变才返回缓存
    if (uiCompWrapContent && layoutStyle === contentLayoutStyle) return uiCompWrapContent;

    const uiTargetComp = uiReplaceRouteComp || <RouterGuard Comp={item.Component} routerProps={props} />;
    if (setContentLayout) {
      uiCompWrapContent = this.renderChildrenWithContentWrap(uiTargetComp);
    } else {
      uiCompWrapContent = this.renderChildrenWithNoContentWrap(uiTargetComp);
    }

    this.cachedUiCompWrapContent[item.path] = { ui: uiCompWrapContent, layoutStyle: contentLayoutStyle };
    return uiCompWrapContent;
  }

  // 创建一个渲染包含有【路由组件】的组件
  public makeCompWrap = (item: IMenuItem, setContentLayout?: boolean) => {
    console.warn('makeCompWrap');
    return (props: RouteComponentProps) => {
      return this.renderChildren(item, props, setContentLayout);
    };
  }

  // 根据配置构造路由
  public buildRouteUi = () => {
    if (this.cachedUi.uiRoutes) return this.cachedUi;

    let homeMenuItem: IMenuItem | null = null;
    const uiRoutes = flattedMenus.map((item) => {
      if (item.isHomePage) homeMenuItem = item;
      const CompWrap = this.makeCompWrap(item);
      // todo: keepalive
      return <Route key={item.path} exact={item.exact} path={item.path} component={CompWrap} />;
      // return <Route key={item.path} exact={item.exact} path={item.path}
      //   children={(props: RouteComponentProps) => this.renderChildren(item, props)}
      // />;
    });

    let uiHomeRoute: React.ReactNode = '';
    if (homeMenuItem) {
      // let item = homeMenuItem;
      const CompWrap = this.makeCompWrap(homeMenuItem);
      uiHomeRoute = <Route exact={true} path={'/'} component={CompWrap} />;
      // uiHomeRoute = <Route exact={true} path={'/'} children={(props: RouteComponentProps) => this.renderChildren(item, props)} />;
    }

    // 第二位参数传递 true， 让404 页面包裹一下 content layout
    const CompNotFoundWrap = this.makeCompWrap({ Component: Error404, path: '', label: '' }, true);
    const uiNotFoundRoute = <Route component={CompNotFoundWrap} />;

    this.cachedUi = { uiRoutes, uiHomeRoute, uiNotFoundRoute };
    return this.cachedUi;
  }

  public render() {
    if (this.errOccurred) {
      return this.renderCrashTip();
    }
    const { uiRoutes, uiHomeRoute, uiNotFoundRoute } = this.buildRouteUi();
    return (
      <Suspense fallback={<SkeletonScreen label="页面加载中..." />}>
        <Switch>
          {uiRoutes}
          {uiHomeRoute}
          {uiNotFoundRoute}
        </Switch>
      </Suspense>
    );
  }
}

export default register(cst.MODULE_DEFAULT)(Routes);
