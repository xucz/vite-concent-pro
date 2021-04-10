import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import * as mods from 'configs/c2Mods';
import { useC2Mod } from 'services/concent';
import { Divider } from 'antd';
import { GeneralTable } from 'components/smart/GeneralTable';
import { AsyncButton } from 'components/dumb/general';

function Home(props: RouteComponentProps) {
  const { state } = useC2Mod(mods.COUNTER);

  return (
    <div>
      <AsyncButton>Welcome to visit vite concent pro</AsyncButton>
      <Divider></Divider>
      <GeneralTable tid="1" size="small" columns={[]} fetchFn={() => Promise.resolve({ pageList: [], total: 10 })} />
      <GeneralTable tid="2" columns={[]} fetchFn={() => Promise.resolve({ pageList: [], total: 10 })} />
    </div>
  );
}

export default React.memo(Home);
