/**
 * 根据 configs/menus 配置组装整个应用路由系统
 */
import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import { cst, register } from 'concent';
import { getUrlChangedEvName } from 'react-router-concent';
import { flatedMenus } from 'configs/derived/menus';
import { IMenuItem } from 'configs/menus';
import NotFound from 'pages/NotFound';
import { CtxDe } from 'types/store';

class Routes extends React.Component {
  ctx = {} as CtxDe;
  errOccurred = false;

  state = {
    err: '',
  };

  $$setup() {
    this.ctx.on(getUrlChangedEvName(), () => {
      if (this.errOccurred) {
        this.errOccurred = false;
        this.setState({err: ''});
      }
    });
  }

  componentDidCatch(err: any) {
    this.errOccurred = true;
    this.setState({err: err.message});
  }

  render() {
    if (this.errOccurred) {
      return <h1 style={{color: 'red'}}>
        当前路由页面崩溃，请联系 xxx开发者 做进一步跟踪，如果是开发者，可打开console查看具体错误,
        如想继续访问当前页面，可刷新留浏览器重试。
      </h1>;
    }

    let homeMenuItem = null as IMenuItem | null;
    const uiRoutes = flatedMenus.map((item) => {
      const {path, Component, exact = true} = item;
      if (item.isHomePage) homeMenuItem = item;
      return <Route key={path} exact={exact} path={path} component={Component}/>;
    });

    let uiHomeRoute = '' as React.ReactNode;
    if (homeMenuItem) {
      uiHomeRoute = <Route key={'/'} exact={true} path={'/'} component={homeMenuItem.Component}/>
    }

    return (
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          {uiRoutes}
          {uiHomeRoute}
          <Route component={NotFound}/>
        </Switch>
      </Suspense>
    );
  }
}

export default register(cst.MODULE_DEFAULT)(Routes);
