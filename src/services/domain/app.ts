

import http from 'services/http';
import * as timerUtil from 'utils/timer';

export async function fetchAppDetail(appId: string) {
  console.log(`fetch ${appId}`);
  // const list = await http.get('/api/detail', {appId});
  await timerUtil.delay(1000);
  return { appDetail: '最新爆款游戏' };
}