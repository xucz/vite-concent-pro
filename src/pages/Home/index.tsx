import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { history } from 'react-router-concent';
import { routerPath } from 'configs/constant';
import * as mods from 'configs/c2Mods';
import { useC2Mod } from 'services/concent';
import { Button } from 'antd';
import { AsyncButton, NormalBlank } from 'components/dumb/general';
import { GeneralTable } from 'components/smart/GeneralTable';
import { DownloadOutlined } from '@ant-design/icons';

function Home(props: RouteComponentProps) {
  const {state} = useC2Mod(mods.COUNTER);
  return (
    <div style={{paddingTop: '150px'}}>
      <AsyncButton>Welcome to visit concent pro</AsyncButton>
      <h3>mods.COUNTER.state.value {state.value}</h3>
      <button onClick={() => history.push(routerPath.DEMO)}>to demo page</button>
      <Button type="primary">查看</Button>
      <NormalBlank/>
      <Button type="dashed" danger>删除</Button>
      <NormalBlank/>
      <Button type="primary" icon={<DownloadOutlined/>}>下载</Button>
      <GeneralTable tid="1" size="small" columns={[]} fetchFn={() => Promise.resolve({pageList: [], total: 10})}/>
      <GeneralTable tid="2" columns={[]} fetchFn={() => Promise.resolve({pageList: [], total: 10})}/>
    </div>
  );
}

export default React.memo(Home);
