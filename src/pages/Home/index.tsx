import React from 'react';
import { Button, Card, Row, Col, Tooltip, Radio, RadioChangeEvent } from 'antd';
import { GithubOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { RouteComponentProps } from 'react-router-dom';
import { history } from 'react-router-concent';
import { routerPath } from 'configs/constant';
import { TopHeaderTypes, TopNavBarTypes, SiderViewTypes } from 'configs/constant/sys';
import * as mods from 'configs/c2Mods';
import { useC2Mod, typeCtxM } from 'services/concent';
import { VerticalBlank, AsyncButton, Blank } from 'components/dumb/general';
import { AuthView } from 'components';
import Bar from 'components/Charts/Bar';

const layoutOptions = [
  { label: '折叠边栏，仅显示快捷导航条', value: '1' },
  { label: '展开边栏，仅显示快捷导航条', value: '2' },
  { label: '隐藏边栏，显示顶栏信息和快捷导航条', value: '3' },
];

function setup(c: any) {
  const ctx = typeCtxM(mods.HOME, {}, c);
  const { effect, gr, globalState } = ctx;
  effect(() => {
    const t = setInterval(ctx.mr.ranBarData, 3000);
    return () => clearInterval(t);
  }, []);

  return {
    changeTopViewType(e: RadioChangeEvent) {
      const layout = e.target.value;
      const argMap: Record<string, [SiderViewTypes, TopHeaderTypes, TopNavBarTypes]> = {
        1: [SiderViewTypes.COLLAPSED, TopHeaderTypes.HIDDEN, TopNavBarTypes.FIXED],
        2: [SiderViewTypes.NOT_COLLAPSED, TopHeaderTypes.HIDDEN, TopNavBarTypes.FIXED],
        3: [SiderViewTypes.HIDDEN, TopHeaderTypes.FIXED, TopNavBarTypes.FIXED],
      };
      const [siderViewType, topHeaderType, topNavBarType] = argMap[layout];
      gr.setState({ siderViewType, topHeaderType, topNavBarType });
    },
    addAuthId() {
      const { authIds } = globalState;
      if (!authIds.includes('key_1')) {
        authIds.push('key_1');
        gr.setState({ authIds });
      }
    },
    delAuthId() {
      const { authIds } = globalState;
      if (authIds.indexOf('key_1') >= 0) {
        authIds.splice(authIds.indexOf('key_1'), 1);
        gr.setState({ authIds });
      }
    },
  };
}

function Home(props: RouteComponentProps) {
  const { state: homeState, mr: homeMr, settings: se } = useC2Mod(mods.HOME, { setup });
  const { state, mr } = useC2Mod(mods.COUNTER);

  return (
    <div style={{ paddingTop: '15px' }}>
      <Row>
        <Col>
          <AsyncButton>欢迎了解与使用 Concent-pro </AsyncButton>
        </Col>
        <Col>
          <a style={{ marginLeft: '12px' }} href="https://github.com/tnfe/concent-pro" target="blank">
            <GithubOutlined style={{ fontSize: '52px' }} />
          </a>
        </Col>
      </Row>
      <VerticalBlank height="32px" />
      <AuthView authId="key_1"><h1>you can not see me if you have not auth</h1></AuthView>
      <Button type="primary" onClick={se.addAuthId}>
        点击此按钮，将看到一个带权限控制的视图
      </Button>
      <Blank />
      <Button type="primary" onClick={se.delAuthId}>
        移出权限
      </Button>
      <VerticalBlank height="32px" />
      <div>
        <Tooltip title="更多布局点击右上角设置按钮查看">
          <span>选择一个喜欢的布局吧<QuestionCircleOutlined /> : </span>
        </Tooltip>
        <Blank />
        <Radio.Group options={layoutOptions} onChange={se.changeTopViewType} />
      </div>
      <VerticalBlank height="32px" />
      <Button type="primary" onClick={() => history.push(`/counter?a=${Date.now()}`)}>
        跳转到一个带随机参的Counter页面
      </Button>
      <VerticalBlank height="32px" />
      <Row>
        <Col span="8">
          <Card
            onClick={() => history.push(routerPath.SIMPLE_LIST)}
            hoverable
            style={{ width: '80%' }}
            cover={<img alt="example" src="https://t7.baidu.com/it/u=1956604245,3662848045&fm=193&f=GIF" />}
          >
            <Card.Meta title="访问demo" description="提供xxx等功能" />
          </Card>
        </Col>
        <Col span="8">
          <Card
            onClick={() => history.push(routerPath.STEP_FORM)}
            hoverable
            style={{ width: '80%' }}
            cover={<img alt="example" src="https://t7.baidu.com/it/u=2763645735,2016465681&fm=193&f=GIF" />}
          >
            <Card.Meta title="访问分步表单" description="快速创建xx业务" />
          </Card>
        </Col>
      </Row>
      <VerticalBlank height="32px" />
      <h3>mods.COUNTER.state.value {state.value}</h3>
      <Button onClick={mr.increment}>change value</Button>
      <VerticalBlank height="32px" />
      <Button type="primary" onClick={homeMr.ranBarData}>ran bar data</Button>
      <VerticalBlank height="32px" />
      <Bar data={homeState.barData} />
    </div>
  );
}

export default React.memo(Home);

