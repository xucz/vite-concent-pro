import * as timerUtil from 'utils/timer';

export async function getTodoList() {
  // const list = await http.get('/api/todo/list');
  await timerUtil.delay(1000);
  const list = [
    {id: 1, text: `hi concent ${new Date().toLocaleString()}`, done: true},
    {id: 2, text: 'hi concent pro', done: true},
    {id: 3, text: 'you should learn it', done: false},
  ];
  return list;
}
