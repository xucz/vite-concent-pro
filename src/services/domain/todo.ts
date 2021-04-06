import http from 'services/http';
import * as timerUtil from 'utils/timer';

export async function getTodoList() {
  await timerUtil.delay(1000);
  const ret = await http.get('/api/todo/list');
  return ret;
}
