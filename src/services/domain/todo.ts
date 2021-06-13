import http from 'services/http';

export async function getTodoList() {
  const ret = await http.get('/api/todo/list');
  return ret;
}

export async function queryTodoList(data: { keyword: string }) {
  const ret = await http.get('/api/todo/query', data);
  return ret;
}
